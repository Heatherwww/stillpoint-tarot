// Mock product catalog. Prices in USD cents (Stripe's unit).
// Edit freely — these flow into both the shop page and the Stripe checkout API.

export interface Product {
  id: string;
  name: { en: string; zh: string };
  description: { en: string; zh: string };
  priceCents: number;
  emoji: string; // placeholder until you add real images
}

export const products: Product[] = [
  {
    id: "lavender-candle",
    name: { en: "Lavender Ritual Candle", zh: "薰衣草仪式蜡烛" },
    description: {
      en: "Hand-poured soy wax with French lavender. Burns for 40 hours.",
      zh: "手工浇注的大豆蜡，添加法国薰衣草。可燃烧 40 小时。",
    },
    priceCents: 2400,
    emoji: "🕯️",
  },
  {
    id: "amethyst-cluster",
    name: { en: "Raw Amethyst Cluster", zh: "紫水晶原石" },
    description: {
      en: "A small cluster from Brazil. For calm focus during readings.",
      zh: "来自巴西的小型原石。在解读时带来平静的专注。",
    },
    priceCents: 1800,
    emoji: "💎",
  },
  {
    id: "palo-santo",
    name: { en: "Palo Santo Bundle", zh: "秘鲁圣木束" },
    description: {
      en: "Sustainably harvested. Three sticks, lightly scented.",
      zh: "可持续采集。三根香木，香气清淡。",
    },
    priceCents: 1200,
    emoji: "🌿",
  },
  {
    id: "linen-cloth",
    name: { en: "Linen Reading Cloth", zh: "亚麻占卜布" },
    description: {
      en: "Soft natural linen, 60×60 cm. A clean ground for your spread.",
      zh: "柔软的天然亚麻，60×60 厘米。为牌阵提供洁净的底面。",
    },
    priceCents: 3200,
    emoji: "🪡",
  },
  {
    id: "rose-incense",
    name: { en: "Rose Incense", zh: "玫瑰线香" },
    description: {
      en: "Twenty hand-rolled sticks. Soft floral, no synthetics.",
      zh: "二十支手工卷制。柔和的花香，不含合成成分。",
    },
    priceCents: 900,
    emoji: "🌹",
  },
  {
    id: "moon-journal",
    name: { en: "Moon Journal", zh: "月相日记本" },
    description: {
      en: "A pocket journal for tracking readings and reflections.",
      zh: "口袋日记本，用于记录解读与反思。",
    },
    priceCents: 1500,
    emoji: "📓",
  },
];

export function findProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
