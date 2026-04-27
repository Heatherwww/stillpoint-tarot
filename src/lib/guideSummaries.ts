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
      en: "Tarot Card Meanings: How to Read the 78 Cards Without Memorizing Everything",
      zh: "塔罗牌义入门：不靠死记也能读懂 78 张牌",
    },
    description: {
      en: "Learn how tarot card meanings work across the full 78-card deck: Major vs Minor Arcana, upright vs reversed cards, suits, court cards, and how to read a card in context.",
      zh: "从整副 78 张牌理解塔罗牌义的运作方式：大阿尔卡那与小阿尔卡那、正位与逆位、四种花色、宫廷牌，以及如何在具体情境中读牌。",
    },
  },
  {
    slug: "yes-no-tarot",
    title: {
      en: "Yes or No Tarot: Ask Better Questions and Read the Answer Clearly",
      zh: "Yes or No 塔罗：先把问题问对，再把答案读清楚",
    },
    description: {
      en: "Use yes-or-no tarot more clearly: learn when binary questions work, how to phrase them well, what a maybe card means, and when to switch to a clarifier or a three-card spread.",
      zh: "更清楚地使用 Yes or No 塔罗：什么时候二选一问题有效、该怎样提问、Maybe 牌到底是什么意思，以及什么时候该改用补牌或三张牌牌阵。",
    },
  },
  {
    slug: "three-card-tarot-spread",
    title: {
      en: "Three-Card Tarot Spread: How to Read Past, Present, Future and Beyond",
      zh: "三张牌塔罗牌阵：不只看过去现在未来",
    },
    description: {
      en: "Learn how to read a three-card tarot spread with clarity: common position systems, how cards influence each other, and how to turn a spread into one practical next step.",
      zh: "学会更清楚地解读三张牌塔罗牌阵：常见牌位系统、牌与牌之间如何彼此影响，以及怎样把牌阵收束成一个现实可做的下一步。",
    },
  },
];

export const guideSlugs: GuideSlug[] = guideSummaries.map((guide) => guide.slug);

export function getGuideSummary(slug: string) {
  return guideSummaries.find((guide) => guide.slug === slug);
}
