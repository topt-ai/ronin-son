/*
  Chapter 01 · STEEL placeholder art.

  PLACEHOLDER: replace this procedural SVG with real photography.
  Needed shots: (a) a raw tamahagane / steel bar on dark slate, cool
  blue-grey light; (b) the same bar after first welds; (c) folded
  damascus-pattern steel, macro. The three layers crossfade on scroll,
  so the shots should share framing: bar horizontal, centered.
*/

const W = 1200;
const H = 640;

/** Deterministic pseudo-noise so server and client render identically. */
function wob(i: number, j: number) {
  return Math.sin(i * 12.9898 + j * 78.233) * 0.5 + 0.5;
}

function BrushedLines({ count, opacity }: { count: number; opacity: number }) {
  return (
    <g opacity={opacity}>
      {Array.from({ length: count }, (_, i) => {
        const y = 250 + (i / count) * 140 + wob(i, 1) * 4;
        return (
          <line
            key={i}
            x1={180 + wob(i, 2) * 60}
            y1={y}
            x2={1020 - wob(i, 3) * 60}
            y2={y + wob(i, 4) * 2 - 1}
            stroke="#e6e9ec"
            strokeWidth={0.5}
          />
        );
      })}
    </g>
  );
}

function BarBase({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#39434d" />
          <stop offset="0.28" stopColor="#5b6b7a" />
          <stop offset="0.5" stopColor="#8ea0af" />
          <stop offset="0.62" stopColor="#4c5a66" />
          <stop offset="1" stopColor="#232a30" />
        </linearGradient>
        <radialGradient id={`${id}-pool`} cx="0.5" cy="0.62" r="0.75">
          <stop offset="0" stopColor="#1a2027" />
          <stop offset="1" stopColor="#0b0b0c" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-pool)`} />
      {/* cast shadow */}
      <ellipse cx={600} cy={452} rx={440} ry={26} fill="#000" opacity={0.5} />
      {/* the bar */}
      <rect
        x={170}
        y={242}
        width={860}
        height={160}
        rx={10}
        fill={`url(#${id}-steel)`}
      />
      {/* cut end face */}
      <rect x={170} y={242} width={26} height={160} rx={10} fill="#2b333b" />
    </>
  );
}

export function SteelRaw() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden>
      <BarBase id="raw" />
      <BrushedLines count={26} opacity={0.08} />
    </svg>
  );
}

export function SteelWelded() {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden>
      <BarBase id="weld" />
      <BrushedLines count={20} opacity={0.06} />
      {/* first weld seams: a few coarse strata */}
      <g stroke="#1d242b" strokeWidth={3} opacity={0.85}>
        {[290, 322, 356, 386].map((y, i) => (
          <path
            key={y}
            d={`M 180 ${y} C 400 ${y + (i % 2 ? 6 : -6)}, 800 ${
              y + (i % 2 ? -8 : 8)
            }, 1020 ${y}`}
            fill="none"
          />
        ))}
      </g>
      <g stroke="#aebbc6" strokeWidth={1} opacity={0.5}>
        {[292, 324, 358, 388].map((y, i) => (
          <path
            key={y}
            d={`M 180 ${y} C 400 ${y + (i % 2 ? 6 : -6)}, 800 ${
              y + (i % 2 ? -8 : 8)
            }, 1020 ${y}`}
            fill="none"
          />
        ))}
      </g>
    </svg>
  );
}

export function SteelFolded() {
  const strata = Array.from({ length: 30 }, (_, i) => {
    const y = 248 + i * 5.2;
    const amp = 4 + wob(i, 5) * 9;
    const phase = wob(i, 6) * 300;
    return { y, amp, phase, light: wob(i, 7) > 0.5 };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden>
      <BarBase id="fold" />
      {/* dense wavy damascus strata */}
      <g>
        {strata.map((s, i) => (
          <path
            key={i}
            d={`M 180 ${s.y}
               C ${330 + s.phase * 0.2} ${s.y - s.amp}, ${470 - s.phase * 0.1} ${
              s.y + s.amp
            }, 600 ${s.y}
               S ${870 + s.phase * 0.15} ${s.y - s.amp}, 1020 ${s.y}`}
            fill="none"
            stroke={s.light ? "#c3ced8" : "#1c232a"}
            strokeWidth={s.light ? 1 : 2.2}
            opacity={s.light ? 0.55 : 0.75}
          />
        ))}
      </g>
    </svg>
  );
}
