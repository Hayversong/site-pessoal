import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { MissionHeader } from '@/components/mission/mission-header';
import { MissionMedia } from '@/components/mission/mission-media';
import { ProjectLinks } from '@/components/portfolio/project-links';
import { RetroEffects } from '@/components/portfolio/retro-effects';
import { getCaseStudy } from '@/data/case-studies';
import {
  getProjectKind,
  getProjectNumber,
  projects,
  statusTone,
} from '@/data/projects';

type MissionPageProps = {
  params: Promise<{ id: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: MissionPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) return {};

  const title = `${project.title} | Diário da missão | Hayverson Monteiro`;
  return {
    title,
    description: project.description,
    alternates: { canonical: `/missoes/${project.id}` },
    openGraph: {
      title,
      description: project.description,
      url: `/missoes/${project.id}`,
      images: [{ url: '/og.png', width: 1200, height: 630 }],
      locale: 'pt_BR',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.description,
      images: ['/og.png'],
    },
  };
}

export default async function MissionPage({ params }: MissionPageProps) {
  const { id } = await params;
  const index = projects.findIndex((item) => item.id === id);
  const project = projects[index];
  const study = project ? getCaseStudy(project.id) : undefined;
  if (!project || !study) notFound();

  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const number = getProjectNumber(project);

  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 -z-20 bg-dither" />
      <div aria-hidden="true" className="glow glow-one" />

      <RetroEffects />
      <MissionHeader />

      <article
        className="section-shell mission"
        aria-labelledby="mission-title"
        style={{ viewTransitionName: `project-${project.id}` }}
      >
        <header className="mission-hero">
          <p className="rpg-kicker">
            Diário da missão {number} · {getProjectKind(project)}
          </p>
          <h1 id="mission-title" className="rpg-title mission-title">
            {project.title}
          </h1>
          <p className="mission-lead">{project.description}</p>
          <ProjectLinks project={project} className="mission-actions" />
        </header>

        <div className="mission-layout">
          <aside className="mission-sheet pixel-panel" aria-label="Ficha">
            <dl>
              <div>
                <dt className="quest-label">Status</dt>
                <dd>
                  <span
                    className="quest-status"
                    data-tone={statusTone[project.status] ?? 'study'}
                  >
                    <span className="quest-status-mark" aria-hidden="true" />
                    {project.status}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="quest-label">Itens</dt>
                <dd>
                  <ul className="quest-items" aria-label="Tecnologias">
                    {project.technologies.map((technology) => (
                      <li key={technology} className="quest-item">
                        {technology}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="quest-label" data-mark="xp">
                  Recompensa
                </dt>
                <dd className="mission-reward">{project.learning}</dd>
              </div>
            </dl>
          </aside>

          <div className="mission-content">
            <section aria-labelledby="briefing">
              <h2 id="briefing" className="mission-heading">
                Briefing
              </h2>
              {study.briefing.map((paragraph) => (
                <p key={paragraph} className="mission-text">
                  {paragraph}
                </p>
              ))}
            </section>

            {study.media?.length ? (
              <section aria-labelledby="registro-visual">
                <h2 id="registro-visual" className="mission-heading">
                  Registro visual
                </h2>
                <div className="mission-gallery">
                  {study.media.map((media) => (
                    <MissionMedia key={media.src} media={media} />
                  ))}
                </div>
              </section>
            ) : null}

            <section aria-labelledby="objetivos">
              <h2 id="objetivos" className="mission-heading">
                Objetivos concluídos
              </h2>
              <ul className="mission-checklist">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <span className="quest-check" aria-hidden="true">
                      ✓
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </section>

            {study.decisions.length ? (
              <section aria-labelledby="estrategia">
                <h2 id="estrategia" className="mission-heading">
                  Estratégia
                </h2>
                <p className="mission-hint">As decisões técnicas e o porquê.</p>
                <ol className="mission-notes">
                  {study.decisions.map((note) => (
                    <li key={note.title} className="mission-note pixel-panel">
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}

            {study.obstacles?.length ? (
              <section aria-labelledby="armadilhas">
                <h2 id="armadilhas" className="mission-heading">
                  Armadilhas
                </h2>
                <p className="mission-hint">O que deu trabalho no caminho.</p>
                <ul className="mission-notes" data-tone="trap">
                  {study.obstacles.map((note) => (
                    <li key={note.title} className="mission-note pixel-panel">
                      <h3>{note.title}</h3>
                      <p>{note.text}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {study.next?.length ? (
              <section aria-labelledby="proximas-fases">
                <h2 id="proximas-fases" className="mission-heading">
                  Próximas fases
                </h2>
                <ul className="mission-checklist" data-tone="todo">
                  {study.next.map((item) => (
                    <li key={item}>
                      <span className="quest-check" aria-hidden="true">
                        ☐
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </div>

        <nav className="mission-pager" aria-label="Outras missões">
          <a
            href={`/missoes/${previous.id}`}
            className="mission-pager-link pixel-panel"
            rel="prev"
          >
            <span className="mission-pager-label">◀ Missão anterior</span>
            {previous.title}
          </a>
          <a
            href={`/missoes/${next.id}`}
            className="mission-pager-link pixel-panel"
            data-side="next"
            rel="next"
          >
            <span className="mission-pager-label">Próxima missão ▶</span>
            {next.title}
          </a>
        </nav>
      </article>

      <footer className="section-shell border-t-[3px] border-dashed border-border py-8 text-center font-hud text-xs uppercase tracking-[0.06em] text-muted-foreground">
        feito com curiosidade, café e algumas tentativas
      </footer>
    </main>
  );
}
