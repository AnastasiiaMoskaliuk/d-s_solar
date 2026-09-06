import { notFound, redirect } from "next/navigation";

import { createClient } from "@/data/supabase/server";
import ProjectForm from "@/components/admin/NewProjectForm";
import ProjectImages from "@/components/admin/ProjectImages";

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

  const { data: project, error } =
    await supabase
      .from("projects")
      .select(`
        *,
        project_images (
          id,
          image_url,
          alt,
          sort_order
        )
      `)
      .eq("id", projectId)
      .single();

  if (error || !project) {
    notFound();
  }

  const images = [
    ...(project.project_images ?? []),
  ].sort(
    (a, b) =>
      a.sort_order - b.sort_order,
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
          <ProjectForm
            project={{
              id: project.id,
              title: project.title,
              shortTitle:
                project.short_title ?? "",
              handle: project.handle,
              location: project.location,
              date: project.date ?? "",
              power: project.power ?? "",
              panels:
                project.panels ?? undefined,
              panelType:
                project.panel_type ?? "",
              inverter:
                project.inverter ?? "",
              battery:
                project.battery ?? "",
              roofType:
                project.roof_type ?? "",
              installationTime:
                project.installation_time ?? "",
              description:
                project.description,
              details:
                project.details ?? "",
            }}
          />

          <ProjectImages
            projectId={project.id}
            initialImages={images}
          />
        </div>
      </div>
    </main>
  );
}