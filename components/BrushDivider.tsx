"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Abstract sumi brush stroke used as a chapter divider. Pure stroke
 * shape, no text, no pictograms. The path fill is a tapering sweep
 * drawn as a closed shape so it reads as one confident gesture.
 */
export default function BrushDivider({ flip = false }: { flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "svg",
        { opacity: 0, scaleX: 0.86 },
        {
          opacity: 1,
          scaleX: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ref.current, start: "top 80%" },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      data-cursor-zone
      className="flex items-center justify-center bg-ink py-20 md:py-28"
      aria-hidden
    >
      <svg
        viewBox="0 0 520 24"
        className="w-56 text-steel-dim opacity-60 md:w-80"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
        fill="currentColor"
      >
        {/* One tapering horizontal stroke with a dry-brush break near the end */}
        <path d="M2 13 C 90 8, 210 6, 330 9 C 390 10.5, 430 11, 452 12 C 448 13.5, 400 14.5, 330 14 C 210 13, 90 15, 4 14.5 Z" />
        <path d="M466 11.6 C 486 11.2, 502 11.4, 518 12 C 502 12.9, 486 13, 468 12.8 Z" />
      </svg>
    </div>
  );
}
