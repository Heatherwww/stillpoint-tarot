# Stillpoint Tarot — Agent & Project Guide

This is the single source of truth for any AI coding agent working on this repo (Claude Code, Codex, or others). `CLAUDE.md` imports this file.

## Next.js version warning

This project uses **Next.js 16.2.3** — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any Next.js code. Heed deprecation notices.

## What this project is

A bilingual (English / Chinese) tarot website at **https://www.stillpointtarot.com**. Users can browse all 78 Rider-Waite-Smith cards, draw readings (single or 3-card spread), and read rich SEO-optimized content per card. Deployed on **Vercel** from the `main` branch.

Owner: Heather Wang — new to Next.js / Tailwind, values cost clarity and hosting portability.

## Tech stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Next.js (App Router) | 16.2.3 |
| React | React | 19.2.4 |
| Styling | Tailwind CSS | 4.x |
| Language | TypeScript | 5.x |
| Fonts | Inter (body) + Cormorant Garamond (display) | Google Fonts |
| Deploy | Vercel | auto-deploy on push to `main` |
| Payment (future) | Airwallex | not yet wired — see `feature/shop-and-ai-payment` |
| AI reading (future) | DeepSeek (`deepseek-chat`) | not yet wired — same branch |

**No test framework is set up.** Validate changes with `npm run build` (static generation of 205 pages).

## Before making any change

1. **Read this file in full** — it contains the architecture, data flow, file map, and conventions.
2. **Run `npm run build`** after every change. The build statically generates 205 pages ({en,zh} × most routes + 156 card pages + 24 guide pages). If any page fails, the build fails. This is the only validation step (no test suite).
3. **All user-facing text must be bilingual** (English + Chinese). Add keys to `src/lib/i18n.tsx`. Card content goes in `src/lib/cards.ts` or `src/lib/cardExtras.ts`.

## Project structure

```
src/
├── app/
│   ├── globals.css          # Tailwind + custom CSS variables (dark theme, starfield)
│   ├── sitemap.ts           # Dynamic sitemap: all routes × {en, zh} with hreflang
│   ├── robots.ts            # robots.txt generation
│   ├── api/checkout/route.ts # Stripe checkout API (inactive, will switch to Airwallex)
│   ├── (redirect)/
│   │   ├── layout.tsx       # Root layout for `/` redirect
│   │   └── page.tsx         # / → redirects to /en or /zh based on Accept-Language
│   └── (site)/
│       └── [lang]/          # Bilingual segment — lang ∈ {en, zh}; root layout lives here
│           ├── layout.tsx           # Root HTML shell + LanguageProvider(initialLang=lang) + Nav + Footer
│           ├── _routeMeta.ts        # Shared helper for page-level metadata/canonical/OG config
│           ├── page.tsx             # Homepage server wrapper: metadata + WebSite/Organization JSON-LD
│           ├── HomePageClient.tsx   # Homepage UI client component
│           ├── guides/
│           │   └── [slug]/
│           │       └── page.tsx     # SSG guide hubs: metadata + Article/Breadcrumb/FAQ JSON-LD
│           ├── reading/
│           │   ├── layout.tsx       # Reading page metadata
│           │   └── page.tsx         # Interactive reading page
│           ├── cards/
│           │   ├── page.tsx             # Card library server wrapper: metadata + CollectionPage JSON-LD
│           │   ├── CardsIndexClient.tsx # Card library UI client component
│           │   ├── _suitMeta.ts         # buildSuitMetadata() helper
│           │   ├── [id]/
│           │   │   ├── page.tsx             # SSG card detail: metadata + JSON-LD
│           │   │   └── CardDetailClient.tsx # 10-section card page + prev/next
│           │   ├── major/page.tsx
│           │   ├── wands/page.tsx
│           │   ├── cups/page.tsx
│           │   ├── swords/page.tsx
│           │   └── pentacles/page.tsx
│           └── shop/
│               ├── layout.tsx   # Shop metadata: noindex until payments are live
│               └── page.tsx     # Shop page (payment not wired)
├── components/
│   ├── Nav.tsx              # Sticky header: logo, nav links, language toggle
│   ├── Footer.tsx           # Footer
│   ├── GuidePage.tsx        # Shared guide page renderer
│   ├── LangToggle.tsx       # EN/中文 toggle (URL-swapping links)
│   └── SuitPage.tsx         # Shared client component for 5 suit landing pages
├── lib/
│   ├── cards.ts             # Core data: TarotCard, majorArcana, minorArcana, fullDeck (78)
│   ├── cardExtras.ts        # Extended bilingual content (love, career, FAQs, etc.)
│   ├── guideSummaries.ts    # Shared bilingual guide slugs + titles/descriptions (safe for client imports)
│   ├── guides.ts            # Shared bilingual SEO guide content + slugs/FAQs/related links
│   ├── i18n.tsx             # UI translations, LanguageProvider, useLang()
│   └── products.ts          # Shop product data (inactive)
public/
├── logo.png
├── cards/                   # 78 card images: <card-id>.jpg (500px wide)
scripts/
└── download-cards.mjs       # One-off script to fetch card art from Wikimedia Commons
```

