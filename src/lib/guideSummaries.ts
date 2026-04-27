import type { Lang } from "@/lib/i18n";

type LocalizedText = Record<Lang, string>;

export type GuideSlug =
  | "tarot-card-meanings"
  | "yes-no-tarot"
  | "three-card-tarot-spread";

export interface GuideSummary {
  slug: GuideSlug;
  title: LocalizedText;
  description: LocalizedText;
}

export const guideSummaries: GuideSummary[] = [
  {
    slug: "tarot-card-meanings",
    title: {
      en: "Tarot Card Meanings: 78-Card Guide for Beginners",
      zh: "塔罗牌义入门：78 张牌怎么读",
    },
    description: {
      en: "Learn upright and reversed meanings, Major vs Minor Arcana, the four suits, court cards, and how to read any tarot card in context.",
      zh: "一次理清 78 张牌的读法：正位与逆位、大阿尔卡那与小阿尔卡那、四种花色、宫廷牌，以及如何在具体情境中读牌。",
    },
  },
  {
    slug: "yes-no-tarot",
    title: {
      en: "Yes or No Tarot: Ask Better Questions, Read Maybe Cards",
      zh: "Yes or No 塔罗：问题怎么问，Maybe 怎么读",
    },
    description: {
      en: "Learn when yes-or-no tarot works, how to phrase binary questions well, what a maybe card means, and when to switch to a clarifier or 3-card spread.",
      zh: "适合什么时候问是/否题、怎样把问题问准、Maybe 代表什么，以及何时该改用补牌或三张牌牌阵。",
    },
  },
  {
    slug: "three-card-tarot-spread",
    title: {
      en: "3-Card Tarot Spread: Past, Present, Future and More",
      zh: "三张牌塔罗牌阵：除了过去现在未来，还能怎么看",
    },
    description: {
      en: "Learn the best three-card position systems, how cards influence each other, and how to turn a spread into one practical next step.",
      zh: "学会三张牌牌阵的常见读法：牌位怎么设、牌与牌如何互相影响，以及怎样把结果落成一个现实的下一步。",
    },
  },
];

export const guideSlugs: GuideSlug[] = guideSummaries.map((guide) => guide.slug);

export function getGuideSummary(slug: string) {
  return guideSummaries.find((guide) => guide.slug === slug);
}
