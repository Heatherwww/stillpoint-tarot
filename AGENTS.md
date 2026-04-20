# Agent instructions for Stillpoint Tarot

<!-- BEGIN:nextjs-agent-rules -->
## Next.js version warning

This project uses **Next.js 16.2.3** — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Before making any change

1. **Read the full CLAUDE.md** — it contains the project architecture, data flow, file map, and conventions.
2. **Run `npm run build`** after every change. The build statically generates 181 pages ({en,zh} × most routes + 156 card pages). If any page fails, the build fails. This is the only validation step (no test suite).
3. **All user-facing text must be bilingual** (English + Chinese). Add keys to `src/lib/i18n.tsx`. Card content goes in `src/lib/cards.ts` or `src/lib/cardExtras.ts`.

## Code style and patterns

- Components are either server components (default in App Router) or client components (marked `"use client"`).
- Client components use `useLang()` hook from `@/lib/i18n` for translations.
- Server components (like `[id]/page.tsx`) import `{ t }` function directly and pass `lang` as a parameter.
- Tailwind classes use the project's custom design tokens: `bg-background`, `bg-surface`, `bg-surface-muted`, `text-foreground`, `text-muted`, `text-primary`, `text-accent`, `border-border`, `bg-primary`, `bg-primary-hover`, `font-serif-display` (Cormorant Garamond).
- Card images are at `public/cards/<card-id>.jpg` and referenced as `/cards/<card-id>.jpg`.

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

- `fullDeck` (78 cards) is exported from `src/lib/cards.ts`, ordered: 22 Major, then Wands, Cups, Swords, Pentacles (14 each).
- `getCardExtras(card)` from `src/lib/cardExtras.ts` returns extended content. Major Arcana extras are hand-written; Minor Arcana are template-generated.

## Route structure

| Route | Type | Description |
|-------|------|-------------|
| `/` | Dynamic | Server redirect to `/en` or `/zh` based on `Accept-Language` |
| `/[lang]` | SSG (2) | Homepage hub, per locale |
| `/[lang]/reading` | SSG (2) | Interactive reading page |
| `/[lang]/cards` | SSG (2) | Filterable card library |
| `/[lang]/cards/[id]` | SSG (156) | Individual card detail (78 cards × 2 locales) |
| `/[lang]/cards/major` | SSG (2) | Major Arcana landing |
| `/[lang]/cards/wands` | SSG (2) | Wands landing |
| `/[lang]/cards/cups` | SSG (2) | Cups landing |
| `/[lang]/cards/swords` | SSG (2) | Swords landing |
| `/[lang]/cards/pentacles` | SSG (2) | Pentacles landing |
| `/[lang]/shop` | SSG (2) | Shop (payment not wired) |
| `/sitemap.xml` | Generated | XML sitemap (all locales, with hreflang alternates) |
| `/robots.txt` | Generated | robots.txt |

**Legacy redirects** (301 in `next.config.ts`): `/cards`, `/cards/:id`, `/reading`, `/shop` → `/en/...` to preserve Google-indexed URLs.

**Important**: Suit landing pages use static route folders (`cards/major/`) not a dynamic `[suit]` segment, because static routes take priority over `[id]` in Next.js App Router.

## Common tasks

### Edit a card's detail page layout
Edit `src/app/[lang]/cards/[id]/CardDetailClient.tsx`. Bilingual H2s are driven by `lang` prop. Sections: breadcrumb, hero, at-a-glance, upright, reversed, love, career, advice, yes/no, related cards, FAQ, prev/next nav, CTA.

### Edit card page metadata / SEO
Edit `src/app/[lang]/cards/[id]/page.tsx`. It contains bilingual `generateMetadata()` (with `alternates.languages` hreflang) and three JSON-LD script blocks (Article, BreadcrumbList, FAQPage).

### Edit the reading experience
Edit `src/app/[lang]/reading/page.tsx`. It's a large client component (~500 lines) handling spread selection, context questions, card drawing with animation, and narrative generation.

### Edit homepage sections
Edit `src/app/[lang]/page.tsx`. Sections: hero, popular cards, browse by suit, what-is-tarot, how-it-works, two-halves-of-deck. (The root `src/app/page.tsx` is just an Accept-Language redirect.)

### Add a suit landing page
Use the shared `SuitPage` component from `src/components/SuitPage.tsx`. See any existing suit page (e.g., `src/app/[lang]/cards/wands/page.tsx`) as a template. Build metadata via `buildSuitMetadata()` in `src/app/[lang]/cards/_suitMeta.ts`. Remember to add the route to `sitemap.ts`.

## Things to NOT do

- **Don't create a `cards/[suit]/` dynamic route** — it conflicts with `cards/[id]/`. Use static folders.
- **Don't forget Chinese translations** — every i18n key needs both `en` and `zh`.
- **Don't use unprefixed `<Link href>`** — every internal link must start with `/${lang}/...`. Unprefixed hrefs land on the root redirect and bounce the user.
- **Don't skip `npm run build`** — it's the only way to verify correctness.
- **Don't use fortune-teller tone** — content should be reflective and grounded.
- **Don't touch the `feature/shop-and-ai-payment` branch** unless specifically asked to work on payment/AI features.
- **Don't commit structural changes without updating docs** — see below.

## MANDATORY: Update docs on every structural change

**Any commit that changes routes, data models, file structure, conventions, or pending work MUST update CLAUDE.md and/or AGENTS.md in the same commit.** This rule is non-negotiable.

Checklist before every commit:
- [ ] New/removed/renamed route? → Update route table here + file structure in CLAUDE.md
- [ ] New/changed data type or field? → Update data model reference here
- [ ] New/removed component or lib file? → Update file structure in CLAUDE.md
- [ ] Changed architecture (i18n, SEO, data flow, etc.)? → Update CLAUDE.md architecture section
- [ ] Completed or added a pending task? → Update CLAUDE.md "Pending work" section
- [ ] Changed total page count? → Update "181 pages" references in both files
- [ ] New convention or rule? → Update CLAUDE.md conventions + "Things to NOT do" here
- [ ] Branch created/merged/deleted? → Update CLAUDE.md git branches table

If none apply, no update needed. **When in doubt, update — stale docs are worse than no docs.**
