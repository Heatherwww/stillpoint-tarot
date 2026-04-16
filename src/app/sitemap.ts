import type { MetadataRoute } from "next";
import { fullDeck } from "@/lib/cards";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, priority: 1 },
    { url: `${BASE_URL}/reading`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/cards`, lastModified: now, priority: 0.9 },
    { url: `${BASE_URL}/cards/major`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/cards/wands`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/cards/cups`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/cards/swords`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/cards/pentacles`, lastModified: now, priority: 0.8 },
    { url: `${BASE_URL}/shop`, lastModified: now, priority: 0.7 },
  ];

  const cardRoutes: MetadataRoute.Sitemap = fullDeck.map((card) => ({
    url: `${BASE_URL}/cards/${card.id}`,
    lastModified: now,
    priority: 0.6,
  }));

  return [...staticRoutes, ...cardRoutes];
}
