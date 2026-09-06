import fs from "fs";
import path from "path";
import { createRequire } from "module";
import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const require = createRequire(import.meta.url);
const ts = require("typescript");

const ROOT = process.cwd();

const PROJECTS_FILE = path.join(ROOT, "data", "projekts.ts");

// ======================================================
// ENV
// ======================================================

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Не знайдено файл: ${filePath}`);
  }

  const content = fs.readFileSync(filePath, "utf8");

  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const index = trimmed.indexOf("=");

    if (index === -1) {
      continue;
    }

    const key = trimmed.slice(0, index).trim();
    let value = trimmed.slice(index + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(path.join(ROOT, ".env.local"));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;

const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  throw new Error("Не знайдено NEXT_PUBLIC_SUPABASE_URL у .env.local");
}

if (!SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Не знайдено SUPABASE_SERVICE_ROLE_KEY у .env.local");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  realtime: {
    transport: ws,
  },
});

// ======================================================
// LOAD PROJECTS.TS
// ======================================================

function loadProjectsFile() {
  if (!fs.existsSync(PROJECTS_FILE)) {
    throw new Error(`Не знайдено projects.ts:\n${PROJECTS_FILE}`);
  }

  let source = fs.readFileSync(PROJECTS_FILE, "utf8");

  // ----------------------------------------------------
  // IMAGE IMPORTS
  // ----------------------------------------------------

  source = source.replace(
    /import\s+(\w+)\s+from\s+["']([^"']+\.(?:jpg|jpeg|png|webp))["'];?/gi,
    (_, variable, importPath) => {
      const relativePath = importPath.replace(/^@\//, "");

      const absolutePath = path.join(ROOT, relativePath);

      return `
