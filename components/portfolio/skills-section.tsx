import type { CSSProperties } from 'react';
import { Braces, Container, Database, Server } from 'lucide-react';

import {
  countProjectsUsing,
  skillGroups,
  studyTopics,
  totalProjects,
} from '@/data/skills';
import { ScrollReveal } from '@/components/portfolio/scroll-reveal';

const groupIcons = {
  'Front-end': Braces,
  'Back-end': Server,
  Dados: Database,
  Ferramentas: Container,
};

function usageLabel(count: number) {
  return count === 1 ? 'usada em 1 projeto' : `usada em ${count} projetos`;
}

export function SkillsSection() {
  return (
    <section
      id="competencias"
      aria-labelledby="competencias-titulo"
      className="section-shell py-24 sm:py-32"
    >
      <ScrollReveal className="mb-10 max-w-2xl">
        <p className="rpg-kicker">
          <span aria-hidden="true">▶</span> Inventário
        </p>
        <h2
          id="competencias-titulo"
          className="rpg-title mt-3 text-4xl sm:text-5xl"
        >
          Competências e estudos
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Tecnologias que já uso nos meus projetos e assuntos que estou
          aprofundando agora.
        </p>
      </ScrollReveal>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="pixel-panel skills-window">
          <header className="skills-window-header">
            <p className="font-hud text-[0.7rem] uppercase tracking-[0.08em] text-primary">
              Itens equipados
            </p>
            <h3 className="rpg-title mt-2 text-2xl">Competências</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              A barra mostra em quantos dos {totalProjects} projetos da vitrine
              cada tecnologia aparece.
            </p>
          </header>

          <div className="skills-groups">
            {skillGroups.map((group) => {
              const Icon = groupIcons[group.name as keyof typeof groupIcons];
              const headingId = `grupo-${group.name.toLowerCase().replaceAll(/[^a-z]/g, '')}`;

              return (
                <section
                  key={group.name}
                  className="skills-group"
                  aria-labelledby={headingId}
                >
                  <h4 id={headingId} className="skills-tab">
                    {Icon ? <Icon aria-hidden="true" /> : null}
                    {group.name}
                  </h4>
                  <ScrollReveal as="ul" className="skills-slots" stagger>
                    {group.skills.map((skill) => {
                      const count = countProjectsUsing(skill);

                      return (
                        <li key={skill} data-reveal-item>
                          <div className="skill-slot rpg-cursor">
                            <span className="skill-slot-name">{skill}</span>
                            {count > 0 ? (
                              <>
                                <span className="skill-slot-meta">
                                  {usageLabel(count)}
                                </span>
                                <span
                                  className="stat-bar skill-slot-bar"
                                  aria-hidden="true"
                                  style={
                                    {
                                      '--value': count / totalProjects,
                                    } as CSSProperties
                                  }
                                />
                              </>
                            ) : (
                              <span className="skill-slot-meta" data-empty="">
                                sem projeto na vitrine
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ScrollReveal>
                </section>
              );
            })}
          </div>
        </div>

        <div className="pixel-panel skills-window">
          <header className="skills-window-header">
            <p className="font-hud text-[0.7rem] uppercase tracking-[0.08em] text-primary">
              Grimório de estudos
            </p>
            <h3 className="rpg-title mt-2 text-2xl">Missões em andamento</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              O que estou estudando agora.
            </p>
          </header>

          <ScrollReveal as="ul" className="quest-list" stagger>
            {studyTopics.map((topic) => (
              <li key={topic.name} data-reveal-item>
                <div className="quest-item">
                  <span className="quest-marker" aria-hidden="true">
                    !
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <h4 className="rpg-title text-lg">{topic.name}</h4>
                      <span className="quest-status">Em andamento</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
