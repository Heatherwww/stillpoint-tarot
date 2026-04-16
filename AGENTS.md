# Agent instructions for Stillpoint Tarot

<!-- BEGIN:nextjs-agent-rules -->
## Next.js version warning

This project uses **Next.js 16.2.3** — APIs, conventions, and file structure may differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Before making any change

1. **Read the full CLAUDE.md** — it contains the project architecture, data flow, file map, and conventions.
2. **Run `npm run build`** after every change. The build statically generates 93 pages. If any page fails, the build fails. This is the only validation step (no test suite).
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
| `/` | Static | Homepage hub |
| `/reading` | Static | Interactive reading page |
| `/cards` | Static | Filterable card library |
| `/cards/[id]` | SSG (78 pages) | Individual card detail |
| `/cards/major` | Static | Major Arcana landing |
| `/cards/wands` | Static | Wands landing |
| `/cards/cups` | Static | Cups landing |
| `/cards/swords` | Static | Swords landing |
| `/cards/pentacles` | Static | Pentacles landing |
| `/shop` | Static | Shop (payment not wired) |
| `/sitemap.xml` | Generated | XML sitemap |
| `/robots.txt` | Generated | robots.txt |

**Important**: Suit landing pages use static route folders (`cards/major/`) not a dynamic `[suit]` segment, because static routes take priority over `[id]` in Next.js App Router.

## Common tasks

### Edit a card's detail page layout
Edit `src/app/cards/[id]/CardDetailClient.tsx`. It has 10 sections: breadcrumb, hero, at-a-glance, upright, reversed, love, career, advice, yes/no, related cards, FAQ, prev/next nav, CTA.

### Edit card page metadata / SEO
Edit `src/app/cards/[id]/page.tsx`. It contains `generateMetadata()` and three JSON-LD script blocks.

### Edit the reading experience
Edit `src/app/reading/page.tsx`. It's a large client component (~500 lines) handling spread selection, context questions, card drawing with animation, and narrative generation.

### Edit homepage sections
Edit `src/app/page.tsx`. Sections: hero, popular cards, browse by suit, what-is-tarot, how-it-works, two-halves-of-deck.

### Add a suit landing page
Use the shared `SuitPage` component from `src/components/SuitPage.tsx`. See any existing suit page (e.g., `src/app/cards/wands/page.tsx`) as a template. Remember to add the route to `sitemap.ts`.

## Things to NOT do

- **Don't create a `cards/[suit]/` dynamic route** — it conflicts with `cards/[id]/`. Use static folders.
- **Don't forget Chinese translations** — every i18n key needs both `en` and `zh`.
- **Don't skip `npm run build`** — it's the only way to verify correctness.
- **Don't use fortune-teller tone** — content should be reflective and grounded.
- **Don't touch the `feature/shop-and-ai-payment` branch** unless specifically asked to work on payment/AI features.
