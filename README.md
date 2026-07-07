# RONIN &amp; SON

A cinematic, scroll driven story site for a fictional artisan katana
forge house. The visitor follows the birth of one blade across five
chapters, each with its own color temperature and pacing.

Portfolio / demo build. Not a real client.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4
- GSAP: ScrollTrigger for pins and scrubs, SplitText for type reveals
- Lenis smooth scroll, wired into GSAP's ticker

## Chapters

| # | Chapter | Motion |
|---|---------|--------|
| 00 | Hero | SplitText character stagger on load, ambient embers |
| 01 | Steel | Pinned crossfade: raw bar to welded to folded strata, scrubbed |
| 02 | Fire | Pinned full bleed forge glow, passage reveals character by character |
| 03 | Fold | Pinned diagram, fold and layer counters climb to 15 / 32,768 |
| 04 | Edge | Pinned scrubbed zoom from full blade to extreme macro of the edge |
| · | The Work | Pinned interlude: three finished swords pass through the dark |
| 05 | Saya | Calm one time reveals, signature close, no pin |

## Motion rules

- `prefers-reduced-motion: reduce` gets plain fades: no pins, no scrubs,
  no smooth scroll, counters land on final values.
- Mobile (`< 768px`) gets simplified one time reveals instead of pins.
- The cursor trail only runs on fine pointers with motion allowed.

## Imagery

Photographs in `public/images/` are AI generated for this fictional
house and served through `next/image`. The Chapter 03 fold diagram
stays illustrated on purpose: its strata are driven by the scroll
counter, layered over a real damascus texture.

## Run

```bash
npm install
npm run dev
```

## Deploy

Push to GitHub and import into Vercel, or run `vercel --prod`.
No configuration changes needed.
