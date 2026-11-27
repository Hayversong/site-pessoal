'use client';

import { useState } from 'react';

import type { CaseStudyMedia } from '@/data/case-studies';

// Imagem do diário. Quando há GIF, mostra o último quadro e só anima quando a pessoa pede.
export function MissionMedia({ media }: { media: CaseStudyMedia }) {
  const [playing, setPlaying] = useState(false);
  const src = playing && media.animation ? media.animation : media.src;

  return (
    <figure className="mission-figure" data-shape={media.shape ?? 'card'}>
      <div className="mission-figure-frame">
        <img
          src={src}
          alt={media.alt}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
        />
        {media.animation ? (
          <button
            type="button"
            className="pixel-btn mission-figure-play"
            data-variant={playing ? 'ghost' : undefined}
            aria-pressed={playing}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? '■ Parar' : '▶ Ver animação'}
          </button>
        ) : null}
      </div>
      <figcaption>{media.caption}</figcaption>
    </figure>
  );
}
