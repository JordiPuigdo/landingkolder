# Kölder Landing Page — CLAUDE.md

## Project Overview

High-converting landing page for **Kölder Climatització Eficient**, a Catalan company specialising in industrial/commercial refrigeration and climate control using natural refrigerants and low-charge systems.

**Live site reference:** https://kolder.cat/  
**Tech stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Server Components

---

## Brand System

### Colors
| Token | Hex | Usage |
|---|---|---|
| `kolder-dark` | `#0D1B2A` | Primary backgrounds, headings |
| `kolder-navy` | `#1B3A5C` | Secondary backgrounds, nav |
| `kolder-blue` | `#1E6FB0` | Buttons, links, highlights |
| `kolder-ice` | `#00C2D4` | Accent, CTA elements, hover states |
| `kolder-frost` | `#E8F4FD` | Light section backgrounds |
| `kolder-success` | `#10B981` | Eco/sustainability badges |
| `kolder-gray` | `#6B7280` | Body text |
| `kolder-white` | `#FFFFFF` | Text on dark backgrounds |

### Typography
- **Display/Headings:** `Inter` — weight 700/800, tracking tight
- **Body:** `Inter` — weight 400/500
- **Accent labels:** uppercase, letter-spacing wide

### Voice & Tone
- Professional but approachable
- Technical credibility without jargon overload
- Emphasis on efficiency, sustainability, reliability
- Language: **Catalan primary**, Spanish secondary

---

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Landing page — assembles all sections
│   ├── globals.css         # Tailwind base + CSS custom properties
│   └── api/
│       └── contact/
│           └── route.ts    # Contact form API endpoint
├── components/
│   ├── Navbar.tsx          # Sticky nav with CTA button
│   ├── Footer.tsx          # Links, social, legal
│   ├── sections/
│   │   ├── Hero.tsx        # Main hero — headline, subline, dual CTA
│   │   ├── SocialProof.tsx # Client logos / trust badges bar
│   │   ├── Services.tsx    # Refrigeració + Climatització cards
│   │   ├── WhyKolder.tsx   # Differentiators / value props
│   │   ├── Process.tsx     # 3-step how-it-works
│   │   ├── Testimonials.tsx# Client quotes
│   │   ├── CTABanner.tsx   # Mid-page conversion strip
│   │   └── Contact.tsx     # Lead capture form
│   └── ui/
│       ├── Button.tsx      # Primary / secondary / ghost variants
│       ├── Card.tsx        # Service / feature card
│       └── Badge.tsx       # Eco / certified / label badges
├── lib/
│   ├── constants.ts        # Copy, nav links, service data
│   └── utils.ts            # cn() helper, formatters
└── types/
    └── index.ts            # Shared TypeScript interfaces
```

---

## Conversion Strategy

The page follows a **AIDA + proof** funnel:

1. **Attention** — Hero with bold headline and visual contrast
2. **Interest** — Services section with clear differentiators
3. **Desire** — Why Kölder (eco, expertise, local trust) + Testimonials
4. **Action** — Two CTAs: *Demana pressupost* (primary) and *Truca'ns* (secondary)
5. **Trust signals** — Certifications, client logos, eco badges throughout

---

## Agents & Skills

### Available Agents (invoke via Claude Code)

#### `/agent:copy` — Copywriting Agent
Rewrites or improves landing page copy. Optimises for conversion and SEO.
- Input: section name or current copy
- Output: improved copy in Catalan/Spanish with H1/H2/body variants
- Usage: `@agent:copy Hero section — make the headline more urgent`

#### `/agent:seo` — SEO Optimisation Agent
Audits metadata, heading hierarchy, schema markup, and Core Web Vitals.
- Checks: title tags, meta descriptions, OG tags, structured data
- Usage: `@agent:seo audit all page metadata`

#### `/agent:a11y` — Accessibility Agent
Reviews WCAG 2.1 AA compliance.
- Checks: contrast ratios, ARIA labels, keyboard nav, focus management
- Usage: `@agent:a11y check contrast on Hero section`

#### `/agent:perf` — Performance Agent
Analyses bundle size, image optimisation, and LCP/CLS targets.
- Usage: `@agent:perf check image loading strategy`

#### `/agent:form` — Form & Lead Agent
Manages contact form validation, API integration, and CRM connection.
- Usage: `@agent:form add phone validation to Contact section`

---

## Skills

### `/skill:new-section`
Scaffolds a new landing page section with correct TypeScript props, Tailwind classes, and responsive layout.
```
Usage: /skill:new-section <SectionName> "<description>"
Example: /skill:new-section Pricing "Three-tier pricing cards with highlight"
```

### `/skill:brand-check`
Validates that a component uses only brand tokens (no hardcoded hex values outside `globals.css`).
```
Usage: /skill:brand-check src/components/sections/Hero.tsx
```

### `/skill:responsive-audit`
Tests a component at mobile (375px), tablet (768px), and desktop (1280px) breakpoints and reports layout issues.

### `/skill:copy-variant`
Generates A/B copy variants for a given section. Output includes 2 headline variants and 2 CTA text variants.

---

## Development Commands

```bash
npm run dev          # Start dev server on http://localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run type-check   # tsc --noEmit
```

---

## Key Decisions

- **Server Components by default** — only add `"use client"` where interactivity is needed (form, mobile menu, animations)
- **No external animation library** — use CSS transitions and Tailwind `animate-*` to keep bundle lean
- **Font loading** — `next/font/google` with `display: swap` for zero layout shift
- **Image strategy** — `next/image` with explicit `width`/`height` and `priority` on hero image
- **Form handling** — native `fetch` to `/api/contact` route, no third-party form library
- **Contact API** — currently logs to console; swap `// TODO` for Resend / Nodemailer / CRM webhook

---

## Environment Variables

```env
# .env.local
CONTACT_EMAIL=info@kolder.cat
RESEND_API_KEY=           # Optional: email delivery
NEXT_PUBLIC_GTM_ID=       # Optional: Google Tag Manager
```

---

## TODO / Backlog

- [ ] Add real client logos to SocialProof section
- [ ] Add real testimonials with photos
- [ ] Integrate Resend for contact form emails
- [ ] Add Google Analytics / GTM
- [ ] Add structured data (LocalBusiness schema)
- [ ] Spanish language toggle
- [ ] Add real project gallery / before-after photos
- [ ] Cookie consent banner (RGPD)
