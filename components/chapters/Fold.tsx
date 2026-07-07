"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, MM_CONDITIONS } from "@/lib/gsap";
import FoldDiagram from "@/components/art/FoldDiagram";

/**
 * Chapter 03 · FOLD. The technical chapter: a pinned diagram whose
 * strata double while the counters climb, scrubbed by scroll.
 * Fifteen folds, 2^15 = 32,768 layers.
 */
export default function Fold() {
  const root = useRef<HTMLElement>(null);
  const [folds, setFolds] = useState(0);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { desktop, reduced } = ctx.conditions as Record<string, boolean>;

      if (desktop) {
        const state = { f: 0 };
        let last = -1;
        gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: true,
          },
        }).to(state, {
          f: 15,
          ease: "none",
          duration: 1,
          onUpdate: () => {
            const f = Math.round(state.f);
            if (f !== last) {
              last = f;
              setFolds(f);
            }
          },
        });

        gsap.from(".fold-copy > *", {
          opacity: 0,
          y: 22,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 60%" },
        });
      } else {
        // Mobile: one time count-up when the chapter enters.
        // Reduced motion: land on the final numbers immediately.
        if (reduced) {
          setFolds(15);
        } else {
          const state = { f: 0 };
          let last = -1;
          gsap.to(state, {
            f: 15,
            duration: 2.4,
            ease: "power1.inOut",
            scrollTrigger: { trigger: root.current, start: "top 65%" },
            onUpdate: () => {
              const f = Math.round(state.f);
              if (f !== last) {
                last = f;
                setFolds(f);
              }
            },
          });
        }
        gsap.from(".fold-copy", {
          opacity: 0,
          duration: 0.9,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      }
    });

    return () => mm.revert();
  }, []);

  const layers = Math.pow(2, folds);

  return (
    <section
      ref={root}
      data-chapter="fold"
      data-marker="03 · FOLD"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink-2"
    >
      {/* real damascus texture, barely there behind the drafting */}
      <Image
        src="/images/fold-texture.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-[0.14]"
      />
      <div className="relative grid w-full items-center gap-12 px-6 py-24 md:grid-cols-2 md:gap-10 md:px-16">
        <div>
          <FoldDiagram folds={folds} />
        </div>

        <div className="fold-copy max-w-md md:justify-self-end">
          <p className="eyebrow mb-6">03 · Fold</p>
          <h2 className="display mb-10 text-4xl md:text-5xl">
            Fold. Weld. Draw out. Again.
          </h2>

          <div className="mb-10 grid grid-cols-2 gap-8 border-y border-white/10 py-8">
            <div>
              <div
                className="text-5xl tabular-nums text-[#e6e9ec] md:text-6xl"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {folds}
              </div>
              <div className="eyebrow mt-3 opacity-70">Folds</div>
            </div>
            <div>
              <div
                className="text-5xl tabular-nums text-[#e6e9ec] md:text-6xl"
                style={{ fontFamily: "var(--font-jetbrains)" }}
              >
                {layers.toLocaleString("en-US")}
              </div>
              <div className="eyebrow mt-3 opacity-70">
                {layers === 1 ? "Layer" : "Layers"}
              </div>
            </div>
          </div>

          <p className="body-copy">
            Each fold doubles the layers and squeezes out what does not
            belong. Fifteen folds is not a round number chosen for effect.
            Past this point the steel stops improving, so we stop.
          </p>
        </div>
      </div>
    </section>
  );
}