## Key architecture decisions

### Bilingual system
- **URL-based language routing**: every page lives under `/[lang]/...` where lang is `en` or `zh`. `/` redirects to `/en` or `/zh` based on `Accept-Language`.
- The localized site uses a dynamic-segment root layout at `src/app/(site)/[lang]/layout.tsx`, so `<html lang>` is correct in the initial HTML for both `/en` and `/zh`.
- `LanguageProvider` receives `initialLang` as a prop from `[lang]/layout.tsx` (derived from URL params). No localStorage, no client-side toggle state — language is the URL.
- `LangToggle` renders two `<Link>`s that swap the first path segment between `en` and `zh` using `usePathname()`.
- All UI strings live in `src/lib/i18n.tsx` as a flat `Dict` (`Record<string, {en, zh}>`).
- Card data (names, keywords, meanings) is bilingual in `cards.ts` via `BilingualText` / `BilingualList`.
- Extended card content in `cardExtras.ts` is also bilingual.
- `LanguageProvider` no longer needs client-side `document.documentElement.lang` sync because the localized root layout sets `<html lang>` server-side.

### Card data flow
1. `cards.ts` exports `fullDeck: TarotCard[]` (78 cards: 22 Major + 14 each of Wands, Cups, Swords, Pentacles).
2. `cardExtras.ts` exports `getCardExtras(card)` — Major Arcana are hand-written; Minor Arcana generated from suit voice + rank phase templates via `buildMinorExtras()`.
3. Card detail pages use both for metadata/JSON-LD (server) and `CardDetailClient.tsx` (client).

### Static generation
- `src/app/(site)/[lang]/layout.tsx` `generateStaticParams()` returns `[{lang:"en"},{lang:"zh"}]`.
- `src/app/(site)/[lang]/cards/[id]/page.tsx` returns the cartesian product {en,zh} × 78 = 156 card pages.
- `src/app/(site)/[lang]/guides/[slug]/page.tsx` returns the cartesian product {en,zh} × 12 guide slugs = 24 guide pages.
- Suit landing pages use static route folders (`cards/major/`, `cards/wands/`, …) which take priority over `[id]`.
- `npm run build` generates **205 total pages**.
- Legacy URLs (`/cards`, `/cards/:id`, `/reading`, `/shop`) 301-redirect to `/en/...` via `next.config.ts` to preserve Google-indexed link equity.

### SEO
- Homepage, card library, and reading routes each ship page-specific metadata via `src/app/(site)/[lang]/_routeMeta.ts` rather than inheriting one generic layout title/description.
- Homepage emits `WebSite` + `Organization` JSON-LD; card library emits `CollectionPage` JSON-LD.
- Guide hubs live at static keyword-targeted slugs under `/[lang]/guides/` and ship `Article` + `BreadcrumbList` + `FAQPage` JSON-LD per guide.
- Guide metadata and long-form content live in `src/lib/guides.ts`, while homepage/card-library/footer guide links use the lightweight `src/lib/guideSummaries.ts` export to avoid shipping long-form guide copy to the client bundle.
- Per-card `generateMetadata()` is lang-aware: bilingual title/description, `alternates.languages` (en + zh-CN + x-default), `og:locale` / `og:alternateLocale`, canonical URL pointing at the lang-specific URL.
- Card page title format targets long-tail GSC queries: `"[Card] Tarot Card Meaning — Upright, Reversed, Love & Yes or No (Yes|No|Maybe)"` / Chinese equivalent. Section H2s (e.g. `"Is Two of Swords a yes or no?"`) are generated from the card name to rank on modifier queries.
- Three JSON-LD blocks per card page: `Article`, `BreadcrumbList`, `FAQPage` — rendered in current lang with `inLanguage` set.
- `CollectionPage` JSON-LD on each suit landing page, lang-aware.
- Minor Arcana FAQ generator emits 6 entries tuned for GSC long-tails: *"Is the [Card] a yes or no?"*, *"[Card] upright — yes or no in love?"*, *"[Card] reversed in love?"*, *"What kind of person does [Card] represent?"*, plus general + reversed. Major Arcana have hand-written FAQs in `majorExtras`.
- Google Search Console verified via `metadata.verification.google` in root layout.
- Sitemap emits every route × 2 locales with hreflang alternates per entry.
- `/[lang]/shop` is intentionally omitted from the sitemap and marked `noindex` until payments are wired.

