import { ArrowUpRight, Code2, Joystick } from 'lucide-react';

import { getProjectNumber, type Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
};

const statusTone: Record<string, string> = {
  Concluído: 'done',
  'Em evolução': 'progress',
  'Projeto de estudo': 'study',
};

export function ProjectCard({ project }: ProjectCardProps) {
  const number = getProjectNumber(project);
  const titleId = `missao-${project.id}`;
  const kind = project.itchUrl ? 'Jogo' : 'Web/API';

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

            {project.repository || project.itchUrl ? (
              <div className="mt-7 flex flex-wrap gap-4 pb-1">
                {project.repository ? (
                  <a
                    href={project.repository}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Explorar o código do projeto ${project.title} no GitHub`}
                    className="pixel-btn"
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
                    data-variant={project.repository ? 'ghost' : undefined}
                  >
                    <Joystick aria-hidden="true" />
                    Jogar no itch.io
                    <ArrowUpRight aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>

          <div className="quest-log">
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
        </div>
      </div>
    </article>
  );
}
