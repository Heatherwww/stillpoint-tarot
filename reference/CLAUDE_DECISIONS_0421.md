# Claude's Decisions on Codex Review (0421)

Date: 2026-04-21
Author: Claude (Opus 4.7)
Input: `reference/CODEX_REVIEW_SUMMARY 0421.md`

Heather asked me to triage Codex's findings. Codex should execute the items marked **DO** below and skip the rest until further notice.

---

## DO — execute in one PR

### 1. Fix checkout locale bug

File: `src/app/api/checkout/route.ts`

Current (lines 43–44):

```ts
success_url: `${origin}/shop?status=success`,
cancel_url: `${origin}/shop?status=cancelled`,
```

Change to:

```ts
success_url: `${origin}/${lang}/shop?status=success`,
cancel_url: `${origin}/${lang}/shop?status=cancelled`,
```

`lang` is already destructured from the request body (line 15–18). No other changes needed. Note: the legacy 301 in `next.config.ts` currently silently bounces `/shop` → `/en/shop`, which is why zh users lose locale on return — this fix resolves it.

### 2. Consolidate stale docs into AGENTS.md

Context: commit `3ff2371` already made `AGENTS.md` the single source of truth, but `README.md` and `DECISIONS.md` still describe older architecture (old routes, localStorage language behavior, placeholder card art, bilingual URL routing as "planned").

Action:

- **Delete `DECISIONS.md`** entirely. Its content is either outdated or already captured in `AGENTS.md`.
- **Slim `README.md`** to a short intro (≤15 lines): project name, one-sentence description, link to `https://www.stillpointtarot.com`, `npm run dev` / `npm run build` commands, and a pointer to `AGENTS.md` for everything else (architecture, conventions, agent guidance).

Do not duplicate architecture notes outside `AGENTS.md`. If something in README or DECISIONS is still useful and *not* already in `AGENTS.md`, move it into `AGENTS.md` before deleting.

### 3. Dynamic `<html lang>` attribute

File: `src/app/layout.tsx` (root layout currently hardcodes `lang="en"`).

Goal: the `<html lang="...">` attribute should reflect the URL locale (`en` or `zh`) before hydration, so crawlers and screen readers see the correct language on `/zh` pages without waiting for client-side sync.

Suggested approach (Codex pick whichever is cleanest in Next.js 16.2.3):

- Move the `<html>` / `<body>` shell into `src/app/[lang]/layout.tsx` and make the root `src/app/layout.tsx` a pass-through, OR
- Keep root layout but resolve the locale via route params / middleware and pass it down.

After the change:

- Remove the client-side `document.documentElement.lang` sync in `LanguageProvider` if it is no longer needed.
- Update the "Pending work" item #2 in `AGENTS.md` (mark done / remove).
- Confirm `/en` and `/zh` pages each emit the correct `<html lang>` in the static HTML (`npm run build` then inspect a generated page in `.next/server/app`).

### 4. Convert card images to WebP

Files:

- `public/cards/*.jpg` (78 images)
- `scripts/download-cards.mjs` (update if it re-downloads to jpg)
- Any `<Image src="/cards/...jpg" />` references in components

Action:

- Convert all 78 JPGs to WebP at equivalent visual quality (target ~80 quality, keep 500px width).
- Replace the JPG files with WebP (delete the JPGs — no need to keep both formats).
- Update every reference from `.jpg` to `.webp` (grep for `/cards/` and `.jpg`).
- Update `scripts/download-cards.mjs` to output webp, or add a conversion step.
- Update "Pending work" item #1 in `AGENTS.md` (mark done / remove).
- Run `npm run build` and spot-check a few card pages render correctly.

### Commit / PR

- One branch, one PR covering all four changes.
- Branch name: `codex/cleanup-0421`.
- Run `npm run build` and confirm 181 pages still generate before committing.
- Per `AGENTS.md` "MANDATORY" rule: these changes remove `DECISIONS.md`, change the root layout, and complete two "Pending work" items — update `AGENTS.md` accordingly (file structure section, architecture section if layout moves, pending work list).

---

## SKIP — do not do yet

### Shop direction on `main` (Codex priority #3)
This is a product decision Heather needs to make first (hide shop nav vs. "coming soon" state vs. ship with Stripe). Do not touch the shop UI or `src/lib/products.ts` until she decides.

### Test framework / regression coverage (Codex medium #3)
**Disagree with adding now.** Solo MVP, 181-page static build passes as validation, no team collaboration pressure. Premature. Do not add.

### Shop realism / products.ts copy (Codex medium #4)
Blocked on shop direction decision above. Defer.

### Later-phase items (AI reading, Airwallex, analytics, more SEO content)
Out of scope for this round.

---

## Summary for Codex

Four changes, one PR (`codex/cleanup-0421`):
1. Prefix checkout return URLs with `/${lang}`.
2. Delete `DECISIONS.md`, slim `README.md` to point at `AGENTS.md`.
3. Make `<html lang>` reflect URL locale (move shell into `[lang]/layout.tsx` or equivalent).
4. Convert `public/cards/*.jpg` to WebP and update all references.

Update `AGENTS.md` to reflect 2, 3, and 4. Nothing else.
