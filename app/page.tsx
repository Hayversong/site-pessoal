import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code,
  Play,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/', icon: 'code' },
  { name: 'YouTube', href: 'https://www.youtube.com/', icon: 'play' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'work' },
];

const projects = [
  {
    title: 'Portfólio pessoal',
    description:
      'Meu espaço para praticar desenvolvimento web, organizar projetos e registrar minha evolução em programação.',
    status: 'Em desenvolvimento',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name === 'code') return <Code className="size-4" aria-hidden="true" />;
  if (name === 'play') return <Play className="size-4" aria-hidden="true" />;
  return <BriefcaseBusiness className="size-4" aria-hidden="true" />;
}

function FloatingNavigation() {
  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-4">
      <nav
        aria-label="Navegação principal"
        className="flex items-center gap-1 rounded-full border border-white/10 bg-background/80 p-1.5 shadow-xl shadow-black/25 backdrop-blur-xl"
      >
        <a className="nav-link" href="#inicio">
          <span aria-hidden="true">•</span> Início
        </a>
        <a className="nav-link" href="#projetos">
          Projetos
        </a>
      </nav>
    </header>
  );
}

function SocialLinks() {
  return (
    <nav aria-label="Links para redes sociais" className="flex flex-wrap gap-2.5">
      {socialLinks.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visitar meu perfil no ${name}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 rounded-full border-white/10 bg-white/[0.03] px-4 text-xs uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary',
          )}
        >
          <SocialIcon name={icon} />
          {name}
        </a>
      ))}
    </nav>
  );
}

function HeroSection() {
  return (
    <section
      id="inicio"
      className="section-shell grid min-h-screen items-center gap-12 pb-16 pt-32 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"
    >
      <div className="hero-copy">
        <p className="mb-4 font-mono text-sm text-primary">
          $ desenvolvedor em construção · curioso por tecnologia
        </p>
        <h1 className="text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-7xl lg:text-8xl">
          Hayth<span className="text-primary">_</span>
        </h1>
        <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
          Estou transformando curiosidade em código. Este é o meu espaço para
          compartilhar projetos, registrar aprendizados e construir coisas novas.
        </p>

        <div className="mt-8">
          <SocialLinks />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[390px] lg:mr-0">
        <div className="photo-frame">
          <img
            src="/hayth-profile.jpeg"
            alt="Retrato de Hayth"
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-card/75 px-4 py-2.5 font-mono text-xs text-muted-foreground backdrop-blur">
          <span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" />
          aprendendo e criando um passo de cada vez
        </div>
      </div>

      <a
        href="#projetos"
        aria-label="Ir para a seção de projetos"
        className="scroll-cue hidden lg:flex"
      >
        <ArrowDown className="size-4" aria-hidden="true" />
      </a>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projetos" className="section-shell py-24 sm:py-32">
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-primary">
            /projetos
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            O que estou construindo
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-muted-foreground sm:text-right">
          Esta seção cresce junto comigo. Cada novo projeto poderá ser adicionado ao
          mesmo array de dados.
        </p>
      </div>

      <div className="grid gap-4">
        {projects.map((project, index) => (
          <Card
            key={project.title}
            className="project-card gap-0 rounded-3xl border border-white/10 bg-card/65 py-0 ring-0 backdrop-blur-sm"
          >
            <CardContent className="grid gap-6 px-6 py-7 sm:grid-cols-[1fr_auto] sm:px-8 sm:py-8">
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-xs text-primary">
                    0{index + 1}
                  </span>
                  <span className="rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight">{project.title}</h3>
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
              <div className="flex items-start justify-end text-muted-foreground">
                <ArrowUpRight className="size-5" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="fixed inset-0 -z-20 bg-grid" />
      <div aria-hidden="true" className="glow glow-one" />
      <div aria-hidden="true" className="glow glow-two" />

      <FloatingNavigation />
      <HeroSection />
      <ProjectsSection />

      <footer className="section-shell border-t border-white/10 py-8 text-center font-mono text-xs text-muted-foreground">
        feito com curiosidade, café e algumas tentativas
      </footer>
    </main>
  );
}
