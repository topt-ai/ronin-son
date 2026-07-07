"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, MM_CONDITIONS } from "@/lib/gsap";

/*
  Interlude · THE WORK. Unnumbered on purpose: chapters 00 to 05 tell
  the process, this is the outcome. Three finished swords pass through
  the dark one at a time, each with a single line. The crimson blade
  is a portrait shot, so it gets a taller, narrower frame.
*/

const BLADES = [
  {
    src: "/images/blade-midnight.jpg",
    alt: "Blued steel katana floating diagonally in darkness",
    name: "Kuro",
    line: "Blued steel, black fittings. The one you hear about and never see.",
    portrait: false,
  },
  {
    src: "/images/blade-crimson.jpg",
    alt: "Katana held vertically beside its red lacquered sheath",
    name: "Aka",
    line: "Red silk, red lacquer. It does not apologize.",
    portrait: true,
  },
  {
    src: "/images/blade-gold.jpg",
    alt: "Gold fitted katana resting on black volcanic stone",
    name: "Kin",
    line: "Gold furniture on volcanic stone. For ceremonies, and for endings.",
    portrait: false,
  },
];

export default function Work() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { desktop, reduced } = ctx.conditions as Record<string, boolean>;

      if (desktop) {
        const slides = gsap.utils.toArray<HTMLElement>(".work-slide");
        gsap.set(slides.slice(1), { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: true,
          },
        });

        slides.forEach((slide, i) => {
          const img = slide.querySelector(".work-img");
          // slow drift across each slide's window
          tl.fromTo(
            img,
            { scale: 1.08 },
            { scale: 1, ease: "none", duration: 1 },
            i
          );
          if (i > 0) {
            tl.fromTo(
              slide,
              { autoAlpha: 0 },
              { autoAlpha: 1, duration: 0.3, ease: "none" },
              i - 0.15
            );
          }
          if (i < slides.length - 1) {
            tl.to(
              slide,
              { autoAlpha: 0, duration: 0.3, ease: "none" },
              i + 0.85
            );
          }
        });
      } else {
        // Mobile and reduced motion: slides stack, one time fades.
        gsap.utils.toArray<HTMLElement>(".work-slide").forEach((slide) => {
          gsap.from(slide, {
            opacity: 0,
            y: reduced ? 0 : 24,
            duration: 0.9,
            scrollTrigger: { trigger: slide, start: "top 75%" },
          });
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-chapter="work"
      data-marker="· THE WORK"
      className="relative min-h-svh overflow-hidden bg-[#050506]"
    >
      <div className="relative max-md:space-y-24 max-md:px-6 max-md:py-24 md:h-svh">
        {BLADES.map((b) => (
          <div
            key={b.name}
            className="work-slide max-md:relative md:absolute md:inset-0 md:flex md:items-center"
          >
            <div className="grid w-full items-center gap-8 md:grid-cols-[2fr_3fr] md:gap-14 md:px-16">
              <div className="max-md:order-last">
                <p className="eyebrow mb-6">The Work</p>
                <h3 className="display mb-5 text-5xl md:text-6xl">{b.name}</h3>
                <p className="body-copy max-w-sm">{b.line}</p>
              </div>
              <div
                className={`work-img relative w-full overflow-hidden ${
                  b.portrait
                    ? "aspect-[3/4] md:h-[78vh] md:w-auto md:justify-self-center md:aspect-[2/3]"
                    : "aspect-[3/2] md:h-[62vh] md:w-full"
                }`}
              >
                <Image
                  src={b.src}
                  alt={b.alt}
                  fill
                  sizes="(min-width: 768px) 60vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
