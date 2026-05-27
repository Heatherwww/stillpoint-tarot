# 001 Edit Replacement Map

Purpose: explain how the current MP4 sample becomes a real-person tarot video.

The current preview video is an edit skeleton: timing, section order, card insert moments, and voiceover. The final version should replace the static placeholder scenes with real or AI-generated table footage while keeping the exact card inserts.

## Track Model

| Track | Content | Replace later? |
| --- | --- | --- |
| A-roll | Real / AI reader at table: hands, deck, shuffle, card turns, pauses | Yes, this is the main replacement layer |
| B-roll | Exact site card images: spread inserts and card close-ups | Keep, because it preserves card accuracy |
| Audio | Human or high-quality TTS tarot-reader voiceover | Replace if a better voice is recorded |
| Text | Minimal titles, landing points, subtitles | Keep sparse; add in editing |

## Replacement Logic

Do not try to make AI video preserve exact card faces. Let AI video or real footage provide the human feeling, then cut to exact card inserts whenever the viewer needs to see the cards.

Recommended final rhythm:

1. Human hands shuffle or split the deck.
2. Human hands turn cards.
3. Cut to exact `card-inserts/*-spread.png` for the proof view.
4. Return to hands / reader while the interpretation continues.
5. Use exact `*-labeled.png` close-ups for important cards.

## Segment Map

| Preview segment | Replace placeholder with | Keep exact insert? | Notes |
| --- | --- | --- | --- |
| Opening selection | Hands shuffle, split into three piles, place black stone / red thread / clear crystal | No | The current selection graphic is only a layout placeholder. |
| Group 1 spread | Hands turn six cards beside black stone | Yes: `card-inserts/group-1-spread.png` | Cut to spread after the sixth card is revealed. |
| Group 1 key | Reader's hands pause near Tower / Three of Swords / Nine of Swords | Optional close-ups | This should feel sober, not romantic. |
| Group 2 spread | Hands turn six cards beside red thread | Yes: `card-inserts/group-2-spread.png` | Let the red thread remain visible but not theatrical. |
| Group 2 key | Reader gestures toward Moon reversed and Hanged Man | Optional close-ups | Slightly warmer, more charged pacing. |
| Group 3 spread | Hands turn six cards beside clear crystal | Yes: `card-inserts/group-3-spread.png` | Cleaner, calmer, more practical tone. |
| Group 3 key | Reader keeps the spread neat, points lightly | Optional close-ups | Do not over-romanticize the calmness. |
| Closing | Hands gather anchors back beside the deck | No | Close on agency: mirror, not verdict. |

## Practical Editing Steps

1. Import `preview-video-v2.mp4` into CapCut / Premiere / DaVinci Resolve as a timing reference.
2. Put real or AI table footage on the track above it.
3. Match each replacement shot to the same section.
4. Keep `card-inserts/group-*-spread.png` as 2-5 second cutaways after each draw.
5. Add individual `*-labeled.png` close-ups only when a card is named or interpreted deeply.
6. Mute/delete the preview video track once all replacement clips are aligned.
7. Keep or replace the audio track depending on whether the voice feels on-brand.

## Voice Direction

The voice should sound like a real tarot reader:

- lower speed than normal social-video narration;
- warm but not sweet;
- clear pauses before conclusions;
- no "AI customer service" brightness;
- grounded, reflective, and slightly intimate.

If recording human voice, use `preview-voiceover-v2.txt` as the short demo script and `script-full-v1.md` for the full long-form reading.
