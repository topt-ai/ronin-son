"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText, MM_CONDITIONS } from "@/lib/gsap";
import HeroArt from "@/components/art/HeroArt";

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { reduced } = ctx.conditions as Record<string, boolean>;

      if (reduced) {
        gsap.set(".js-reveal", { visibility: "visible" });
        gsap.from(".js-reveal", { opacity: 0, duration: 0.9, stagger: 0.15 });
        return;
      }

      // Wait for webfonts so SplitText measures the real glyphs.
      document.fonts.ready.then(() => {
        ctx.add(() => {
          const split = SplitText.create(".hero-headline", {
            type: "lines,words,chars",
            linesClass: "overflow-hidden",
          });
          gsap.set(".js-reveal", { visibility: "visible" });

          const tl = gsap.timeline({ delay: 0.25 });
          tl.from(split.chars, {
            yPercent: 112,
            duration: 1.15,
            ease: "power4.out",
            stagger: { each: 0.016, from: "start" },
          })
            .from(
              ".hero-eyebrow",
              { opacity: 0, y: 8, duration: 0.8, ease: "power2.out" },
              0.35
            )
            .from(
              ".hero-sub",
              { opacity: 0, y: 12, duration: 0.9, ease: "power2.out" },
              0.8
            )
            .from(
              ".hero-scroll-cue",
              { opacity: 0, duration: 1.2 },
              1.3
            );
        });
      });

      // ambient embers, gentle loop
      gsap.utils.toArray<SVGCircleElement>(".ember").forEach((el, i) => {
        gsap.to(el, {
          y: -(140 + (i % 4) * 60),
          x: `+=${(i % 2 ? -1 : 1) * (10 + (i % 3) * 8)}`,
          opacity: 0,
          duration: 5 + (i % 5),
          repeat: -1,
          delay: i * 0.7,
          ease: "sine.in",
        });
      });

      // headline drifts up slightly as the chapter scrolls away
      gsap.to(".hero-inner", {
        yPercent: -14,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-chapter="hero"
      data-marker="00 · RONIN & SON"
      data-cursor-zone
      className="relative flex min-h-svh items-end overflow-hidden"
    >
      <HeroArt />

      <div className="hero-inner relative z-10 w-full px-6 pb-24 pt-40 md:px-16 md:pb-32">
        <p className="hero-eyebrow eyebrow js-reveal mb-8">
          Ronin &amp; Son · Est. Forge
        </p>
        <h1 className="hero-headline display js-reveal max-w-5xl text-[13.5vw] leading-[0.98] md:text-[7.5vw]">
          Some things are still made by hand.
        </h1>
        <p className="hero-sub body-copy js-reveal mt-8 max-w-md">
          The birth of one katana, told in five chapters. Scroll when you are
          ready.
        </p>
      </div>

      <div className="hero-scroll-cue js-reveal absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="eyebrow flex items-center gap-3 opacity-70">
          <span>Scroll</span>
          <span className="block h-px w-10 bg-steel-dim" />
        </div>
      </div>
    </section>
  );
}
