# Project Decisions & Roadmap

A running log of what we've agreed to do, what we've already done, and what's still ahead. Update as we go.

---

## Decided & done

### Stack & deployment
- **Next.js + Tailwind CSS** chosen as the stack (free, deploys well to Vercel).
- **Deploy target:** Vercel free tier. Hostinger shared hosting can't run Next.js server features (dynamic reading, Stripe API), so the plan is to deploy on Vercel and point a Hostinger-purchased domain at it later.
- **TypeScript + App Router + ESLint + src dir + `@/*` import alias** — chosen via `create-next-app`.

### Content & languages
- **Bilingual from day one:** English + 中文 (Simplified Chinese). Toggle persists in `localStorage`.
- All UI strings, card meanings, product descriptions, and template fragments are written in both languages and kept in sync.

### Visual design
- **Minimalist modern purple** with serif display headings (Cormorant Garamond) and a soft antique-gold accent.
- Theme tokens centralized in `src/app/globals.css` so the palette can be swapped in one place.

### Reading page
- Two spreads: **single card** + **3-card past/present/future**.
- Two deck options: **22 Major Arcana** or **full 78-card Rider-Waite-Smith deck**.
- Cards can come up upright or reversed (50/50).
- **Pre-reading questions** (3, all required): area of life, what is happening, what you want from the reading.
- **Reading is assembled around the answers**: area-specific opener → cards → situation bridge → intent-specific closer.
- **Three follow-up actions** after the cards: "how does this apply to my question," "one small next step," "draw a clarifying card."
- **Locked teaser at the bottom** previewing the future paid AI tier.
- All 78 cards have hand-written upright + reversed meanings + 4 keywords each, in both EN and ZH.

### Shop page
- Mock products only for now (candles, crystals, palo santo, linen cloth, incense, journal).
- **Stripe Checkout in test mode** wired up via `/api/checkout` route. Requires `STRIPE_SECRET_KEY` env var (test key during development, live key when launching).
- User does not yet have a Stripe account — will set up later.

### Brand name
- **Stillpoint Tarot · 静点塔罗** chosen as the brand.
- Domain: **`stillpointtarot.net`** preferred (.com not available). Avoid hyphens. `.org` rejected (signals nonprofit, conflicts with selling products).
- Code still says "Lumen Tarot" — will be swapped to Stillpoint once domain is confirmed and purchased.

### Ecommerce strategy (dropshipping, phased)
- **Business model:** Dropshipping. Customer pays via Stripe on our site → we forward the order to a supplier → supplier ships directly to the customer. We never hold inventory.
- **Phase 1 — Manual (start here):** Keep mock products in the code, replace with real products when supplier is chosen. Stripe sends email on every payment. Forward orders to the supplier manually (e.g. AliExpress, CJdropshipping). Good enough for 0–5 orders/day. No code changes needed beyond updating `src/lib/products.ts` with real product info.
- **Phase 2 — Order dashboard:** Add Stripe webhook to capture successful payments + save order details (product, customer address, amount) to a database or Google Sheet. Gives a central view of what needs to be fulfilled. Still forward to supplier manually. Build when order volume makes Phase 1 painful.
- **Phase 3 — Automated:** Integrate a dropshipping platform API (Printful for custom items, CJdropshipping for generic, Spocket/Zendrop for Western suppliers). Payment → auto-forward → auto-ship → tracking number sent to customer. Build when volume justifies the platform subscription.
- **Current state:** Phase 0 — mock products, test-mode Stripe, no real supplier yet. Products file is `src/lib/products.ts`; edit names/descriptions/prices there when ready.

### Git
- Local git only for now (option 1 from the conversation: "save locally, can upgrade to GitHub later").
- Global git identity set: `Heather Wang <wangrhheather@gmail.com>`.
- Commits:
  1. `Build initial Lumen Tarot site`
  2. `Expand reading depth and add choice guidance`
  3. `Make readings interactive with pre-questions and follow-ups`
  4. `Add card library SEO pages and decisions tracker`

---

### Card library SEO pages (done)
- New route `/cards` — index of all 78 cards, filterable by Major/Minor and by suit.
- New route `/cards/[id]` — one detail page per card (e.g. `/cards/the-fool`).
- 78 cards × bilingual rendering = **156 indexable SEO landing pages**.
- Each detail page gets proper `<title>` and `<meta description>`.
- Sitemap.xml and robots.txt generated so Google can find them.
- `/cards` added to the nav.

