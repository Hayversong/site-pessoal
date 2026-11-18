// Usa a View Transitions API quando existe; caso contrário só aplica a mudança.
// `kind` fica em html[data-transition] durante a transição, para o CSS escolher a animação.
export function withViewTransition(update: () => void, kind?: string) {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches;

  if (reduceMotion || !('startViewTransition' in document)) {
    update();
    return;
  }

  const root = document.documentElement;
  if (kind) root.dataset.transition = kind;
  const transition = document.startViewTransition(update);
  if (kind) {
    void transition.finished.finally(() => {
      if (root.dataset.transition === kind) delete root.dataset.transition;
    });
  }
}
