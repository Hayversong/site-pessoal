import { ArrowUpRight, BriefcaseBusiness, Code, Play } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/',
    icon: 'code',
    className: 'hover:border-[#f4c95d]/70 hover:bg-[#f4c95d]/10',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/',
    icon: 'play',
    className: 'hover:border-[#ff6b6b]/70 hover:bg-[#ff6b6b]/10',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/',
    icon: 'work',
    className: 'hover:border-[#69b7ff]/70 hover:bg-[#69b7ff]/10',
  },
];

function SocialIcon({ name }: { name: string }) {
  if (name === 'code') return <Code className="size-4" aria-hidden="true" />;
  if (name === 'play') return <Play className="size-4" aria-hidden="true" />;
  return <BriefcaseBusiness className="size-4" aria-hidden="true" />;
}

export default function Home() {
  return (
    <main className="relative isolate flex min-h-screen items-center justify-center overflow-hidden px-5 py-12 sm:px-8">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid" />
      <div aria-hidden="true" className="glow glow-one" />
      <div aria-hidden="true" className="glow glow-two" />

      <Card className="profile-card w-full max-w-2xl gap-0 rounded-[2rem] border border-white/10 bg-card/85 py-0 shadow-2xl shadow-black/35 ring-0 backdrop-blur-xl">
        <CardContent className="px-6 py-8 sm:px-10 sm:py-10">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20">
                H
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Portfólio pessoal
                </p>
                <p className="mt-1 text-sm text-foreground/80">Em constante evolução</p>
              </div>
            </div>
            <span className="flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/10 px-3 py-1.5 text-xs text-emerald-200">
              <span className="size-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_#6ee7b7]" />
              Aprendendo
            </span>
          </div>

          <div className="max-w-xl">
            <p className="mb-3 font-mono text-sm text-primary">Olá, mundo! Eu sou</p>
            <h1 className="text-balance text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-6xl">
              Hayth.
            </h1>
            <p className="mt-5 max-w-lg text-pretty text-base leading-7 text-muted-foreground sm:text-lg">
              Estou transformando curiosidade em código. Este é o meu espaço para
              compartilhar projetos, registrar aprendizados e construir coisas novas.
            </p>
          </div>

          <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <nav aria-label="Links para redes sociais" className="grid gap-3 sm:grid-cols-3">
            {socialLinks.map(({ name, href, icon, className }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visitar meu perfil no ${name}`}
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'h-12 justify-between rounded-xl border-white/10 bg-white/[0.03] px-4 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground focus-visible:ring-primary/50',
                  className,
                )}
              >
                <span className="flex items-center gap-2.5">
                  <SocialIcon name={icon} />
                  {name}
                </span>
                <ArrowUpRight className="size-3.5 opacity-45 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" aria-hidden="true" />
              </a>
            ))}
          </nav>

          <p className="mt-7 text-center font-mono text-[11px] tracking-wide text-muted-foreground/65">
            feito com curiosidade, café e algumas tentativas
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
