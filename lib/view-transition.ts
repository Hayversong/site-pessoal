// Usa a View Transitions API quando existe; caso contrário só aplica a mudança.
export function withViewTransition(update: () => void) {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (reduceMotion || !('startViewTransition' in document)) {
    update();
    return;
  }

  document.startViewTransition(update);
}
