import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const DEFAULT_MANIFEST = "reference/deck-art/preserve-structure-anchor-cards.json";
const DEFAULT_OUT_DIR = "reference/deck-art/generated";

function parseArgs(argv) {
  const args = {
    manifest: DEFAULT_MANIFEST,
    outDir: DEFAULT_OUT_DIR,
    model: "",
    size: "",
    quality: "",
    cards: "",
    dryRun: false,
    force: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--dryRun") {
      args.dryRun = true;
      continue;
    }
    if (arg === "--force") {
      args.force = true;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      args.help = true;
      continue;
    }
    if (!arg.startsWith("--")) {
      throw new Error(`Unknown argument: ${arg}`);
    }

    const key = arg.slice(2);
    const value = argv[i + 1];
    if (!value || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }
    if (!(key in args)) {
      throw new Error(`Unknown option: --${key}`);
    }
    args[key] = value;
    i += 1;
  }

  return args;
}

function printHelp() {
  console.log(`Usage:
  node scripts/generate-deck-art.mjs [options]

Options:
  --manifest <path>   Prompt manifest JSON
  --outDir <path>     Output directory for generated images
  --cards <ids>       Comma-separated card IDs, e.g. the-fool,death
  --model <name>      Override image model
  --size <value>      1024x1024 | 1024x1536 | 1536x1024 | auto
  --quality <value>   low | medium | high | auto
  --dryRun            Print prompts without calling the API
  --force             Overwrite existing outputs
  --help              Show this message
`);
}

function buildPrompt(manifest, card) {
  const lines = [
    `Create a single portrait-format tarot card illustration for ${manifest.deckName}.`,
    manifest.direction,
    "",
    "Global direction:",
    ...manifest.globalPromptBullets.map((line) => `- ${line}`),
    "",
    "Brand brief:",
    `- Tone: ${manifest.brandBrief.tone.join(", ")}.`,
    `- Rendering: ${manifest.brandBrief.rendering}`,
    `- Border treatment: ${manifest.brandBrief.border}`,
    `- Palette baseline: ${manifest.brandBrief.palette}`,
    "",
    `Card: ${card.title}`,
    `- Keep these Rider-Waite symbols recognizable: ${card.mustKeep.join("; ")}.`,
    `- Stillpoint interpretation: ${card.stillpointTwist}`,
    `- Palette hint: ${card.paletteHint}`,
    `- Composition hint: ${card.compositionHint}`,
    `- Avoid for this card: ${card.avoid.join(", ")}.`,
    "",
    `Global avoid list: ${manifest.brandBrief.avoid.join(", ")}.`,
    "No text, no titles, no numerals, no watermark, no logo.",
    "Produce one finished illustration only.",
  ];

  return lines.join("\n");
}

async function loadManifest(manifestPath) {
  const raw = await readFile(manifestPath, "utf8");
  return JSON.parse(raw);
}

async function generateImage({ apiKey, model, size, quality, prompt }) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      size,
      quality,
      background: "opaque",
      output_format: "png",
      n: 1,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Image API request failed (${response.status}): ${errorBody}`);
  }

  const payload = await response.json();
  const base64 = payload.data?.[0]?.b64_json;
  if (!base64) {
    throw new Error("Image API response did not include b64_json output.");
  }

  return {
    imageBuffer: Buffer.from(base64, "base64"),
    responseMeta: {
      created: payload.created ?? null,
      output_format: payload.output_format ?? "png",
      quality: payload.quality ?? quality,
      size: payload.size ?? size,
      usage: payload.usage ?? null,
    },
  };
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const manifestPath = path.resolve(args.manifest);
  const outDir = path.resolve(args.outDir);
  const manifest = await loadManifest(manifestPath);

  const selectedIds = args.cards
    ? args.cards
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean)
    : null;

  const cards = selectedIds
    ? manifest.cards.filter((card) => selectedIds.includes(card.id))
    : manifest.cards;

  if (selectedIds && cards.length !== selectedIds.length) {
    const found = new Set(cards.map((card) => card.id));
    const missing = selectedIds.filter((id) => !found.has(id));
    throw new Error(`Unknown card IDs in --cards: ${missing.join(", ")}`);
  }

  const model = args.model || manifest.defaults.model || "gpt-image-1.5";
  const size = args.size || manifest.defaults.size || "1024x1536";
  const quality = args.quality || manifest.defaults.quality || "high";

  console.log(`Manifest: ${manifestPath}`);
  console.log(`Output:   ${outDir}`);
  console.log(`Cards:    ${cards.map((card) => card.id).join(", ")}`);
  console.log(`Model:    ${model}`);
  console.log(`Size:     ${size}`);
  console.log(`Quality:  ${quality}`);
  console.log(`Mode:     ${args.dryRun ? "dry run" : "generate"}\n`);

  if (!cards.length) {
    console.log("No cards selected.");
    return;
  }

  if (!args.dryRun && !process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is required unless --dryRun is used.");
  }

  await mkdir(outDir, { recursive: true });

  for (const card of cards) {
    const prompt = buildPrompt(manifest, card);
    const imagePath = path.join(outDir, `${card.id}.png`);
    const metaPath = path.join(outDir, `${card.id}.json`);
    const promptPath = path.join(outDir, `${card.id}.prompt.txt`);

    if (!args.force && existsSync(imagePath)) {
      console.log(`Skipping ${card.id}: image already exists.`);
      continue;
    }

    if (args.dryRun) {
      console.log(`--- ${card.id} ---`);
      console.log(`${prompt}\n`);
      continue;
    }

    console.log(`Generating ${card.id}...`);
    const { imageBuffer, responseMeta } = await generateImage({
      apiKey: process.env.OPENAI_API_KEY,
      model,
      size,
      quality,
      prompt,
    });

    await writeFile(imagePath, imageBuffer);
    await writeFile(promptPath, `${prompt}\n`);
    await writeFile(
      metaPath,
      JSON.stringify(
        {
          cardId: card.id,
          title: card.title,
          generatedAt: new Date().toISOString(),
          request: {
            model,
            size,
            quality,
            background: "opaque",
            output_format: "png",
          },
          response: responseMeta,
        },
        null,
        2
      )
    );
    console.log(`Saved ${imagePath}`);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
