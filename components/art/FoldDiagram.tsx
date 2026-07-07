/*
  Chapter 03 · FOLD diagram. This one is intentionally illustrated,
  not photographic: a technical cross-section of the billet whose
  visible strata double as the fold counter climbs.
*/

const W = 900;
const H = 460;

const BILLET = { x: 130, y: 130, w: 640, h: 200 };

export default function FoldDiagram({ folds }: { folds: number }) {
  // 2^folds layers; past 64 visible lines the strata read as grain,
  // so we cap the drawn lines and let a gradient carry the density.
  const layers = Math.pow(2, folds);
  const drawn = Math.min(layers, 64);
  const dense = layers > 64;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="billet-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a3138" />
          <stop offset="0.5" stopColor="#3d4750" />
          <stop offset="1" stopColor="#20262c" />
        </linearGradient>
        <linearGradient id="dense-grain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7e93a3" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#39434d" stopOpacity="0.9" />
          <stop offset="1" stopColor="#7e93a3" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* billet cross-section */}
      <rect
        x={BILLET.x}
        y={BILLET.y}
        width={BILLET.w}
        height={BILLET.h}
        fill="url(#billet-face)"
        stroke="#5b6b7a"
        strokeWidth="1.5"
      />

      {/* strata */}
      {dense && (
        <rect
          x={BILLET.x + 1}
          y={BILLET.y + 1}
          width={BILLET.w - 2}
          height={BILLET.h - 2}
          fill="url(#dense-grain)"
          opacity="0.35"
        />
      )}
      <g stroke="#aeb6bd" strokeWidth={drawn > 32 ? 0.6 : 1} opacity={0.8}>
        {Array.from({ length: drawn - 1 }, (_, i) => {
          const y = BILLET.y + ((i + 1) / drawn) * BILLET.h;
          return (
            <line
              key={i}
              x1={BILLET.x + 2}
              y1={y}
              x2={BILLET.x + BILLET.w - 2}
              y2={y}
            />
          );
        })}
      </g>

      {/* fold gesture: an arc showing the next fold, fades once done */}
      {folds < 15 && (
        <g opacity="0.9">
          <path
            d={`M ${BILLET.x + BILLET.w - 30} ${BILLET.y + BILLET.h / 2}
               C ${BILLET.x + BILLET.w + 90} ${BILLET.y + BILLET.h / 2},
                 ${BILLET.x + BILLET.w + 90} ${BILLET.y - 50},
                 ${BILLET.x + BILLET.w - 60} ${BILLET.y - 50}`}
            fill="none"
            stroke="#8c1c13"
            strokeWidth="1.5"
            strokeDasharray="4 5"
          />
          <path
            d={`M ${BILLET.x + BILLET.w - 46} ${BILLET.y - 58}
               L ${BILLET.x + BILLET.w - 62} ${BILLET.y - 50}
               L ${BILLET.x + BILLET.w - 46} ${BILLET.y - 42}`}
            fill="none"
            stroke="#8c1c13"
            strokeWidth="1.5"
          />
        </g>
      )}

      {/* dimension ticks, drafting style */}
      <g stroke="#5b6b7a" strokeWidth="1">
        <line
          x1={BILLET.x - 26}
          y1={BILLET.y}
          x2={BILLET.x - 26}
          y2={BILLET.y + BILLET.h}
        />
        <line x1={BILLET.x - 32} y1={BILLET.y} x2={BILLET.x - 20} y2={BILLET.y} />
        <line
          x1={BILLET.x - 32}
          y1={BILLET.y + BILLET.h}
          x2={BILLET.x - 20}
          y2={BILLET.y + BILLET.h}
        />
      </g>
      <text
        x={BILLET.x - 44}
        y={BILLET.y + BILLET.h / 2}
        fill="#8d939a"
        fontSize="13"
        fontFamily="var(--font-jetbrains)"
        textAnchor="middle"
        transform={`rotate(-90 ${BILLET.x - 44} ${BILLET.y + BILLET.h / 2})`}
      >
        SECTION A
      </text>
    </svg>
  );
}
