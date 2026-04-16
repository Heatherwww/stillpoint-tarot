@AGENTS.md

# Stillpoint Tarot — Project Guide

## What this project is

A bilingual (English / Chinese) tarot website at **https://www.stillpointtarot.com**.
Users can browse all 78 Rider-Waite-Smith cards, draw readings (single or 3-card spread),
and read rich SEO-optimized content per card. Deployed on **Vercel** from the `main` branch.

Owner: Heather Wang — new to Next.js / Tailwind, values cost clarity and hosting portability.

---

## Tech stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Next.js (App Router) | 16.2.3 |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Language | TypeScript | 5.x |
| Fonts | Inter (body) + Cormorant Garamond (display) | Google Fonts |
| Deploy | Vercel | auto-deploy on push to `main` |
| Payment (future) | Airwallex | not yet wired — see `feature/shop-and-ai-payment` branch |
| AI reading (future) | DeepSeek (`deepseek-chat`) | not yet wired — same branch |

**No test framework is set up.** Validate changes with `npm run build` (static generation of 93 pages).

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, metadata, LanguageProvider, Nav, Footer
│   ├── page.tsx             # Homepage: hero, popular cards, browse-by-suit, what-is-tarot, how-it-works, arcana
│   ├── globals.css          # Tailwind + custom CSS variables (dark theme, starfield)
│   ├── sitemap.ts           # Dynamic sitemap: static routes + all 78 card URLs
│   ├── robots.ts            # robots.txt generation
│   ├── reading/
│   │   └── page.tsx         # Interactive reading page (single / 3-card, context questions, contextual narrative)
│   ├── cards/
│   │   ├── page.tsx         # Card library: filterable grid of all 78 cards
│   │   ├── [id]/
│   │   │   ├── page.tsx     # SSG card detail: metadata, JSON-LD (Article, Breadcrumb, FAQ), renders client component
│   │   │   └── CardDetailClient.tsx  # 10-section card page + prev/next navigation
│   │   ├── major/page.tsx   # Major Arcana suit landing page
│   │   ├── wands/page.tsx   # Wands suit landing page
│   │   ├── cups/page.tsx    # Cups suit landing page
│   │   ├── swords/page.tsx  # Swords suit landing page
│   │   └── pentacles/page.tsx # Pentacles suit landing page
│   ├── shop/                # Shop page (visible but payment not wired)
│   └── api/checkout/route.ts # Stripe checkout API (inactive, will switch to Airwallex)
├── components/
│   ├── Nav.tsx              # Sticky header: logo, nav links, language toggle
│   ├── Footer.tsx           # Footer: logo, tagline, copyright
│   ├── LangToggle.tsx       # EN/中文 toggle button
│   └── SuitPage.tsx         # Shared client component for all 5 suit landing pages
├── lib/
│   ├── cards.ts             # Core data: TarotCard type, majorArcana[], minorArcana[], fullDeck[] (78 cards)
│   ├── cardExtras.ts        # Extended bilingual content: love, career, advice, yes/no, element, numerology, FAQs, related cards
│   ├── i18n.tsx             # All UI translations (EN + ZH), LanguageProvider context, useLang() hook
│   └── products.ts          # Shop product data (inactive)
public/
├── logo.png                 # Site logo (used in nav, hero, footer, favicon, OG image)
├── cards/                   # 78 card images: <card-id>.jpg (500px wide, from Wikimedia Commons)
scripts/
└── download-cards.mjs       # One-off script to download card art from Wikimedia Commons
```

---

## Key architecture decisions

### Bilingual system
- All UI strings live in `src/lib/i18n.tsx` as a flat `Dict` object (`Record<string, {en: string; zh: string}>`).
- Card data (names, keywords, meanings) is bilingual in `cards.ts` via `BilingualText` / `BilingualList`.
- Extended card content in `cardExtras.ts` is also bilingual.
- Language stored in `localStorage("lumen-lang")`, toggled via `LangToggle`.
- **No URL-based routing for language yet** (no `/zh/` prefix). Hreflang tags are set in layout metadata as a stop-gap.

### Card data flow
1. `cards.ts` exports `fullDeck: TarotCard[]` (78 cards in order: 22 Major + 14 each of Wands, Cups, Swords, Pentacles).
2. `cardExtras.ts` exports `getCardExtras(card: TarotCard): CardExtras` — Major Arcana have hand-written extras; Minor Arcana are generated from suit voice + rank phase templates via `buildMinorExtras()`.
3. Card detail pages (`[id]/page.tsx`) use both for metadata/JSON-LD (server) and `CardDetailClient.tsx` (client).

### Static generation
- All 78 card pages are statically generated via `generateStaticParams()` in `[id]/page.tsx`.
- Suit landing pages use static route folders (`cards/major/`, `cards/wands/`, etc.) which take priority over the `[id]` dynamic segment.
- `npm run build` generates 93 total pages.

### SEO
- Per-card `generateMetadata()` with targeted title, description, OG image, Twitter card, canonical URL, hreflang.
- Three JSON-LD blocks per card page: `Article`, `BreadcrumbList`, `FAQPage`.
- `CollectionPage` JSON-LD on each suit landing page.
- Google Search Console verified via `metadata.verification.google` in layout.
- Sitemap includes all static routes + all 78 card URLs.

### Reading page
- User picks spread (single / 3-card) and deck (Major only / full 78).
- Pre-draw: 3 context questions (area, situation, intent) personalize the narrative.
- Cards drawn client-side with shuffle animation.
- Narrative built from: area-specific opener → card meanings + area-specific extras (love/career/advice + yes/no) → situation bridge → intent closer.
- "Go deeper" section with contextual follow-up prompts + clarifying card draw.

---

## Git branches

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to Vercel |
| `feature/shop-and-ai-payment` | Preserved shop + AI reading code (Airwallex payment + DeepSeek API). Hidden from main until finance is set up. |

---

## How to work on this project

### Build & verify
```bash
npm run build    # Must pass — generates all 93 static pages
npm run dev      # Local dev server
```

### Adding a new i18n string
1. Add the key to `dict` in `src/lib/i18n.tsx` with both `en` and `zh` values.
2. Use it via `t("your.key")` in any client component that calls `useLang()`.
3. For server components, import `{ t }` from `@/lib/i18n` and pass the lang explicitly.

### Adding or editing card content
- **Card names, keywords, upright/reversed meanings**: edit `src/lib/cards.ts`.
- **Love, career, advice, yes/no, element, numerology, FAQs, related cards**: edit `src/lib/cardExtras.ts`.
  - Major Arcana: edit the `majorExtras` object directly.
  - Minor Arcana: edit `suitLove`, `suitCareer`, `suitAdvice`, `suitYesNo`, `rankPhase` tables in `buildMinorExtras()`.

### Adding a new page
1. Create `src/app/<route>/page.tsx`.
2. Add the route to `src/app/sitemap.ts`.
3. Add any needed i18n keys.
4. If it needs nav, add a link in `Nav.tsx`.

### Card images
- Located in `public/cards/<card-id>.jpg` (500px wide).
- Downloaded from Wikimedia Commons via `scripts/download-cards.mjs`.
- **Pending optimization**: convert to WebP for faster loading.

---

## Pending work (not yet implemented)

1. **Image optimization**: Convert 78 JPGs to WebP format for faster loading.
2. **Full bilingual URL routing**: Add `/zh/` URL prefix (currently only hreflang tags).
3. **Airwallex + DeepSeek integration**: Wire up payment and AI reading. Code preserved on `feature/shop-and-ai-payment` branch.
4. **Shop page**: Currently visible but non-functional (checkout API points to inactive Stripe). Will switch to Airwallex.

---

## Important conventions

- **Tone**: Reflective, grounded, no fortune-teller theatrics. Content reads like a thoughtful guide, not a prediction.
- **No emojis in content** unless user explicitly requests.
- **Always bilingual**: Every user-facing string must have both `en` and `zh` versions.
- **Build must pass**: Always run `npm run build` after changes. All 93 pages must generate successfully.
- **Commit to main**: Currently all work goes directly to `main` (no PR workflow).

---

## MANDATORY: Keep docs in sync

**Every commit that changes project structure, routes, data models, conventions, or pending work MUST also update CLAUDE.md and/or AGENTS.md in the same commit.**

This is not optional. Before committing, ask yourself:

1. Did I add, remove, or rename a route? → Update the route table in AGENTS.md and the file structure in CLAUDE.md.
2. Did I add or change a data type/field? → Update the data model reference in AGENTS.md.
3. Did I change how i18n, card data, or SEO works? → Update the relevant architecture section in CLAUDE.md.
4. Did I complete a pending task or add a new one? → Update the "Pending work" section in CLAUDE.md.
5. Did I add a new convention or change an existing one? → Update "Important conventions" in CLAUDE.md and/or "Things to NOT do" in AGENTS.md.
6. Did I add, merge, or delete a git branch? → Update the "Git branches" table in CLAUDE.md.
7. Did I add a new component or lib file? → Update the file structure tree in CLAUDE.md.
8. Did the total page count change? → Update the "93 pages" references in both files.

**If none of the above apply, no doc update is needed.** But when in doubt, update the docs — stale docs are worse than no docs.
