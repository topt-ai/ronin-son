"use client";

import { useEffect, useState } from "react";

/**
 * Fixed monospace marker, bottom left: "02 · FIRE". Reads sections
 * tagged with data-marker as they enter the viewport. Hidden on mobile.
 */
export default function ChapterMarker() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-marker]")
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setLabel(entry.target.getAttribute("data-marker") ?? "");
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      className="eyebrow pointer-events-none fixed bottom-8 left-8 z-30 hidden transition-opacity duration-700 md:block"
      style={{ opacity: label ? 0.85 : 0 }}
    >
      {label}
    </div>
  );
}
