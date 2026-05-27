# 001 Brief

Working title: TA 最近有没有想起你？他为什么没有行动？

Primary format: 小红书竖屏真人桌面读牌视频

Reuse formats:

- YouTube long video with chapters
- YouTube Shorts / Instagram Reels cutdowns by group

## Core Promise

This reading answers one specific relationship question:

```text
TA 最近有没有想起你？
如果有，为什么迟迟没有行动？
```

The viewer chooses by visual intuition, not by relationship diagnosis.

## Production Direction

The final video should feel like a real tarot reader sitting at a table and reading the cards in real time.

Use the generated preview frames only as structure reference. They are not the final visual style.

Preferred final look:

- A real or photorealistic fictional reader, filmed vertically.
- Reader may be partially anonymous: hands, torso, lower face, and table are enough.
- Real shuffle, cut, pile split, and card turns should be visible.
- Existing site card images provide the exact card faces for close-ups, spread inserts, and optional compositing.
- The camera should return to the reader's hands and pauses, not only to static graphics.
- On-screen text should be sparse: group label, card position, one key sentence.
- Avoid slideshow pacing, magical overlays, floating cards, AI-glamour effects, or dramatic fortune-teller theatrics.

## Visual Anchors

| Group | Public anchor | Internal energy |
| --- | --- | --- |
| 1 | 黑色石头 | 想起是真的，但被旧伤卡住 |
| 2 | 红线 | 有牵引和吸引，但还没有落地 |
| 3 | 透明水晶 | 清醒克制，现实接口慢慢靠近 |

Only the public anchor names should appear in the selection section. The internal energy labels are for scripting and editing only.

## Draw Method

Source: `draw-log.md`

- One 78-card deck
- Shuffled once
- Three groups x six cards
- No repeated cards
- Upright/reversed orientation randomized

## Estimated Runtime

```text
00:00 选组
00:50 第一组 黑色石头
07:45 第二组 红线
14:55 第三组 透明水晶
22:45 结尾
23:20 预计结束
```

## Tone Rules

- Read like a real tarot reader: observe, interpret, qualify, then conclude.
- Do not force a sweet answer when the cards are cold.
- Do not overpromise contact, reconciliation, or certainty.
- Repeat the frame: this is a mirror, not a verdict.
- Keep the viewer's agency stronger than TA's silence.

## Production Assets

| File | Purpose |
| --- | --- |
| `draw-log.md` | Exact cards and method |
| `script-full-v1.md` | Full voiceover draft |
| `storyboard.md` | Shooting and editing plan |
| `live-action-plan.md` | Real-person table reading plan |
| `card-insert-plan.md` | How to use existing site card images in the video |
| `video-gen-prompts.md` | Prompts for realistic AI video / image-to-video tools |
| `generate-card-inserts.py` | Exports exact card insert assets from `public/images/cards/` |
| `card-inserts/` | Generated exact card assets and spread inserts |
| `generate-preview-video.py` | Renders a playable short MP4 preview with TTS voiceover |
| `preview-video-v1.mp4` | Playable short-form proof of the final video shape |
| `preview-video-v2.mp4` | Same proof with improved neural TTS voiceover |
| `edit-replacement-map.md` | Shot-by-shot guide for replacing placeholders with live-action footage |
| `publishing-copy.md` | Xiaohongshu / YouTube copy |
| `captions-draft.srt` | Draft subtitles based on estimated timing |
| `generate-preview.py` | Generates structural reference frames only |
| `preview-loop.html` | Quick browser view of structural reference frames |
| `preview-animation.gif` | Quick motion reference, not final video style |
| `frames/` | Structural reference frames |
