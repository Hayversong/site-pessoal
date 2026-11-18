'use client';

import { useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

import { ProjectCard } from '@/components/portfolio/project-card';
import { projects } from '@/data/projects';
import { ScrollReveal } from '@/components/portfolio/scroll-reveal';
import { withViewTransition } from '@/lib/view-transition';

const statusOrder = ['No ar', 'Concluído', 'Em evolução', 'Projeto de estudo'];
const statuses = [
  'Todos',
  ...statusOrder.filter((item) =>
    projects.some((project) => project.status === item),
  ),
];

export function ProjectList() {
  const [status, setStatus] = useState('Todos');
  const [technology, setTechnology] = useState('Todas');
  const technologies = useMemo(
    () =>
      [...new Set(projects.flatMap((project) => project.technologies))].sort(),
    [],
  );
  function updateFilter(update: () => void) {
    withViewTransition(() => flushSync(update));
  }

  const filteredProjects = projects.filter(
    (project) =>
      (status === 'Todos' || project.status === status) &&
      (technology === 'Todas' || project.technologies.includes(technology)),
  );

  return (
    <>
      <div className="quest-filters pixel-dialog mb-8">
        <fieldset className="min-w-0">
          <legend className="quest-filters-label">Filtrar por status</legend>
          <div className="quest-filter-group">
            {statuses.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={status === item}
                onClick={() => updateFilter(() => setStatus(item))}
                className="quest-filter rpg-cursor"
              >
                {item}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="quest-select-label">
          <span className="quest-filters-label">Filtrar por tecnologia</span>
          <span className="quest-select-wrap">
            <select
              value={technology}
              onChange={(event) => {
                const value = event.target.value;
                updateFilter(() => setTechnology(value));
              }}
              className="quest-select"
            >
              <option>Todas</option>
              {technologies.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </span>
        </label>
      </div>
      <p className="sr-only" aria-live="polite">
        {filteredProjects.length} projetos encontrados
      </p>
      <ScrollReveal className="grid gap-6" stagger>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filteredProjects.length === 0 ? (
          <p
            data-reveal-item
            className="pixel-dialog p-6 text-sm text-muted-foreground"
          >
            Nenhum projeto corresponde a esses filtros.
          </p>
        ) : null}
      </ScrollReveal>
    </>
  );
}
