"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Lang = "en" | "zh";

type Dict = Record<string, { en: string; zh: string }>;

// UI translations. Card meanings live in lib/cards.ts.
export const dict: Dict = {
  "nav.home": { en: "Home", zh: "首页" },
  "nav.reading": { en: "Reading", zh: "占卜" },
  "nav.shop": { en: "Shop", zh: "商店" },
  "nav.brand": { en: "Lumen Tarot", zh: "流光塔罗" },

  "footer.tagline": {
    en: "A quiet space for tarot.",
    zh: "塔罗的静谧之所。",
  },
  "footer.rights": { en: "All rights reserved.", zh: "保留所有权利。" },

  // Home
  "home.hero.title": {
    en: "Listen to the cards.",
    zh: "倾听牌的低语。",
  },
  "home.hero.subtitle": {
    en: "Learn the language of tarot, draw a reading, and find tools to keep your practice grounded.",
    zh: "学习塔罗的语言，抽取一次解读，并寻找让你的修习扎根的工具。",
  },
  "home.hero.cta": { en: "Draw a card", zh: "抽一张牌" },
  "home.hero.shop": { en: "Visit shop", zh: "进入商店" },

  "home.what.title": { en: "What is tarot?", zh: "什么是塔罗？" },
  "home.what.body": {
    en: "Tarot is a deck of 78 illustrated cards used as a tool for reflection. The 22 Major Arcana describe the great themes of a life — love, change, endings, beginnings — while the 56 Minor Arcana speak to the texture of daily experience. A tarot reading is not a forecast; it is a conversation with your own intuition.",
    zh: "塔罗是一副由78张图绘卡组成的牌，用作内省的工具。22张大阿卡纳描绘人生的宏大主题——爱、变化、结束与开始；56张小阿卡纳则诉说日常经验的纹理。塔罗解读并非预测，而是一场与你直觉的对话。",
  },

  "home.how.title": { en: "How a reading works", zh: "解读如何进行" },
  "home.how.step1.title": { en: "Center yourself", zh: "静心" },
  "home.how.step1.body": {
    en: "Take a breath. Hold a question loosely in mind — open ones work best.",
    zh: "深呼吸。把一个问题轻轻放在心中——开放式的问题最合适。",
  },
  "home.how.step2.title": { en: "Draw the cards", zh: "抽牌" },
  "home.how.step2.body": {
    en: "Choose a spread and draw. Each position carries its own meaning.",
    zh: "选择一种牌阵并抽牌。每个位置都有其自身的含义。",
  },
  "home.how.step3.title": { en: "Listen", zh: "倾听" },
  "home.how.step3.body": {
    en: "Read the meanings as prompts, not verdicts. Notice what resonates.",
    zh: "把含义当作提示，而非结论。留意哪些与你共鸣。",
  },

  "home.arcana.title": { en: "Two halves of the deck", zh: "牌组的两半" },
  "home.arcana.major.title": { en: "Major Arcana · 22", zh: "大阿卡纳 · 22" },
  "home.arcana.major.body": {
    en: "The Fool's journey through archetypal forces — from innocence to integration.",
    zh: "愚者从天真走向圆满，穿越原型力量的旅程。",
  },
  "home.arcana.minor.title": { en: "Minor Arcana · 56", zh: "小阿卡纳 · 56" },
  "home.arcana.minor.body": {
    en: "Four suits — Wands, Cups, Swords, Pentacles — for fire, water, air, and earth in everyday life.",
    zh: "四个花色——权杖、圣杯、宝剑、星币——对应日常生活中的火、水、风、土。",
  },

  // Reading
  "reading.title": { en: "A Tarot Reading", zh: "塔罗解读" },
  "reading.subtitle": {
    en: "Choose a spread and a deck, breathe, then draw.",
    zh: "选择牌阵与牌组，深呼吸，然后抽牌。",
  },
  "reading.spread.label": { en: "Spread", zh: "牌阵" },
  "reading.spread.single": { en: "Single card", zh: "单张牌" },
  "reading.spread.three": {
    en: "Three cards · past · present · future",
    zh: "三张牌 · 过去 · 现在 · 未来",
  },
  "reading.deck.label": { en: "Deck", zh: "牌组" },
  "reading.deck.major": { en: "Major Arcana (22)", zh: "大阿卡纳 (22)" },
  "reading.deck.full": { en: "Full deck (78)", zh: "全牌组 (78)" },
  "reading.draw": { en: "Draw cards", zh: "抽牌" },
  "reading.redraw": { en: "Draw again", zh: "重新抽牌" },
  "reading.shuffling": { en: "Shuffling…", zh: "洗牌中…" },
  "reading.reversed": { en: "Reversed", zh: "逆位" },
  "reading.upright": { en: "Upright", zh: "正位" },
  "reading.position.past": { en: "Past", zh: "过去" },
  "reading.position.present": { en: "Present", zh: "现在" },
  "reading.position.future": { en: "Future", zh: "未来" },
  "reading.disclaimer": {
    en: "Tarot is a tool for reflection, not a substitute for professional advice.",
    zh: "塔罗是反思的工具，不能替代专业建议。",
  },

  // Shop
  "shop.title": { en: "Tools for Practice", zh: "修习之具" },
  "shop.subtitle": {
    en: "A small selection of candles, crystals, and incense to keep your space grounded.",
    zh: "一小批精选的蜡烛、水晶与香品，让你的空间安定。",
  },
  "shop.add": { en: "Buy", zh: "购买" },
  "shop.loading": { en: "Opening checkout…", zh: "正在打开结账…" },
  "shop.testmode": {
    en: "Demo only — Stripe is in test mode. Use card 4242 4242 4242 4242 with any future date and CVC.",
    zh: "仅为演示——Stripe 处于测试模式。可使用卡号 4242 4242 4242 4242，任意未来日期与 CVC。",
  },
};

export function t(key: keyof typeof dict, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = (typeof window !== "undefined" &&
      window.localStorage.getItem("lumen-lang")) as Lang | null;
    if (saved === "en" || saved === "zh") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("lumen-lang", l);
      document.documentElement.lang = l === "zh" ? "zh-CN" : "en";
    }
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang, t: (key) => t(key, lang) }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
