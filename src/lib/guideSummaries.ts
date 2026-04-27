import type { Lang } from "@/lib/i18n";

type LocalizedText = Record<Lang, string>;

export type GuideSlug =
  | "tarot-card-meanings"
  | "yes-no-tarot"
  | "three-card-tarot-spread"
  | "love-tarot-card-meanings"
  | "how-to-read-reversed-tarot-cards"
  | "court-cards-tarot-meanings";

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
  {
    slug: "love-tarot-card-meanings",
    title: {
      en: "Love Tarot Card Meanings: What the 78 Cards Say About Relationships",
      zh: "爱情塔罗牌义：78 张牌在关系里怎么读",
    },
    description: {
      en: "Learn how tarot cards shift in love readings: attraction, distance, commitment, conflict, reconciliation, and what upright or reversed cards can mean in relationships.",
      zh: "看清塔罗牌进入爱情问题后会怎样变化：吸引、疏离、承诺、冲突、复合，以及正位和逆位在关系里分别怎么读。",
    },
  },
  {
    slug: "how-to-read-reversed-tarot-cards",
    title: {
      en: "How to Read Reversed Tarot Cards: 5 Practical Ways",
      zh: "逆位塔罗牌怎么读：5 种最实用的方法",
    },
    description: {
      en: "Learn a practical system for tarot reversals: blocked energy, inward movement, delay, excess, release, and when you may not need reversals at all.",
      zh: "用一套实用方法理解塔罗逆位：受阻、内化、延迟、过度、释放，以及什么时候其实不用逆位也能读。",
    },
  },
  {
    slug: "court-cards-tarot-meanings",
    title: {
      en: "Court Cards Tarot Meanings: Pages, Knights, Queens, and Kings",
      zh: "宫廷牌塔罗牌义：侍从、骑士、皇后与国王",
    },
    description: {
      en: "Understand tarot court cards without guessing: how to read them as people, roles, energies, or relationship dynamics across all four suits.",
      zh: "不用靠猜，也能读懂塔罗宫廷牌：它们什么时候代表人物、角色、能量，或关系中的互动方式。",
    },
  },
];

export const guideSlugs: GuideSlug[] = guideSummaries.map((guide) => guide.slug);

export function getGuideSummary(slug: string) {
  return guideSummaries.find((guide) => guide.slug === slug);
}
