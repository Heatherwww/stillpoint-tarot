# 001 Card Insert Plan

Question: can we use the existing site card images?

Yes. This is the safest way to keep the video realistic and accurate at the same time.

## Recommended Hybrid

Use a real or photorealistic reader for the human layer:

- shuffling;
- cutting the deck;
- placing the three piles;
- turning cards;
- pausing and interpreting.

Use the existing site card images for the exact card layer:

- close-up inserts when a card is named;
- overhead spread inserts after each group is drawn;
- cutaway frames for reversed cards;
- optional compositing onto blank cards or printed cards.

This avoids the common AI-video problem where the person looks real but the tarot cards become wrong, warped, or unreadable.

## Three Practical Options

| Option | How it works | Best for | Risk |
| --- | --- | --- | --- |
| Physical RWS deck | Film a real Rider-Waite-Smith deck and use site images only for clean inserts | Most natural final video | Need deck and exact drawn cards in order |
| Print 18 drawn cards | Print the 18 exact cards from `card-inserts/print-sheets/`, cut them, and film only this reading | One-off production for 001 | Printed cards may look less premium if paper/gloss is poor |
| Digital compositing | Film hands turning blank/facedown cards, then overlay exact card PNGs in editing | AI-video or no deck | Needs perspective/shadow matching |

For the first trial, the most efficient path is:

1. Use AI video or simple real footage for hands, deck, table, and reader presence.
2. Cut to exact overhead spread images from `card-inserts/`.
3. Use individual card PNGs from `card-inserts/` for close-up moments.
4. Keep the viewer feeling a real draw happened by showing shuffle/cut/turn motion before the exact insert.

## Insert Rules

- Do not ask the video model to invent tarot card faces.
- Do not put text inside generated video. Add subtitles and labels in editing.
- Keep reversed cards visibly rotated 180 degrees.
- Add a small card shadow and table texture when inserting cards over live footage.
- Let inserts be brief: 2-5 seconds for a card close-up, 8-12 seconds for a full spread.
- Return to hands/reader after the insert so it does not become a slideshow.

## Generated Assets

Run:

```text
python reference/video/001-ta-missing-you-no-action/generate-card-inserts.py
```

Outputs:

```text
card-inserts/
|-- group-1/
|-- group-2/
|-- group-3/
|-- group-1-spread.png
|-- group-2-spread.png
|-- group-3-spread.png
|-- all-groups-contact-sheet.png
`-- print-sheets/
```

The group folders contain two individual versions for each card:

- `*-labeled.png` for clean close-up inserts with card name and position.
- `*-card.png` for transparent card-only overlays in compositing.

## Editing Placement

| Script moment | Use existing card asset |
| --- | --- |
| "我先把牌翻出来" | Real/AI hands turning cards |
| Naming each position | Quick individual card insert |
| "我先说第一感觉" | Full six-card spread insert |
| Explaining difficult center card | Individual card close-up |
| Group conclusion | Return to reader hands and anchor object |

## Note On Rights

The site already uses these card images under the project's existing source assumptions. Before scaling this into monetized content, keep the source/license record with the project so the video workflow is as clear as the website workflow.
