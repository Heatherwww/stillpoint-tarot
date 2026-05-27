# Video Reference Naming

Use `reference/video/` for video planning, prototypes, draw logs, scripts, and exports.

Keep this folder shallow. Each video or prototype gets one direct child folder under `reference/video/`.

## Folder Names

Real planned videos use:

```text
<number>-<short-topic-slug>/
```

Prototype or format experiments use:

```text
prototype-<format-or-tool-purpose>/
```

Rules:

- `<number>` is a three-digit sequence such as `001`.
- `<short-topic-slug>` is kebab-case and names the viewer-facing topic.
- Put the topic in the folder name, not every file name.
- Do not add category layers like `projects/` or `prototypes/`.

Example:

```text
reference/video/
|-- 001-ta-missing-you-no-action/
|   |-- brief.md
|   |-- draw-log.md
|   |-- script-full-v1.md
|   |-- storyboard.md
|   |-- live-action-plan.md
|   |-- card-insert-plan.md
|   |-- video-gen-prompts.md
|   |-- generate-card-inserts.py
|   |-- card-inserts/
|   |-- generate-preview-video.py
|   |-- publishing-copy.md
|   |-- captions-draft.srt
|   |-- generate-preview.py
|   |-- preview-loop.html
|   |-- preview-animation.gif
|   |-- preview-video-v1.mp4
|   |-- preview-video-v2.mp4
|   |-- edit-replacement-map.md
|   `-- frames/
`-- prototype-pick-a-card-format-v1/
    |-- generate-preview.py
    |-- storyboard.md
    |-- captions.srt
    |-- preview-loop.html
    |-- preview-video.mp4
    |-- preview-animation.gif
    `-- scenes/
```

## File Names

Prefer role-based names:

- `brief.md`
- `draw-log.md`
- `script-full-v1.md`
- `script-<section>-v1.md`
- `storyboard.md`
- `live-action-plan.md`
- `card-insert-plan.md`
- `video-gen-prompts.md`
- `generate-card-inserts.py`
- `generate-preview-video.py`
- `captions-draft.srt` or `captions.srt`
- `card-inserts/`
- `preview-video.mp4`
- `preview-video-v1.mp4`
- `preview-video-v2.mp4`
- `edit-replacement-map.md`
- `preview-animation.gif`

Avoid temporary names such as `pick-a-card-readings`, `final-final`, or repeating the full topic in every file.
