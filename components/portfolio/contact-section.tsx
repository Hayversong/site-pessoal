import { ArrowRight } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { ScrollReveal } from '@/components/portfolio/scroll-reveal';
import { CopyEmailButton } from '@/components/portfolio/copy-email-button';
import { cn } from '@/lib/utils';

export function ContactSection() {
  return (
    <section id="contato" className="section-shell pb-24 pt-8 sm:pb-32">
      <ScrollReveal>
        <div className="contact-panel">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.18em] text-primary">
              /contato
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Estou construindo minha trajetória um projeto de cada vez.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              Quer conversar sobre programação, trocar feedback ou acompanhar
              minha evolução? Me encontre no LinkedIn ou explore meus
              repositórios.
            </p>
            <div className="mt-5">
              <CopyEmailButton email="hayverson.monteiro@gmail.com" />
            </div>
          </div>

          <a
            href="https://www.linkedin.com/in/hayverson-monteiro/"
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants(),
              'h-11 shrink-0 rounded-full px-6 text-xs uppercase tracking-[0.08em]',
            )}
          >
            Vamos conversar
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}
