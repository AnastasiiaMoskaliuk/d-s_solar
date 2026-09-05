"use client";

import { Carousel } from "@mantine/carousel";
import { projectsData } from "@/data/projekts";
import ProjektCard from "@/components/ProjektCard";

const HomeProjekte = () => {
  return (
    <section className="container pt-[80px] lg:pt-[110px]">
      <div className="mb-[45px] flex flex-col items-center justify-center gap-[5px] lg:mb-[58px] lg:flex-row lg:justify-between xl:items-baseline">
        <h2 className="font-frontrunner text-center text-[40px] leading-[50px] text-black md:text-[45px] xl:text-[60px]">
          Unsere Projekte
        </h2>

        <a
          href="/projekte"
          className="rounded-full bg-[#154b4b] px-[24px] py-[12px] text-[14px] font-semibold text-white transition-all duration-300 hover:bg-[#f7bd37] hover:text-[#154b4b]"
        >
          Alle Projekte
        </a>

      </div>
      <Carousel
        withIndicators
        withControls
        slideSize={{
          base: "90%",
          sm: "70%",
          md: "50%",
          lg: "33.333333%",
        }}
        slideGap={{
          base: "md",
          lg: "xl",
        }}
        emblaOptions={{
          loop: true,
          align: "start",
          skipSnaps: true,
        }}
      >
        {projectsData.map((project) => (
          <Carousel.Slide key={project.id}>
            <ProjektCard project={project} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </section>
  );
};

export default HomeProjekte;