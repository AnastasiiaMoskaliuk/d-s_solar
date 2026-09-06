import Link from "next/link";
import { redirect } from "next/navigation";

import { createClient } from "@/data/supabase/server";
import { getProjects } from "@/data/getProjects";

import ProjectsList from "@/components/admin/ProjectsList";

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/admin/login");
  }

  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-[#f5f5f2] px-[20px] py-[40px] md:px-[50px]">
      <div className="mx-auto max-w-[1200px]">
        {/* HEADER */}
        <div className="mb-[40px] flex flex-col gap-[20px] md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="font-frontrunner text-[40px] font-bold text-[#154b4b]">
              Projekte
            </h1>

            <p className="mt-[5px] text-[#787A80]">
              D&S Solar Adminbereich
            </p>
          </div>

          <div className="flex items-center gap-[10px]">
            <div className="rounded-full bg-[#154b4b] px-[15px] py-[8px] text-[13px] text-white">
              Admin
            </div>

            <Link
              href="/admin/projects/new"
              className="rounded-[10px] bg-[#f7bd37] px-[18px] py-[11px] text-[14px] font-bold text-[#154b4b] transition hover:opacity-90"
            >
              + Neues Projekt
            </Link>
          </div>
        </div>

        {/* CONTENT */}
        <div>
          <div className="mb-[15px] flex items-center justify-between">
            <h2 className="text-[25px] font-bold text-[#154b4b]">
              Alle Projekte
            </h2>

            <span className="text-[14px] text-[#787A80]">
              {projects.length} Projekte
            </span>
          </div>

          <ProjectsList projects={projects} />
        </div>
      </div>
    </main>
  );
}