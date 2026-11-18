'use client';

import { useEffect } from 'react';

import { burst, popText, prefersReducedMotion, warp } from '@/lib/retro-fx';

const secretCode = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

// Faíscas nos botões pixel, transição de batalha nos links internos e o
// código secreto que liga o filtro de CRT.
export function RetroEffects() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const target = event.target as Element | null;
      if (!target?.closest('.pixel-btn')) return;
      burst(event.clientX, event.clientY);
    };

    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        prefersReducedMotion()
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      const id = link?.hash.slice(1);
      const section = id ? document.getElementById(id) : null;
      if (!section) return;

      event.preventDefault();
      warp(() => {
        section.scrollIntoView({ behavior: 'instant', block: 'start' });
        history.pushState(null, '', `#${id}`);
        // Leva o foco junto, como o salto padrão da âncora faria.
        if (!section.hasAttribute('tabindex')) {
          section.setAttribute('tabindex', '-1');
        }
        section.focus({ preventScroll: true });
      });
    };

    let position = 0;
    const onKeyDown = (event: KeyboardEvent) => {
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
      position = key === secretCode[position] ? position + 1 : 0;
      if (position === 0 && key === secretCode[0]) position = 1;
      if (position < secretCode.length) return;

      position = 0;
      const root = document.documentElement;
      const enabled = root.classList.toggle('crt');
      popText(
        window.innerWidth / 2,
        window.innerHeight / 2,
        enabled ? 'Modo CRT ligado' : 'Modo CRT desligado',
      );
    };

    document.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.addEventListener('click', onClick);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('click', onClick);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  return null;
}
