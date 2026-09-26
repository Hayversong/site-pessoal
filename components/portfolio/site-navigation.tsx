'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/portfolio/theme-toggle';
import { ScrollProgress } from '@/components/portfolio/scroll-progress';

const sections = [
  { id: 'inicio', label: 'Início' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'competencias', label: 'Aprendizado' },
  { id: 'contato', label: 'Contato' },
];

export function SiteNavigation() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [showBackToTop, setShowBackToTop] = useState(false);

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
          aria-label="Navegação principal"
          className="flex items-center gap-0.5 rounded-full border border-white/10 bg-background/90 p-1 shadow-xl shadow-black/25 backdrop-blur-xl sm:gap-1 sm:p-1.5"
        >
          {sections.map(({ id, label }) => (
            <a
              key={id}
              className="nav-link"
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
