'use client';

import { useMemo, useState } from 'react';

import { ProjectCard } from '@/components/portfolio/project-card';
import { projects } from '@/data/projects';
import { ScrollReveal } from '@/components/portfolio/scroll-reveal';

const statuses = ['Todos', 'Concluído', 'Em evolução', 'Projeto de estudo'];

export function ProjectList() {
  const [status, setStatus] = useState('Todos');
  const [technology, setTechnology] = useState('Todas');
  const technologies = useMemo(
    () => [...new Set(projects.flatMap((project) => project.technologies))].sort(),
    [],
  );
  const filteredProjects = projects.filter(
    (project) =>
      (status === 'Todos' || project.status === status) &&
      (technology === 'Todas' || project.technologies.includes(technology)),
  );

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <fieldset className="flex flex-wrap gap-2">
          <legend className="mb-2 w-full font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Filtrar por status
          </legend>
          {statuses.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={status === item}
              onClick={() => setStatus(item)}
              className="filter-chip"
            >
              {item}
            </button>
          ))}
        </fieldset>
        <label className="filter-select-label">
          <span>Filtrar por tecnologia</span>
          <select
            value={technology}
            onChange={(event) => setTechnology(event.target.value)}
            className="filter-select"
          >
            <option>Todas</option>
            {technologies.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {filteredProjects.length} projetos encontrados
      </p>
      <ScrollReveal className="grid gap-4" stagger>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
        {filteredProjects.length === 0 ? (
          <p data-reveal-item className="rounded-2xl border border-white/10 p-6 text-sm text-muted-foreground">
            Nenhum projeto corresponde a esses filtros.
          </p>
        ) : null}
      </ScrollReveal>
    </>
  );
}
