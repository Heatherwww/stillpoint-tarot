# Codex task — generate the 6 anchor cards (GPT Image 2)

**For Codex.** Generate the 6 anchor card illustrations for the *Celestial & Earthly Spirits Oracle* (天地神谕, working title) using **GPT Image 2**. Source of truth: `reference/deck-art/celestial-earthly-oracle-manifest.json`.

## How to build each prompt
Each image prompt = **the shared deck preamble below** + **one card block**. Do all 6.

## Generation spec
- Model: **GPT Image 2**
- Orientation: portrait, ~2:3 (e.g. 1024×1536), highest quality
- One finished illustration per card; **no text, numerals, watermark, or logo anywhere**
- Save to: `reference/deck-art/generated/<card-id>.png` (this folder is gitignored — review locally)
- These 6 only. Consistency across them is the goal: they must look like one deck. The two Four-Symbols guardians here (azure-dragon, vermilion-bird) set the style bar for the remaining two guardians (white-tiger, black-tortoise) later.

## After generating — self-QC each (regenerate any failure)
Hard gates (any fail = redo): believable anatomy (fingers, dragon claws, faces — no fused/extra/melted parts); coherent spatial structure & perspective; no AI-tells (melted edges, meaningless ornament, glitch-symmetry, plastic sheen); **text-free** (any stray glyph = auto-reject); print-ready (~300dpi at card size, safe margins/bleed, CMYK-safe colors, reads at thumbnail). Then check all 6 feel like one cohesive deck. Full rubric: the `card-deck-product-pipeline` skill, `references/art-qc-standard.md`.

---

## Shared deck preamble (prepend to every card)
Create a single portrait-format oracle card illustration for an original Chinese-mythology oracle deck.
- Root the figure in its classical source but invent a fully original depiction; do not copy any existing artwork, game, anime, or film design.
- Style: painterly editorial illustration with an East-Asian ink-wash sensibility — confident brush-feel, generous negative space (留白), restrained detail, believable anatomy, soft premium atmosphere. Modern, not historical reproduction.
- Border: an elegant light border with a subtle cloud/line (云纹) motif, consistent across the deck. No text or numerals inside the art.
- Palette: traditional Chinese mineral pigments — ink black, rice-paper cream, cinnabar/朱砂 red, azurite/石青 blue, malachite/石绿 green, aged gold. Muted and harmonious, never neon.
- Mood: contemplative and reverent — not gothic spectacle, not a cute mascot.
- Readable at thumbnail, graceful at full size; part of one unified premium 40-card deck.
- Avoid: any text/titles/numerals/watermark/logo; kitsch "oriental" cliché; hyper-sexualized styling; horror or gore; fortune-teller camp; cheap fantasy sparkle; over-saturated neon; photoreal collage; Western fantasy conventions that erase the East Asian rooting.
Produce one finished illustration only.

---

## Card blocks

### 1 — azure-dragon (青龙 / Azure Dragon)
- Must include: a sinuous Chinese dragon coiling through cloud and rain; a sense of eastward rising movement; water/storm atmosphere around it.
- Interpretation: power as quiet inevitability rather than aggression — the dragon as the turning of a season, not a monster.
- Palette: azurite blue, malachite green, rain silver, a thread of gold scale.
- Composition: diagonal upward sweep, lots of misted negative space, clear silhouette at thumbnail.
- Avoid for this card: Western winged dragon; fire-breathing menace; video-game boss styling.

### 2 — change (嫦娥 / Chang'e)
- Must include: a solitary woman figure on the moon; a vast moon disc and cold night sky; a jade hare or osmanthus tree as a quiet companion symbol.
- Interpretation: chosen solitude — serene, a little sorrowful, fully composed; not a romantic moon goddess.
- Palette: moonlit ivory, deep indigo night, pale silver, faint osmanthus gold.
- Composition: strong vertical stillness, the figure small against a large moon, generous emptiness.
- Avoid for this card: sexualized styling; fantasy armor; neon glow effects.

### 3 — vermilion-bird (朱雀 / Vermilion Bird)
- Must include: a phoenix-like vermilion bird with spreading flame-feathers; upward radiant southern fire energy; graceful long tail feathers.
- Interpretation: brightness as openness, not destruction — warmth that reveals rather than burns.
- Palette: cinnabar red, warm gold, ember orange against pale cream.
- Composition: radial spread, strong central figure, bright but controlled contrast.
- Avoid for this card: literal wildfire; harsh neon orange; Western firebird cliché.

### 4 — taiji (太极 / Taiji)
- Must include: an abstract evocation of the taiji turning (light and dark in motion); ink-wash circular flow; **no human figure**.
- Interpretation: render it as living motion and brush energy, not the flat logo — balance felt as a slow turning.
- Palette: ink black and rice-paper cream, a single restrained accent of gold.
- Composition: centered circular composition, maximal negative space, pure and quiet.
- Avoid for this card: the clichéd flat yin-yang icon; clutter; literal symmetry that reads as a stamp.

### 5 — houyi (后羿 / Houyi the Archer)
- Must include: an archer drawing a great bow toward the sky; suns/golden crows being shot from the heavens; scorched yet relieved earth below.
- Interpretation: heroism as solemn duty, not triumph — the weight of the choice visible in the figure.
- Palette: scorched gold, deep sky blue, earth ochre, ember red.
- Composition: dynamic tension along the bow's line, a sky-heavy upper frame, a clear narrative read.
- Avoid for this card: macho action-poster energy; gore; comic-book dynamism.

### 6 — meng-po (孟婆 / Meng Po)
- Must include: an old woman offering a bowl of broth; a dim threshold or bridge of passage; a soft mist of forgetting.
- Interpretation: tender rather than eerie — forgetting as mercy, the kindness of being allowed to let go.
- Palette: dusk grey, faded jade, dim lantern gold, soft shadow.
- Composition: a quiet frontal offering, low warm light, heavy stillness with breathing room.
- Avoid for this card: horror-hag styling; ghostly jump-scare; grimdark tone.
