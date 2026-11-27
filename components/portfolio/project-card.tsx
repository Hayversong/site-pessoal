import { ScrollText } from 'lucide-react';

import { ProjectLinks } from '@/components/portfolio/project-links';
import {
  getProjectKind,
  getProjectNumber,
  statusTone,
  type Project,
} from '@/data/projects';

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const number = getProjectNumber(project);
  const titleId = `missao-${project.id}`;
  const kind = getProjectKind(project);

  return (
    <article
      data-reveal-item
      aria-labelledby={titleId}
      style={{ viewTransitionName: `project-${project.id}` }}
      className="quest"
    >
      <div className="quest-card pixel-panel">
        <header className="quest-header">
          <p className="quest-number">
            <span className="quest-pointer" aria-hidden="true">
              ▶
            </span>
            Missão {number}
            <span className="quest-kind">{kind}</span>
          </p>
          <p
            className="quest-status"
            data-tone={statusTone[project.status] ?? 'study'}
          >
            <span className="quest-status-mark" aria-hidden="true" />
            <span className="sr-only">Status: </span>
            {project.status}
          </p>
        </header>

        <div className="quest-body">
          <div className="flex min-w-0 flex-col">
            <h3 id={titleId} className="rpg-title text-2xl sm:text-[1.7rem]">
              {project.title}
            </h3>

            <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-6">
              <p className="quest-label">Itens</p>
              <ul className="quest-items" aria-label="Tecnologias">
                {project.technologies.map((technology) => (
                  <li key={technology} className="quest-item">
                    {technology}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 flex flex-wrap gap-4 pb-1">
              <ProjectLinks project={project} className="contents" />
              <a
                href={`/missoes/${project.id}`}
                aria-label={`Ler o diário da missão ${project.title}`}
                className="pixel-btn"
                data-variant="ghost"
              >
                <ScrollText aria-hidden="true" />
                Diário da missão
              </a>
            </div>
          </div>

          <details className="quest-log">
            <summary className="quest-log-toggle">
              <span>Objetivos e recompensa</span>
              <span className="quest-log-arrow" aria-hidden="true">
                ▼
              </span>
            </summary>
            <div className="quest-log-content">
              <h4 className="quest-label" data-mark="primary">
                Objetivos
              </h4>
              <p className="mt-1 text-xs text-muted-foreground">
                O que este projeto demonstra
              </p>
              <ul className="mt-4 grid gap-3">
                {project.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex gap-3 text-sm leading-6 text-foreground/90"
                  >
                    <span className="quest-check" aria-hidden="true">
                      ✓
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="quest-reward">
                <h4 className="quest-label" data-mark="xp">
                  Recompensa
                </h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Principal aprendizado
                </p>
                <p className="mt-2 text-sm leading-6 text-foreground/85">
                  {project.learning}
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </article>
  );
}
