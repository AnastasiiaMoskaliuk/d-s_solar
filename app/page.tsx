import HeroSection from "./sections/home-page/HeroSection";
import HomeProjekte from "./sections/home-page/HomeProjekte";
import LeistungenSection from "./sections/home-page/LeistungenSection";
import RechnungSection from "./sections/home-page/RechnungSection";
import UberUnsSection from "./sections/home-page/UeberUnsSection";

import { getProjects } from "@/data/getProjects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <HeroSection />

      <LeistungenSection />

      <RechnungSection />

      <UberUnsSection />

      <HomeProjekte projects={projects} />
    </>
  );
}