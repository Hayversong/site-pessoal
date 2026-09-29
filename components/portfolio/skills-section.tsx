import { BookOpen, Braces, Container, Database, Server } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { skillGroups, studyTopics } from '@/data/skills';
import { ScrollReveal } from '@/components/portfolio/scroll-reveal';

const groupIcons = {
  'Front-end': Braces,
  'Back-end': Server,
  Dados: Database,
  Ferramentas: Container,
};

export function SkillsSection() {
  return (
    <section id="competencias" aria-label="Aprendizado" className="section-shell py-24 sm:py-32">
      <div className="mb-10 max-w-2xl" data-reveal-item>
        <p className="font-mono text-sm uppercase tracking-[0.18em] text-primary">
          /aprendizado
        </p>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          Competências e estudos
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Tecnologias que já uso nos meus projetos e assuntos que estou
          aprofundando agora.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="gap-0 rounded-3xl border border-white/10 bg-card/65 py-0 ring-0 backdrop-blur-sm">
          <CardContent className="px-6 py-7 sm:px-8 sm:py-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                <BookOpen className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
                  Em andamento
                </p>
                <h3 className="mt-1 text-xl font-semibold">
                  O que estou estudando
                </h3>
              </div>
            </div>

            <ScrollReveal className="mt-7 grid gap-3 sm:grid-cols-2" stagger>
              {studyTopics.map((topic) => (
                <li key={topic.name} data-reveal-item className="study-topic">
                  <h4 className="font-semibold text-foreground">
                    {topic.name}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {topic.description}
                  </p>
                </li>
              ))}
            </ScrollReveal>
          </CardContent>
        </Card>

        <Card className="gap-0 rounded-3xl border border-white/10 bg-card/65 py-0 ring-0 backdrop-blur-sm">
          <CardContent className="px-6 py-7 sm:px-8 sm:py-8">
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-primary">
              Caixa de ferramentas
            </p>
            <h3 className="mt-2 text-xl font-semibold">Competências</h3>

            <ScrollReveal className="mt-7 grid gap-6" stagger>
              {skillGroups.map((group) => {
                const Icon = groupIcons[group.name as keyof typeof groupIcons];

                return (
                  <div key={group.name} data-reveal-item>
                    <h4 className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                      <Icon
                        className="size-4 text-primary"
                        aria-hidden="true"
                      />
                      {group.name}
                    </h4>
                    <ul
                      className="mt-3 flex flex-wrap gap-2"
                      aria-label={group.name}
                    >
                      {group.skills.map((skill) => (
                        <li key={skill} className="skill-tag">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </ScrollReveal>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
