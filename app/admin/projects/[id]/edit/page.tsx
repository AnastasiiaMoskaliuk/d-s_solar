import { notFound, redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/data/supabase/server";
import ProjectForm from "@/components/admin/NewProjectForm";
import ProjectImages from "@/components/admin/ProjectImages";
import ProjectFeatures from "@/components/admin/ProjectFeatures";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const projectId = Number(id);

  if (!Number.isInteger(projectId)) {
    notFound();
  }

  const supabase = await createClient();

  const {
    data: authData,
    error: authError,
  } = await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    redirect("/admin/login");
  }

  const { data: project, error } = await supabase
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
      )
    `)
    .eq("id", projectId)
    .single();

  if (error || !project) {
    notFound();
  }

  const images = [...(project.project_images ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  const features = [...(project.project_features ?? [])].sort(
    (a, b) => a.sort_order - b.sort_order,
  );

  return (
    <main className="min-h-screen bg-[#f5f5f2] px-[20px] py-[40px] md:px-[50px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-[35px]">
          <h1 className="font-frontrunner text-[40px] font-bold text-[#154b4b]">
            Projekt bearbeiten
          </h1>

          <p className="mt-[5px] text-[#787A80]">
            {project.title}
          </p>
        </div>

        <div className="flex flex-col gap-[25px]">
          {/* ОСНОВНА ІНФОРМАЦІЯ */}
          <ProjectForm
            project={{
              id: project.id,
              title: project.title,
              shortTitle: project.short_title ?? "",
              handle: project.handle,
              location: project.location,
              date: project.date ?? "",
              power: project.power ?? "",
              panels: project.panels ?? undefined,
              panelType: project.panel_type ?? "",
              inverter: project.inverter ?? "",
              battery: project.battery ?? "",
              roofType: project.roof_type ?? "",
              installationTime:
                project.installation_time ?? "",
              description: project.description,
              details: project.details ?? "",
            }}
          />

          {/* ФОТО */}
          <ProjectImages
            projectId={project.id}
            initialImages={images}
          />

          {/* ХАРАКТЕРИСТИКИ */}
          <ProjectFeatures
            projectId={project.id}
            initialFeatures={features}
          />

          {/* ACTIONS */}
          <div className="sticky bottom-[20px] z-20 rounded-[16px] border border-[#ddd] bg-white/95 p-[15px] shadow-lg backdrop-blur-md">
            <div className="flex flex-col-reverse gap-[10px] sm:flex-row sm:justify-end">
              <Link
                href="/admin/projects"
                className="rounded-[10px] border border-[#154b4b] px-[25px] py-[13px] text-center font-semibold text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white"
              >
                Abbrechen
              </Link>

              <button
                type="submit"
                form="project-form"
                className="rounded-[10px] bg-[#f7bd37] px-[25px] py-[13px] font-bold text-[#154b4b] transition hover:opacity-90"
              >
                Änderungen speichern
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}