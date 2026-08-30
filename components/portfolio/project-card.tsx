import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Card className="project-card gap-0 rounded-3xl border border-white/10 bg-card/65 py-0 ring-0 backdrop-blur-sm">
      <CardContent className="grid gap-6 px-6 py-7 sm:grid-cols-[1fr_auto] sm:px-8 sm:py-8">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-primary">0{index + 1}</span>

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
        </div>

        {project.repository ? (
          <a
            href={project.repository}
            target="_blank"
            rel="noreferrer"
            aria-label={`Abrir repositório do projeto ${project.title}`}
            className="flex size-10 items-center justify-center rounded-full border border-white/10 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
          >
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </a>
        ) : null}
      </CardContent>
    </Card>
  );
}
