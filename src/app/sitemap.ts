import type { MetadataRoute } from "next";
import { fullDeck } from "@/lib/cards";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

const LANGS = ["en", "zh"] as const;

function withAlternates(path: string) {
  // path starts with "/" and does not include a lang prefix, e.g. "/cards"
  const en = `${BASE_URL}/en${path === "/" ? "" : path}`;
  const zh = `${BASE_URL}/zh${path === "/" ? "" : path}`;
  return { en, zh, alternates: { languages: { en, "zh-CN": zh, "x-default": en } } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const paths: Array<{ path: string; priority: number }> = [
    { path: "/", priority: 1 },
    { path: "/reading", priority: 0.9 },
    { path: "/cards", priority: 0.9 },
    { path: "/cards/major", priority: 0.8 },
    { path: "/cards/wands", priority: 0.8 },
    { path: "/cards/cups", priority: 0.8 },
    { path: "/cards/swords", priority: 0.8 },
    { path: "/cards/pentacles", priority: 0.8 },
    { path: "/shop", priority: 0.7 },
    ...fullDeck.map((c) => ({ path: `/cards/${c.id}`, priority: 0.6 })),
  ];

  const entries: MetadataRoute.Sitemap = [];
  for (const { path, priority } of paths) {
    const { en, zh, alternates } = withAlternates(path);
    for (const lang of LANGS) {
      entries.push({
        url: lang === "zh" ? zh : en,
        lastModified: now,
        priority,
        alternates,
      });
    }
  }
  return entries;
}
