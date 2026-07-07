import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };

/**
 * Shared matchMedia conditions.
 * - desktop: full choreography (pins, scrubs)
 * - mobileMotion: simplified one time reveals, no pinning
 * - reduced: opacity fades only, per prefers-reduced-motion
 */
export const MM_CONDITIONS = {
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  mobileMotion: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;