const ${variable} = {
  __imagePath: ${JSON.stringify(absolutePath)}
};
`;
    },
  );

  // ----------------------------------------------------
  // REMOVE IMPORTS
  // ----------------------------------------------------

  source = source.replace(/import\s+type\s+[^;]+;?/g, "");

  source = source.replace(/import\s+[^;]+;?/g, "");

  // ----------------------------------------------------
  // REMOVE TYPES / INTERFACES
  // ----------------------------------------------------

  source = source.replace(/export\s+type\s+\w+\s*=\s*\{[\s\S]*?\};/g, "");

  source = source.replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\}/g, "");

  // ----------------------------------------------------
  // REMOVE TYPES FROM projectsData
  // ----------------------------------------------------

  source = source.replace(
    /export\s+const\s+projectsData\s*:[^=]+=/,
    "const projectsData =",
  );

  source = source.replace(
    /export\s+const\s+projectsData\s*=/,
    "const projectsData =",
  );

  // ----------------------------------------------------
  // TYPESCRIPT → JAVASCRIPT
  // ----------------------------------------------------

  const result = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.None,
    },
  });

  // ----------------------------------------------------
  // EXECUTE
  // ----------------------------------------------------

  const execute = new Function(result.outputText + "\nreturn projectsData;");

  return execute();
}

// ======================================================
// HELPERS
// ======================================================

function getImagePath(image) {
  if (!image) {
    return null;
  }

  if (image.originalSrc?.__imagePath) {
    return image.originalSrc.__imagePath;
  }

  if (image.__imagePath) {
    return image.__imagePath;
  }

  return null;
}

function getMimeType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  const types = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
  };

  return types[extension] || "application/octet-stream";
}

// ======================================================
// MIGRATION
// ======================================================

async function migrate() {
  console.log("");
  console.log("========================================");
  console.log(" D&S Solar → Supabase migration");
  console.log("========================================");
  console.log("");

  const projects = loadProjectsFile();

  if (!Array.isArray(projects)) {
    throw new Error("projectsData не є масивом.");
  }

  console.log(`Знайдено проєктів: ${projects.length}`);
  console.log("");

  for (const project of projects) {
    console.log("----------------------------------------");
    console.log(`Проєкт: ${project.title}`);
    console.log(`Handle: ${project.handle}`);

    // ==================================================
    // PROJECT
    // ==================================================

    const { data: existingProject, error: findError } = await supabase
      .from("projects")
      .select("id")
      .eq("handle", project.handle)
      .maybeSingle();

    if (findError) {
      throw new Error(`Помилка пошуку проєкту: ${findError.message}`);
    }

    let projectId;

    if (existingProject) {
      projectId = existingProject.id;

      console.log(`⚠️ Проєкт вже існує. ID: ${projectId}`);

      const { error } = await supabase
        .from("projects")
        .update({
          title: project.title,
          short_title: project.shortTitle ?? null,
          location: project.location,
          date: project.date ?? null,
          power: project.power ?? null,
          panels: project.panels ?? null,
          panel_type: project.panelType ?? null,
          inverter: project.inverter ?? null,
          battery: project.battery ?? null,
          roof_type: project.roofType ?? null,
          installation_time: project.installationTime ?? null,
          description: project.description,
          details: project.details ?? null,
        })
        .eq("id", projectId);

      if (error) {
        throw new Error(`Помилка оновлення: ${error.message}`);
      }
    } else {
      const { data, error } = await supabase
        .from("projects")
        .insert({
          handle: project.handle,
          title: project.title,
          short_title: project.shortTitle ?? null,
          location: project.location,
          date: project.date ?? null,
          power: project.power ?? null,
          panels: project.panels ?? null,
          panel_type: project.panelType ?? null,
          inverter: project.inverter ?? null,
          battery: project.battery ?? null,
          roof_type: project.roofType ?? null,
          installation_time: project.installationTime ?? null,
          description: project.description,
          details: project.details ?? null,
        })
        .select("id")
        .single();

      if (error) {
        throw new Error(`Помилка створення: ${error.message}`);
      }

      projectId = data.id;

      console.log(`✅ Проєкт створено. ID: ${projectId}`);
    }

    // ==================================================
    // FEATURES
    // ==================================================

    await supabase
      .from("project_features")
      .delete()
      .eq("project_id", projectId);

    if (Array.isArray(project.features)) {
      const features = project.features.map((text, index) => ({
        project_id: projectId,
        text,
        sort_order: index,
      }));

      if (features.length > 0) {
        const { error } = await supabase
          .from("project_features")
          .insert(features);

        if (error) {
          throw new Error(`Помилка features: ${error.message}`);
        }
      }

      console.log(`✅ Features: ${features.length}`);
    }

    // ==================================================
    // PARAGRAPHS
    // ==================================================

    await supabase
      .from("project_paragraphs")
      .delete()
      .eq("project_id", projectId);

    if (Array.isArray(project.paragraphs)) {
      const paragraphs = project.paragraphs.map((paragraph, index) => ({
        project_id: projectId,
        paragraph_id: paragraph.id,
        type: paragraph.type,
        subheading: paragraph.subheading ?? null,
        text: paragraph.text ?? null,
        image_url: null,
        image_alt: paragraph.image?.alt ?? null,
        sort_order: index,
      }));

      if (paragraphs.length > 0) {
        const { error } = await supabase
          .from("project_paragraphs")
          .insert(paragraphs);

        if (error) {
          throw new Error(`Помилка paragraphs: ${error.message}`);
        }
      }

      console.log(`✅ Paragraphs: ${paragraphs.length}`);
    }

    // ==================================================
    // IMAGES
    // ==================================================

    await supabase.from("project_images").delete().eq("project_id", projectId);

    if (Array.isArray(project.images)) {
      let uploadedImages = 0;

      for (let index = 0; index < project.images.length; index++) {
        const image = project.images[index];

        const localPath = getImagePath(image);

        if (!localPath) {
          console.log(`⚠️ Немає шляху до картинки №${index + 1}`);
          continue;
        }

        if (!fs.existsSync(localPath)) {
          console.log(`⚠️ Файл не знайдено: ${localPath}`);
          continue;
        }

        const buffer = fs.readFileSync(localPath);

        const extension = path.extname(localPath);

        const storagePath = `${project.handle}/${index + 1}${extension}`;

        console.log(`⬆️ Upload: ${storagePath}`);

        const { error: uploadError } = await supabase.storage
          .from("projects")
          .upload(storagePath, buffer, {
            contentType: getMimeType(localPath),
            upsert: true,
          });

        if (uploadError) {
          throw new Error(`Помилка upload: ${uploadError.message}`);
        }

        const { data: publicUrl } = supabase.storage
          .from("projects")
          .getPublicUrl(storagePath);

        const { error: dbError } = await supabase
          .from("project_images")
          .insert({
            project_id: projectId,
            image_url: publicUrl.publicUrl,
            alt: image.alt ?? null,
            sort_order: index,
          });

        if (dbError) {
          throw new Error(`Помилка project_images: ${dbError.message}`);
        }

        uploadedImages++;
      }

      console.log(`✅ Images: ${uploadedImages}/${project.images.length}`);
    }

    console.log(`✅ ${project.title} готовий`);
    console.log("");
  }

  console.log("========================================");
  console.log(" 🎉 МІГРАЦІЯ ЗАВЕРШЕНА");
  console.log("========================================");
  console.log("");
}

migrate().catch((error) => {
  console.error("");
  console.error("❌ ПОМИЛКА:");
  console.error(error);
  console.error("");
  process.exit(1);
});
