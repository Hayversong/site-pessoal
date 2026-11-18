'use client';

import { Moon, Sun } from 'lucide-react';

import { withViewTransition } from '@/lib/view-transition';

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains('dark')
      ? 'light'
      : 'dark';
    withViewTransition(() => {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(nextTheme);
    }, 'theme');
    try {
      window.localStorage.setItem('hayversong-theme', nextTheme);
    } catch {
      // Sem localStorage o tema ainda muda, só não fica salvo.
    }
  }

  return (
    <button
      type="button"
      className="pixel-btn pause-theme"
      data-variant="ghost"
      onClick={toggleTheme}
      aria-label="Alternar tema claro ou escuro"
      title="Alternar tema claro ou escuro"
    >
      <Sun className="dark:hidden" aria-hidden="true" />
      <Moon className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
