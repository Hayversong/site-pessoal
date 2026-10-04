'use client';

import { Moon, Sun } from 'lucide-react';
import { motion } from 'motion/react';

export function ThemeToggle() {
  function toggleTheme() {
    const nextTheme = document.documentElement.classList.contains('dark')
      ? 'light'
      : 'dark';
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(nextTheme);
    try {
      window.localStorage.setItem('hayversong-theme', nextTheme);
    } catch {
      // The current page theme still changes when storage is unavailable.
    }
  }

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Alternar tema claro ou escuro"
      title="Alternar tema claro ou escuro"
      whileHover={{ scale: 1.08, rotate: 8 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 420, damping: 22 }}
    >
      <Sun className="size-4 dark:hidden" aria-hidden="true" />
      <Moon className="hidden size-4 dark:block" aria-hidden="true" />
    </motion.button>
  );
}
