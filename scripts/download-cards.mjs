// One-off script: download Rider-Waite-Smith card scans from Wikimedia Commons.
// Pamela Colman Smith, 1909 — public domain.
// Writes to public/images/cards/<card-id>.webp at ~500px wide.
//
// Run with:  node scripts/download-cards.mjs

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/images/cards");
const WIDTH = 500;

// Major Arcana: card id -> Wikimedia filename (without extension)
const major = {
  "the-fool": "RWS_Tarot_00_Fool",
  "the-magician": "RWS_Tarot_01_Magician",
  "the-high-priestess": "RWS_Tarot_02_High_Priestess",
  "the-empress": "RWS_Tarot_03_Empress",
  "the-emperor": "RWS_Tarot_04_Emperor",
  "the-hierophant": "RWS_Tarot_05_Hierophant",
  "the-lovers": "RWS_Tarot_06_Lovers",
  "the-chariot": "RWS_Tarot_07_Chariot",
  "strength": "RWS_Tarot_08_Strength",
  "the-hermit": "RWS_Tarot_09_Hermit",
  "wheel-of-fortune": "RWS_Tarot_10_Wheel_of_Fortune",
  "justice": "RWS_Tarot_11_Justice",
  "the-hanged-man": "RWS_Tarot_12_Hanged_Man",
  "death": "RWS_Tarot_13_Death",
  "temperance": "RWS_Tarot_14_Temperance",
  "the-devil": "RWS_Tarot_15_Devil",
  "the-tower": "RWS_Tarot_16_Tower",
  "the-star": "RWS_Tarot_17_Star",
  "the-moon": "RWS_Tarot_18_Moon",
  "the-sun": "RWS_Tarot_19_Sun",
  "judgement": "RWS_Tarot_20_Judgement",
  "the-world": "RWS_Tarot_21_World",
};

// Minor Arcana: suit -> Wikimedia prefix
const suitPrefix = {
  wands: "Wands",
  cups: "Cups",
  swords: "Swords",
  pentacles: "Pents",
};

// Rank -> two-digit Wikimedia number
const rankNum = {
  ace: "01",
  two: "02",
  three: "03",
  four: "04",
  five: "05",
  six: "06",
  seven: "07",
  eight: "08",
  nine: "09",
  ten: "10",
  page: "11",
  knight: "12",
  queen: "13",
  king: "14",
};

// Some cards have non-standard filenames on Wikimedia. Try these in order.
const overrides = {
  "nine-of-wands": ["Tarot_Nine_of_Wands.jpg", "RWS_Tarot_Wands_09.jpg", "Wands09.jpg"],
};

// Build full list
const targets = [];
for (const [id, file] of Object.entries(major)) {
  targets.push({ id, files: [`${file}.jpg`] });
}
for (const [suit, prefix] of Object.entries(suitPrefix)) {
  for (const [rank, num] of Object.entries(rankNum)) {
    const id = `${rank}-of-${suit}`;
    targets.push({
      id,
      files: overrides[id] ?? [`${prefix}${num}.jpg`],
    });
  }
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function tryFetch(file) {
  const url = `https://commons.wikimedia.org/wiki/Special:FilePath/${file}?width=${WIDTH}`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": "StillpointTarot/1.0 (https://www.stillpointtarot.com)",
    },
  });
  return { res, url };
}

async function downloadOne({ id, files }) {
  const out = path.join(OUT_DIR, `${id}.webp`);
  if (existsSync(out)) {
    return { id, status: "skipped" };
  }
  let lastReason = "no candidates";
  let lastUrl = "";
  for (const file of files) {
    // Up to 3 attempts per filename, with backoff on 429
    for (let attempt = 1; attempt <= 3; attempt++) {
      const { res, url } = await tryFetch(file);
      lastUrl = url;
      if (res.status === 429) {
        await sleep(2000 * attempt);
        lastReason = `HTTP 429 (attempt ${attempt})`;
        continue;
      }
      if (!res.ok) {
        lastReason = `HTTP ${res.status}`;
        break; // try next filename
      }
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 2000) {
        lastReason = `too small (${buf.length}B)`;
        break;
      }
      const webp = await sharp(buf).resize({ width: WIDTH }).webp({ quality: 80 }).toBuffer();
      await writeFile(out, webp);
      return { id, status: "ok", size: webp.length, file };
    }
  }
  return { id, status: "failed", reason: lastReason, url: lastUrl };
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  console.log(`Downloading ${targets.length} cards to ${OUT_DIR}...`);

  const results = [];
  // Sequential with 700ms gap to respect Wikimedia rate limits
  for (const t of targets) {
    const r = await downloadOne(t);
    const tag =
      r.status === "ok"
        ? `ok ${Math.round(r.size / 1024)}KB${r.file && r.file !== `${t.files[0]}` ? ` (${r.file})` : ""}`
        : r.status === "skipped"
          ? "skipped"
          : `FAILED ${r.reason}`;
    console.log(`  ${r.id.padEnd(22)} ${tag}`);
    results.push(r);
    if (r.status === "ok") await sleep(700);
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const skipped = results.filter((r) => r.status === "skipped").length;
  const failed = results.filter((r) => r.status === "failed");
  console.log(`\nDone. ${ok} downloaded, ${skipped} skipped, ${failed.length} failed.`);
  if (failed.length) {
    console.log("\nFailed URLs:");
    for (const f of failed) console.log(`  ${f.id}: ${f.url}`);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
