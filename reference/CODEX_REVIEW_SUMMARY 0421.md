# Codex Review Summary

Date: 2026-04-21
Repo: `C:\Users\heather.wang\personal\tarrot`
Reviewer: Codex

## Current Project Stage

This project is beyond prototype stage and is best described as a content-complete MVP for the core tarot experience.

What is already working:

- Bilingual URL-based routing with `/en` and `/zh`
- Homepage, reading page, card library, suit landing pages, and shop page
- Full 78-card Rider-Waite-Smith dataset
- 78 real card image assets in `public/cards`
- SEO-oriented per-card pages with metadata and JSON-LD
- Sitemap and robots generation
- Static generation of 181 pages
- `npm run build` passes successfully

What is not yet production-ready:

- Payments / shop flow
- Planned AI reading integration
- Some documentation and polish items

## Key Observation

The actual codebase is ahead of some of the project docs.

`AGENTS.md` is mostly aligned with the code, but `README.md` and `DECISIONS.md` still describe older architecture and earlier product assumptions. Any future agent should trust the code and `AGENTS.md` more than the older docs unless those docs are updated.

## Concrete Findings

### 1. Checkout locale bug

File: `src/app/api/checkout/route.ts`

Issue:

- Stripe success and cancel URLs currently return users to `/shop`
- The app now uses language-prefixed routes
- This means the checkout return path drops locale context

Recommended fix:

- Change return URLs to `/${lang}/shop?status=...`

### 2. Stale project docs

Files:

- `README.md`
- `DECISIONS.md`

Issues observed:

- They still describe older route structure in places
- They still mention placeholder card art even though real card images exist
- They still mention earlier language behavior such as `localStorage`
- `DECISIONS.md` treats bilingual URL routing as planned, but it is already implemented

Recommended fix:

- Update both docs to match the actual shipped architecture
- If only one source of truth is desired, reduce duplicate architecture notes outside `AGENTS.md`

## Priority Improvements

### High priority

1. Fix checkout locale handling in `src/app/api/checkout/route.ts`
2. Update `README.md` and `DECISIONS.md` so future agents and humans are not misled
3. Decide the shop direction on `main`

Current ambiguity:

- `main` still contains Stripe checkout code
- `AGENTS.md` says payment is not wired and future direction is Airwallex
- The UI is visible, but product/payment readiness is unclear

Suggested decision:

- Either make shop intentionally functional on `main`
- Or disable/de-emphasize purchase actions until the real payment path is ready

### Medium priority

1. Make the root `<html lang>` dynamic instead of hardcoding `en`

Relevant file:

- `src/app/layout.tsx`

Context:

- Current workaround uses inner `lang` wrappers plus client-side sync
- This is acceptable short term, but not ideal for pre-hydration locale correctness

2. Optimize card images

Suggested work:

- Convert the 78 JPGs to WebP
- Verify file sizes and visual quality
- Recheck build and page rendering afterward

3. Add minimal regression coverage

Current state:

- No test framework is set up
- Build is currently the only validation step

Suggested next step:

- Add lightweight smoke coverage for routing, sitemap generation, and critical page rendering

4. Improve shop realism

Relevant file:

- `src/lib/products.ts`

Suggested work:

- Replace emoji placeholders with real product images/content
- Align shop copy with whether checkout is live, test-only, or inactive

### Later / expansion

1. Wire the paid AI reading flow
2. Complete the real payment integration path
3. Add analytics / search monitoring
4. Expand supporting SEO content such as additional spread pages or articles

## Recommended Next Actions For Claude

If Claude is continuing work, the most sensible order is:

1. Fix the checkout locale bug
2. Update stale docs
3. Clarify or simplify the shop state on `main`
4. Tackle `html lang` correctness
5. Do image optimization

## Validation Note

The following command succeeded during this review:

```bash
npm run build
```

Build result observed:

- Next.js 16.2.3
- 181 static pages generated successfully

