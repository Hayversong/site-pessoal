import { ArrowUpRight, Check, Code2 } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';
import type { Project } from '@/data/projects';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Card className="project-card gap-0 overflow-hidden rounded-3xl border border-white/10 bg-card/65 py-0 ring-0 backdrop-blur-sm">
      <div className="project-preview">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 1120px) 100vw, 1120px"
          className="object-cover object-top"
        />
        <div className="project-preview-shade" aria-hidden="true" />
        <span className="project-preview-label">PRÉVIA / 0{index + 1}</span>
      </div>

      <CardContent className="grid gap-8 px-6 py-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:px-8 lg:py-8">
        <div className="flex min-w-0 flex-col">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-primary">
              PROJETO / 0{index + 1}
            </span>

            <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
              {project.status}
            </span>
          </div>

          <h3 className="text-2xl font-semibold tracking-tight">
            {project.title}
          </h3>

          <p className="mt-3 max-w-2xl text-base leading-7 text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-muted-foreground"
              >
                {technology}
              </span>
            ))}
          </div>

          {project.repository ? (
            <a
              href={project.repository}
              target="_blank"
              rel="noreferrer"
              aria-label={`Explorar o código do projeto ${project.title} no GitHub`}
              className="project-repository-link mt-7 w-fit"
            >
              <Code2 className="size-4" aria-hidden="true" />
              Explorar código
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </div>

        <div className="project-evidence">
          <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-primary">
            O que este projeto demonstra
          </p>
          <ul className="mt-4 grid gap-3">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-3 text-sm leading-6 text-foreground/85"
              >
                <span className="mt-1 flex size-4 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-5 border-t border-white/10 pt-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Principal aprendizado
            </p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {project.learning}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
