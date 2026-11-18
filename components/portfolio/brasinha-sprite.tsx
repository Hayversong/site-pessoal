// Brasinha: mascote em pixel art (16x16), desenhado como faixas de pixels por cor.
// Quadros "a" e "b" fazem a chama tremular; "blink" é a piscada.
const frames = {
  a: [
    [
      '#2a1a14',
      'M6 0h1v1h-1zM5 1h1v1h-1zM7 1h1v1h-1zM5 2h1v1h-1zM7 2h1v1h-1zM11 2h1v1h-1zM4 3h1v1h-1zM8 3h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM3 4h1v1h-1zM8 4h2v1h-2zM12 4h1v1h-1zM3 5h1v1h-1zM13 5h1v1h-1zM2 6h1v1h-1zM14 6h1v1h-1zM2 7h1v1h-1zM14 7h1v1h-1zM1 8h1v1h-1zM6 8h1v1h-1zM11 8h1v1h-1zM15 8h1v1h-1zM1 9h1v1h-1zM6 9h1v1h-1zM11 9h1v1h-1zM15 9h1v1h-1zM1 10h1v1h-1zM8 10h2v1h-2zM15 10h1v1h-1zM1 11h1v1h-1zM15 11h1v1h-1zM2 12h1v1h-1zM14 12h1v1h-1zM3 13h1v1h-1zM13 13h1v1h-1zM4 14h10v1h-10z',
    ],
    [
      '#ffd67a',
      'M6 1h1v1h-1zM6 2h1v1h-1zM5 3h2v1h-2zM11 3h1v1h-1zM4 4h2v1h-2zM10 4h1v1h-1zM4 5h1v1h-1zM4 7h2v1h-2zM3 8h1v1h-1z',
    ],
    [
      '#ff8a3d',
      'M7 3h1v1h-1zM6 4h2v1h-2zM11 4h1v1h-1zM5 5h8v1h-8zM3 6h11v1h-11zM3 7h1v1h-1zM6 7h8v1h-8zM2 8h1v1h-1zM4 8h2v1h-2zM7 8h4v1h-4zM12 8h2v1h-2zM2 9h4v1h-4zM7 9h4v1h-4zM12 9h2v1h-2zM2 10h1v1h-1zM5 10h3v1h-3zM10 10h2v1h-2zM2 11h11v1h-11zM3 12h9v1h-9zM5 13h6v1h-6z',
    ],
    [
      '#d65c28',
      'M14 8h1v1h-1zM14 9h1v1h-1zM14 10h1v1h-1zM13 11h2v1h-2zM12 12h2v1h-2zM4 13h1v1h-1zM11 13h2v1h-2z',
    ],
    ['#ff5c7a', 'M3 10h2v1h-2zM12 10h2v1h-2z'],
  ],
  b: [
    [
      '#2a1a14',
      'M7 0h1v1h-1zM6 1h1v1h-1zM8 1h1v1h-1zM5 2h1v1h-1zM8 2h1v1h-1zM12 2h1v1h-1zM4 3h1v1h-1zM8 3h1v1h-1zM11 3h1v1h-1zM13 3h1v1h-1zM3 4h1v1h-1zM8 4h2v1h-2zM13 4h1v1h-1zM3 5h1v1h-1zM13 5h1v1h-1zM2 6h1v1h-1zM14 6h1v1h-1zM2 7h1v1h-1zM14 7h1v1h-1zM1 8h1v1h-1zM6 8h1v1h-1zM11 8h1v1h-1zM15 8h1v1h-1zM1 9h1v1h-1zM6 9h1v1h-1zM11 9h1v1h-1zM15 9h1v1h-1zM1 10h1v1h-1zM8 10h2v1h-2zM15 10h1v1h-1zM1 11h1v1h-1zM15 11h1v1h-1zM2 12h1v1h-1zM14 12h1v1h-1zM3 13h1v1h-1zM13 13h1v1h-1zM4 14h10v1h-10z',
    ],
    [
      '#ffd67a',
      'M7 1h1v1h-1zM6 2h2v1h-2zM5 3h2v1h-2zM12 3h1v1h-1zM4 4h2v1h-2zM10 4h2v1h-2zM4 5h1v1h-1zM4 7h2v1h-2zM3 8h1v1h-1z',
    ],
    [
      '#ff8a3d',
      'M7 3h1v1h-1zM6 4h2v1h-2zM12 4h1v1h-1zM5 5h8v1h-8zM3 6h11v1h-11zM3 7h1v1h-1zM6 7h8v1h-8zM2 8h1v1h-1zM4 8h2v1h-2zM7 8h4v1h-4zM12 8h2v1h-2zM2 9h4v1h-4zM7 9h4v1h-4zM12 9h2v1h-2zM2 10h1v1h-1zM5 10h3v1h-3zM10 10h2v1h-2zM2 11h11v1h-11zM3 12h9v1h-9zM5 13h6v1h-6z',
    ],
    [
      '#d65c28',
      'M14 8h1v1h-1zM14 9h1v1h-1zM14 10h1v1h-1zM13 11h2v1h-2zM12 12h2v1h-2zM4 13h1v1h-1zM11 13h2v1h-2z',
    ],
    ['#ff5c7a', 'M3 10h2v1h-2zM12 10h2v1h-2z'],
  ],
  blink: [
    [
      '#2a1a14',
      'M6 0h1v1h-1zM5 1h1v1h-1zM7 1h1v1h-1zM5 2h1v1h-1zM7 2h1v1h-1zM11 2h1v1h-1zM4 3h1v1h-1zM8 3h1v1h-1zM10 3h1v1h-1zM12 3h1v1h-1zM3 4h1v1h-1zM8 4h2v1h-2zM12 4h1v1h-1zM3 5h1v1h-1zM13 5h1v1h-1zM2 6h1v1h-1zM14 6h1v1h-1zM2 7h1v1h-1zM14 7h1v1h-1zM1 8h1v1h-1zM15 8h1v1h-1zM1 9h1v1h-1zM5 9h1v1h-1zM10 9h1v1h-1zM15 9h1v1h-1zM1 10h1v1h-1zM8 10h2v1h-2zM15 10h1v1h-1zM1 11h1v1h-1zM15 11h1v1h-1zM2 12h1v1h-1zM14 12h1v1h-1zM3 13h1v1h-1zM13 13h1v1h-1zM4 14h10v1h-10z',
    ],
    [
      '#ffd67a',
      'M6 1h1v1h-1zM6 2h1v1h-1zM5 3h2v1h-2zM11 3h1v1h-1zM4 4h2v1h-2zM10 4h1v1h-1zM4 5h1v1h-1zM4 7h2v1h-2zM3 8h1v1h-1z',
    ],
    [
      '#ff8a3d',
      'M7 3h1v1h-1zM6 4h2v1h-2zM11 4h1v1h-1zM5 5h8v1h-8zM3 6h11v1h-11zM3 7h1v1h-1zM6 7h8v1h-8zM2 8h1v1h-1zM4 8h10v1h-10zM2 9h3v1h-3zM6 9h4v1h-4zM11 9h3v1h-3zM2 10h1v1h-1zM5 10h3v1h-3zM10 10h2v1h-2zM2 11h11v1h-11zM3 12h9v1h-9zM5 13h6v1h-6z',
    ],
    [
      '#d65c28',
      'M14 8h1v1h-1zM14 9h1v1h-1zM14 10h1v1h-1zM13 11h2v1h-2zM12 12h2v1h-2zM4 13h1v1h-1zM11 13h2v1h-2z',
    ],
    ['#ff5c7a', 'M3 10h2v1h-2zM12 10h2v1h-2z'],
  ],
} as const;
type BrasinhaProps = { className?: string };

export function BrasinhaSprite({ className }: BrasinhaProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      aria-hidden="true"
      focusable="false"
      className={['brasinha', className].filter(Boolean).join(' ')}
    >
      {Object.entries(frames).map(([name, layers]) => (
        <g key={name} data-sprite-frame={name}>
          {layers.map(([fill, d]) => (
            <path key={fill} fill={fill} d={d} />
          ))}
        </g>
      ))}
    </svg>
  );
}
