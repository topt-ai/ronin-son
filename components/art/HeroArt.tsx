/*
  Chapter 00 · HERO placeholder art.

  PLACEHOLDER: replace with a full-bleed photograph or short loop of
  forge fire / glowing metal, very dark overall, embers rising. The
  gradient field below stands in for it and keeps the type readable;
  keep any replacement equally dark at the top third.
*/

export default function HeroArt() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* deep field */}
      <div className="absolute inset-0 bg-ink" />
      {/* ember glow rising from below the fold */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 118%, rgba(232,147,58,0.34) 0%, rgba(140,28,19,0.30) 32%, rgba(20,10,8,0.1) 62%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 38% at 52% 112%, rgba(255,217,160,0.28) 0%, transparent 70%)",
        }}
      />
      {/* anvil silhouette line, barely there */}
      <div
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, rgba(5,5,6,0.95), transparent)",
        }}
      />
      {/* embers, drifted upward by GSAP via .ember */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 800">
        <g fill="#e8933a">
          {[
            [300, 700, 1.6, 0.8],
            [420, 745, 1.1, 0.6],
            [540, 710, 2.0, 0.9],
            [660, 760, 1.3, 0.7],
            [780, 715, 1.7, 0.8],
            [880, 750, 1.0, 0.5],
            [500, 780, 1.4, 0.7],
            [720, 790, 1.8, 0.6],
          ].map(([x, y, r, o], i) => (
            <circle key={i} className="ember" cx={x} cy={y} r={r} opacity={o} />
          ))}
        </g>
      </svg>
    </div>
  );
}
