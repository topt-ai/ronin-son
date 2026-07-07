"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, MM_CONDITIONS } from "@/lib/gsap";

/**
 * Chapter 01 · STEEL. Pinned section: the plain bar crossfades through
 * a first-welds state into folded, layered metal, scrubbed by scroll.
 */
export default function Steel() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { desktop, reduced } = ctx.conditions as Record<string, boolean>;

      if (desktop) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: true,
          },
        });
        gsap.set("[data-steel='2']", { opacity: 0 });
        gsap.set("[data-steel='3']", { opacity: 0 });

        tl.to("[data-steel='2']", { opacity: 1, duration: 1, ease: "none" })
          .to(
            "[data-steel='1']",
            { opacity: 0, duration: 1, ease: "none" },
            "<0.2"
          )
          .to("[data-steel='3']", { opacity: 1, duration: 1, ease: "none" })
          .to(
            "[data-steel='2']",
            { opacity: 0, duration: 1, ease: "none" },
            "<0.2"
          )
          // slow push-in across the whole scrub
          .fromTo(
            ".steel-stack",
            { scale: 1 },
            { scale: 1.08, duration: 3, ease: "none" },
            0
          );

        gsap.from(".steel-copy > *", {
          opacity: 0,
          y: 24,
          duration: 1,
          stagger: 0.14,
          ease: "power2.out",
          scrollTrigger: { trigger: root.current, start: "top 55%" },
        });
      } else {
        // Mobile and reduced motion: show the finished folded state,
        // simple fades, no pin.
        gsap.set("[data-steel='1']", { opacity: 0 });
        gsap.set("[data-steel='2']", { opacity: 0 });
        gsap.set("[data-steel='3']", { opacity: 1 });
        gsap.from([".steel-stack", ".steel-copy"], {
          opacity: 0,
          y: reduced ? 0 : 20,
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
      data-chapter="steel"
      data-marker="01 · STEEL"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink"
    >
      <div className="grid w-full items-center gap-10 px-6 py-24 md:grid-cols-[3fr_2fr] md:gap-16 md:px-16">
        {/* AI generated photographs, shot to share framing so the
            crossfade reads as one bar transforming */}
        <div className="steel-stack relative aspect-[3/2] w-full overflow-hidden">
          <div data-steel="1" className="absolute inset-0">
            <Image
              src="/images/steel-raw.jpg"
              alt="A raw bar of tamahagane steel on dark slate"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div data-steel="2" className="absolute inset-0">
            <Image
              src="/images/steel-welded.jpg"
              alt="The billet after its first forge welds"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
          <div data-steel="3" className="absolute inset-0">
            <Image
              src="/images/steel-folded.jpg"
              alt="Folded damascus steel showing dense layered strata"
              fill
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="steel-copy max-w-md">
          <p className="eyebrow mb-6">01 · Steel</p>
          <h2 className="display mb-6 text-4xl md:text-5xl">
            It begins as a bar.
          </h2>
          <p className="body-copy">
            Tamahagane, smelted from iron sand over three days and nights. We
            choose each piece by eye, by weight, by the sound it makes when
            struck. Nothing about it is special yet.
          </p>
          <p className="body-copy mt-4">That part comes later.</p>
        </div>
      </div>
    </section>
  );
}
