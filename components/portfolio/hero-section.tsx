import Image from 'next/image';
import {
  ArrowDown,
  BriefcaseBusiness,
  Code,
  Joystick,
  Play,
} from 'lucide-react';

import { AnimatedName } from '@/components/portfolio/animated-name';
import { projects } from '@/data/projects';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/Hayversong', icon: 'code' },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@haylightzzz',
    icon: 'play',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hayverson-monteiro/',
    icon: 'work',
  },
  {
    name: 'itch.io',
    href: 'https://hayversong.itch.io',
    icon: 'joystick',
  },
];

// Cada foco conta quantos projetos usam as tecnologias da área.
const focusAreas = [
  { label: 'Python', color: 'var(--mp)', technologies: ['Python'] },
  { label: 'Go', color: 'var(--xp)', technologies: ['Go'] },
  {
    label: 'Web',
    color: 'var(--hp)',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML',
      'CSS',
      'Tailwind CSS',
    ],
  },
].map((area) => ({
  ...area,
  count: projects.filter((project) =>
    project.technologies.some((tech) => area.technologies.includes(tech)),
  ).length,
}));

const completedCount = projects.filter(
  (project) => project.status === 'Concluído',
).length;

function plural(count: number, singular: string, pluralForm: string) {
  return `${count} ${count === 1 ? singular : pluralForm}`;
}

function SocialIcon({ name }: { name: string }) {
  if (name === 'code') return <Code aria-hidden="true" />;
  if (name === 'play') return <Play aria-hidden="true" />;
  if (name === 'joystick') return <Joystick aria-hidden="true" />;
  return <BriefcaseBusiness aria-hidden="true" />;
}

function SocialLinks() {
  return (
    <nav aria-label="Links para redes sociais" className="hero-social">
      {socialLinks.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visitar meu perfil no ${name} em uma nova aba`}
          className="pixel-btn"
          data-variant="ghost"
        >
          <SocialIcon name={icon} />
          {name}
        </a>
      ))}
    </nav>
  );
}

function rise(index: number) {
  return { '--i': index } as React.CSSProperties;
}

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="section-shell relative flex min-h-svh items-center justify-center pb-16 pt-28 sm:pb-20 sm:pt-32"
    >
      <div className="hero-sheet pixel-panel">
        <div className="hero-sheet-bar hero-enter" style={rise(0)}>
          <p className="rpg-kicker">Ficha do personagem</p>
          <p className="hero-status">
            <span aria-hidden="true" className="hero-status-dot" />
            Ativo
          </p>
        </div>

        <div className="hero-sheet-body">
          <figure className="hero-portrait hero-enter" style={rise(1)}>
            <div className="hero-portrait-frame">
              <Image
                src="/hayth-profile.webp"
                alt="Retrato de Hayverson"
                width={480}
                height={640}
                priority
                sizes="(max-width: 760px) 224px, 208px"
              />
            </div>
            <figcaption className="hero-companion">
              <span className="hero-companion-avatar">
                <Image
                  src="/charmander-avatar.jpg"
                  alt="Avatar do Charmander usando fones de ouvido"
                  width={400}
                  height={400}
                />
              </span>
              <span>Companheiro</span>
            </figcaption>
          </figure>

          <div className="hero-info">
            <p className="hero-label hero-enter" style={rise(2)}>
              Nome
            </p>
            <div className="hero-enter" style={rise(3)}>
              <AnimatedName className="mt-1 text-4xl min-[400px]:text-5xl sm:text-6xl" />
            </div>

            <dl className="hero-meta hero-enter" style={rise(4)}>
              <div>
                <dt>Classe</dt>
                <dd>Desenvolvedor em formação</dd>
              </div>
              <div>
                <dt>Missões</dt>
                <dd>{projects.length}</dd>
              </div>
              <div>
                <dt>Concluídas</dt>
                <dd>{completedCount}</dd>
              </div>
            </dl>

            <div
              className="hero-dialog pixel-dialog hero-enter"
              style={rise(5)}
            >
              <p>
                Desenvolvedor em formação com foco em Python, Go e
                desenvolvimento web. Transformo cada projeto em uma oportunidade
                de entender melhor backend, interfaces e engenharia de software.
              </p>
            </div>
          </div>
        </div>

        <div className="hero-focus hero-enter" style={rise(6)}>
          <p className="hero-label">Foco · missões por área</p>
          <ul>
            {focusAreas.map(({ label, color, count }, index) => (
              <li key={label} className="hero-focus-row">
                <span className="hero-focus-name">{label}</span>
                <span
                  aria-hidden="true"
                  className="stat-bar"
                  style={
                    {
                      '--value': count / projects.length,
                      '--bar-color': color,
                      '--bar-i': index,
                    } as React.CSSProperties
                  }
                />
                <span className="hero-focus-value">
                  {plural(count, 'missão', 'missões')}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-actions hero-enter" style={rise(7)}>
          <a href="#projetos" className="pixel-btn rpg-cursor hero-start">
            Conhecer projetos
            <ArrowDown aria-hidden="true" />
          </a>
          <SocialLinks />
        </div>

        <div className="hero-sheet-footer hero-enter" style={rise(8)}>
          <span>ID · HAYLIGHT-001</span>
          <span>Acesso · aprendizagem contínua</span>
        </div>
      </div>
    </section>
  );
}
