# HAMPI — STONE REMEMBERS

## Vision
A premium, award-winning editorial landing page for a fictional cultural heritage experience called "HAMPI — STONE REMEMBERS". It serves as a living time machine, presenting Hampi's architecture, culture, and legacy as a cinematic digital experience rather than a standard tourism website.

## Core Value
To provide an extremely premium, cinematic, and immersive digital museum/luxury editorial experience that visually and narratively brings the historical Vijayanagara empire to life.

## Target Users
Culture enthusiasts, design aficionados, and history lovers seeking an immersive and luxury digital experience exploring world heritage.

## Technical Context
- **Stack:** React, TypeScript, Tailwind CSS, shadcn/ui.
- **Future Integration Ready:** GSAP ScrollTrigger, Lenis (smooth scrolling), and Spline 3D.
- **Styling constraints:** Deep obsidian background (#0B0F19), warm sandstone/bronze accents, restrained saffron-gold accents. Highly spacious, no generic SaaS styles, no excessive rounded cards, no colorful AI gradients, no stock-photo-tourism aesthetic.

## Requirements

### Validated
(None yet — ship to validate)

### Active
- [ ] Implement cinematic hero section with fluid typography and a specific Spline 3D placeholder (`<div id="spline-hero"></div>`) taking ~55% viewport.
- [ ] Implement minimal floating navigation.
- [ ] Implement a horizontal "TIME-WEAVE" progress indicator.
- [ ] Build the "THE CITY IN STONE" editorial bento grid with 6 distinct cards.
- [ ] Build the "AN EMPIRE BUILT IN STONE" pinned-scroll storytelling section (3 chapters with placeholders).
- [ ] Implement sophisticated hover states and subtle 3D transforms (`translate3d()`).
- [ ] Final CTA section and Footer.
- [ ] Ensure fully responsive, premium editorial layout.

### Out of Scope
- Actual implementation of the Spline 3D scene (only placing the exact container placeholder).
- Full GSAP/Lenis implementation for this phase (only structural readiness).

## Key Decisions

| Decision | Source | Rationale | Outcome |
|----------|--------|-----------|---------|
| React + TS + Tailwind | User | Requested tech stack | Decided |
| Visual Direction | User | Strict requirement for premium cinematic feel | Decided |

---
*Last updated: 2026-09-12 after initialization*
