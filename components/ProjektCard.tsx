import Image from "next/image";
import Link from "next/link";
import { SolarProject } from "@/types/project";

interface ProjektCardProps {
  project: SolarProject;
}

const ProjektCard = ({ project }: ProjektCardProps) => {
  return (
    <Link
      href={`/projekte/${project.handle}`}
      className="group relative block h-[440px] w-full overflow-hidden rounded-[20px]"
    >
      <Image
        src={project.images[0].originalSrc}
        alt={project.images[0].alt}
        fill
        sizes="(max-width: 640px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

      {project.power && (
        <div className="absolute right-[20px] top-[20px] rounded-full bg-white px-[14px] py-[7px] text-[13px] font-bold text-[#154b4b] shadow-md">
          {project.power}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-[10px] p-[25px]">
        <h3 className="max-w-[90%] text-[28px] font-[800] leading-[1.2] text-white transition-colors duration-300 group-hover:text-[#f7bd37]">
          {project.title}
        </h3>
        <div className="flex flex-wrap items-center gap-[10px] text-[14px] text-white/80">
          <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-white/70">
            📍 {project.location}
          </span>
          {project.panels && (
            <span className="text-[14px] font-medium text-white/80">
              ☀ {project.panels} Module
            </span>
          )}
        </div>

        <div className="mt-[8px] flex justify-end">
          <span className="flex h-[35px] w-[50px] items-center justify-center rounded-full bg-[#f7bd37] text-[30px] leading-none text-[#154b4b] transition-transform duration-300 group-hover:translate-x-[5px]">
            <span className="relative -top-[2px]">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProjektCard;
