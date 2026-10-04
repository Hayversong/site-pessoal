'use client';

import { motion, useReducedMotion } from 'motion/react';

const particles = Array.from({ length: 18 }, (_, index) => ({
  left: `${(index * 47 + 13) % 100}%`,
  size: 2 + (index % 3),
  duration: 20 + ((index * 7) % 15),
  delay: -((index * 11) % 32),
  drift: `${(index % 2 === 0 ? 1 : -1) * (12 + (index % 5) * 5)}px`,
}));

export function FallingParticles() {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;

  return (
    <div className="falling-particles" aria-hidden="true">
      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className="falling-particle"
          style={{ left: particle.left, width: particle.size, height: particle.size }}
          animate={{
            y: ['-5vh', '105vh'],
            x: [0, particle.drift],
            opacity: [0, 0.42, 0.32, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
