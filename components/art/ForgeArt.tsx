/*
  Chapter 02 · FIRE placeholder art.

  PLACEHOLDER: replace with real photography or video of a blade in the
  forge fire: deep orange and red, blade heated to yellow-white at the
  working section, dark smithy around it. Framing: blade horizontal,
  slightly low in frame, glow filling the upper two thirds.
*/

export default function ForgeArt() {
  return (
    <svg
      viewBox="0 0 1200 800"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <radialGradient id="forge-glow" cx="0.5" cy="0.58" r="0.85">
          <stop offset="0" stopColor="#e8933a" stopOpacity="0.9" />
          <stop offset="0.25" stopColor="#c1481f" stopOpacity="0.75" />
          <stop offset="0.55" stopColor="#6d1a10" stopOpacity="0.55" />
          <stop offset="1" stopColor="#0b0b0c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="forge-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a0" />
          <stop offset="0.4" stopColor="#f4a648" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c1481f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hot-blade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2016" />
          <stop offset="0.3" stopColor="#8c1c13" />
          <stop offset="0.55" stopColor="#e8933a" />
          <stop offset="0.72" stopColor="#ffe3b3" />
          <stop offset="0.9" stopColor="#f4a648" />
          <stop offset="1" stopColor="#c1481f" />
        </linearGradient>
        <filter id="heat" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.05"
            numOctaves="2"
            seed="7"
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" />
        </filter>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      <rect width="1200" height="800" fill="#0b0b0c" />
      <rect width="1200" height="800" fill="url(#forge-glow)" />

      {/* coal bed */}
      <g filter="url(#heat)">
        <ellipse cx="600" cy="560" rx="420" ry="120" fill="url(#forge-core)" />
      </g>

      {/* heated blade, working section at yellow heat */}
      <g filter="url(#heat)">
        <path
          d="M 160 468
             C 480 448, 780 438, 1030 430
             L 1052 424
             C 790 424, 480 434, 160 452
             Z"
          fill="url(#hot-blade)"
        />
      </g>
      {/* bloom around the hottest section */}
      <ellipse
        cx="820"
        cy="438"
        rx="150"
        ry="46"
        fill="#ffd9a0"
        opacity="0.35"
        filter="url(#soft)"
      />

      {/* rising sparks, animated by GSAP via .spark */}
      <g fill="#f4a648">
        {[
          [420, 520, 2.2],
          [530, 545, 1.6],
          [640, 500, 2.6],
          [700, 540, 1.4],
          [760, 505, 2.0],
          [850, 530, 1.8],
          [910, 498, 1.3],
          [560, 510, 1.2],
        ].map(([x, y, r], i) => (
          <circle key={i} className="spark" cx={x} cy={y} r={r} opacity={0.9} />
        ))}
      </g>
    </svg>
  );
}
