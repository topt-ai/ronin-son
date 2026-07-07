/**
 * Fine film grain over the whole site, SVG feTurbulence at very low
 * opacity. Kept static (not animated) so it costs nothing to composite.
 */
export default function Grain() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.05]"
    >
      <filter id="site-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#site-grain)" />
    </svg>
  );
}
