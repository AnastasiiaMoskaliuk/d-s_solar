import { notFound } from "next/navigation";

import { getProjectByHandle } from "@/data/getProjects";
import SingleProjekt from "@/app/sections/article-page/SingleProjekt";

const ProjektPage = async ({
  params,
}: {
  params: Promise<{ projektId: string }>;
}) => {
  const { projektId } = await params;

  const project = await getProjectByHandle(projektId);
  console.log("PROJECT ID:", projektId);
  console.log("PROJECT FROM SUPABASE:", project);
  if (!project) {
    notFound();
  }

  return <SingleProjekt project={project} />;
};

export default ProjektPage;