---

## Open decisions (waiting on you)

1. **Domain purchase** — plan is `stillpointtarot.net` (or `.com` if available). Check availability, verify trademark (USPTO + China Trademark Office), then buy via Cloudflare Registrar or Namecheap.
2. **Stripe account** — will create when ready to test the shop end-to-end. Test mode is risk-free; sign up at stripe.com/register.
3. **GitHub** — currently local git only. Can be added later without losing history (option 2 upgrade from earlier conversation).
4. **Tarot card art** — currently styled placeholder backs with the card name. Real artwork (or generated art) can drop in later; one block in `src/app/reading/page.tsx` swaps it out.
5. **Dropshipping supplier** — need to choose a supplier for the actual products (candles, crystals, incense, etc.). AliExpress, CJdropshipping, and Printful are top candidates depending on product type. No rush — mock products are fine until launch.

---

## Planned (not started)

In rough priority order:

### SEO & content
- **hreflang tags + bilingual URL routing** so Google serves EN to English-speakers and ZH to Chinese-speakers correctly. Likely `/zh/...` URL structure.
- **Articles/blog section** — one article per month, each targeting one long-tail keyword. First batch ideas: *"Tarot for skeptics"*, *"How to ask tarot a question"*, *"What to do when a reading scares you"*, *"塔罗牌新手十问"*.
- **More spreads:** Celtic Cross, yes/no, relationship spread, year-ahead. Each becomes its own page (`/spreads/celtic-cross`, etc.) targeting `[spread name] tarot meaning` keywords.
- **Daily card draw page** — `/daily` — targets `daily tarot card` keyword and gives visitors a reason to return.

### AI paid tier
- Replace the locked teaser panel with a **"Unlock full reading" Stripe button**.
- After payment, send the cards + answers + visitor's free-text question to **Claude API** (start with Haiku 4.5 for cost; upgrade to Sonnet for premium tier later).
- Stream back a flowing AI-written reading.
- Allow follow-up Q&A in the same session.
- **Spend protection:** rate limit per visitor, token cap per reading, balance alerts.
- Pricing TBD — likely $1–3 per reading or a small subscription.

### Real Stripe + dropshipping wiring
- Sign up at stripe.com.
- Add real test key to `.env.local`.
- Verify checkout flow end-to-end.
- When ready to launch: complete Stripe identity verification, switch to live keys.
- **Phase 2 ecommerce:** Add Stripe webhook (`/api/webhook`) to capture payment events → save orders to database/sheet → manual fulfillment dashboard.
- **Phase 3 ecommerce:** Integrate dropshipping platform API (Printful/CJ/Spocket) for auto-forwarding orders post-payment.

### Deployment
- Push to GitHub.
- Connect repo to Vercel.
- Set environment variables in Vercel dashboard (`STRIPE_SECRET_KEY`, eventually `ANTHROPIC_API_KEY`).
- Buy domain.
- Point domain DNS at Vercel.

### Polish
- Real Rider-Waite-Smith card images in `public/cards/` (public domain, freely available).
- Open Graph / social share images per page.
- Favicon update from default Next.js icon.
- Analytics — recommend Plausible or Vercel Analytics (privacy-friendly, no cookie banner needed).

---

## Won't do (rejected ideas)

- **Pull requests / GitHub flow** — overkill for a solo project. Direct commits to `master` are fine.
- **Hostinger shared hosting** for the live app — can't run Next.js server features. Static export would lose the dynamic reading and Stripe API. Vercel free tier is the right call.
- **Full custom Celtic Cross spread in v1** — out of scope for now; can come later as part of "more spreads."

---

## Notes for future me

- **Theme palette swap** is one variable change in `src/app/globals.css` — try alternates fast if "minimalist purple" stops feeling right.
- **Card data** in `src/lib/cards.ts` is the source of truth for both the reading page and (soon) the card library pages. Edit meanings there and they update everywhere.
- **i18n strings** in `src/lib/i18n.tsx` — one big dictionary, all UI text. Add new keys here, not in components.
- **Mock product data** in `src/lib/products.ts` — same source for shop page and Stripe checkout API. When switching to real dropshipping products, edit this file only: update names, descriptions, prices, and swap emoji placeholders for image paths.
- **Ecommerce phases** are in the "Decided & done" section. Don't jump to Phase 2/3 until Phase 1 (manual) proves there's real order volume.
