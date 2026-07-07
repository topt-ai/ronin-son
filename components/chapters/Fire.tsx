"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, SplitText, MM_CONDITIONS } from "@/lib/gsap";

/**
 * Chapter 02 · FIRE. Full-bleed pinned section. The forge glow deepens
 * and the passage reveals character by character as the user scrolls.
 */
export default function Fire() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { desktop, reduced } = ctx.conditions as Record<string, boolean>;

      // sparks rise on any motion-permitting media
      if (!reduced) {
        gsap.utils.toArray<SVGCircleElement>(".spark").forEach((el, i) => {
          gsap.to(el, {
            y: -(90 + (i % 3) * 50),
            opacity: 0,
            duration: 2.6 + (i % 4) * 0.8,
            repeat: -1,
            delay: i * 0.5,
            ease: "sine.in",
          });
        });
      }

      if (desktop) {
        // The pinned trigger must be created now, in document order,
        // so ScrollTrigger computes every chapter's offsets correctly.
        // Only the SplitText tween waits for fonts.
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=190%",
            pin: true,
            scrub: true,
          },
        });
        tl.fromTo(
          ".fire-art",
          { scale: 1.12, opacity: 0.75 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "none" },
          0
        );

        document.fonts.ready.then(() => {
          ctx.add(() => {
            const split = SplitText.create(".fire-passage", {
              type: "words,chars",
            });
            gsap.set(".fire-passage", { visibility: "visible" });
            tl.from(
              split.chars,
              {
                opacity: 0.08,
                duration: 2.4,
                ease: "none",
                stagger: { each: 0.02 },
              },
              0.35
            );
            ScrollTrigger.refresh();
          });
        });
      } else {
        gsap.set(".fire-passage", { visibility: "visible" });
        gsap.from([".fire-eyebrow", ".fire-passage"], {
          opacity: 0,
          y: reduced ? 0 : 18,
          duration: 0.9,
          stagger: 0.2,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-chapter="fire"
      data-marker="02 · FIRE"
      className="relative flex min-h-svh items-center justify-center overflow-hidden"
    >
      <div className="fire-art absolute inset-0">
        {/* AI generated photograph: bar at heat beside the forge fire */}
        <Image
          src="/images/fire-blade.jpg"
          alt="Steel glowing yellow hot beside the forge fire"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* sparks, drifted upward by GSAP via .spark */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1200 800"
        >
          <g fill="#f4a648">
            {[
              [180, 560, 2.0],
              [300, 610, 1.4],
              [420, 570, 2.4],
              [250, 640, 1.2],
              [520, 620, 1.6],
              [660, 650, 1.3],
              [370, 520, 1.8],
              [590, 560, 1.1],
            ].map(([x, y, r], i) => (
              <circle key={i} className="spark" cx={x} cy={y} r={r} opacity={0.9} />
            ))}
          </g>
        </svg>
      </div>
      {/* keeps the passage readable over the glow */}
      <div className="absolute inset-0 bg-ink/45" />

      <div className="relative z-10 max-w-3xl px-6 text-center md:px-10">
        <p className="fire-eyebrow eyebrow mb-8">02 · Fire</p>
        <p className="fire-passage display js-reveal text-3xl leading-snug md:text-5xl">
          The fire does not care how long you have practiced. It holds one
          narrow heat where steel becomes willing. Reach it, hold it, and the
          bar forgets what it was. Miss it, and you begin again.
        </p>
      </div>
    </section>
  );
}
