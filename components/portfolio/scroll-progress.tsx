'use client';

import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const scrollableHeight = root.scrollHeight - window.innerHeight;
        setProgress(
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0,
        );
      });
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <progress
      className="scroll-progress-track"
      aria-label="Progresso de leitura"
      max={100}
      value={Math.round(progress * 100)}
    />
  );
}
