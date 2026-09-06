import { redirect } from "next/navigation";

import { createClient } from "@/data/supabase/server";
import NewProjectForm from "@/components/admin/NewProjectForm";

export default async function NewProjectPage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/admin/login");
  }

  return (
    <main className="min-h-screen bg-[#f5f5f2] px-[20px] py-[40px] md:px-[50px]">
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-[35px]">
          <h1 className="font-frontrunner text-[40px] font-bold text-[#154b4b]">
            Neues Projekt
          </h1>

          <p className="mt-[5px] text-[#787A80]">
            Neues Solarprojekt hinzufügen
          </p>
        </div>

        <NewProjectForm />
      </div>
    </main>
  );
}