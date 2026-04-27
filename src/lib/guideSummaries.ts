import type { Lang } from "@/lib/i18n";

type LocalizedText = Record<Lang, string>;

export type GuideSlug =
  | "tarot-card-meanings"
  | "yes-no-tarot"
  | "three-card-tarot-spread"
  | "love-tarot-card-meanings"
  | "how-to-read-reversed-tarot-cards"
  | "court-cards-tarot-meanings"
  | "tarot-for-feelings"
  | "career-tarot-spreads"
  | "major-arcana-guide"
  | "questions-to-ask-tarot"
  | "tarot-card-combinations-for-beginners"
  | "tarot-for-self-love";

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
  {
    slug: "tarot-for-feelings",
    title: {
      en: "Tarot for Feelings: How to Read Someone's Emotions Clearly",
      zh: "感情塔罗怎么读：如何看清一个人的情绪",
    },
    description: {
      en: "Learn how to read feelings in tarot without forcing certainty: attraction, hesitation, avoidance, emotional availability, and what the suits reveal about someone's inner state.",
      zh: "学会怎样用塔罗读感受而不硬逼结论：吸引、犹疑、回避、情感可得性，以及四种花色如何透露一个人的内在状态。",
    },
  },
  {
    slug: "career-tarot-spreads",
    title: {
      en: "Career Tarot Spreads: Best Layouts for Work, Money, and Next Steps",
      zh: "事业塔罗牌阵：工作、金钱与下一步怎么问",
    },
    description: {
      en: "Use tarot spreads for career questions with more structure: job decisions, burnout, money pressure, workplace dynamics, and the next practical move.",
      zh: "用更有结构的方法处理事业问题：工作去留、倦怠、金钱压力、职场关系，以及下一步现实动作。",
    },
  },
  {
    slug: "major-arcana-guide",
    title: {
      en: "Major Arcana Guide: The 22 Tarot Cards and the Fool's Journey",
      zh: "大阿尔卡那指南：22 张塔罗牌与愚者之旅",
    },
    description: {
      en: "Understand the 22 Major Arcana as one larger arc: turning points, life lessons, spiritual pressure, and why these tarot cards often speak louder than the rest of the spread.",
      zh: "把 22 张大阿尔卡那放回同一条弧线上理解：转折、生命课题、灵魂压力，以及为什么它们常常比周围的牌更响亮。",
    },
  },
  {
    slug: "questions-to-ask-tarot",
    title: {
      en: "Questions to Ask Tarot: Better Prompts for Clearer Readings",
      zh: "塔罗该怎么提问：更好的问题，才有更清楚的答案",
    },
    description: {
      en: "Learn how to ask tarot better questions for love, work, timing, decisions, and self-reflection so your readings stay specific, grounded, and actually useful.",
      zh: "学会怎样为爱情、工作、时机、决策与自我探索提出更好的塔罗问题，让解读更具体、更落地，也更真正有用。",
    },
  },
  {
    slug: "tarot-card-combinations-for-beginners",
    title: {
      en: "Tarot Card Combinations for Beginners: How to Read Cards Together",
      zh: "塔罗牌组合入门：初学者怎么把牌连起来读",
    },
    description: {
      en: "Learn a beginner-friendly way to read tarot card combinations: repeated suits, contrast, flow, supporting cards, and how to stop reading each card in isolation.",
      zh: "用一套适合初学者的方法学习塔罗牌组合：重复花色、对比、流向、支撑牌，以及怎样停止把每张牌单独拆开来读。",
    },
  },
  {
    slug: "tarot-for-self-love",
    title: {
      en: "Tarot for Self-Love: Readings for Worth, Care, and Healing",
      zh: "自爱塔罗：关于价值感、照顾自己与疗愈的读法",
    },
    description: {
      en: "Use tarot for self-love without empty affirmations: learn how the cards speak about worth, boundaries, rest, inner criticism, healing, and rebuilding trust with yourself.",
      zh: "不用空泛鼓励，也能用塔罗做自爱练习：看清牌如何谈价值感、边界、休息、内在批评、疗愈，以及和自己重新建立信任。",
    },
  },
];

export const guideSlugs: GuideSlug[] = guideSummaries.map((guide) => guide.slug);

export function getGuideSummary(slug: string) {
  return guideSummaries.find((guide) => guide.slug === slug);
}
