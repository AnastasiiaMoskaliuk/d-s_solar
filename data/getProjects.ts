import { supabase } from "./supabase";

export async function getProjects() {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_images (
        id,
        image_url,
        alt,
        sort_order
      ),
      project_features (
        id,
        text,
        sort_order
      ),
      project_paragraphs (
        id,
        paragraph_id,
        type,
        subheading,
        text,
        image_url,
        image_alt,
        sort_order
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase error:", error);
    throw new Error(error.message);
  }

  return data.map((project) => ({
    id: project.id,
    handle: project.handle,
    title: project.title,
    shortTitle: project.short_title ?? undefined,

    location: project.location,
    date: project.date ?? undefined,

    power: project.power ?? undefined,
    panels: project.panels ?? undefined,
    panelType: project.panel_type ?? undefined,
    inverter: project.inverter ?? undefined,
    battery: project.battery ?? undefined,
    roofType: project.roof_type ?? undefined,
    installationTime: project.installation_time ?? undefined,

    description: project.description,
    details: project.details ?? undefined,

    images: [...(project.project_images ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => ({
        originalSrc: image.image_url,
        alt: image.alt ?? "",
      })),

    features: [...(project.project_features ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((feature) => feature.text),

    paragraphs: [...(project.project_paragraphs ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((paragraph) => ({
        id: paragraph.paragraph_id,
        type: paragraph.type as "text" | "image" | "list" | "quote",
        text: paragraph.text ?? null,
        subheading: paragraph.subheading ?? null,

        image: paragraph.image_url
          ? {
              originalSrc: paragraph.image_url,
              alt: paragraph.image_alt ?? "",
            }
          : null,
      })),
  }));
}

export async function getProjectByHandle(handle: string) {
  const { data, error } = await supabase
    .from("projects")
    .select(`
      *,
      project_images (
        id,
        image_url,
        alt,
        sort_order
      ),
      project_features (
        id,
        text,
        sort_order
      ),
      project_paragraphs (
        id,
        paragraph_id,
        type,
        subheading,
        text,
        image_url,
        image_alt,
        sort_order
      )
    `)
    .eq("handle", handle)
    .single();

  if (error) {
    console.error("Supabase error:", error);
    return null;
  }

  return {
    id: data.id,
    handle: data.handle,
    title: data.title,
    shortTitle: data.short_title ?? undefined,

    location: data.location,
    date: data.date ?? undefined,

    power: data.power ?? undefined,
    panels: data.panels ?? undefined,
    panelType: data.panel_type ?? undefined,
    inverter: data.inverter ?? undefined,
    battery: data.battery ?? undefined,
    roofType: data.roof_type ?? undefined,
    installationTime: data.installation_time ?? undefined,

    description: data.description,
    details: data.details ?? undefined,

    images: [...(data.project_images ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((image) => ({
        originalSrc: image.image_url,
        alt: image.alt ?? "",
      })),

    features: [...(data.project_features ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((feature) => feature.text),

    paragraphs: [...(data.project_paragraphs ?? [])]
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((paragraph) => ({
        id: paragraph.paragraph_id,
        type: paragraph.type as "text" | "image" | "list" | "quote",
        text: paragraph.text ?? null,
        subheading: paragraph.subheading ?? null,

        image: paragraph.image_url
          ? {
              originalSrc: paragraph.image_url,
              alt: paragraph.image_alt ?? "",
            }
          : null,
      })),
  };
}