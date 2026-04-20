"use client";

import {
  createContext,
  useContext,
  useEffect,
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
  "card.prev": { en: "Previous card", zh: "上一张牌" },
  "card.next": { en: "Next card", zh: "下一张牌" },

  // Card detail — long-form sections
  "card.element.label": { en: "Element", zh: "元素" },
  "card.numerology.label": { en: "Numerology", zh: "数字含义" },
  "card.love.title": { en: "In love & relationships", zh: "在爱情与关系中" },
  "card.career.title": { en: "In career & money", zh: "在事业与金钱中" },
  "card.advice.title": { en: "As advice", zh: "作为指引" },
  "card.yesno.title": { en: "Yes or no?", zh: "是 还是 否？" },
  "card.yesno.yes": { en: "Yes", zh: "是" },
  "card.yesno.no": { en: "No", zh: "否" },
  "card.yesno.maybe": { en: "Maybe", zh: "也许" },
  "card.related.title": { en: "Cards that pair with this one", zh: "与之相配的牌" },
  "card.faq.title": { en: "Frequently asked questions", zh: "常见问题" },
  "card.breadcrumb.home": { en: "Home", zh: "首页" },
  "card.breadcrumb.cards": { en: "Cards", zh: "牌库" },

  // Suit & arcana landing pages
  "suits.intro.title": {
    en: "The four suits of the tarot",
    zh: "塔罗的四大花色",
  },
  "suits.intro.subtitle": {
    en: "Each suit governs a domain of human experience — fire, water, air, earth — and together they map the full terrain of daily life. The Major Arcana stands apart, tracing the soul's larger arc.",
    zh: "每个花色掌管人类经验的一个领域——火、水、风、土——合在一起，它们绘制出日常生活的完整地形。大阿卡纳独立其外，追踪灵魂更宏大的弧线。",
  },

  "suit.major.title": {
    en: "Major Arcana — The 22 Soul Cards",
    zh: "大阿卡纳——22张灵魂之牌",
  },
  "suit.major.body": {
    en: "The 22 Major Arcana are the backbone of the tarot. They do not belong to any suit or element; they belong to the journey itself. Beginning with The Fool — numberless, open, unformed — and closing with The World — complete, integrated, arrived — they trace the great passages every life must negotiate: innocence, authority, loss, surrender, rebirth. When a Major card appears in a reading, it speaks louder than the cards around it. It names not what is happening in your week, but what is happening in your life. These are the cards that stay with you long after the reading ends.",
    zh: "22张大阿卡纳是塔罗的脊梁。它们不属于任何花色或元素；它们属于旅程本身。从愚者——无编号、敞开、未成形——开始，到世界——完整、圆融、抵达——结束，它们追踪着每个生命必须经历的重大转折：天真、权威、失去、臣服、重生。当一张大牌出现在解读中，它的声音比周围的牌更响亮。它命名的不是你这一周正在发生的事，而是你这一生正在发生的事。这些牌会在解读结束很久之后仍与你同在。",
  },

  "suit.wands.title": {
    en: "Suit of Wands — Fire, Passion & Action",
    zh: "权杖花色——火、激情与行动",
  },
  "suit.wands.body": {
    en: "Wands carry the element of fire. They speak to what drives you — ambition, creativity, desire, the restless energy that starts things before the mind catches up. In a reading, Wands often point to projects, purpose, and the will to move. They ask whether you are creating from genuine passion or simply staying busy. The shadow side of fire is burnout: action without rest, desire without direction. When Wands dominate a spread, something in your life is asking to be built, expressed, or released. Pay attention to where the heat is — that is where the work wants to happen.",
    zh: "权杖承载火的元素。它们言说驱动你之物——野心、创造力、渴望，那种在心智跟上之前便已启动的躁动能量。在解读中，权杖常指向项目、目标与行动的意志。它们追问你是出于真正的热情在创造，还是仅仅让自己忙碌。火的阴影面是倦怠：没有休息的行动，没有方向的渴望。当权杖在牌阵中占主导时，你生活中的某件事正请求被建造、表达或释放。留意热量所在之处——那里便是工作渴望发生的地方。",
  },

  "suit.cups.title": {
    en: "Suit of Cups — Water, Emotion & Intuition",
    zh: "圣杯花色——水、情感与直觉",
  },
  "suit.cups.body": {
    en: "Cups belong to water. They govern the interior world — feelings, relationships, dreams, the quiet knowing that arrives before language. Where Wands push outward, Cups draw inward. They appear when a reading touches love, grief, longing, or creative imagination. Cups ask how open you are to receiving, not only giving. They reveal the difference between emotional depth and emotional avoidance. When many Cups surface in a spread, the question is rarely about what to do; it is about what to feel, and whether you are willing to feel it fully. Water finds its own level. The cards simply show you where the water is.",
    zh: "圣杯属于水。它们掌管内在世界——感受、关系、梦境，那种在语言到来之前便已降临的静默知觉。权杖向外推进，而圣杯向内牵引。当解读触及爱、悲伤、渴望或创造性想象时，它们便会出现。圣杯追问你对接受——而非仅是给予——有多开放。它们揭示情感深度与情感回避之间的区别。当大量圣杯浮现在牌阵中，问题很少关于该做什么；而是关于该感受什么，以及你是否愿意完整地去感受。水会自己找到水平面。牌只是让你看见水在哪里。",
  },

  "suit.swords.title": {
    en: "Suit of Swords — Air, Thought & Truth",
    zh: "宝剑花色——风、思维与真相",
  },
  "suit.swords.body": {
    en: "Swords cut through air. They belong to the mind — thought, communication, conflict, clarity. Of the four suits, Swords carry the most tension. They appear in readings about difficult truths, hard decisions, and the mental patterns that keep you circling. A Sword card does not comfort; it clarifies. It asks whether your thoughts are serving you or imprisoning you. The gift of this suit is discernment: the ability to see what is real and name it without flinching. The danger is overthinking — the blade turned inward. When Swords fill a reading, something needs to be said, decided, or released from the grip of the mind.",
    zh: "宝剑切穿空气。它们属于心智——思维、沟通、冲突、清晰。在四个花色中，宝剑承载最多的张力。它们出现在关于困难真相、艰难决定，以及那些让你反复打转的思维模式的解读中。宝剑牌不安慰；它澄清。它追问你的思绪是在服务你还是在囚禁你。这个花色的天赋是辨别力：看见真实之物并毫不退缩地为之命名的能力。其危险则是过度思考——刀刃向内转。当宝剑充满一次解读时，有些事需要被说出、被决定，或从心智的紧握中被释放。",
  },

  "suit.pentacles.title": {
    en: "Suit of Pentacles — Earth, Material & Body",
    zh: "钱币花色——土、物质与身体",
  },
  "suit.pentacles.body": {
    en: "Pentacles rest on earth. They speak to the material world — money, health, home, craft, the slow patient work of building something that lasts. Where other suits deal in spark or storm, Pentacles deal in seasons. They appear in readings about livelihood, physical wellbeing, and the question of what you are tending over time. Pentacles ask whether you are rooted or merely stuck, whether your labor is nourishing or depleting. The wisdom of this suit is that the body knows things the mind refuses to learn. When Pentacles gather in a spread, the answer lives not in ideas but in what your hands are already doing.",
    zh: "钱币安于大地。它们言说物质世界——金钱、健康、居所、手艺，以及建造持久之物所需的缓慢而耐心的劳作。其他花色以火花或风暴示人，而钱币以季节度量。它们出现在关于生计、身体健康，以及你正在长期照料什么这一问题的解读中。钱币追问你是扎根还是仅仅停滞，你的劳动是在滋养还是在消耗。这个花色的智慧在于：身体知晓心智拒绝去学的事。当钱币在牌阵中聚集时，答案不在观念中，而在你的双手已经在做的事情里。",
  },

  "suit.explore": {
    en: "Explore all cards in this suit",
    zh: "浏览此花色的所有牌",
  },
  "suit.keywords.label": { en: "Core themes", zh: "核心主题" },

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
  "home.hero.browse": { en: "Browse the cards", zh: "浏览牌库" },

  "home.popular.title": { en: "Most-searched tarot cards", zh: "最多人搜索的塔罗牌" },
  "home.popular.subtitle": {
    en: "These eight cards draw the most questions — tap any card to read its full meaning.",
    zh: "这八张牌引发了最多提问——点击任意一张查看完整含义。",
  },
  "home.popular.viewall": { en: "View all 78 cards →", zh: "查看全部 78 张牌 →" },

  "home.suits.title": { en: "Browse by suit", zh: "按花色浏览" },
  "home.suits.subtitle": {
    en: "The deck divides into five groups — the Major Arcana and four elemental suits. Explore each one.",
    zh: "牌组分为五组——大阿卡纳与四个元素花色。逐一探索。",
  },
  "home.suits.cards": { en: "cards", zh: "张牌" },

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
    en: "In matters of the heart — the currents between people, the quiet spaces where tenderness lives — here is what the cards are offering you. Read slowly. The cards you see below carry both a general meaning and a love-specific interpretation. If one image or phrase catches you more than the others, that is the one meant for you today.",
    zh: "在心之事——人与人之间的暗流，温柔栖息的静处——这里是牌为你呈现的。慢慢读。你在下方看到的牌既承载通用的含义，也有与爱相关的专属解读。若某一幅图或某一句话比其他的更牵住了你，那便是今天属于你的那一则。",
  },
  "opener.work": {
    en: "About work, craft, and the place where you give your labor — the cards point toward something specific for you to notice. Below you will find each card's core meaning and a career-specific reading. Pay attention not just to the words, but to the physical sensation they create. The card that makes you slightly uncomfortable is often the most useful one.",
    zh: "关于工作、技艺，以及你投注劳力之处——牌正指向你当特别留意的事。下方你会发现每张牌的核心含义与事业相关的解读。不仅留意文字，还要留意它们引起的身体感受。那张让你些许不适的牌，往往是最有用的。",
  },
  "opener.self": {
    en: "For the inner question — about who you are becoming, or who you have been — the cards speak gently but without flinching. Each card below holds a mirror, not a verdict. Let the meaning land before you argue with it. The part of you that resists a card is often the part the card is addressing.",
    zh: "对于内在的追问——关于你正成为谁，或你曾是谁——牌温和地诉说，却不回避。下方的每张牌持的是一面镜子，而非一份判决。在你与之辩驳前，先让含义落地。你内在抗拒某张牌的那部分，往往正是那张牌所言说之处。",
  },
  "opener.decision": {
    en: "You came asking about a choice. The cards do not choose for you, but they show the weather around each path. Read the core meanings first, then the advice beneath each card. Together, they paint a picture of what each direction feels like — not which is right, but which your body already leans toward.",
    zh: "你带着一个选择前来。牌不会替你选择，但它们显示出每条路上的天气。先读核心含义，再读每张牌下方的指引。合在一起，它们描绘出每个方向的感受——不是哪一个是「对的」，而是你的身体已在向哪一个倾斜。",
  },
  "opener.general": {
    en: "A general reading — the cards will speak to what most needs to be heard right now, whether or not you expected it. Each card carries advice for the next small step. Let the reading be a companion, not an authority. If one card feels irrelevant, set it aside and come back to it tomorrow — it often makes sense in hindsight.",
    zh: "一次综合的解读——牌会对此刻最需被听见之事发声，无论你是否预期。每张牌都为下一个小步骤携带指引。让解读成为同伴，而非权威。若某张牌感觉不相关，先放在一边，明天再回来——它往往在事后才变得有意义。",
  },

  // Situation bridge — a small italic line between the cards and the closer
  "bridge.stuck": {
    en: "When something is stuck, the cards often show where the stuckness is being held — not in the situation itself, but in you. Notice which card above feels heaviest to read. That is where the movement begins. The yes-or-no indicators can help clarify which direction the energy is flowing.",
    zh: "当某事停滞时，牌常常显示停滞被容纳之处——不在处境本身，而在你之内。留意上方哪张牌读来最沉。那里便是流动开始之处。「是或否」指示可以帮助澄清能量正在朝哪个方向流动。",
  },
  "bridge.choosing": {
    en: "When you are choosing, the cards show the texture of each option rather than the answer itself. Reread the advice section beneath each card — they are speaking to different futures. Read with your body: which future makes your shoulders drop and your breath deepen?",
    zh: "当你在抉择时，牌显示的是各个选项的质地，而非答案本身。重新读每张牌下方的指引部分——它们言说的是不同的未来。用你的身体去读：哪一种未来让你的肩膀放下、呼吸变深？",
  },
  "bridge.processing": {
    en: "When you are processing something, the cards are companions, not verdicts. They name what you already half-know. Look especially at the love-and-relationship or career section — whichever matches your question. The specificity there often surprises people.",
    zh: "当你在消化某事时，牌是同伴，而非判决。它们为你已半知之物命名。特别看与爱情或事业相关的部分——取你问题所对应的那个。那里的具体性常常让人惊讶。",
  },
  "bridge.curious": {
    en: "When you come with curiosity, the cards are generous — they speak to things you hadn't thought to ask. Stay open. The most useful insight is often the card you would have dismissed. Read the advice line beneath each card: the one that irritates you slightly is often the truest.",
    zh: "当你带着好奇前来，牌是慷慨的——它们言说你不曾想到要问之事。保持敞开。最有用的洞见往往是你本会忽视的那张牌。读每张牌下方的指引：那句让你微微恼火的，往往是最真实的。",
  },

  // Intent closer
  "closer.clarity": {
    en: "You asked for clarity. Clarity rarely arrives as a lightning bolt — it settles in like dusk, slowly, and then all at once. Read the meanings above one more time, especially the advice lines. Notice which line will not let you go — that is where the clarity lives. You might want to write it down on paper, not a screen. Tomorrow, read it again. What was confusing tonight may be perfectly clear by morning.",
    zh: "你寻求清明。清明鲜少如闪电般降临——它像暮色那样沉落，缓慢，然后一下子全来。再读一遍上方的含义，特别是指引部分。留意哪一句不肯放过你——那里便是清明栖居之处。你也许想把它写在纸上，而非屏幕。明天再读一次。今夜令人困惑之事，到早晨或许已完全清晰。",
  },
  "closer.permission": {
    en: "You asked for permission. Here it is: you are already allowed. The cards are simply naming what your deeper self has already chosen. Look at the yes-or-no answers above — if the cards say yes, your hesitation is the only remaining obstacle. If they say maybe, a little more information is on its way. Permission was never the problem; courage was. You already have enough of both.",
    zh: "你寻求允许。在此：你早已被允许。牌只是在为你更深层的自我早已做出的选择命名。看看上方的「是或否」——若牌说「是」，你的迟疑就是唯一剩余的障碍。若说「也许」，更多信息正在路上。允许从来不是问题；勇气才是。你两者都已足够。",
  },
  "closer.push": {
    en: "You asked for a gentle push. Consider it given. Now name one small action you could take in the next day or two — not the big one, the small one. The cards above each carry a piece of advice; pick the one that resonated most and let that be your instruction. The push is not about doing everything. It is about doing one thing, soon, imperfectly, and noticing what happens next.",
    zh: "你寻求一次温柔的推动。就当它已给出。现在，说出你在未来一两日内可以采取的一个小行动——不是那个大的，而是那个小的。上方每张牌都承载一段指引；选最共鸣的那条，让它成为你的指示。推动并非关于做所有事。而是关于很快地、不完美地做一件事，然后留意接下来发生什么。",
  },
  "closer.reflection": {
    en: "You came to reflect. Sit with what rose up. There is no conclusion required tonight — only the noticing, and the noticing is enough. If you clicked on any card's name above, it will take you to a full page with even deeper meaning, including how the card shows up in love, career, and as a yes-or-no. But for now, just breathe. The reading is complete. Let it settle overnight.",
    zh: "你是为反思而来。与浮现之物共坐。今夜无需结论——只需觉察，而觉察已足够。若你点击了上方任何牌的名字，它会带你到一页更深的含义，包括牌在爱情、事业中如何显现，以及作为「是或否」的回答。但此刻，只需呼吸。解读已完成。让它在夜里沉淀。",
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
  t: (key: keyof typeof dict) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = initialLang === "zh" ? "zh-CN" : "en";
    }
  }, [initialLang]);

  return (
    <LanguageContext.Provider
      value={{ lang: initialLang, t: (key) => t(key, initialLang) }}
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

// Prefix an in-site path with /{lang}. Accepts either absolute paths ("/cards")
// or already-prefixed paths. Returns "/{lang}/..." for use in <Link href>.
export function localePath(lang: Lang, path: string): string {
  if (path.startsWith(`/${lang}/`) || path === `/${lang}`) return path;
  if (path === "/") return `/${lang}`;
  return `/${lang}${path.startsWith("/") ? "" : "/"}${path}`;
}
