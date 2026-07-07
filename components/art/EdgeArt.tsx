/*
  Chapter 04 · EDGE placeholder art.

  PLACEHOLDER: replace with real photography. Two shots needed, both
  studio-lit on pure black:
    (a) full polished blade, horizontal, tip to the right, single
        hard rim light along the edge;
    (b) extreme macro of the edge and hamon, nearly abstract.
  The scroll zoom scales (a) toward the point marked by ZOOM_ORIGIN,
  then crossfades to (b), so (b) should feel like a continuation of
  the same region of the blade.
*/

/** transform-origin for the scroll zoom, as a CSS percentage pair. */
export const ZOOM_ORIGIN = "70% 46%";

export function BladeFull() {
  return (
    <svg
      viewBox="0 0 1200 700"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="blade-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#171a1d" />
          <stop offset="0.45" stopColor="#4c5a66" />
          <stop offset="0.7" stopColor="#c9cdd1" />
          <stop offset="1" stopColor="#e6e9ec" />
        </linearGradient>
        <linearGradient id="edge-light" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#e6e9ec" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e6e9ec" stopOpacity="0" />
        </linearGradient>
        <filter id="edge-soft" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      <rect width="1200" height="700" fill="#050506" />

      {/* blade: gentle sori curve, tip right */}
      <g>
        <path
          d="M 120 372
             C 420 352, 720 336, 1008 318
             C 1042 316, 1066 322, 1078 334
             C 1050 342, 760 362, 460 380
             C 320 388, 190 392, 120 392
             Z"
          fill="url(#blade-body)"
        />
        {/* shinogi ridge line */}
        <path
          d="M 124 379 C 430 361, 740 344, 1052 327"
          stroke="#0e1114"
          strokeWidth="1.2"
          fill="none"
          opacity="0.7"
        />
        {/* hamon: soft irregular temper line above the edge */}
        <path
          d="M 130 388
             C 200 384, 240 378, 300 384
             S 420 376, 480 382
             S 610 370, 670 377
             S 800 364, 860 371
             S 990 352, 1046 337"
          stroke="#f2f5f7"
          strokeWidth="5"
          fill="none"
          opacity="0.28"
          filter="url(#edge-soft)"
        />
        {/* rim light along the true edge */}
        <path
          d="M 122 391 C 430 373, 760 352, 1074 335"
          stroke="url(#edge-light)"
          strokeWidth="1.6"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function BladeMacro() {
  return (
    <svg
      viewBox="0 0 1200 700"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id="macro-ji" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0c0e" />
          <stop offset="1" stopColor="#2b333b" />
        </linearGradient>
        <linearGradient id="macro-ha" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fabb5" />
          <stop offset="0.75" stopColor="#e6e9ec" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <filter id="nioi" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.09"
            numOctaves="3"
            seed="11"
            result="n"
          />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="26" />
        </filter>
        <filter id="mist" x="-20%" y="-100%" width="140%" height="300%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* dark body steel (ji) above */}
      <rect width="1200" height="700" fill="url(#macro-ji)" />

      {/* hardened edge steel (ha) below the hamon */}
      <g filter="url(#nioi)">
        <path
          d="M 0 430
             C 140 400, 260 452, 400 420
             C 540 390, 660 448, 800 414
             C 930 384, 1060 440, 1200 404
             L 1200 700 L 0 700 Z"
          fill="url(#macro-ha)"
        />
      </g>

      {/* nioi mist hugging the hamon */}
      <path
        d="M 0 430 C 140 400, 260 452, 400 420 C 540 390, 660 448, 800 414 C 930 384, 1060 440, 1200 404"
        stroke="#e6e9ec"
        strokeWidth="18"
        fill="none"
        opacity="0.22"
        filter="url(#mist)"
      />

      {/* faint grain in the dark steel */}
      <g stroke="#4c5a66" strokeWidth="0.7" opacity="0.4">
        {[80, 150, 214, 286, 344].map((y, i) => (
          <path
            key={y}
            d={`M 0 ${y} C 300 ${y + (i % 2 ? 14 : -14)}, 800 ${
              y + (i % 2 ? -18 : 18)
            }, 1200 ${y + 6}`}
            fill="none"
          />
        ))}
      </g>

      {/* the final edge line itself */}
      <rect x="0" y="682" width="1200" height="3" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
