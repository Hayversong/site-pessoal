import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code,
  Play,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedName } from "@/components/portfolio/animated-name";
import { cn } from "@/lib/utils";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Hayversong", icon: "code" },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@haylightzzz",
    icon: "play",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/hayverson-monteiro/",
    icon: "work",
  },
];

const projects = [
  {
    title: "Portfólio pessoal",
    description:
      "Meu espaço para praticar desenvolvimento web, organizar projetos e registrar minha evolução em programação.",
    status: "Em desenvolvimento",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    title: "QuestBoard",
    description:
      "Kanban gamificado para acompanhar o desenvolvimento de jogos, construido do zero com Go.",
    status: "Finalizado.",
    repository: "https://github.com/Hayversong/questboard",
    technologies: ["HTML", "CSS", "go", "docker"],
  },
  {
    title: "To-Do App — Meu primeiro projeto web com Go",
    description:
      "Uma aplicação web simples de lista de tarefas desenvolvida em Go durante meus estudos da linguagem.",
    status: "Finalizado.",
    repository: "https://github.com/Hayversong/todo-app-go",
    technologies: ["HTML", "CSS", "go"],
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name === "code") return <Code className="size-4" aria-hidden="true" />;
  if (name === "play") return <Play className="size-4" aria-hidden="true" />;
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
    <nav
      aria-label="Links para redes sociais"
      className="flex flex-wrap gap-2.5"
    >
      {socialLinks.map(({ name, href, icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Visitar meu perfil no ${name}`}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 rounded-full border-white/10 bg-white/[0.03] px-4 text-xs uppercase tracking-[0.08em] transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary",
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
      className="section-shell relative flex min-h-screen items-center justify-center pb-20 pt-32"
    >
      <Card className="badge-card w-full max-w-4xl gap-0 rounded-[2rem] border border-white/10 bg-card/85 py-0 ring-0 backdrop-blur-xl">
        <div className="badge-clip" aria-hidden="true">
          <span />
        </div>
        <CardContent className="px-6 py-7 sm:px-9 sm:py-9">
          <div className="badge-header">
            <div className="flex items-center gap-3">
              <span className="size-10 overflow-hidden rounded-xl border border-primary/35 bg-primary">
                <img
                  src="/charmander-avatar.jpg"
                  alt="Avatar do Charmander usando fones de ouvido"
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  identificação pessoal
                </p>
                <p className="mt-1 text-sm font-medium">
                  Portfólio em evolução
                </p>
              </div>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" />
              Ativo
            </span>
          </div>

          <div className="badge-body">
            <div className="badge-photo">
              <img
                src="/hayth-profile.jpeg"
                alt="Retrato de Hayverson"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="min-w-0">
              <p className="font-mono text-sm text-primary">
                $ desenvolvedor em construção
              </p>
              <h1 className="mt-3 text-5xl font-semibold tracking-[-0.055em] sm:text-6xl">
                <AnimatedName />
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
                Estou transformando curiosidade em código. Este é o meu espaço
                para compartilhar projetos, registrar aprendizados e construir
                coisas novas.
              </p>

              <div className="mt-7">
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className="badge-footer">
            <span>ID · HAYLIGHT-001</span>
            <span>ACESSO · APRENDIZAGEM CONTÍNUA</span>
          </div>
        </CardContent>
      </Card>

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
          Esta seção cresce junto comigo.
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
