"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, MM_CONDITIONS } from "@/lib/gsap";

/**
 * Chapter 05 · SAYA. The calm close: sword at rest, gold returns,
 * one time reveals only, then a quiet signature. No pin, no sale.
 */
export default function Saya() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia(root);

    mm.add(MM_CONDITIONS, (ctx) => {
      const { reduced } = ctx.conditions as Record<string, boolean>;
      gsap.from(".saya-reveal", {
        opacity: 0,
        y: reduced ? 0 : 26,
        duration: 1.2,
        stagger: 0.22,
        ease: "power2.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(".saya-credits", {
        opacity: 0,
        duration: 1.4,
        scrollTrigger: { trigger: ".saya-credits", start: "top 92%" },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-chapter="saya"
      data-marker="05 · SAYA"
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-ink"
    >
      <div className="mx-auto w-full max-w-5xl px-6 py-28 text-center md:px-10">
        <p className="saya-reveal eyebrow mb-8">05 · Saya</p>
        <h2 className="saya-reveal display mb-16 text-4xl md:text-6xl">
          The sword spends its life asleep.
        </h2>

        {/* AI generated photograph: the finished sword at rest. A
            gentler crop than a full banner keeps enough space around
            the blade that its natural curve doesn't read as bent */}
        <div className="saya-reveal relative mb-16 aspect-[4/3] w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src="/images/saya-rest.jpg"
            alt="The finished katana resting in its red lacquered sheath"
            fill
            sizes="(min-width: 768px) 64rem, 100vw"
            className="object-cover object-center"
          />
        </div>

        <p className="saya-reveal body-copy mx-auto max-w-md">
          A blade that never leaves its sheath is not wasted. It is finished.
        </p>
      </div>

      {/* signature and credits: the closing shot, not a sales pitch */}
      <footer className="saya-credits border-t border-white/10 px-6 py-14 md:px-16">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              className="display text-2xl"
              style={{ color: "#b08d57" }}
            >
              Ronin &amp; Son
            </p>
            <p className="eyebrow mt-3 opacity-60">
              Forged in small numbers · Signed by hand
            </p>
          </div>
          <div className="eyebrow leading-loose opacity-40">
            <p>A story in five chapters</p>
            <p>
              Fictional site created by{" "}
              <a
                href="https://www.tuwebsv.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/30 underline-offset-2 opacity-100 transition-opacity hover:opacity-70"
              >
                Tommy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
