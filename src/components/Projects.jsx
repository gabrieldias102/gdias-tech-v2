import { useEffect, useState } from "react";

const PROJECTS_URL = "/projects.json";

function ProjectCard({ name, image, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-video overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary focus-visible:border-primary focus-visible:outline-none"
    >
      <img
        src={image}
        alt={`Tela inicial do ${name}`}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 group-focus-visible:scale-105"
        loading="lazy"
      />

      {/* Sem hover (touch), o nome fica sempre visível; com mouse, aparece no hover/foco. */}
      <div className="absolute inset-0 flex items-end bg-linear-to-t from-background/95 via-background/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
        <h3 className="flex w-full translate-y-2 items-center justify-between gap-4 font-mono text-lg font-bold uppercase text-white transition-transform duration-300 group-hover:translate-y-0 group-focus-visible:translate-y-0 [@media(hover:none)]:translate-y-0 sm:text-xl">
          {name}
          <span aria-hidden="true" className="text-primary">
            ↗
          </span>
        </h3>
      </div>
    </a>
  );
}

function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(PROJECTS_URL, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then(setProjects)
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Falha ao carregar projetos:", error);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section
      id="projetos"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 sm:py-24"
    >
      <p className="font-mono text-sm text-primary">// PROJETOS</p>
      <h2 className="mt-2 text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
        Projetos
      </h2>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;