### Reading page
- User picks spread (single / 3-card) and deck (Major only / full 78).
- Pre-draw: 3 context questions (area, situation, intent) personalize the narrative.
- Cards drawn client-side with shuffle animation.
- Narrative: area-specific opener → card meanings + area extras (love/career/advice + yes/no) → situation bridge → intent closer.
- "Go deeper" section with contextual follow-up prompts + clarifying card draw.

## Route structure

| Route | Type | Description |
|-------|------|-------------|
| `/` | Dynamic | Server redirect to `/en` or `/zh` based on `Accept-Language` |
| `/[lang]` | SSG (2) | Homepage hub, per locale |
| `/[lang]/guides/[slug]` | SSG (24) | SEO guide hubs for broader search intent |
| `/[lang]/reading` | SSG (2) | Interactive reading page |
| `/[lang]/cards` | SSG (2) | Filterable card library |
| `/[lang]/cards/[id]` | SSG (156) | Individual card detail (78 × 2 locales) |
| `/[lang]/cards/major` | SSG (2) | Major Arcana landing |
| `/[lang]/cards/wands` | SSG (2) | Wands landing |
| `/[lang]/cards/cups` | SSG (2) | Cups landing |
| `/[lang]/cards/swords` | SSG (2) | Swords landing |
| `/[lang]/cards/pentacles` | SSG (2) | Pentacles landing |
| `/[lang]/shop` | SSG (2) | Shop preview only (payment not wired, `noindex`) |
| `/sitemap.xml` | Generated | XML sitemap (all locales, with hreflang alternates) |
| `/robots.txt` | Generated | robots.txt |

**Legacy 301 redirects** in `next.config.ts`: `/cards`, `/cards/:id`, `/reading`, `/shop` → `/en/...`.

**Important**: Suit landing pages use static route folders (`cards/major/`) not a dynamic `[suit]` segment, because static routes take priority over `[id]` in Next.js App Router.

## Data model quick reference

```
TarotCard {
  id: string              // e.g. "the-fool", "three-of-wands"
  name: {en, zh}
  arcana: "major" | "minor"
  suit?: "wands" | "cups" | "swords" | "pentacles"
  number?: number
  keywords: {en: string[], zh: string[]}
  upright: {en, zh}
  reversed: {en, zh}
}

CardExtras {
  inLove: {en, zh}
  inCareer: {en, zh}
  advice: {en, zh}
  yesNo: { answer: "yes"|"no"|"maybe", explain: {en, zh} }
  element?: {en, zh}
  numerology?: {en, zh}
  faqs: Array<{ q: {en, zh}, a: {en, zh} }>
  related: string[]       // card IDs
}
```

- `fullDeck` (78 cards) exported from `src/lib/cards.ts`, ordered: 22 Major, then Wands, Cups, Swords, Pentacles (14 each).
- `getCardExtras(card)` from `src/lib/cardExtras.ts` returns extended content.

## Code style and patterns

- Components are either server components (default in App Router) or client components (marked `"use client"`).
- Client components use `useLang()` hook from `@/lib/i18n` for translations.
- Server components import `{ t }` function directly and pass `lang` as a parameter.
- Tailwind classes use the project's custom design tokens: `bg-background`, `bg-surface`, `bg-surface-muted`, `text-foreground`, `text-muted`, `text-primary`, `text-accent`, `border-border`, `bg-primary`, `bg-primary-hover`, `font-serif-display` (Cormorant Garamond).
- Card images are at `public/cards/<card-id>.webp` and referenced as `/cards/<card-id>.webp`.

## Common tasks

### Edit a card's detail page layout
Edit `src/app/(site)/[lang]/cards/[id]/CardDetailClient.tsx`. Bilingual H2s are driven by `lang` prop.

### Edit card page metadata / SEO
Edit `src/app/(site)/[lang]/cards/[id]/page.tsx`. Contains bilingual `generateMetadata()` (with hreflang) and three JSON-LD script blocks.

### Edit the reading experience
Edit `src/app/(site)/[lang]/reading/page.tsx`. Large client component (~500 lines): spread selection, context questions, card drawing, narrative generation.

### Edit homepage sections
Edit `src/app/(site)/[lang]/HomePageClient.tsx` for UI and `src/app/(site)/[lang]/page.tsx` for homepage metadata / JSON-LD. (The root `/` redirect lives in `src/app/(redirect)/page.tsx`.)

### Edit card library UI / SEO
Edit `src/app/(site)/[lang]/cards/CardsIndexClient.tsx` for the filterable grid and `src/app/(site)/[lang]/cards/page.tsx` for metadata / `CollectionPage` JSON-LD.

### Add or edit guide content
Edit `src/lib/guides.ts` for bilingual guide copy, FAQs, related cards, and inter-guide links. Edit `src/lib/guideSummaries.ts` when changing shared guide slugs, titles, or descriptions used by client components and sitemap. Edit `src/app/(site)/[lang]/guides/[slug]/page.tsx` for guide-route metadata / JSON-LD and `src/components/GuidePage.tsx` for guide layout.

