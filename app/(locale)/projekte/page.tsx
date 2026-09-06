import { getProjects } from "@/data/getProjects";
import Image from "next/image";

export default async function Projekte() {
  const projects = await getProjects();

  return (
    <main>
      <h1>Projekte</h1>

      <div>
        {projects.map((project) => (
          <article key={project.id}>
            <h2>{project.title}</h2>

            <p>{project.description}</p>

            <p>
              {project.location} · {project.date}
            </p>

            <p>
              {project.power} · {project.panels} Module
            </p>

            {project.images[0] && (
              <Image
                src={project.images[0].originalSrc}
                alt={project.images[0].alt || project.title}
                width={500}
                height={300}
              ></Image>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}