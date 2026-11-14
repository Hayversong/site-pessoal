import Image from 'next/image';
import {
  ArrowDown,
  BriefcaseBusiness,
  Code,
  Joystick,
  Play,
} from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedName } from '@/components/portfolio/animated-name';
import { cn } from '@/lib/utils';

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

function SocialIcon({ name }: { name: string }) {
  if (name === 'code') return <Code className="size-4" aria-hidden="true" />;
  if (name === 'play') return <Play className="size-4" aria-hidden="true" />;
  if (name === 'joystick') {
    return <Joystick className="size-4" aria-hidden="true" />;
  }
  return <BriefcaseBusiness className="size-4" aria-hidden="true" />;
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
          aria-label={`Visitar meu perfil no ${name} em uma nova aba`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-10 rounded-full border-border bg-foreground/[0.03] px-4 text-xs uppercase tracking-[0.08em] transition-[transform,color,background-color,border-color] hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary/10 hover:text-primary',
          )}
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
      <Card className="badge-card w-full max-w-4xl gap-0 rounded-[2rem] border border-border bg-card/95 py-0 ring-0">
        <div className="badge-clip" aria-hidden="true">
          <span />
        </div>
        <CardContent className="px-6 py-7 sm:px-9 sm:py-9">
          <div className="badge-header hero-rise" style={rise(0)}>
            <div className="flex items-center gap-3">
              <span className="size-10 overflow-hidden rounded-xl border border-primary/35 bg-primary">
                <Image
                  src="/charmander-avatar.jpg"
                  alt="Avatar do Charmander usando fones de ouvido"
                  width={400}
                  height={400}
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
            <span className="flex items-center gap-2 rounded-full border border-success/25 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-success shadow-[0_0_10px_var(--success)]"
              />
              Ativo
            </span>
          </div>

          <div className="badge-body">
            <div className="badge-photo hero-rise" style={rise(1)}>
              <Image
                src="/hayth-profile.webp"
                alt="Retrato de Hayverson"
                width={480}
                height={640}
                priority
                sizes="(max-width: 760px) 240px, 208px"
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="min-w-0">
              <p
                className="hero-rise font-mono text-sm text-primary"
                style={rise(2)}
              >
                $ desenvolvedor em construção
              </p>
              <div className="hero-rise" style={rise(3)}>
                <AnimatedName className="mt-3 text-4xl font-semibold tracking-[-0.055em] min-[400px]:text-5xl sm:text-6xl" />
              </div>
              <p
                style={rise(4)}
                className="hero-rise mt-5 max-w-xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg"
              >
                Desenvolvedor em formação com foco em Python, Go e
                desenvolvimento web. Transformo cada projeto em uma oportunidade
                de entender melhor backend, interfaces e engenharia de software.
              </p>

              <div className="hero-rise mt-7" style={rise(5)}>
                <a
                  href="#projetos"
                  className={cn(
                    buttonVariants(),
                    'h-10 rounded-full px-5 text-xs uppercase tracking-[0.08em]',
                  )}
                >
                  Conhecer projetos
                  <ArrowDown className="size-4" aria-hidden="true" />
                </a>
              </div>

              <div className="hero-rise mt-4" style={rise(6)}>
                <SocialLinks />
              </div>
            </div>
          </div>

          <div className="badge-footer hero-rise" style={rise(7)}>
            <span>ID · HAYLIGHT-001</span>
            <span>ACESSO · APRENDIZAGEM CONTÍNUA</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
