import { ArrowUpRight, Code2, Joystick, Play } from 'lucide-react';

import type { Project } from '@/data/projects';

type ProjectLinksProps = {
  project: Project;
  className?: string;
};

// Demo, código e itch.io. O primeiro link disponível é o principal; os outros ficam como secundários.
export function ProjectLinks({ project, className }: ProjectLinksProps) {
  if (!project.demoUrl && !project.repository && !project.itchUrl) return null;

  return (
    <div className={className}>
      {project.demoUrl ? (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Abrir a demo do projeto ${project.title}`}
          className="pixel-btn"
        >
          <Play aria-hidden="true" />
          Ver demo
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}

      {project.repository ? (
        <a
          href={project.repository}
          target="_blank"
          rel="noreferrer"
          aria-label={`Explorar o código do projeto ${project.title} no GitHub`}
          className="pixel-btn"
          data-variant={project.demoUrl ? 'ghost' : undefined}
        >
          <Code2 aria-hidden="true" />
          Explorar código
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}

      {project.itchUrl ? (
        <a
          href={project.itchUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`Jogar ${project.title} no itch.io`}
          className="pixel-btn"
          data-variant={
            project.demoUrl || project.repository ? 'ghost' : undefined
          }
        >
          <Joystick aria-hidden="true" />
          Jogar no itch.io
          <ArrowUpRight aria-hidden="true" />
        </a>
      ) : null}
    </div>
  );
}
