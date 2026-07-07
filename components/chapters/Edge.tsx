"use client";

import { useEffect, useRef } from "react";
import { gsap, MM_CONDITIONS } from "@/lib/gsap";
import { BladeFull, BladeMacro, ZOOM_ORIGIN } from "@/components/art/EdgeArt";

/**
 * Chapter 04 · EDGE. The signature moment: a pinned, scrubbed zoom
 * that travels from the full blade into an extreme macro of the edge.
 * The full shot scales toward ZOOM_ORIGIN while the macro layer fades
 * in over it, masking the handoff.
 */
export default function Edge() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { desktop, reduced } = ctx.conditions as Record<string, boolean>;

      if (desktop) {
        gsap.set(".edge-macro", { opacity: 0 });
        gsap.set(".edge-caption-b", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=260%",
            pin: true,
            scrub: true,
          },
        });

        tl.to(".edge-full", {
          scale: 8.5,
          transformOrigin: ZOOM_ORIGIN,
          ease: "power1.in",
          duration: 3,
        })
          // caption in and out inside the same scrubbed timeline so a
          // fast scroll can never leave it stranded at the wrong opacity
          .from(".edge-caption-a", { opacity: 0, y: 16, duration: 0.35 }, 0)
          .to(".edge-caption-a", { opacity: 0, duration: 0.5 }, 0.9)
          .to(".edge-macro", { opacity: 1, duration: 0.9 }, 1.9)
          .fromTo(
            ".edge-macro",
            { scale: 1.25 },
            { scale: 1, ease: "none", duration: 1.4 },
            1.9
          )
          .to(".edge-caption-b", { opacity: 1, duration: 0.6 }, 2.6);
      } else {
        // Mobile and reduced motion: no pinned zoom. The two shots
        // stack and fade in sequence.
        gsap.set(".edge-macro", { opacity: 1, position: "relative" });
        gsap.set(".edge-caption-b", { opacity: 1 });
        gsap.from(".edge-stacked > *", {
          opacity: 0,
          y: reduced ? 0 : 24,
          duration: 0.9,
          stagger: 0.25,
          scrollTrigger: { trigger: root.current, start: "top 70%" },
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-chapter="edge"
      data-marker="04 · EDGE"
      className="relative min-h-svh overflow-hidden bg-[#050506]"
    >
      <div className="edge-stacked relative flex min-h-svh flex-col justify-center">
        <div className="edge-full absolute inset-0 max-md:relative max-md:aspect-[12/7]">
          <BladeFull />
        </div>
        <div className="edge-macro absolute inset-0 max-md:mt-6 max-md:aspect-[12/7]">
          <BladeMacro />
        </div>

        <div className="edge-caption-a pointer-events-none absolute inset-x-0 top-[16%] z-10 text-center max-md:relative max-md:top-0 max-md:order-first max-md:mb-10 max-md:px-6">
          <p className="eyebrow mb-5">04 · Edge</p>
          <h2 className="display text-4xl md:text-6xl">Look closer.</h2>
        </div>

        <div className="edge-caption-b pointer-events-none absolute inset-x-0 bottom-[12%] z-10 px-6 text-center max-md:relative max-md:bottom-0 max-md:mt-10">
          {/* dark ink on desktop: it overlays the bright edge steel */}
          <p className="body-copy mx-auto max-w-md md:font-normal md:text-[#232a30]">
            The hamon marks where hard steel meets soft. One blade, two
            tempers, ground until light has nothing left to hold on to.
          </p>
        </div>
      </div>
    </section>
  );
}
