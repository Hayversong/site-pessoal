'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ThemeToggle } from '@/components/portfolio/theme-toggle';
import { ScrollProgress } from '@/components/portfolio/scroll-progress';

const sections = [
  { id: 'inicio', label: 'Início', optional: true },
  { id: 'projetos', label: 'Projetos' },
  { id: 'competencias', label: 'Aprendizado' },
  { id: 'contato', label: 'Contato' },
];

export function SiteNavigation() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const indicator = indicatorRef.current;
    if (!nav || !indicator) return;

    const moveIndicator = () => {
      const link = nav.querySelector<HTMLElement>('[aria-current="location"]');
      if (!link || link.offsetWidth === 0) {
        indicator.dataset.ready = 'false';
        return;
      }
      indicator.style.setProperty('--indicator-x', `${link.offsetLeft}px`);
      indicator.style.setProperty('--indicator-top', `${link.offsetTop}px`);
      indicator.style.setProperty('--indicator-width', `${link.offsetWidth}px`);
      indicator.style.setProperty(
        '--indicator-height',
        `${link.offsetHeight}px`,
      );
      indicator.dataset.ready = 'true';
    };

    moveIndicator();
    window.addEventListener('resize', moveIndicator);
    return () => window.removeEventListener('resize', moveIndicator);
  }, [activeSection]);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] },
    );

    elements.forEach((element) => observer.observe(element));
    const updateScroll = () => setShowBackToTop(window.scrollY > 500);
    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);

  return (
    <>
      <ScrollProgress />
      <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-2 sm:px-4">
        <nav
          ref={navRef}
          aria-label="Navegação principal"
          className="relative flex max-w-full items-center gap-0.5 rounded-full border border-border bg-background/90 p-1 shadow-xl shadow-[var(--shadow-soft)] backdrop-blur-md sm:gap-1 sm:p-1.5"
        >
          <span
            ref={indicatorRef}
            className="nav-indicator"
            aria-hidden="true"
          />
          {sections.map(({ id, label, optional }) => (
            <a
              key={id}
              className={optional ? 'nav-link nav-link-optional' : 'nav-link'}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
            >
              {label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
      </header>
      <a
        href="#inicio"
        className={`back-to-top ${showBackToTop ? 'back-to-top-visible' : ''}`}
        aria-label="Voltar ao topo"
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </a>
    </>
  );
}
