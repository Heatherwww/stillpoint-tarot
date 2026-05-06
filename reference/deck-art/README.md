# Stillpoint Tarot Deck Art Workflow

This folder is the working source of truth for custom card art generation.

Current direction, locked on 2026-04-29:

- Preserve Rider-Waite symbolic structure.
- Do not copy any historic artwork exactly.
- Rebuild the visual language in a Stillpoint-specific style: reflective, grounded, quiet, luminous.
- Keep generated art text-free. Card titles and numbering stay in the site UI.

## Why this direction

For this project, preserve-structure is the safest path between recognition and originality:

- Tarot readers can still recognize each card quickly.
- Existing card meanings and SEO content remain aligned with the imagery.
- Batch generation is more likely to stay coherent across a 78-card deck.

## Review criteria

An image is a good candidate only if all of these hold:

1. The core Rider-Waite symbols are still recognizable.
2. The image feels original, not like a repaint of a public-domain scan.
3. The mood is calm and reflective, not theatrical or occult-campy.
4. The card border and composition feel premium and consistent with the rest of the deck.
5. No text, numerals, watermarks, logos, or accidental lettering appear inside the art.

## Anchor-card workflow

Do not jump straight to all 78 cards.

First validate the style on these anchor cards:

- `the-fool`
- `the-high-priestess`
- `death`
- `ace-of-cups`
- `three-of-swords`
- `ten-of-pentacles`

These cover bright, dark, spiritual, emotional, minimal, and narrative-heavy cases. If the style holds here, it is much safer to expand to the full deck.

## Files

- `preserve-structure-anchor-cards.json`: shared deck brief plus card-level prompt ingredients.
- `generated/`: local review outputs from the generation script. Ignored by git.

## Commands

Dry run one card prompt:

```bash
node scripts/generate-deck-art.mjs --dryRun --cards the-fool
```

Generate all anchor cards:

```bash
node scripts/generate-deck-art.mjs
```

Generate only two cards into a custom folder:

```bash
node scripts/generate-deck-art.mjs --cards the-fool,death --outDir reference/deck-art/generated/round-2
```

Override the model or quality:

```bash
node scripts/generate-deck-art.mjs --model gpt-image-1.5 --quality high
```

## API note

As of 2026-04-29, the public OpenAI Image API docs list GPT image models such as `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`. The script defaults to `gpt-image-1.5` for this reason.
