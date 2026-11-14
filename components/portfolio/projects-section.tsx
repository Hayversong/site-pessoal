import { ProjectList } from '@/components/portfolio/project-list';
import { ScrollReveal } from '@/components/portfolio/scroll-reveal';

export function ProjectsSection() {
  return (
    <section id="projetos" className="section-shell py-24 sm:py-32">
      <ScrollReveal
        className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
        stagger
      >
        <div data-reveal-item>
          <p className="rpg-kicker">Registro de missões</p>
          <h2 className="rpg-title mt-3 text-4xl sm:text-5xl">
            Missões em andamento e concluídas
          </h2>
        </div>
        <p
          data-reveal-item
          className="max-w-md text-sm leading-6 text-muted-foreground sm:text-right"
        >
          Projetos executados localmente e documentados no GitHub. Aqui, o foco
          está no processo, nas decisões técnicas e no que aprendi construindo.
        </p>
      </ScrollReveal>

      <ProjectList />
    </section>
  );
}