### Add a suit landing page
Use the shared `SuitPage` component from `src/components/SuitPage.tsx`. Build metadata via `buildSuitMetadata()` in `src/app/(site)/[lang]/cards/_suitMeta.ts`. Add the route to `sitemap.ts`.

### Add a new i18n string
1. Add the key to `dict` in `src/lib/i18n.tsx` with both `en` and `zh` values.
2. Use via `t("your.key")` in any client component that calls `useLang()`.
3. For server components, import `{ t }` from `@/lib/i18n` and pass the lang explicitly.

### Add or edit card content
- **Card names, keywords, upright/reversed meanings**: edit `src/lib/cards.ts`.
- **Love, career, advice, yes/no, element, numerology, FAQs, related cards**: edit `src/lib/cardExtras.ts`. Major → `majorExtras` directly; Minor → the suit/rank tables inside `buildMinorExtras()`.

## Multi-agent workflow

Multiple AI agents (Claude Code, Codex, others) can work on this repo. Rules to avoid collisions:

- **One shared brief**: this file. Both agents read it. If you need agent-specific guidance, add a `## Claude-specific` or `## Codex-specific` section here rather than splitting docs.
- **Branch naming**: prefix with the agent — `claude/<short-name>` or `codex/<short-name>`. Keeps attribution clear and prevents accidental overlap.
- **Worktree per task**: each branch gets its own worktree under `.claude/worktrees/` (Claude) or your equivalent. Never edit the same files from two worktrees at once.
- **Commits**: whoever ships a structural change updates this file in the same commit (see "MANDATORY" section below).
- **Handoff**: when asking a second agent to continue work, link the branch + the PR or commit range — don't assume shared memory.
- **Second opinion**: it's fine to ask one agent to review another's diff before merge. Different models catch different things.

## Git branches

| Branch | Purpose |
|--------|---------|
| `main` | Production — auto-deploys to Vercel |
| `feature/shop-and-ai-payment` | Preserved shop + AI reading code (Airwallex + DeepSeek). Hidden from main until finance is set up. |

Short-lived feature branches should follow `claude/<name>` or `codex/<name>` and be deleted after merge.

## Pending work

1. **Airwallex + DeepSeek integration**: wire up payment and AI reading. Code preserved on `feature/shop-and-ai-payment`.
2. **Shop page**: currently visible but non-functional (checkout API points to inactive Stripe). It is `noindex` and excluded from the sitemap until Airwallex is wired.

## Important conventions

- **Tone**: reflective, grounded, no fortune-teller theatrics. Content reads like a thoughtful guide, not a prediction.
- **No emojis in content** unless the user explicitly requests.
- **Always bilingual**: every user-facing string needs both `en` and `zh`.
- **Build must pass**: always run `npm run build` after changes. All 205 pages must generate successfully.
- **Every internal `<Link href>` must be lang-prefixed**: use `` `/${lang}/...` `` (from `useLang()` in client components, or route params in server components). An unprefixed href lands on the root redirect.
- **Commit directly to `main`** for small changes, or via a named feature branch for larger work. No PR workflow yet.

## Things to NOT do

- **Don't create a `cards/[suit]/` dynamic route** — it conflicts with `cards/[id]/`. Use static folders.
- **Don't forget Chinese translations** — every i18n key needs both `en` and `zh`.
- **Don't use unprefixed `<Link href>`** — every internal link must start with `/${lang}/...`.
- **Don't skip `npm run build`** — it's the only validation step.
- **Don't use fortune-teller tone** — content should be reflective and grounded.
- **Don't touch the `feature/shop-and-ai-payment` branch** unless specifically asked to work on payment/AI features.
- **Don't commit structural changes without updating this file** — see below.

## MANDATORY: Update this file on every structural change

**Any commit that changes routes, data models, file structure, conventions, or pending work MUST update `AGENTS.md` in the same commit.** This rule is non-negotiable. (Because `CLAUDE.md` imports this file, both agents see the update.)

Checklist before every commit:
- [ ] New/removed/renamed route? → Update route table + file structure
- [ ] New/changed data type or field? → Update data model reference
- [ ] New/removed component or lib file? → Update file structure
- [ ] Changed architecture (i18n, SEO, data flow, etc.)? → Update architecture section
- [ ] Completed or added a pending task? → Update "Pending work"
- [ ] Changed total page count? → Update the page-count references
- [ ] New convention or rule? → Update "Important conventions" / "Things to NOT do"
- [ ] Branch created/merged/deleted? → Update "Git branches" table

If none apply, no update needed. **When in doubt, update — stale docs are worse than no docs.**
