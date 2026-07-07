/*
  Chapter 05 · SAYA placeholder art.

  PLACEHOLDER: replace with real photography: the finished sword
  resting in its sheath, horizontal, warm quiet light. This variant
  has a deep red-lacquered saya with aged gold fittings, so it reads
  as a different sword from the ones in earlier chapters.
*/

export default function SayaArt() {
  return (
    <svg viewBox="0 0 1200 300" className="h-auto w-full" aria-hidden>
      <defs>
        <linearGradient id="saya-lacquer" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a0806" />
          <stop offset="0.35" stopColor="#4b100b" />
          <stop offset="0.52" stopColor="#77201a" />
          <stop offset="0.66" stopColor="#3a0c08" />
          <stop offset="1" stopColor="#120504" />
        </linearGradient>
        <linearGradient id="tsuka-silk" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#171310" />
          <stop offset="0.5" stopColor="#33281c" />
          <stop offset="1" stopColor="#120f0c" />
        </linearGradient>
        <linearGradient id="gold-fitting" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6e572f" />
          <stop offset="0.45" stopColor="#d3b078" />
          <stop offset="0.6" stopColor="#b08d57" />
          <stop offset="1" stopColor="#57431f" />
        </linearGradient>
        <radialGradient id="saya-floor" cx="0.5" cy="0.85" r="0.9">
          <stop offset="0" stopColor="#17120c" />
          <stop offset="1" stopColor="#0b0b0c" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="300" fill="url(#saya-floor)" />
      <ellipse cx="600" cy="216" rx="470" ry="14" fill="#000" opacity="0.55" />

      {/* saya: red lacquer, gentle sori */}
      <path
        d="M 372 158
           C 600 146, 850 136, 1088 122
           C 1106 121, 1114 128, 1112 136
           C 1113 146, 1100 150, 1084 151
           C 850 164, 600 174, 374 184
           Z"
        fill="url(#saya-lacquer)"
      />
      {/* lacquer sheen */}
      <path
        d="M 380 163 C 600 152, 850 142, 1080 129"
        stroke="#c9cdd1"
        strokeWidth="1"
        opacity="0.18"
        fill="none"
      />
      {/* kojiri (end cap) and kurigata (cord knob) in gold */}
      <path
        d="M 1084 121 C 1100 120, 1112 126, 1112 136 C 1112 145, 1098 151, 1084 151 Z"
        fill="url(#gold-fitting)"
      />
      <rect x="470" y="148" width="26" height="12" rx="5" fill="url(#gold-fitting)" />

      {/* koiguchi (sheath mouth) */}
      <rect
        x="366"
        y="157"
        width="12"
        height="28"
        rx="3"
        fill="url(#gold-fitting)"
        transform="rotate(-3 372 171)"
      />

      {/* tsuba */}
      <ellipse
        cx="352"
        cy="172"
        rx="12"
        ry="26"
        fill="#0f0d0a"
        stroke="#b08d57"
        strokeWidth="1.2"
      />

      {/* tsuka with diamond ito wrap */}
      <g transform="rotate(-4 340 176)">
        <rect x="128" y="164" width="212" height="26" rx="12" fill="url(#tsuka-silk)" />
        {/* kashira end cap */}
        <path
          d="M 128 165 C 118 166, 112 172, 113 178 C 114 185, 121 190, 130 190 Z"
          fill="url(#gold-fitting)"
        />
        {/* ito crossings exposing samegawa */}
        <g fill="#8d939a" opacity="0.7">
          {[150, 176, 202, 228, 254, 280, 306].map((x) => (
            <path
              key={x}
              d={`M ${x} 166 L ${x + 9} 177 L ${x} 188 L ${x - 9} 177 Z`}
            />
          ))}
        </g>
        <g stroke="#0b0b0c" strokeWidth="3" opacity="0.8">
          {[150, 176, 202, 228, 254, 280, 306].map((x) => (
            <g key={x}>
              <line x1={x - 13} y1={164} x2={x + 13} y2={190} />
              <line x1={x + 13} y1={164} x2={x - 13} y2={190} />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
