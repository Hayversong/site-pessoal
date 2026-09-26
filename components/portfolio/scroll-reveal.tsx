'use client';

import { useEffect, useRef } from 'react';

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
      target.classList.add('reveal-pending');
      if (stagger) {
        target.style.setProperty('--reveal-delay', `${Math.min(index * 90, 360)}ms`);
      }
    });

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
