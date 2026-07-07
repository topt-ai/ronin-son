"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor trail: a thin fading line drawn behind the pointer,
 * like a blade passing through the frame. Only active over elements
 * marked with [data-cursor-zone] (hero and chapter transitions).
 * Disabled for touch pointers and reduced motion.
 */
export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!fine || reduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: { x: number; y: number; t: number }[] = [];
    let rafId = 0;

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const inZone = !!target?.closest?.("[data-cursor-zone]");
      if (inZone) {
        points.push({ x: e.clientX, y: e.clientY, t: performance.now() });
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const LIFE = 550; // ms a segment stays visible

    const draw = () => {
      const now = performance.now();
      points = points.filter((p) => now - p.t < LIFE);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 1; i < points.length; i++) {
        const a = points[i - 1];
        const b = points[i];
        // Skip jumps (cursor left the zone and came back elsewhere)
        if (b.t - a.t > 90) continue;
        const age = (now - b.t) / LIFE;
        const alpha = 0.35 * (1 - age);
        ctx.strokeStyle = `rgba(201, 205, 209, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
    />
  );
}
