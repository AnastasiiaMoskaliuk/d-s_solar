"use client";

import { Carousel } from "@mantine/carousel";
import { useMediaQuery } from "@mantine/hooks";
import { useMantineTheme } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";

import { projectsData } from "@/data/projekts";
import ProjektCard from "@/components/ProjektCard";
import MainButton from "@/components/ButtonComponent";

const HomeProjekte = () => {
  const theme = useMantineTheme();

  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.md})`);

  const autoplay = useMemo(
    () =>
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
      }),
    [],
  );

  return (
    <section className="container pt-[40px] mb-[30px]">
      <div className="mb-[45px] flex flex-col items-center justify-center gap-[20px] lg:mb-[58px] lg:flex-row lg:justify-between xl:items-baseline">
        <h2 className="font-frontrunner text-center text-[40px] font-[700] leading-[50px] text-onyx md:text-[45px] xl:text-[60px]">
          Unsere Projekte
        </h2>

        <MainButton
          text="Alle Projekte"
          tag="a"
          href="/projekte"
          className="!bg-[#154b4b] text-snow"
        />
      </div>

      <Carousel
        withControls={!mobile}
        withIndicators
        controlSize={40}
        controlsOffset="xl"
        slideSize={{ base: "100%", md: "50%" }}
        slideGap={{ base: "20px", md: "30px" }}
        plugins={[autoplay]}
        emblaOptions={{
          loop: true,
          align: "start",
          slidesToScroll: mobile ? 1 : 2,
        }}
        classNames={{
          indicators: "!gap-[8px] !bottom-[-25px]",
          indicator:
            "h-[8px] w-[8px] !bg-lightGreen !pacity-40 !data-[active]:opacity-100",
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
