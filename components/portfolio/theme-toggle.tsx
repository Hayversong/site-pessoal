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
    });
    try {
      window.localStorage.setItem('hayversong-theme', nextTheme);
    } catch {
      // Sem localStorage o tema ainda muda, só não fica salvo.
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Alternar tema claro ou escuro"
      title="Alternar tema claro ou escuro"
    >
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-4 dark:block" aria-hidden="true" />
    </button>
  );
}
