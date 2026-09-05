import Image from "next/image";
import Link from "next/link";

import { SolarProject } from "@/data/projekts";
import ParagraphsComponent from "@/components/ProjectParagraph";

const SingleProjekt = ({ project }: { project: SolarProject }) => {
  return (
    <section className="mx-[20px] mb-[50px] mt-[50px] md:mx-[50px] lg:mt-[80px]">
      <article className="mx-auto max-w-[1400px]">
        <Link
          href="/projekte"
          className="mb-[30px] inline-block text-[#154b4b]"
        >
          ← Zurück zu Projekten
        </Link>

        {/* Заголовок */}
        <div className="mb-[30px] text-center">
          <h1 className="font-frontrunner text-[35px] leading-[45px] text-black md:text-[45px] lg:text-[60px] lg:leading-[70px]">
            {project.title}
          </h1>
        </div>

        <hr className="mb-[35px] border-[#E5E8ED]" />

        {/* Основний контент */}
        <div className="flex flex-col gap-[40px] lg:flex-row lg:gap-[70px]">
          
          {/* Ліва частина */}
          <div className="flex flex-col gap-[20px] lg:w-[35%]">
            
            {/* Головне фото */}
            <div className="relative h-[300px] w-full overflow-hidden rounded-[20px] md:h-[400px]">
              <Image
                src={project.images[0].originalSrc}
                alt={project.images[0].alt}
                fill
                className="object-cover"
              />
            </div>

            {/* Інформація */}
            <div className="flex flex-wrap items-center gap-[8px] text-[14px] text-[#787A80] md:text-[16px]">
              <span className="rounded-full bg-[#154b4b]/10 px-[12px] py-[6px] text-[#154b4b]">
                📍 {project.location}
              </span>

              {project.date && (
                <span className="rounded-full bg-[#f7bd37]/20 px-[12px] py-[6px] text-[#154b4b]">
                  📅 {project.date}
                </span>
              )}
            </div>

            {/* Характеристики */}
            <div className="rounded-[20px] bg-[#154b4b] p-[25px] text-white">
              <h2 className="mb-[20px] text-[22px] font-bold">
                Anlagendaten
              </h2>

              <div className="flex flex-col gap-[12px]">
                {project.power && (
                  <div className="flex justify-between gap-[15px] border-b border-white/20 pb-[10px]">
                    <span>Anlagenleistung</span>
                    <strong>{project.power}</strong>
                  </div>
                )}

                {project.panels && (
                  <div className="flex justify-between gap-[15px] border-b border-white/20 pb-[10px]">
                    <span>Solarmodule</span>
                    <strong>{project.panels}</strong>
                  </div>
                )}

                {project.panelType && (
                  <div className="flex justify-between gap-[15px] border-b border-white/20 pb-[10px]">
                    <span>Modultyp</span>
                    <strong>{project.panelType}</strong>
                  </div>
                )}

                {project.inverter && (
                  <div className="flex justify-between gap-[15px] border-b border-white/20 pb-[10px]">
                    <span>Wechselrichter</span>
                    <strong>{project.inverter}</strong>
                  </div>
                )}

                {project.battery && (
                  <div className="flex justify-between gap-[15px] border-b border-white/20 pb-[10px]">
                    <span>Speicher</span>
                    <strong>{project.battery}</strong>
                  </div>
                )}

                {project.roofType && (
                  <div className="flex justify-between gap-[15px] border-b border-white/20 pb-[10px]">
                    <span>Dachtyp</span>
                    <strong>{project.roofType}</strong>
                  </div>
                )}

                {project.installationTime && (
                  <div className="flex justify-between gap-[15px]">
                    <span>Installationszeit</span>
                    <strong>{project.installationTime}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Права частина */}
          <div className="flex flex-col gap-[25px] lg:w-[65%]">

            {project.paragraphs?.map((paragraph) => (
              <ParagraphsComponent
                key={paragraph.id}
                paragraph={paragraph}
              />
            ))}

          </div>
        </div>

        {/* Галерея */}
        {project.images.length > 1 && (
          <div className="mt-[60px]">
            <h2 className="mb-[25px] text-[30px] font-bold text-[#154b4b]">
              Weitere Bilder
            </h2>

            <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-3">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative h-[250px] overflow-hidden rounded-[20px]"
                >
                  <Image
                    src={image.originalSrc}
                    alt={`${project.title} - Bild ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </section>
  );
};

export default SingleProjekt;