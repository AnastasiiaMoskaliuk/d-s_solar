"use client";

import Link from "next/link";
import Image from "next/image";

type Project = {
  id: number;
  handle: string;
  title: string;
  location: string;
  date?: string;
  power?: string;
  panels?: number;
  images: {
    originalSrc: string;
    alt: string;
  }[];
};

type ProjectsListProps = {
  projects: Project[];
};

const ProjectsList = ({ projects }: ProjectsListProps) => {
  return (
    <div className="flex flex-col gap-[15px]">
      {projects.length === 0 ? (
        <div className="rounded-[15px] border border-dashed border-[#ccc] p-[40px] text-center">
          <p className="text-[16px] text-[#787A80]">
            Noch keine Projekte vorhanden.
          </p>
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col gap-[20px] rounded-[15px] border border-[#eee] bg-white p-[20px] transition hover:shadow-md md:flex-row md:items-center"
          >
            {/* IMAGE */}
            <div className="relative h-[180px] w-full shrink-0 overflow-hidden rounded-[12px] md:h-[120px] md:w-[180px]">
              {project.images?.[0]?.originalSrc ? (
                <Image
                  src={project.images[0].originalSrc}
                  alt={project.images[0].alt || project.title}
                  fill
                  sizes="180px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-[#f0f0ed] text-[14px] text-[#999]">
                  Kein Bild
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="flex-1">
              <h2 className="text-[22px] font-bold text-[#154b4b]">
                {project.title}
              </h2>

              <div className="mt-[8px] flex flex-wrap gap-x-[15px] gap-y-[5px] text-[14px] text-[#787A80]">
                <span>📍 {project.location}</span>

                {project.date && <span>📅 {project.date}</span>}

                {project.power && <span>⚡ {project.power}</span>}

                {project.panels && (
                  <span>☀ {project.panels} Module</span>
                )}
              </div>

              <p className="mt-[8px] text-[12px] text-[#aaa]">
                /projekte/{project.handle}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-[10px] md:flex-col lg:flex-row">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="rounded-[10px] bg-[#154b4b] px-[18px] py-[10px] text-center text-[14px] font-semibold text-white transition hover:opacity-90"
              >
                Bearbeiten
              </Link>

              <Link
                href={`/projekte/${project.handle}`}
                target="_blank"
                className="rounded-[10px] border border-[#154b4b] px-[18px] py-[10px] text-center text-[14px] font-semibold text-[#154b4b] transition hover:bg-[#154b4b] hover:text-white"
              >
                Anzeigen
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectsList;