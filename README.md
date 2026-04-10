# Lumen Tarot · 流光塔罗

A small bilingual (English / 中文) tarot website with three sections:

1. **Home** — an introduction to tarot
2. **Reading** — draw a single card or a 3-card past/present/future spread, from either the 22 Major Arcana or the full 78-card Rider-Waite-Smith deck
3. **Shop** — candles, crystals, and other tools, with checkout via Stripe (test mode)

Built with Next.js + Tailwind CSS. Designed to deploy free on Vercel.

---

## Run it locally

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run dev
```

Then open <http://localhost:3000>.

## Switch language

The EN / 中文 toggle is in the top-right of every page. Your choice is remembered in your browser.

## Change the color theme

All theme colors live in one place: `src/app/globals.css`, in the `:root` block at the top. Change `--primary`, `--accent`, etc., and the whole site updates. To try a different palette, edit those values and refresh.

## Edit the cards

- Card meanings (English + Chinese, upright + reversed) are in `src/lib/cards.ts`.
- All 78 Rider-Waite-Smith cards are included. Edit any meaning to your taste.
- Card "art" is currently a styled placeholder with the card name. To add real images later, drop them in `public/cards/` and replace the placeholder block in `src/app/reading/page.tsx`.

## Edit the shop

Mock products live in `src/lib/products.ts`. Each has an id, bilingual name & description, a price (in US cents), and an emoji placeholder. Edit, add, or remove freely — the shop page and Stripe checkout pull from this same list.

## Wire up Stripe (test mode)

The shop's "Buy" button calls `/api/checkout`, which creates a Stripe Checkout session. To make it work:

1. Sign up at <https://dashboard.stripe.com/register> (free).
2. Make sure you're in **Test mode** (toggle in the top right of the dashboard).
3. Go to **Developers → API keys** and copy your **Secret key** (it starts with `sk_test_`).
4. In this project, copy `.env.local.example` to `.env.local` and paste your key:

   ```
   STRIPE_SECRET_KEY=sk_test_...
   ```

5. Restart `npm run dev`.

To test a purchase, use Stripe's test card:

- Card number: `4242 4242 4242 4242`
- Expiry: any future date
- CVC: any 3 digits
- ZIP: any

When you're ready to take real money, get a **live** secret key (`sk_live_...`) from Stripe and replace the value in `.env.local` (and in your Vercel environment variables).

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to <https://vercel.com/new> and import the repo. Vercel detects Next.js automatically.
3. Under **Environment Variables**, add `STRIPE_SECRET_KEY` with your test (or live) key.
4. Deploy. Vercel gives you a free `*.vercel.app` URL.
5. To use a custom domain (e.g. one from Hostinger), follow Vercel's domain instructions and update the DNS at Hostinger to point at Vercel.

## Note on Hostinger shared hosting

Hostinger's shared/cPanel plans only run PHP and static files — they will **not** run a Next.js server, so the dynamic reading page and the Stripe checkout API would not work there. The recommended setup is: deploy on Vercel (free), and point your Hostinger domain at Vercel.

## Project layout

```
src/
  app/
    layout.tsx          ← shared layout, fonts, language provider
    page.tsx            ← / (home / introduction)
    reading/page.tsx    ← /reading (dynamic tarot draws)
    shop/page.tsx       ← /shop (product grid + checkout button)
    api/checkout/route.ts  ← server route that creates Stripe sessions
    globals.css         ← theme tokens & global styles
  components/
    Nav.tsx
    Footer.tsx
    LangToggle.tsx
  lib/
    i18n.tsx            ← language context + UI strings
    cards.ts            ← all 78 tarot cards & meanings
    products.ts         ← mock shop catalog
```
