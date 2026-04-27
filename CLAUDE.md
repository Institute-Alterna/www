# Institute Alterna Website

## Project Overview

A premium, Anduril/Apple-quality website for **Institute Alterna** - a fiscally sponsored 501(c)(3) nonprofit developing computer science resources for people of all ages through programmes like AAIMUN and CHS.

**Deployment:** Vercel (static/SSG)

**Tech Stack:**
- Next.js 16 (App Router, React 19, React Compiler)
- TypeScript (strict mode)
- Tailwind CSS v4 (CSS-only config via `@theme` in `globals.css`)
- Framer Motion (scroll animations only, subtle)
- Sanity CMS (client configured but dormant - future integration)

---

## Design System

### Colour Palette

```css
--color-accent: #44940a;       /* Green - buttons, links, interactive */
--color-accent-hover: #5acc0d; /* Hover states */
--color-accent-highlight: #6ce714; /* Decorative only */
--color-black: #0d0d0d;
--color-white: #fafafa;
/* Greys: 900 (#1a1a1a), 800 (#262626), 700 (#404040), 600 (#666666), 500 (#999999), 400 (#b3b3b3), 200 (#e5e5e5), 100 (#f5f5f5) */
```

### Typography

- **Headers:** DM Sans (font-heading) - 400, 500, 600, 700
- **Body:** Onest (font-body) - 400, 500, 600
- **Code:** DM Mono (font-mono) - 400, 500

### Key Design Decisions

- Light mode primary (white/light backgrounds)
- Dark mega-menu dropdowns (Anduril-style, full-width)
- Dark footer (black bg)
- Green as accent only
- WCAG AA compliance
- British English for all content

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, Header, Footer)
│   ├── page.tsx                # Home
│   ├── globals.css             # Design system (CSS vars, @theme tokens)
│   ├── not-found.tsx           # 404
│   ├── about/page.tsx
│   ├── aaimun/page.tsx
│   ├── chs/page.tsx
│   ├── volunteer/page.tsx
│   ├── contact/page.tsx
│   ├── learning/page.tsx       # Coming soon
│   ├── privacy/page.tsx
│   ├── security/page.tsx
│   ├── alternative/page.tsx    # Coming soon placeholder
│   └── enrichment/page.tsx     # Hidden easter egg
├── components/
│   ├── ui/                     # Accordion, Badge, Button, Card, Container,
│   │                           # FadeInView, Heading, Section, StaggerContainer,
│   │                           # TallyEmbed, Text
│   ├── layout/                 # Header, MegaMenu, MobileMenu, Footer
│   └── sections/               # Hero, ProgrammeShowcase, Impact, MissionTeaser,
│                               # MissionSection, ValuesGrid, TeamSection,
│                               # ProgrammeHighlights
├── lib/
│   ├── utils.ts                # cn() helper
│   ├── types.ts                # TypeScript interfaces
│   ├── data/content.ts         # All static content (future Sanity replacement)
│   └── sanity/client.ts        # Sanity client (dormant)
└── types/
    └── sanity-image-url.d.ts

tests/
├── setup.ts
└── components/
    ├── ui/
    │   ├── Button.test.tsx
    │   └── Accordion.test.tsx
    └── layout/
        └── Header.test.tsx
```

---

## Component Architecture

### Client Components ("use client")

Only these components use client-side features:
- `Header.tsx` - scroll detection, dropdown state, easter egg tracking
- `MegaMenu.tsx` - Framer Motion enter/exit
- `MobileMenu.tsx` - overlay state, scroll lock
- `Hero.tsx` - Framer Motion entrance animation
- `FadeInView.tsx` - Framer Motion whileInView
- `StaggerContainer.tsx` - Framer Motion stagger
- `Accordion.tsx` - expand/collapse state
- `TallyEmbed.tsx` - iframe
- `enrichment/page.tsx` - animated text reveal

### Content Data

All static content lives in `src/lib/data/content.ts` with typed exports. Structured for future Sanity CMS migration - replace static exports with fetcher functions.

---

## Navigation

### Desktop

```
[alterna]          [AAIMUN▾]  [CHS▾]  [Learning]          [About▾]  [Volunteer ●]
  LEFT                      CENTRE                              RIGHT
```

- Fixed header, transparent → white/blur on scroll
- Dark mega-menu dropdowns (full-width, two-column)
- Easter egg: hover all centre nav items to reveal hidden "Research" link → /enrichment

### Mobile

- Full-screen overlay (not sidebar)
- Animated hamburger ↔ close
- Expandable sections for dropdowns
- Body scroll lock

---

## Development Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run lint         # ESLint
npm test             # Vitest (run once)
npm run test:watch   # Vitest (watch mode)
npx tsc --noEmit     # Type check
```

---

## Verification Requirements

**After every significant code change, run:**

1. `npm test` - ensure no regressions
2. `npx tsc --noEmit` - catch TypeScript errors
3. `npm run build` - verify production build
4. `npm run lint` - maintain code quality

Do not consider work complete until all steps pass.

---

## Notes for Development

1. **Tailwind v4** - no `tailwind.config.ts`. All tokens via `@theme inline` in `globals.css`
2. **Server Components by default** - only add `"use client"` when needed
3. **British English** for all content, American spelling for Tailwind utilities
4. **Content as data** - all text in `src/lib/data/content.ts`
5. **Sanity preserved but dormant** - `src/sanity/client.ts` stays for future CMS
6. **Contrast note** - `#44940a` has ~4.6:1 on `#fafafa` (passes AA for 18px+)
7. **React Compiler enabled** - avoid patterns that break React Compiler rules (no refs during render, no setState in effects)
8. **Commit often** - each component or section as a logical commit
