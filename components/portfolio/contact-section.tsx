'use client';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { ScrollReveal } from '@/components/portfolio/scroll-reveal';
import { CopyEmailButton } from '@/components/portfolio/copy-email-button';

const title = 'Estou construindo minha trajetória um projeto de cada vez.';
const message =
  'Quer conversar sobre programação, trocar feedback ou acompanhar minha evolução? Me encontre no LinkedIn ou explore meus repositórios.';
const totalChars = title.length + message.length;
const msPerChar = 22;

// "static": texto inteiro (sem JS ou com movimento reduzido); "waiting": aguardando a seção aparecer.
type TypingState = 'static' | 'waiting' | 'typing' | 'done';

function useDialogTyping() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TypingState>('static');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (
      !root ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      return;
    }

    let frame = 0;
    setState('waiting');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        setState('typing');
        const start = performance.now();

        const tick = (now: number) => {
          const next = Math.min(
            totalChars,
            Math.floor((now - start) / msPerChar),
          );
          setCount(next);
          if (next < totalChars) {
            frame = requestAnimationFrame(tick);
          } else {
            setState('done');
          }
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(root);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const animating = state === 'waiting' || state === 'typing';

  return {
    ref,
    state,
    animating,
    typedTitle: title.slice(0, count),
    typedMessage:
      count > title.length ? message.slice(0, count - title.length) : '',
  };
}

export function ContactSection() {
  const { ref, state, animating, typedTitle, typedMessage } = useDialogTyping();

  return (
    <section
      id="contato"
      aria-labelledby="contato-titulo"
      className="section-shell pb-24 pt-8 sm:pb-32"
    >
      <ScrollReveal>
        <p className="rpg-kicker mb-4">
          <span aria-hidden="true">▶</span> Contato
        </p>
        <div ref={ref} className="pixel-dialog npc-dialog" data-state={state}>
          <div className="npc-speaker">
            <span className="npc-portrait">
              <Image
                src="/charmander-avatar.jpg"
                alt="Avatar do Charmander usando fones de ouvido"
                width={400}
                height={400}
                sizes="80px"
              />
            </span>
            <p className="npc-name">Hayverson</p>
          </div>

          <div className="npc-body">
            <h2 id="contato-titulo" className="npc-line rpg-title npc-title">
              <span className="npc-line-full">{title}</span>
              {animating ? (
                <span className="npc-line-typed" aria-hidden="true">
                  {typedTitle}
                </span>
              ) : null}
            </h2>
            <p className="npc-line npc-message">
              <span className="npc-line-full">{message}</span>
              {animating ? (
                <span className="npc-line-typed" aria-hidden="true">
                  {typedMessage}
                </span>
              ) : null}
            </p>

            <ul className="npc-choices" aria-label="Formas de contato">
              <li>
                <a
                  href="https://www.linkedin.com/in/hayverson-monteiro/"
                  target="_blank"
                  rel="noreferrer"
                  className="pixel-btn rpg-cursor"
                >
                  Vamos conversar
                  <ArrowRight aria-hidden="true" />
                </a>
              </li>
              <li>
                <CopyEmailButton email="hayverson.monteiro@gmail.com" />
              </li>
            </ul>
          </div>

          <span className="npc-next" aria-hidden="true">
            ▼
          </span>
        </div>
      </ScrollReveal>
    </section>
  );
}
