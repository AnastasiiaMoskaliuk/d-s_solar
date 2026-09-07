import { redirect } from "next/navigation";
import Link from "next/link";

import { createClient } from "@/data/supabase/server";
import NewProjectEditor from "@/components/admin/NewProjectEditor";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const {
    data: authData,
    error: authError,
  } = await supabase.auth.getClaims();

  if (authError || !authData?.claims) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f2] px-[20px] py-[40px] md:px-[50px]">
      <div className="mx-auto max-w-[1000px]">
        {/* HEADER */}
        <div className="mb-[35px]">
          <h1 className="font-frontrunner text-[40px] font-bold text-[#154b4b]">
            Neues Projekt
          </h1>

          <p className="mt-[5px] text-[#787A80]">
            Neues Solarprojekt hinzufügen
          </p>
        </div>

        <div className="flex flex-col gap-[25px]">
          <NewProjectEditor />

          {/* ACTIONS */}
          <div className="sticky bottom-[20px] z-20 rounded-[16px] border border-[#ddd] bg-white/95 p-[15px] shadow-lg backdrop-blur-md">
            <div className="flex flex-col-reverse gap-[10px] sm:flex-row sm:justify-end">
              <Link
                href="/admin/projects"
                className="w-full rounded-[10px] border border-[#154b4b] px-[25px] py-[13px] text-center font-semibold text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white sm:w-auto"
              >
                Abbrechen
              </Link>

              <button
                type="submit"
                form="project-form"
                className="w-full rounded-[10px] bg-[#f7bd37] px-[25px] py-[13px] font-bold text-[#154b4b] transition hover:opacity-90 sm:w-auto"
              >
                Projekt erstellen
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}