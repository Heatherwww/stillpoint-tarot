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
  "nav.cards": { en: "Cards", zh: "牌库" },
  "nav.shop": { en: "Shop", zh: "商店" },
  "nav.brand": { en: "Stillpoint Tarot", zh: "静点塔罗" },

  // Card library
  "cards.title": { en: "The Card Library", zh: "塔罗牌库" },
  "cards.subtitle": {
    en: "All 78 cards of the Rider-Waite-Smith deck. Tap any card to read its full meaning, upright and reversed.",
    zh: "莱德-韦特-史密斯牌组的全部 78 张。点击任意一张牌，查看其正位与逆位的完整含义。",
  },
  "cards.filter.all": { en: "All", zh: "全部" },
  "cards.filter.major": { en: "Major Arcana", zh: "大阿卡纳" },
  "cards.filter.wands": { en: "Wands", zh: "权杖" },
  "cards.filter.cups": { en: "Cups", zh: "圣杯" },
  "cards.filter.swords": { en: "Swords", zh: "宝剑" },
  "cards.filter.pentacles": { en: "Pentacles", zh: "星币" },

  "card.arcana.major": { en: "Major Arcana", zh: "大阿卡纳" },
  "card.arcana.minor": { en: "Minor Arcana", zh: "小阿卡纳" },
  "card.number.label": { en: "Number", zh: "编号" },
  "card.suit.label": { en: "Suit", zh: "花色" },
  "card.upright.title": { en: "Upright meaning", zh: "正位含义" },
  "card.reversed.title": { en: "Reversed meaning", zh: "逆位含义" },
  "card.keywords.label": { en: "Keywords", zh: "关键词" },
  "card.cta": {
    en: "Draw a reading with this deck",
    zh: "用这副牌做一次解读",
  },
  "card.back": { en: "← Back to all cards", zh: "← 返回牌库" },

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
  "reading.spread.single.help": {
    en: "Best for a quick check-in, a one-line question, or a card-of-the-day. Use when you want clarity on one specific thing right now.",
    zh: "适合快速的内省、一句话的提问，或日常的「今日一张牌」。当你想就某件具体的事获得清晰时使用。",
  },
  "reading.spread.three.help": {
    en: "Best when a situation has history and direction — relationships, decisions, life chapters. The cards show where it came from, where you stand, and where it is tending.",
    zh: "适合那些有来历与去向的情境——关系、决定、人生章节。三张牌分别显示它从何而来、你身处何处，以及它正向何处倾斜。",
  },
  "reading.deck.label": { en: "Deck", zh: "牌组" },
  "reading.deck.major": { en: "Major Arcana (22)", zh: "大阿卡纳 (22)" },
  "reading.deck.full": { en: "Full deck (78)", zh: "全牌组 (78)" },
  "reading.deck.major.help": {
    en: "Major Arcana speaks to the great themes of a life — love, change, endings, calling. Choose this when your question feels big, soul-level, or archetypal.",
    zh: "大阿卡纳诉说生命的宏大主题——爱、变迁、结束、召唤。当你的问题感觉宏大、灵魂层面或带有原型意味时，选择它。",
  },
  "reading.deck.full.help": {
    en: "The full 78-card deck includes the four suits — fire, water, air, earth — for the texture of daily life. Choose this for everyday situations: work, money, friendships, the next concrete step.",
    zh: "完整的78张牌组包含四个花色——火、水、风、土——对应日常生活的纹理。当涉及工作、金钱、友谊、下一个具体步骤等日常情境时选择它。",
  },
  "reading.keywords.label": { en: "Keywords", zh: "关键词" },
  "reading.position.intro.past": {
    en: "In the past position, this card describes the soil this question grew from.",
    zh: "在「过去」的位置，这张牌描绘了此问题所生长的土壤。",
  },
  "reading.position.intro.present": {
    en: "In the present position, it speaks to where you stand right now.",
    zh: "在「现在」的位置，它诉说着你此刻所立之处。",
  },
  "reading.position.intro.future": {
    en: "In the future position, it suggests where this is tending — not fate, but trajectory.",
    zh: "在「未来」的位置，它暗示着事物正向何处倾斜——不是命运，而是趋势。",
  },
  "reading.synthesis.title": {
    en: "A question to sit with",
    zh: "一个可以静坐的问题",
  },
  "reading.synthesis.body": {
    en: "How do these three movements echo each other in your life right now? What single small action would honor what the cards are showing?",
    zh: "这三个动向，如何在你当下的生活中彼此回响？什么样的一个小行动，会回应这些牌所显示之物？",
  },
  "reading.single.synthesis.title": {
    en: "Sit with this",
    zh: "静坐于此",
  },
  "reading.single.synthesis.body": {
    en: "Read the meaning slowly, twice. Notice which line catches you — that is where the card is speaking to you specifically.",
    zh: "缓慢地读两遍含义。留意哪一句让你停顿——那便是这张牌对你具体所言之处。",
  },
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

  // Pre-reading questions
  "reading.questions.title": {
    en: "Before we draw",
    zh: "在抽牌之前",
  },
  "reading.questions.subtitle": {
    en: "A reading lands differently when the cards know where you are asking from.",
    zh: "当牌知晓你从何处发问，解读会落得不同。",
  },
  "reading.q.area": {
    en: "What area is your question about?",
    zh: "你的问题属于哪个领域？",
  },
  "reading.q.situation": {
    en: "What is happening right now?",
    zh: "此刻正在发生什么？",
  },
  "reading.q.intent": {
    en: "What do you want from this reading?",
    zh: "你期望从这次解读中获得什么？",
  },
  "area.love": { en: "Love & relationships", zh: "爱与关系" },
  "area.work": { en: "Work & craft", zh: "工作与技艺" },
  "area.self": { en: "Self & inner life", zh: "自我与内在" },
  "area.decision": { en: "A decision", zh: "一个决定" },
  "area.general": { en: "General guidance", zh: "综合指引" },
  "situation.stuck": { en: "I feel stuck", zh: "我感到停滞" },
  "situation.choosing": { en: "I am choosing between things", zh: "我在做抉择" },
  "situation.processing": { en: "I am processing something", zh: "我在消化某事" },
  "situation.curious": { en: "I am just curious", zh: "我只是好奇" },
  "intent.clarity": { en: "Clarity", zh: "清明" },
  "intent.permission": { en: "Permission", zh: "允许" },
  "intent.push": { en: "A gentle push", zh: "一次温柔的推动" },
  "intent.reflection": { en: "Reflection", zh: "反思" },

  // Contextual opener per area (appears above the cards)
  "opener.love": {
    en: "In matters of the heart — the currents between people, the quiet spaces where tenderness lives — here is what the cards are offering you.",
    zh: "在心之事——人与人之间的暗流，温柔栖息的静处——这里是牌为你呈现的。",
  },
  "opener.work": {
    en: "About work, craft, and the place where you give your labor — the cards point toward something specific for you to notice.",
    zh: "关于工作、技艺，以及你投注劳力之处——牌正指向你当特别留意的事。",
  },
  "opener.self": {
    en: "For the inner question — about who you are becoming, or who you have been — the cards speak gently but without flinching.",
    zh: "对于内在的追问——关于你正成为谁，或你曾是谁——牌温和地诉说，却不回避。",
  },
  "opener.decision": {
    en: "You came asking about a choice. The cards do not choose for you, but they show the weather around each path.",
    zh: "你带着一个选择前来。牌不会替你选择，但它们显示出每条路上的天气。",
  },
  "opener.general": {
    en: "A general reading — the cards will speak to what most needs to be heard right now, whether or not you expected it.",
    zh: "一次综合的解读——牌会对此刻最需被听见之事发声，无论你是否预期。",
  },

  // Situation bridge — a small italic line between the cards and the closer
  "bridge.stuck": {
    en: "When something is stuck, the cards often show where the stuckness is being held. Notice which card feels heaviest to read.",
    zh: "当某事停滞时，牌常常显示停滞被容纳之处。留意哪张牌读来最沉。",
  },
  "bridge.choosing": {
    en: "When you are choosing, the cards show the texture of each option rather than the answer. Read with your body, not only your mind.",
    zh: "当你在抉择时，牌显示的是各个选项的质地，而非答案。用你的身体去读，而非仅以心智。",
  },
  "bridge.processing": {
    en: "When you are processing something, the cards are companions, not verdicts. They name what you already half-know.",
    zh: "当你在消化某事时，牌是同伴，而非判决。它们为你已半知之物命名。",
  },
  "bridge.curious": {
    en: "When you come with curiosity, the cards are generous. Stay open — the most useful insight is often the one you did not look for.",
    zh: "当你带着好奇前来，牌是慷慨的。保持敞开——最有用的洞见往往是你不曾寻找的那一个。",
  },

  // Intent closer
  "closer.clarity": {
    en: "You asked for clarity. Clarity rarely arrives as a lightning bolt — it settles in like dusk. Read the meanings slowly, twice, and notice which line will not let you go.",
    zh: "你寻求清明。清明鲜少如闪电般降临——它像暮色那样沉落。缓慢地读两遍含义，留意哪一句不肯放过你。",
  },
  "closer.permission": {
    en: "You asked for permission. Here it is: you are already allowed. The cards are simply naming what your deeper self has already chosen.",
    zh: "你寻求允许。在此：你早已被允许。牌只是在为你更深层的自我早已做出的选择命名。",
  },
  "closer.push": {
    en: "You asked for a gentle push. Consider it given. Now name one small action you could take in the next day or two — not the big one, the small one.",
    zh: "你寻求一次温柔的推动。就当它已给出。现在，说出你在未来一两日内可以采取的一个小行动——不是那个大的，而是那个小的。",
  },
  "closer.reflection": {
    en: "You came to reflect. Sit with what rose up. There is no conclusion required tonight — only the noticing, and the noticing is enough.",
    zh: "你是为反思而来。与浮现之物共坐。今夜无需结论——只需觉察，而觉察已足够。",
  },

  // Follow-up section
  "followup.title": { en: "Go a little deeper", zh: "再深入一些" },
  "followup.applies": {
    en: "How does this apply to my question?",
    zh: "这如何回应我的问题？",
  },
  "followup.step": {
    en: "What is one small next step?",
    zh: "下一个小的行动是什么？",
  },
  "followup.clarify": {
    en: "Draw a clarifying card",
    zh: "再抽一张澄清之牌",
  },
  "followup.clarify.label": {
    en: "Clarifying card",
    zh: "澄清之牌",
  },

  // "How does this apply to my..." per area
  "applies.love": {
    en: "In love, the cards you drew are not a weather forecast of the relationship — they are a mirror of what you are bringing to it. Ask yourself: which of these cards describes you more than it describes the other person? Begin there. The work you can do is the work on your own side of the connection.",
    zh: "在爱情中，你抽到的牌不是关系的天气预报——它们是你带入这段关系之物的镜子。问问自己：这些牌中，哪一张描述的是你自己多过于对方？从那里开始。你能做的工作，是你这一侧的工作。",
  },
  "applies.work": {
    en: "In work, the cards point less at outcomes and more at how you are showing up. Which card would your most honest colleague say describes your current mode? That is the edge you can grow from — not by fixing yourself, but by noticing what the mode needs in order to soften.",
    zh: "在工作中，牌更多指向的不是结果，而是你当下如何呈现自己。哪一张牌，是你最诚实的同事会说最贴合你当前状态的？那便是你可生长的边缘——不是通过修正自己，而是通过觉察那个状态为了松软下来所需之物。",
  },
  "applies.self": {
    en: "For the inner question, let one card be the name of a part of you — not 'the truth about me,' but one part among many. Parts are easier to speak with than whole selves. Ask that part what it is protecting, and listen without arguing.",
    zh: "对于内在的追问，让一张牌成为你某一部分的名字——不是「关于我的真相」，而是众多部分中的一部分。部分比完整的自我更易被言说。问问那个部分它正在保护什么，聆听而不辩驳。",
  },
  "applies.decision": {
    en: "For a decision, pretend each card is describing what life would feel like on one of your paths. Do not ask which is 'right' — ask which card's world you want to sit inside. The body knows this answer faster than the mind.",
    zh: "对于一个决定，假装每张牌正在描述你其中一条路上的生活感受。不要问哪一个是「对的」——问你想进入哪张牌所描绘的世界中静坐。身体比心智更快知道这个答案。",
  },
  "applies.general": {
    en: "A general reading is most useful when you let the card find the question rather than the other way around. Reread the meanings slowly — which one seems to know something about your week, something you had not yet put into words?",
    zh: "综合解读最有用的时候，是让牌找到问题，而非相反。缓慢地重读含义——哪一则似乎知道关于你这一周的某件事，某件你尚未能付诸言语之事？",
  },

  // "One small step" per intent
  "step.clarity": {
    en: "Take one card and write down — on paper, not a screen — what you think it is saying about your question. Do not try to be wise. Put the paper down. Come back to it in the morning.",
    zh: "取一张牌，写下——在纸上，不是屏幕——你认为它对你的问题说了什么。不要试图显得聪明。放下那张纸。早晨再回来。",
  },
  "step.permission": {
    en: "Do the one small thing you have been waiting for permission to do. Not the whole journey — just the first small, almost trivial thing. If you can, do it in the next twelve hours.",
    zh: "做那件你一直在等待被允许去做的小事。不是整段旅程——只是那第一件小到近乎微不足道的事。如果可以，在接下来十二小时内去做。",
  },
  "step.push": {
    en: "Share the cards with one trusted friend. Say 'here is what I drew, here is what I am thinking.' Being witnessed is half the push — the other half happens on its own, once you have spoken the thing aloud.",
    zh: "把这几张牌分享给一位信任的朋友。说：「我抽到了这些，我在想这些。」被见证，是推动的一半——另一半会自行发生，一旦你把那件事说出口。",
  },
  "step.reflection": {
    en: "Light one candle, read the meanings once more, and do nothing. The step is the absence of a step. Let the reading settle overnight — you will know more tomorrow.",
    zh: "点一支烛，再读一遍含义，什么也不做。此刻的步伐，就是没有步伐。让解读在夜里沉淀——明日你会知晓更多。",
  },

  // Locked teaser
  "locked.label": { en: "Coming soon", zh: "即将推出" },
  "locked.title": {
    en: "A deeper reading, guided by AI",
    zh: "更深层的解读，由 AI 引领",
  },
  "locked.body": {
    en: "These interpretations are a doorway. Soon, visitors will be able to unlock a full AI-guided conversation with the cards — one that responds to your own written question and continues as you reply. For now, this is where the free reading ends.",
    zh: "这些解读是一道门。不久之后，访客将能解锁一次完整的、由 AI 引导的与牌的对话——它会回应你亲手写下的问题，并在你答复时继续展开。目前，免费的解读到此为止。",
  },
  "locked.preview": {
    en: "…the card in the present position is asking something specific of you, and once you name it aloud, the path forward begins to…",
    zh: "……「现在」位置上的这张牌，正对你提出某个具体的请求，一旦你将它说出口，前路便开始……",
  },

  "reading.draw.disabled": {
    en: "Answer the three questions above first",
    zh: "请先回答上方三个问题",
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
