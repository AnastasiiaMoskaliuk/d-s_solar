import Image from "next/image";
import Link from "next/link";
import { SolarProject } from "@/data/projekts";

interface ProjektCardProps {
  project: SolarProject;
}

const ProjektCard = ({ project }: ProjektCardProps) => {
  return (
    <Link
      href={`/projekte/${project.handle}`}
      className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-gray-200 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-[6px] hover:shadow-[0_15px_40px_rgba(0,0,0,0.15)]"
    >
      <div className="relative h-[220px] w-full overflow-hidden">
        <Image
           src={project.images[0].originalSrc}
          alt={project.images[0].alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {project.power && (
          <div className="absolute right-[15px] top-[15px] rounded-full bg-white px-[14px] py-[7px] text-[13px] font-bold text-[#154b4b] shadow-md">
            {project.power}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-[18px] p-[22px]">
        <h3 className="line-clamp-2 text-[19px] font-bold leading-[27px] text-[#154b4b] transition-colors duration-300 group-hover:text-[#f7bd37]">
          {project.title}
        </h3>

        <div className="flex flex-wrap gap-[8px]">
          <span className="rounded-full bg-[#154b4b]/10 px-[10px] py-[5px] text-[12px] text-[#154b4b]">
            📍 {project.location}
          </span>

          {project.panels && (
            <span className="rounded-full bg-[#f7bd37]/20 px-[10px] py-[5px] text-[12px] text-[#154b4b]">
              ☀ {project.panels} Module
            </span>
          )}
        </div>

        <p className="line-clamp-3 text-[14px] leading-[22px] text-gray-600">
          {project.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-[15px]">
          <span className="text-[14px] font-semibold text-[#154b4b]">
            Projekt ansehen
          </span>

          <span className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#154b4b] text-white transition-all duration-300 group-hover:translate-x-[4px] group-hover:bg-[#f7bd37]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjektCard;