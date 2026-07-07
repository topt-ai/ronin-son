import Image from "next/image";

/*
  Chapter 00 · HERO background: AI generated photograph of a glowing
  bar beside the forge fire. Scrims keep the headline legible over
  the flames in the lower left.
*/

export default function HeroArt() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <Image
        src="/images/hero-forge.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[30%_center]"
      />
      {/* legibility scrim: enough for the headline, keeps the fire alive */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(11,11,12,0.72) 0%, rgba(11,11,12,0.34) 34%, rgba(11,11,12,0.08) 62%, rgba(11,11,12,0.35) 100%)",
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
