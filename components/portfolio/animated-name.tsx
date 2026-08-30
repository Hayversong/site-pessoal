'use client';

import { useEffect, useRef, useState } from 'react';

const targetName = 'Hayth';
const randomCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function getRandomCharacter(character: string) {
  if (character === ' ') return ' ';
  const index = Math.floor(Math.random() * randomCharacters.length);
  return randomCharacters[index];
}

export function AnimatedName() {
  const [displayName, setDisplayName] = useState(targetName);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  function animateName() {
    if (intervalRef.current) return;

    let revealedLetters = 0;

    intervalRef.current = setInterval(() => {
      setDisplayName(
        targetName
          .split('')
          .map((character, index) =>
            index < Math.floor(revealedLetters)
              ? character
              : getRandomCharacter(character),
          )
          .join(''),
      );

      revealedLetters += 0.35;

      if (revealedLetters >= targetName.length + 1) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;
        setDisplayName(targetName);
      }
    }, 55);
  }

  return (
    <button
      type="button"
      onClick={animateName}
      className="animated-name"
      aria-label="Animar o nome Hayth"
      title="Clique para embaralhar as letras"
    >
      <span aria-hidden="true">{displayName}</span>
      <span aria-hidden="true" className="name-cursor">
        _
      </span>
    </button>
  );
}
