import { projectsData } from "@/data/projekts";
import SingleProjekt from "@/app/sections/article-page/SingleProjekt";

const ProjektPage = async ({
  params,
}: {
  params: Promise<{ projektId: string }>;
}) => {
  const { projektId } = await params;

  const project =
    projectsData.find((item) => item.handle === projektId) ??
    projectsData[0];

  return <SingleProjekt project={project} />;
};

export default ProjektPage;