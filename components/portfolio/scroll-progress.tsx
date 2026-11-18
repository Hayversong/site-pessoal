'use client';

import { useEffect, useRef, useState } from 'react';

import { BrasinhaSprite } from '@/components/portfolio/brasinha-sprite';
import { onRetroFrame, startRetroClock } from '@/lib/retro-fx';

const SPRITE_SIZE = 32;
const LEVEL_UP_AT = 0.985;

export function ScrollProgress() {
  const barRef = useRef<HTMLProgressElement>(null);
  const walkerRef = useRef<HTMLDivElement>(null);
  const [levelUp, setLevelUp] = useState(false);

  useEffect(() => {
    const bar = barRef.current;
    const walker = walkerRef.current;
    if (!bar || !walker) return;

    let frame = 0;
    let lastProgress = -1;
    let movingUntil = 0;
    let levelUpShown = false;
    let levelUpTimer = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const root = document.documentElement;
        const scrollable = root.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        bar.value = Math.round(progress * 100);

        const x = progress * (root.clientWidth - SPRITE_SIZE);
        walker.style.transform = `translate3d(${Math.round(x)}px, 0, 0)`;
        if (lastProgress >= 0 && progress !== lastProgress) {
          walker.dataset.dir = progress > lastProgress ? 'right' : 'left';
          movingUntil = performance.now() + 220;
        }
        lastProgress = progress;

        if (progress >= LEVEL_UP_AT && !levelUpShown) {
          levelUpShown = true;
          setLevelUp(true);
          levelUpTimer = window.setTimeout(() => setLevelUp(false), 2800);
        }
      });
    };

    // Andando: a chama troca a cada quadro e o corpo pula; parado: tremula devagar e pisca às vezes.
    const stopFrames = onRetroFrame((tick) => {
      const moving = performance.now() < movingUntil;
      let spriteFrame = moving
        ? tick % 2
          ? 'b'
          : 'a'
        : Math.floor(tick / 3) % 2
          ? 'b'
          : 'a';
      if (!moving && tick % 28 === 0) spriteFrame = 'blink';
      walker.dataset.frame = spriteFrame;
      walker.dataset.hop = moving && tick % 2 ? 'up' : 'down';
    });
    const stopClock = startRetroClock();

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(levelUpTimer);
      stopFrames();
      stopClock();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <progress
        ref={barRef}
        className="xp-progress"
        aria-label="Progresso de leitura"
        max={100}
        defaultValue={0}
      />
      <div
        ref={walkerRef}
        className="xp-walker"
        data-frame="a"
        data-dir="right"
        aria-hidden="true"
      >
        <BrasinhaSprite />
      </div>
      {levelUp ? (
        <div className="level-up" aria-hidden="true">
          <p className="level-up-title">Level up!</p>
          <p className="level-up-text">+100 XP · portfólio explorado</p>
        </div>
      ) : null}
    </>
  );
}
