'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'motion';

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
};

/** Starts reveal styles only after JS is ready, leaving content visible on failure. */
export function ScrollReveal({
  children,
  className,
  stagger = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const targets = Array.from(
      root.querySelectorAll<HTMLElement>('[data-reveal-item]'),
    );
    if (targets.length === 0) targets.push(root);

    targets.forEach((target, index) => {
      if (stagger) {
        target.style.setProperty('--reveal-delay', `${Math.min(index * 90, 360)}ms`);
      }
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => {
        animate(target, { opacity: [0, 1], y: [18, 0] }, { duration: 0.55 });
      });
      return;
    }

    const animations = new Map<Element, ReturnType<typeof animate>>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = targets.indexOf(entry.target as HTMLElement);
            animations.set(
              entry.target,
              animate(
                entry.target,
                { opacity: [0, 1], y: [18, 0] },
                {
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: stagger ? Math.min(index * 0.09, 0.36) : 0,
                },
              ),
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.stop());
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
