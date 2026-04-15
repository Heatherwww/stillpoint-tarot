// Extended card data: love, career, advice, yes/no, element, numerology,
// FAQs, and related-card links. Drives the long-form card detail pages
// and feeds richer SEO content.
//
// Major Arcana (22 cards): hand-written for each card.
// Minor Arcana (56 cards): generated from suit + rank archetypes.
//
// Tone: same reflective register as cards.ts — no fortune-teller
// theatrics, no absolutes, just useful framing.

import type { BilingualText, TarotCard, Suit } from "./cards";

export type YesNoAnswer = "yes" | "no" | "maybe";

export interface FaqEntry {
  q: BilingualText;
  a: BilingualText;
}

export interface CardExtras {
  inLove: BilingualText;
  inCareer: BilingualText;
  advice: BilingualText;
  yesNo: { answer: YesNoAnswer; explain: BilingualText };
  element?: BilingualText;
  numerology?: BilingualText;
  faqs: FaqEntry[];
  related: string[];
}

// ---------- Major Arcana extras (hand-written) ----------

const majorExtras: Record<string, CardExtras> = {
  "the-fool": {
    inLove: {
      en: "In love, The Fool is the moment of meeting someone new and feeling the cliff-edge of possibility. If you are single, an unexpected encounter may reroute your week. If you are partnered, it asks you to bring beginner's eyes back to a relationship that has grown predictable — what if you didn't already know how this works?",
      zh: "在爱中，愚者是与一个新人相遇、感受到悬崖边可能性的那一刻。若你单身，一次意外的相遇或许会改变你这一周的方向。若你已有伴侣，它请你以初学者的眼光重新看一段已变得可预测的关系——若你并不已知这一切如何运作呢？",
    },
    inCareer: {
      en: "Career-wise, The Fool favors the leap before the ladder is fully built. A new role, a side project, or a return to learning something that has nothing to do with your résumé. The card warns against waiting for the perfect moment — your hesitation is the only thing standing between you and the first real step.",
      zh: "在事业上，愚者偏好梯子尚未完全搭好之前的纵身一跃。一份新职位、一个副业，或重新学一件与履历无关的事。这张牌警告你不要等待完美时刻——你的迟疑，是你与真正的第一步之间唯一的阻挡。",
    },
    advice: {
      en: "Begin badly. The first version is allowed to be ugly; what matters is that it exists. Trust that the path will appear under your foot rather than waiting for it to be paved in advance.",
      zh: "允许糟糕地开始。第一版可以是丑的；重要的是它存在。相信路会在你脚下显现，而不是等它先被铺好。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — but only if you can act before you feel ready.",
        zh: "是——但前提是你能在感到准备好之前行动。",
      },
    },
    element: { en: "Air", zh: "风" },
    numerology: {
      en: "0 — pure potential, the empty cup before any pouring.",
      zh: "0——纯粹的潜能，一切倾倒之前的空杯。",
    },
    faqs: [
      {
        q: { en: "Is The Fool a good or bad card?", zh: "愚者是好牌还是坏牌？" },
        a: {
          en: "Neither. It is the card of beginning, and beginnings are inherently uncertain. It is good if you are stuck and need to move; harder if you are already overcommitted and adding more.",
          zh: "都不是。它是开端之牌，而开端本就不确定。若你停滞不前并需要移动，它是好的；若你已承担过多还要再加，它会更艰难。",
        },
      },
      {
        q: { en: "What does The Fool mean for love?", zh: "愚者在爱情中是什么意思？" },
        a: {
          en: "A new chapter in your love life — a meeting, a confession, or a willingness to risk being seen. For couples, a return to play.",
          zh: "你爱情生活的新篇章——相遇、表白，或愿意冒险被看见。对伴侣而言，重返游戏与玩耍。",
        },
      },
      {
        q: { en: "Does The Fool mean I should quit my job?", zh: "愚者是否意味着我应该辞职？" },
        a: {
          en: "Not necessarily. It means the part of you that has stopped growing inside the role wants to be heard. That can be answered by a side project as easily as by a resignation letter.",
          zh: "不一定。它意味着你内在那个在该角色里停止成长的部分想被听见。一个副业的回应，与一封辞呈一样有效。",
        },
      },
    ],
    related: ["the-magician", "wheel-of-fortune", "the-world"],
  },

  "the-magician": {
    inLove: {
      en: "The Magician in love means you already have what you need to make this connection real — words, presence, attention, willingness. The card asks you to stop waiting for the other person to start, and to become the one who initiates. If single, your next love is closer than you think; act on the small impulse.",
      zh: "魔术师在爱中意味着，你已拥有让这段连接成真所需的一切——言语、在场、注意、意愿。这张牌请你停止等待对方先行动，而成为那个发起的人。若你单身，你的下一段爱比你以为的更近；为那一念冲动行动。",
    },
    inCareer: {
      en: "Professionally, this is a moment of full alignment. Your skills, tools, network, and timing are unusually well-matched — but only for a window. Pitch the idea, send the cold email, ship the prototype. The Magician punishes hesitation more than imperfect execution.",
      zh: "在事业上，这是一个完全对齐的时刻。你的技能、工具、人脉与时机异常匹配——但仅有一段窗口。提出那个想法、发出那封冷邮件、推出那个原型。魔术师惩罚迟疑，更甚于不完美的执行。",
    },
    advice: {
      en: "Don't add more tools. You have enough. Use what is already in front of you with full attention, and the result will surprise you.",
      zh: "不要添加更多工具。你已足够。以全部的注意使用眼前已有之物，结果会让你惊讶。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — your intention is the missing ingredient, not your circumstances.",
        zh: "是——缺失的不是你的处境，而是你的意图。",
      },
    },
    element: { en: "Air", zh: "风" },
    numerology: {
      en: "1 — the number of beginning, focus, the single point of will.",
      zh: "1——开始之数、专注、意志的单一焦点。",
    },
    faqs: [
      {
        q: { en: "What is The Magician trying to tell me?", zh: "魔术师想告诉我什么？" },
        a: {
          en: "That the gap between your situation and your goal is smaller than you think, and that the bridge is your own deliberate action — not luck, not timing, not someone else.",
          zh: "你的处境与目标之间的距离比你以为的更小，而那座桥是你自己有意为之的行动——不是运气、时机或他人。",
        },
      },
      {
        q: { en: "Is The Magician about manifestation?", zh: "魔术师是关于显化的吗？" },
        a: {
          en: "In a sense, but not the magical-thinking version. It is about taking concrete daily action in the direction of what you say you want, until the world catches up.",
          zh: "在某种意义上是，但不是魔法式的版本。它是关于朝你所说想要之事的方向每日采取具体行动，直到世界跟上。",
        },
      },
      {
        q: { en: "Can The Magician be negative?", zh: "魔术师可能是负面的吗？" },
        a: {
          en: "Reversed, yes — when the same focus and skill are turned to manipulation or self-deception. Ask whether your means honor your end.",
          zh: "在逆位时，是的——当同样的专注与技能被用于操控或自欺。问问你的手段是否对得起你的目的。",
        },
      },
    ],
    related: ["the-fool", "the-high-priestess", "eight-of-pentacles"],
  },

  "the-high-priestess": {
    inLove: {
      en: "The High Priestess in love says the most important information is what is not yet being spoken. Read between the lines — yours and theirs. A relationship is asking for depth rather than activity. If single, the right person will be drawn to your stillness, not your performance.",
      zh: "女祭司在爱中说，最重要的信息是尚未被说出口之物。读字里行间——你的与他们的。一段关系在请求深度而非活动。若你单身，对的人会被你的静默吸引，而不是你的表演。",
    },
    inCareer: {
      en: "At work this card asks you to trust a hunch you cannot yet justify in a meeting. Don't push the decision; let it ripen overnight. Research, study, and reflection are favored — public action and big announcements are not. Watch what others assume and stay quiet.",
      zh: "在工作中，这张牌请你信任一个尚无法在会议上为之辩护的直觉。不要硬推决定；让它在过夜中成熟。研究、学习与反思被支持——公开行动与宏大宣告则不被支持。观察他人所假设之事，保持安静。",
    },
    advice: {
      en: "Wait one more day before answering. The first answer is rarely the deepest one. Sleep on it; the truth will float up by morning.",
      zh: "在回答前再等一天。第一个答案很少是最深的那一个。睡一觉再说；真相会在清晨浮现。",
    },
    yesNo: {
      answer: "maybe",
      explain: {
        en: "Maybe — the answer exists, but it is not yet ready to be spoken aloud.",
        zh: "也许——答案存在，但尚未准备好被大声说出。",
      },
    },
    element: { en: "Water", zh: "水" },
    numerology: {
      en: "2 — duality, mirroring, the space between two pillars.",
      zh: "2——二元、映照、两柱之间的空间。",
    },
    faqs: [
      {
        q: { en: "Is The High Priestess a yes?", zh: "女祭司是「是」吗？" },
        a: {
          en: "Not exactly. She is the card of waiting until the truth surfaces — the answer is forming, but speaking it now would freeze it.",
          zh: "并非如此。她是等待真相浮现之牌——答案正在成形，但此刻说出会将它定型。",
        },
      },
      {
        q: { en: "What does The High Priestess mean spiritually?", zh: "女祭司在灵性上是什么意思？" },
        a: {
          en: "She represents the inner knowing that doesn't pass through language — dreams, symbols, body-sense. A signal to spend more time in silence than in conversation.",
          zh: "她代表那份不经语言的内在知晓——梦境、象征、身体之感。是一个信号：在静默中比在交谈中花更多时间。",
        },
      },
      {
        q: { en: "Does The High Priestess mean a secret?", zh: "女祭司是否意味着一个秘密？" },
        a: {
          en: "Sometimes — something is being withheld, by you or by another. More often it means a truth that hasn't yet found its words.",
          zh: "有时——某物被隐藏，由你或他人所为。更常见的是，一个真相尚未找到它的言语。",
        },
      },
    ],
    related: ["the-moon", "the-magician", "two-of-swords"],
  },

  "the-empress": {
    inLove: {
      en: "The Empress in love is fertile, generous, and embodied. A relationship is moving into a season of warmth and sensuality — touch, food shared, slow weekends. For some, literal pregnancy or the desire for it. For everyone, the reminder that love is grown, not extracted.",
      zh: "皇后在爱中是丰饶、慷慨且具身的。一段关系正进入温暖与感官的季节——触碰、共食、慢长的周末。对某些人而言是字面意义的孕育或对它的渴望。对所有人而言，是一个提醒：爱是被滋养出来的，而非被榨取的。",
    },
    inCareer: {
      en: "At work, The Empress brings creative abundance. Projects you've nurtured begin to bear fruit; the ground is fertile for launching something with real care behind it. Avoid forcing or rushing. This is a season for tending rather than chasing — and the harvest belongs to those who can wait for it.",
      zh: "在工作中，皇后带来创造的丰盛。你所滋养的项目开始结果；土壤适合启动一件背后有真正用心之事。避免硬推或急赶。这是培育而非追逐的季节——收成属于能等待之人。",
    },
    advice: {
      en: "Tend, don't force. Whatever you are building grows faster when you stop pulling on it. Return to your body — eat well, walk, touch something real.",
      zh: "培育，不要硬推。你所建之物在你停止拉扯它时长得更快。回到身体——好好吃饭、行走、触碰真实之物。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — abundance is on its way; let it ripen at its own pace.",
        zh: "是——丰盛正在路上；让它以自己的节奏成熟。",
      },
    },
    element: { en: "Earth", zh: "土" },
    numerology: {
      en: "3 — creativity, growth, the third thing born of two.",
      zh: "3——创造、生长、由二所生之第三者。",
    },
    faqs: [
      {
        q: { en: "Does The Empress mean pregnancy?", zh: "皇后是否意味着怀孕？" },
        a: {
          en: "Sometimes literally, more often metaphorically — a creative project, a relationship deepening, a long-tended idea ready to emerge. Read it alongside the surrounding cards.",
          zh: "有时是字面意义上的，更多时是隐喻——一个创意项目、一段加深的关系、一个长久培育的想法准备浮现。结合周围的牌一起读。",
        },
      },
      {
        q: { en: "What does The Empress represent in tarot?", zh: "皇后在塔罗中代表什么？" },
        a: {
          en: "The principle of nurture, fertility, and embodied creativity. She is the mother archetype — generous, sensual, rooted in the earth.",
          zh: "滋养、丰饶与具身创造的原则。她是母亲原型——慷慨、感性、扎根于大地。",
        },
      },
      {
        q: { en: "Is The Empress a good love card?", zh: "皇后是好的爱情牌吗？" },
        a: {
          en: "Yes — it is one of the warmest love cards in the deck, suggesting deepening, comfort, and physical presence.",
          zh: "是的——她是牌组中最温暖的爱情牌之一，暗示加深、安适与身体的在场。",
        },
      },
    ],
    related: ["the-emperor", "ten-of-cups", "queen-of-pentacles"],
  },

  "the-emperor": {
    inLove: {
      en: "The Emperor in love favors structure: defining the relationship, meeting the family, moving in. For some this card means the partner who shows up consistently — boring in the best way. For others, a warning that one person is doing all the rule-setting; balance the throne.",
      zh: "皇帝在爱中偏爱结构：确定关系、见家人、同居。对某些人而言，这张牌意味着始终如一出现的伴侣——以最好的意义上的「无聊」。对另一些人而言，是一个警告：一人在订所有规则；让王座平衡。",
    },
    inCareer: {
      en: "Career-wise this is the card of leadership, structure, and authority. A promotion, a clearer role, or the moment you stop asking permission and start setting direction. If you've been chaotic, set up the systems now. If you've been over-controlled, this is the card of becoming the boss — including of yourself.",
      zh: "在事业上，这是领导、结构与权威之牌。一次晋升、更清晰的角色，或你停止征求许可、开始设定方向的那一刻。若你一直混乱，现在就建立系统。若你一直被过度控制，这是成为老板之牌——包括成为自己的老板。",
    },
    advice: {
      en: "Decide. Then write the decision down where you cannot avoid it. Authority comes from making the call, not from waiting for consensus.",
      zh: "做决定。然后把它写在你无法回避的地方。权威来自做出抉择，而非等待共识。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — provided you act as the one in charge, not the one waiting for permission.",
        zh: "是——前提是你以掌权者而非等待许可者的身份行动。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "4 — the four corners, stability, the foundation stone.",
      zh: "4——四角、稳定、奠基之石。",
    },
    faqs: [
      {
        q: { en: "What does The Emperor mean in tarot?", zh: "皇帝在塔罗中是什么意思？" },
        a: {
          en: "Structure, authority, and the principle of order. He is the father archetype — protective, decisive, sometimes rigid.",
          zh: "结构、权威与秩序的原则。他是父亲原型——具保护性、果断，有时也僵硬。",
        },
      },
      {
        q: { en: "Is The Emperor a positive card for love?", zh: "皇帝对爱情而言是正面的牌吗？" },
        a: {
          en: "Yes if you crave commitment and clarity; less so if you fear control. He represents the partner who can hold the frame.",
          zh: "若你渴望承诺与清晰则是；若你害怕被控制则不然。他代表能撑起框架的伴侣。",
        },
      },
      {
        q: { en: "Does The Emperor mean my father?", zh: "皇帝是否意味着我的父亲？" },
        a: {
          en: "Sometimes a literal father figure; more often the part of you that wants to take charge and build something lasting.",
          zh: "有时是字面上的父亲形象；更多时是你内在想要掌管并建造长存之物的那部分。",
        },
      },
    ],
    related: ["the-empress", "the-hierophant", "king-of-pentacles"],
  },

  "the-hierophant": {
    inLove: {
      en: "The Hierophant in love is the card of tradition, commitment, and shared values. Marriage, meeting the parents, moving from casual to defined. It can also mean a relationship that runs along familiar tracks — comforting if those tracks suit you, claustrophobic if they don't.",
      zh: "教皇在爱中是传统、承诺与共同价值之牌。婚姻、见父母、从随意走向确定。它也可能意味着一段沿着熟悉轨迹运行的关系——若那轨迹适合你便是慰藉，若不适合则是窒息。",
    },
    inCareer: {
      en: "At work this card favors mentorship, formal training, and institutional paths. Returning to school, getting certified, joining a guild or professional body. The Hierophant warns against the lone-wolf approach — there are people who already know what you're trying to learn, and they're easier to find than you think.",
      zh: "在工作中，这张牌支持师承、正式训练与体制路径。重返校园、获取证书、加入行会或专业组织。教皇警告不要孤狼式作风——已有人知道你想学的东西，且比你以为的更易寻得。",
    },
    advice: {
      en: "Find a teacher. Or a tradition. Or a structured program. You are trying to invent something that already has a curriculum.",
      zh: "找一位老师。或一个传统。或一个有结构的课程。你正试图发明一件已有课程的事物。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — especially if you are walking a well-trodden path with proper guidance.",
        zh: "是——尤其当你走在一条有适当指引的成熟之路上时。",
      },
    },
    element: { en: "Earth", zh: "土" },
    numerology: {
      en: "5 — the bridge between heaven and earth, the human teacher.",
      zh: "5——天与地之间的桥梁、人间的师者。",
    },
    faqs: [
      {
        q: { en: "Does The Hierophant mean marriage?", zh: "教皇是否意味着婚姻？" },
        a: {
          en: "Often yes — or any formal commitment with cultural weight. It is one of the strongest commitment-cards in the deck.",
          zh: "通常是——或任何具文化分量的正式承诺。它是牌组中最强的承诺牌之一。",
        },
      },
      {
        q: { en: "Is The Hierophant good or bad?", zh: "教皇是好牌还是坏牌？" },
        a: {
          en: "Neither. Whether tradition is good for you depends on whether it fits. The card asks: does this structure serve who I actually am?",
          zh: "都不是。传统对你是否好取决于它是否合身。这张牌问：这个结构是否服务于我真正所是？",
        },
      },
      {
        q: { en: "What does The Hierophant mean for spirituality?", zh: "教皇在灵性上是什么意思？" },
        a: {
          en: "Joining a tradition, finding a teacher, or recommitting to a practice you'd drifted from. Less about private mysticism, more about shared form.",
          zh: "加入一个传统、寻得师者，或重新承诺一项你曾偏离的实践。少关于私人神秘主义，多关于共享之形。",
        },
      },
    ],
    related: ["the-emperor", "the-lovers", "six-of-pentacles"],
  },

  "the-lovers": {
    inLove: {
      en: "The Lovers is the truest love card in the deck. A meaningful connection, a choice to commit, a relationship moving into deeper alignment. If you are single, someone is being placed in your path who will require you to choose. If partnered, a value-level conversation is overdue.",
      zh: "恋人是牌组中最真实的爱情牌。一段有意义的连接、一个承诺的选择、一段走向更深对齐的关系。若你单身，有人正被置于你的路上，他将要求你做出选择。若你已有伴侣，一场关于价值的对话已迟到。",
    },
    inCareer: {
      en: "At work this card is about a values-level decision: which path actually fits who you are becoming? It can mean a meaningful partnership — a co-founder, collaborator, mentor — or the moment you choose alignment over money. The choice is binary; trying to keep both options is the trap.",
      zh: "在工作中，这张牌是关于价值层面的决定：哪条路真正契合你正在成为之人？它可能意味着一段有意义的合作——共同创办人、合作者、导师——或你选择对齐而非金钱的那一刻。选择是二元的；试图保留两个选项才是陷阱。",
    },
    advice: {
      en: "Choose. Not the easier option, not the more flattering option — the one your future self will thank you for. The discomfort of choosing is the price of integrity.",
      zh: "选择。不是更容易的，也不是更讨好的——而是未来的你会感谢你的那一个。选择之不适，是正直的代价。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — strongly so for love; for other questions, only if the choice aligns with your values.",
        zh: "是——对爱情尤为强烈；对其他问题，只在选择与你的价值对齐时为是。",
      },
    },
    element: { en: "Air", zh: "风" },
    numerology: {
      en: "6 — harmony, union, the meeting of two into one shared third.",
      zh: "6——和谐、合一、二者会面成第三共享之物。",
    },
    faqs: [
      {
        q: { en: "Does The Lovers mean soulmate?", zh: "恋人是否意味着灵魂伴侣？" },
        a: {
          en: "It can mean an important, value-aligned connection — but the card is more about the choice you make than about destiny pre-deciding for you.",
          zh: "它可能意味着一段重要的、价值对齐的连接——但这张牌更多是关于你所做的选择，而非命运为你预先决定。",
        },
      },
      {
        q: { en: "Is The Lovers always about romance?", zh: "恋人总是关于浪漫吗？" },
        a: {
          en: "No. It often shows a moral choice or a values-level decision in a non-romantic context: which job, which city, which version of yourself.",
          zh: "不。它常常显示在非浪漫情境中的道德选择或价值层面的决定：哪份工作、哪座城市、哪个版本的自己。",
        },
      },
      {
        q: { en: "Does The Lovers mean cheating?", zh: "恋人是否意味着出轨？" },
        a: {
          en: "Reversed it can — but more commonly it just means a hard choice between two options. Pulling The Lovers does not predict betrayal.",
          zh: "在逆位时可能——但更常见的是两个选项之间的艰难选择。抽到恋人并不预示背叛。",
        },
      },
    ],
    related: ["two-of-cups", "the-hierophant", "ten-of-cups"],
  },

  "the-chariot": {
    inLove: {
      en: "The Chariot in love is the card of disciplined pursuit. If single, you are being asked to actively go after the person rather than waiting to be chosen. If partnered, the relationship needs direction — a shared goal, a project, a deliberate step forward together rather than drifting.",
      zh: "战车在爱中是有纪律的追求之牌。若你单身，你被请求主动去追求那个人，而非等待被选中。若你已有伴侣，关系需要方向——一个共同目标、一个项目、一步刻意一起向前迈进，而非随波漂流。",
    },
    inCareer: {
      en: "At work this card favors focused effort toward a specific outcome. Stop spreading energy across six projects; pick the one and ride it. Victory is available but only if you can hold opposing forces — your own competing impulses — in single direction. Willpower over mood.",
      zh: "在工作中，这张牌支持朝向特定结果的专注努力。停止把能量散在六个项目上；选一个并驾驭它。胜利可得，但前提是你能将相对的力量——你自己相互竞争的冲动——握于同一方向。意志力胜过情绪。",
    },
    advice: {
      en: "Pick one direction and commit your full body to it. Half-measures are the enemy. The horses pull both ways only when you let go of the reins.",
      zh: "选一个方向，并将整个身体投入其中。半吊子是敌人。马匹向两边拉扯，只在你松开缰绳时。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — but only with sustained focus and clear intent.",
        zh: "是——但只在持续的专注与清晰的意图下。",
      },
    },
    element: { en: "Water", zh: "水" },
    numerology: {
      en: "7 — the warrior's number, mastery through focused will.",
      zh: "7——战士之数，借专注的意志达成精通。",
    },
    faqs: [
      {
        q: { en: "What does The Chariot mean?", zh: "战车是什么意思？" },
        a: {
          en: "Disciplined willpower, focused movement toward a goal, victory through holding opposing forces in alignment.",
          zh: "有纪律的意志力、朝向目标的专注移动、借将相对力量保持对齐而获胜。",
        },
      },
      {
        q: { en: "Is The Chariot a yes card?", zh: "战车是「是」牌吗？" },
        a: {
          en: "Yes — and one of the more action-oriented yeses in the deck. It rewards initiative more than patience.",
          zh: "是——而且是牌组中较为行动导向的「是」之一。它奖励主动远胜耐心。",
        },
      },
      {
        q: { en: "Does The Chariot mean travel?", zh: "战车是否意味着旅行？" },
        a: {
          en: "Sometimes literally — a journey, a move, a commute that matters. More often it means inner momentum that takes you somewhere new.",
          zh: "有时是字面上的——一次旅程、一次搬迁、一段重要的通勤。更常见的是带你去新地方的内在势能。",
        },
      },
    ],
    related: ["strength", "knight-of-wands", "eight-of-wands"],
  },

  "strength": {
    inLove: {
      en: "Strength in love is the soft kind — patience with a partner who is hard to reach, courage to stay tender when you would rather harden. A relationship is asking for warmth, not force. If single, the card invites you to keep your heart open even after disappointment.",
      zh: "力量在爱中是柔软的那一种——对一个难以触及的伴侣保有耐心，在你宁愿变硬时仍有勇气保持温柔。一段关系在请求温暖，而非力量。若你单身，这张牌邀请你即使在失望之后仍敞开心。",
    },
    inCareer: {
      en: "At work, Strength means quiet confidence under pressure. You don't need to prove anything by raising your voice. The card favors a long-running project that requires showing up day after day rather than a single dramatic act. Your steady presence is the leverage.",
      zh: "在工作中，力量意味着压力下的安静自信。你不需要靠提高音量来证明任何事。这张牌支持一个需要日复一日出现的长期项目，而非一次戏剧性的行动。你稳定的在场就是杠杆。",
    },
    advice: {
      en: "Be gentle with the part of yourself you find hardest to love. That is where your real power lives. Force will lose you what patience could have won.",
      zh: "对你最难爱的那部分自己温柔。你真正的力量住在那里。蛮力会让你失去耐心本可赢得之物。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — through patience and inner steadiness rather than force.",
        zh: "是——借由耐心与内在的稳定，而非蛮力。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "8 — the infinity of inner power, balance between spirit and instinct.",
      zh: "8——内在力量的无限、灵性与本能之间的平衡。",
    },
    faqs: [
      {
        q: { en: "What is the meaning of Strength in tarot?", zh: "塔罗中力量的意思是什么？" },
        a: {
          en: "Inner courage, patience, and the gentle kind of power that tames rather than dominates. Influence through warmth, not force.",
          zh: "内在的勇气、耐心，以及驯服而非支配的温柔力量。借温暖而非强力的影响。",
        },
      },
      {
        q: { en: "Is Strength a positive card?", zh: "力量是正面的牌吗？" },
        a: {
          en: "Yes — it is one of the most affirming cards in the deck, especially when you are doubting your own capacity to keep going.",
          zh: "是——它是牌组中最具肯定力的牌之一，尤其在你怀疑自己继续前行的能力时。",
        },
      },
      {
        q: { en: "Does Strength mean I should stand my ground?", zh: "力量是否意味着我应该坚守立场？" },
        a: {
          en: "Yes, but softly. The card recommends presence over confrontation — the lion is tamed by hand on its mane, not by sword.",
          zh: "是的，但要柔软。这张牌推崇在场胜过对抗——狮子被驯服，是手按其鬃，而非以剑。",
        },
      },
    ],
    related: ["the-chariot", "queen-of-wands", "the-hermit"],
  },

  "the-hermit": {
    inLove: {
      en: "The Hermit in love asks for solitude before partnership. You may need a season alone to hear what you actually want. If partnered, a temporary withdrawal — a weekend of silence, a solo trip — will return you to the relationship more whole, not less. Distance can be intimacy.",
      zh: "隐者在爱中请求伴侣关系之前的独处。你可能需要一段独自的时光，去听见你真正想要什么。若你已有伴侣，暂时的退离——一个安静的周末、一次独自的旅行——会让你更完整地回到关系中，而非更少。距离可以是亲密。",
    },
    inCareer: {
      en: "At work the Hermit favors deep work over meetings. Step away from the noise, do the thinking the rest of the team is too busy to do, and come back with the answer. Mentorship is highlighted — either you become a teacher, or you finally let someone teach you.",
      zh: "在工作中，隐者偏好深度工作胜过会议。离开喧嚣，做团队其他人忙得没空做的思考，然后带着答案回来。师徒关系被强调——要么你成为老师，要么你终于让某人教你。",
    },
    advice: {
      en: "Spend a day with no input. No phone, no advice, no other voices. The answer you are looking for is being drowned out, not absent.",
      zh: "度过一日没有输入的时光。没有手机、没有建议、没有其他声音。你寻找的答案被淹没，而非缺席。",
    },
    yesNo: {
      answer: "maybe",
      explain: {
        en: "Maybe — wait, reflect, and the answer will reveal itself in solitude.",
        zh: "也许——等待、反思，答案会在独处中自行显现。",
      },
    },
    element: { en: "Earth", zh: "土" },
    numerology: {
      en: "9 — the lamp held high, the wisdom of one cycle nearly complete.",
      zh: "9——高举的灯、一个几近完成之循环的智慧。",
    },
    faqs: [
      {
        q: { en: "Does The Hermit mean I should be alone?", zh: "隐者是否意味着我应该独处？" },
        a: {
          en: "For now, yes. The card recommends a deliberate pause from social input so your own voice can be heard. It is not a permanent prescription.",
          zh: "目前是。这张牌推荐刻意暂停社交输入，让你自己的声音被听见。它不是永久的处方。",
        },
      },
      {
        q: { en: "Is The Hermit about loneliness?", zh: "隐者是关于孤独的吗？" },
        a: {
          en: "No — it is about chosen solitude, which is the opposite of loneliness. The hermit is alone but not abandoned.",
          zh: "不——它是关于被选择的独处，而那是孤独的反面。隐者是独自的，但并未被遗弃。",
        },
      },
      {
        q: { en: "What does The Hermit mean spiritually?", zh: "隐者在灵性上是什么意思？" },
        a: {
          en: "A retreat for the sake of insight. Withdraw from the noise long enough to remember what your own questions are.",
          zh: "为洞见而做的退隐。从喧嚣中退出足够久，以记起你自己的问题是什么。",
        },
      },
    ],
    related: ["the-high-priestess", "four-of-swords", "eight-of-cups"],
  },

  "wheel-of-fortune": {
    inLove: {
      en: "The Wheel of Fortune in love means a turn — a reconnection with someone from the past, an unexpected meeting, or the end of a long stuck phase. The card emphasizes that the change is not entirely yours to control. Be ready to receive what arrives without forcing the timing.",
      zh: "命运之轮在爱中意味着转动——与过去之人的重连、一次意料之外的相遇，或一个长期停滞阶段的结束。这张牌强调，变化并非全在你的掌控中。准备好接受所到来之物，而不强求时机。",
    },
    inCareer: {
      en: "Career-wise, this card brings unexpected opportunity — a recruiter message, a referral, a project landing on your desk. You did not engineer this; do not waste it by deliberating too long. The wheel rewards readiness more than planning.",
      zh: "在事业上，这张牌带来意外的机会——一条招聘信息、一次推荐、一个项目落在你桌上。这不是你设计的；不要因过久的考量而浪费它。轮子奖励准备好的状态，胜过计划。",
    },
    advice: {
      en: "Stop trying to control the spin. Position yourself well, then let the wheel do its work. Your job is to be ready, not to be in charge.",
      zh: "停止试图控制旋转。将自己放在好的位置，然后让轮子做它的工作。你的任务是准备好，而非掌控。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — circumstances are turning in your favor; act on them.",
        zh: "是——情势正在转向对你有利；为之行动。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "10 — completion of a cycle, the return to one at a higher turn.",
      zh: "10——一个循环的完成、于更高一圈回归至一。",
    },
    faqs: [
      {
        q: { en: "Is The Wheel of Fortune a good card?", zh: "命运之轮是好牌吗？" },
        a: {
          en: "Generally yes, especially after a long stuck phase. It signals movement and change — though change is not always comfortable.",
          zh: "通常是，尤其在长期停滞之后。它示意流动与变化——尽管变化并不总是舒适的。",
        },
      },
      {
        q: { en: "Does The Wheel of Fortune mean luck?", zh: "命运之轮是否意味着运气？" },
        a: {
          en: "Yes — but earned luck. It often shows up after a period of preparation that you didn't realize was preparation.",
          zh: "是——但是被赢得的运气。它常常出现在一段你未意识到是准备的准备期之后。",
        },
      },
      {
        q: { en: "Can the Wheel be reversed?", zh: "命运之轮可以是逆位吗？" },
        a: {
          en: "Yes — reversed it warns of resisting necessary change, or feeling like luck is against you. Stop pushing the wheel uphill.",
          zh: "是的——逆位时它警告你抗拒必要的变化，或感觉运气与你作对。停止推着轮子上山。",
        },
      },
    ],
    related: ["the-fool", "the-world", "ten-of-pentacles"],
  },

  "justice": {
    inLove: {
      en: "Justice in love asks for honesty — with yourself first, then with your partner. Imbalances need naming. If you have been over-giving, the card will rebalance the scales whether you like it or not. For singles, the right person will be drawn to you when you stop performing.",
      zh: "正义在爱中请求诚实——先对自己，再对伴侣。失衡需要被命名。若你一直过度给予，无论你喜不喜欢，这张牌都会重新平衡天平。对单身者而言，当你停止表演时，对的人会被吸引而来。",
    },
    inCareer: {
      en: "At work, Justice favors fairness, contracts, and clean accounting. A long-overdue resolution is coming — a contract signed, a credit assigned, a wrong corrected. Be precise. The card rewards integrity and punishes shortcuts; whatever you put on paper now will hold.",
      zh: "在工作中，正义偏好公平、合同与清晰的会计。一项早该到来的解决正在到来——一份合同被签下、一份功劳被归位、一个错被纠正。要精确。这张牌奖励正直，惩罚走捷径；你此刻写在纸上之物将会成立。",
    },
    advice: {
      en: "Tell the literal truth. Even the inconvenient parts. Especially the inconvenient parts. The relief on the other side is worth more than the comfort of the lie.",
      zh: "说字面上的真相。即使是不便的部分。尤其是不便的部分。另一边的解脱，胜过谎言的安适。",
    },
    yesNo: {
      answer: "maybe",
      explain: {
        en: "Maybe — depends on whether your cause is genuinely fair. The card will honor truth, not preference.",
        zh: "也许——取决于你的理由是否真正公平。这张牌尊崇真相，而非偏好。",
      },
    },
    element: { en: "Air", zh: "风" },
    numerology: {
      en: "11 — the scales held in balance, the master number of equilibrium.",
      zh: "11——保持平衡的天平、平衡的大师之数。",
    },
    faqs: [
      {
        q: { en: "What does Justice mean in tarot?", zh: "正义在塔罗中是什么意思？" },
        a: {
          en: "Fairness, accountability, and the consequences of your past actions catching up with you — for better or worse.",
          zh: "公平、责任，以及你过去行动的后果赶上你——无论好坏。",
        },
      },
      {
        q: { en: "Is Justice a yes or no?", zh: "正义是「是」还是「否」？" },
        a: {
          en: "It depends on the truth of your situation. Justice rewards what is actually fair, not what you wish were fair.",
          zh: "取决于你处境的真相。正义奖励真正公平之事，而非你希望公平之事。",
        },
      },
      {
        q: { en: "Does Justice mean a court case?", zh: "正义是否意味着官司？" },
        a: {
          en: "Sometimes literally — legal matters, contracts, formal decisions. More often it means a moral reckoning of any kind.",
          zh: "有时是字面上的——法律事务、合同、正式决定。更常见的是任何形式的道德清算。",
        },
      },
    ],
    related: ["the-hierophant", "the-emperor", "two-of-swords"],
  },

  "the-hanged-man": {
    inLove: {
      en: "The Hanged Man in love is the suspended pause — a relationship that cannot move forward yet but isn't ending. Stop trying to force resolution. The view changes when you let yourself hang upside down for a while. For singles, this is not the season to chase.",
      zh: "倒吊人在爱中是悬置的停顿——一段尚不能前进却又未结束的关系。停止试图强求解决。当你允许自己倒挂一阵，视角会改变。对单身者而言，这不是追求的季节。",
    },
    inCareer: {
      en: "At work, this card means a project on hold, a pivot you sense but can't yet name, or a season of accepting a loss in exchange for clarity. The Hanged Man is not failure — it is the deliberate choice to surrender control because the old approach has stopped working.",
      zh: "在工作中，这张牌意味着一个被搁置的项目、一个你感觉到却尚无法命名的转向，或一段以损失换取清明的季节。倒吊人不是失败——它是有意选择交出控制，因为旧方法已停止奏效。",
    },
    advice: {
      en: "Stop pulling. Surrender the timeline. The answer requires you to see things from a position you would not normally choose — including upside down.",
      zh: "停止拉扯。交出时间表。答案需要你从一个你通常不会选择的位置去看——包括倒立。",
    },
    yesNo: {
      answer: "no",
      explain: {
        en: "Not yet — the situation is suspended, and forcing it now will cost you.",
        zh: "尚未——局面被悬置，此刻强求会让你付出代价。",
      },
    },
    element: { en: "Water", zh: "水" },
    numerology: {
      en: "12 — sacrifice for insight, the willing pause that reveals what action could not.",
      zh: "12——为洞见而做的牺牲、那愿意的停顿揭示行动所不能。",
    },
    faqs: [
      {
        q: { en: "Is The Hanged Man a bad card?", zh: "倒吊人是坏牌吗？" },
        a: {
          en: "No, but it is uncomfortable. It is the card of necessary pause — frustrating in the moment, often clarifying in retrospect.",
          zh: "不，但它令人不适。它是必要停顿之牌——当下令人沮丧，事后往往带来清明。",
        },
      },
      {
        q: { en: "What does The Hanged Man mean for love?", zh: "倒吊人在爱情中是什么意思？" },
        a: {
          en: "A relationship in suspension. Not over, not progressing. The card asks you to wait without resentment until something shifts on its own.",
          zh: "一段悬置中的关系。未结束，也未前进。这张牌请你不带怨恨地等待，直到事情自行转变。",
        },
      },
      {
        q: { en: "Should I make a decision when I draw The Hanged Man?", zh: "抽到倒吊人时我应该做决定吗？" },
        a: {
          en: "No. The card explicitly recommends not deciding yet. Sit with the discomfort; the right answer will surface when you stop demanding it.",
          zh: "不。这张牌明确推荐尚不要决定。与不适共坐；当你停止要求答案时，正确的那一个会浮现。",
        },
      },
    ],
    related: ["the-fool", "four-of-swords", "the-hermit"],
  },

  "death": {
    inLove: {
      en: "Death in love is the end of one chapter so a truer one can begin. Sometimes a breakup, more often the death of an old pattern within a continuing relationship — the version of yourselves that no longer fits is being shed. Mourn it honestly; do not pretend it was nothing.",
      zh: "死神在爱中是一个篇章的结束，以让更真实的那个开始。有时是分手，更常见的是一段持续关系中旧模式的死亡——你们之中不再合身的那个版本正在脱落。诚实地哀悼它；不要假装它什么都不是。",
    },
    inCareer: {
      en: "At work this card means an ending you have been postponing — leaving a role, killing a project, letting go of a title you outgrew. The change is not optional; the only choice is whether you cooperate or get dragged. Cooperate.",
      zh: "在工作中，这张牌意味着一个你一直在推迟的结束——离开一个角色、终止一个项目、放下一个你已超越的头衔。变化不是可选的；唯一的选择是你是配合还是被拖拽。请配合。",
    },
    advice: {
      en: "Let it end cleanly. Funeral, not life-support. What is on the other side cannot arrive while you are still tending the corpse.",
      zh: "让它干净地结束。葬礼，而非维生设备。另一边之物无法到达，只要你仍在照看尸体。",
    },
    yesNo: {
      answer: "no",
      explain: {
        en: "No — but this 'no' is a closing door so a better one can open.",
        zh: "否——但这个「否」是一扇关闭的门，以让更好的一扇打开。",
      },
    },
    element: { en: "Water", zh: "水" },
    numerology: {
      en: "13 — transformation, the death of the old form so the new can take shape.",
      zh: "13——转化、旧形之死亡以让新形成型。",
    },
    faqs: [
      {
        q: { en: "Does Death mean someone will die?", zh: "死神是否意味着有人会死？" },
        a: {
          en: "Almost never literally. The Death card is about endings, transitions, and shedding what no longer fits — not physical death.",
          zh: "几乎从不是字面意义。死神牌是关于结束、过渡，以及脱落不再合身之物——不是肉体的死亡。",
        },
      },
      {
        q: { en: "Is Death a bad card?", zh: "死神是坏牌吗？" },
        a: {
          en: "It is uncomfortable but ultimately liberating. What ends here was already over; the card just makes it official.",
          zh: "它令人不适，但最终是解放性的。在此结束之物原本已结束；这张牌只是让它正式化。",
        },
      },
      {
        q: { en: "What comes after Death in tarot?", zh: "塔罗中死神之后是什么？" },
        a: {
          en: "Temperance — the season of healing and reintegration. The card sequence itself is a promise that endings are not the final word.",
          zh: "节制——疗愈与重新整合的季节。牌序本身就是一个承诺：结束不是最终之言。",
        },
      },
    ],
    related: ["the-tower", "eight-of-cups", "the-world"],
  },

  "temperance": {
    inLove: {
      en: "Temperance in love is the medicine after a difficult chapter — patience, slow blending, the willingness to mix two different temperatures into one warmth. A relationship is healing. For singles, the card recommends taking your time; the right pace is slower than you think.",
      zh: "节制在爱中是艰难篇章之后的良药——耐心、缓慢的融合、愿意将两种不同温度调和成一种温暖。一段关系正在疗愈。对单身者而言，这张牌推荐慢慢来；正确的节奏比你以为的更慢。",
    },
    inCareer: {
      en: "At work, Temperance favors integration over invention. Combining two skills you didn't think went together, blending two teams, finding the middle path between options that seemed exclusive. Avoid extremes. The card rewards craftspeople more than visionaries this season.",
      zh: "在工作中，节制偏好整合胜过发明。结合你以为不相干的两项技能、融合两个团队、找到看似互斥的选项之间的中道。避免极端。这个季节，这张牌奖励工匠胜过远见者。",
    },
    advice: {
      en: "Mix slowly. The right ratio is not obvious yet — small adjustments over many days will get you there faster than one big pour. Patience is a craft.",
      zh: "慢慢调和。正确的比例尚不明显——许多天的小调整会比一次性的大量倾倒更快带你抵达。耐心是一门工艺。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — through patience, balance, and gradual blending rather than dramatic action.",
        zh: "是——借由耐心、平衡与渐进的融合，而非戏剧性的行动。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "14 — the alchemist's number, two forces blended into a third.",
      zh: "14——炼金术士之数、二力调和为第三。",
    },
    faqs: [
      {
        q: { en: "What does Temperance mean in tarot?", zh: "节制在塔罗中是什么意思？" },
        a: {
          en: "Balance, healing, patient integration of opposing forces. The art of finding the middle without becoming bland.",
          zh: "平衡、疗愈、对相对力量的耐心整合。寻得中道而不变得乏味的艺术。",
        },
      },
      {
        q: { en: "Is Temperance a positive card?", zh: "节制是正面的牌吗？" },
        a: {
          en: "Yes — quietly so. It does not promise fireworks, but it promises sustainable healing and a relationship with your own pace.",
          zh: "是——以安静的方式。它不承诺烟火，但承诺可持续的疗愈与你与自己节奏的关系。",
        },
      },
      {
        q: { en: "Does Temperance mean recovery?", zh: "节制是否意味着康复？" },
        a: {
          en: "Yes, in many forms — physical, emotional, financial. The card represents the season after the storm when things slowly come back into proportion.",
          zh: "是，以多种形式——身体的、情感的、财务的。这张牌代表风暴之后事物缓慢回到比例的季节。",
        },
      },
    ],
    related: ["the-star", "the-magician", "the-world"],
  },

  "the-devil": {
    inLove: {
      en: "The Devil in love can mean intense chemistry — the kind that overrides your better judgment. It can also reveal a relationship pattern that has become a chain: addiction, jealousy, the inability to leave even when you want to. Notice which chains are actually unlocked.",
      zh: "恶魔在爱中可能意味着强烈的化学反应——那种压过你更好判断的吸引力。它也可能揭示一段已成锁链的关系模式：成瘾、嫉妒、即使想离开也无法离开。留意哪些锁链其实并未上锁。",
    },
    inCareer: {
      en: "At work, this card warns of golden handcuffs — the well-paid role you cannot quit, the dependence on a toxic system, the small daily compromise that has become the whole shape of your day. The Devil also rules ambition; sometimes it just means hunger you have not honored.",
      zh: "在工作中，这张牌警告金手铐——你无法辞掉的高薪职位、对一个有毒体系的依赖、那已成你一整日形状的每日小妥协。恶魔也主管野心；有时它只意味着你尚未尊崇的饥饿。",
    },
    advice: {
      en: "Notice what you are calling 'I have to' that is actually 'I'm choosing to'. The chain is loose. You are free; you just haven't moved your wrist yet.",
      zh: "留意你所说的「我必须」实际上是「我正在选择」。锁链是松的。你是自由的；你只是还未动过手腕。",
    },
    yesNo: {
      answer: "no",
      explain: {
        en: "No — at least not in the way you are framing it. There is a hidden cost.",
        zh: "否——至少不是以你正在框定的方式。其中有一个隐藏的代价。",
      },
    },
    element: { en: "Earth", zh: "土" },
    numerology: {
      en: "15 — the bondage of matter, the trap that is also a teacher.",
      zh: "15——物质的束缚、那既是陷阱也是教师之物。",
    },
    faqs: [
      {
        q: { en: "Is The Devil always a bad card?", zh: "恶魔总是坏牌吗？" },
        a: {
          en: "No — it can also mean healthy desire, ambition, or embodied pleasure. The shadow shows when you stop being the one in charge of your appetite.",
          zh: "不——它也可能意味着健康的欲望、野心或身体的愉悦。当你不再是欲望的主宰时，阴影才显现。",
        },
      },
      {
        q: { en: "Does The Devil mean addiction?", zh: "恶魔是否意味着成瘾？" },
        a: {
          en: "Sometimes — to substances, but more often to patterns: people, narratives, jobs, identities you have outgrown but cannot put down.",
          zh: "有时——对物质，但更常见的是对模式：人、叙事、工作、你已超越却无法放下的身份。",
        },
      },
      {
        q: { en: "What should I do if I draw The Devil?", zh: "若我抽到恶魔牌该怎么办？" },
        a: {
          en: "Name the chain honestly. Just naming it is half the work. The other half is testing whether the lock is actually closed.",
          zh: "诚实地命名锁链。只是命名它就是一半的工作。另一半是测试那把锁是否真的关上。",
        },
      },
    ],
    related: ["the-tower", "the-lovers", "five-of-pentacles"],
  },

  "the-tower": {
    inLove: {
      en: "The Tower in love is sudden — a revelation, a confrontation, a structure collapsing because it was built on false ground. It is painful in the moment, but it removes what was already going to fall. After the dust, the relationship is either real or it is gone.",
      zh: "高塔在爱中是突然的——一次揭示、一次对峙、一个因建于虚假地基之上而坍塌的结构。当下是痛苦的，但它移除了原本就要倒下之物。尘埃落定之后，关系要么是真的，要么已不在。",
    },
    inCareer: {
      en: "At work, this card means a sudden upheaval — a layoff, a project cancelled, a truth that breaks the politics. Don't try to rebuild the same structure. Whatever was destabilized was unstable already; the Tower just sped up an inevitable collapse.",
      zh: "在工作中，这张牌意味着突然的剧变——一次裁员、一个被取消的项目、一个打破政治的真相。不要试图重建同样的结构。被动摇之物原本就不稳；高塔只是加速了一次不可避免的坍塌。",
    },
    advice: {
      en: "Don't rebuild the same building. The collapse is information, not punishment. Stand in the rubble long enough to see what was actually load-bearing.",
      zh: "不要重建同一座建筑。坍塌是信息，不是惩罚。在废墟中站立足够久，去看真正承重之物为何。",
    },
    yesNo: {
      answer: "no",
      explain: {
        en: "No — and the 'no' arrives loudly. But the clearing is necessary.",
        zh: "否——而且这个「否」喧响而至。但清场是必要的。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "16 — sudden upheaval, the lightning that exposes what was hidden.",
      zh: "16——突然的剧变、揭示被隐藏之物的闪电。",
    },
    faqs: [
      {
        q: { en: "Is The Tower the worst card in tarot?", zh: "高塔是塔罗中最糟的牌吗？" },
        a: {
          en: "It is the most jarring, but not the worst. It clears space for something more honest. The real damage was already there before the lightning.",
          zh: "它是最刺耳的，但不是最糟的。它为更诚实之物清出空间。真正的损害在闪电之前就已存在。",
        },
      },
      {
        q: { en: "What does The Tower mean for relationships?", zh: "高塔在关系中是什么意思？" },
        a: {
          en: "A revelation that changes the relationship suddenly — sometimes ending it, sometimes finally making it real. Either way, the old version is gone.",
          zh: "一个突然改变关系的揭示——有时结束它，有时终于让它成真。无论哪种，旧版本已不复存在。",
        },
      },
      {
        q: { en: "Can I avoid the Tower?", zh: "我能避开高塔吗？" },
        a: {
          en: "No, and trying to is what made it necessary. Cooperate with the collapse and it will cost less than resisting it.",
          zh: "不能，而且试图避开正是让它成为必要之事。与坍塌合作，会比抗拒它代价更小。",
        },
      },
    ],
    related: ["death", "the-star", "three-of-swords"],
  },

  "the-star": {
    inLove: {
      en: "The Star in love is hope after pain. A relationship is healing; a heart that had been closed is gently reopening. Trust returns slowly, like water filling a basin. For singles, the right kind of love is being prepared for you — but you must first remember you are worth it.",
      zh: "星星在爱中是痛苦之后的希望。一段关系正在疗愈；一颗曾经合上的心正在轻轻重启。信任缓慢回归，如水注满盆。对单身者而言，正确的爱正在为你准备——但你必须先记起你值得它。",
    },
    inCareer: {
      en: "Career-wise, The Star is renewed inspiration after a difficult season. A creative project finds its true voice, or you remember why you started. The card favors authenticity over strategy, vulnerability over polish. Share the unfinished thing; someone is waiting for it.",
      zh: "在事业上，星星是艰难季节之后重燃的灵感。一个创意项目找到了它真实的声音，或你想起最初为何开始。这张牌偏好真实胜过策略，脆弱胜过抛光。分享未完成之物；有人在等它。",
    },
    advice: {
      en: "Hope without naivety. Things really are getting better — but slowly, and not because you forced them. Keep the small daily practice that is quietly rebuilding you.",
      zh: "怀有希望而不天真。事情真的在变好——但缓慢，且不是因你强求。继续那个安静地重建你的每日小练习。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — and gently so. The path is opening; trust the slow current.",
        zh: "是——以温柔的方式。道路正在开启；信任那缓慢的水流。",
      },
    },
    element: { en: "Air", zh: "风" },
    numerology: {
      en: "17 — the hope that follows the storm, the star that guides home.",
      zh: "17——风暴之后的希望、引人归家的星。",
    },
    faqs: [
      {
        q: { en: "Is The Star a good card?", zh: "星星是好牌吗？" },
        a: {
          en: "Yes — one of the most hopeful cards in the deck. It promises healing after hardship and the slow return of faith.",
          zh: "是——牌组中最有希望的牌之一。它承诺艰难之后的疗愈，以及信念的缓慢归来。",
        },
      },
      {
        q: { en: "Does The Star mean love is coming?", zh: "星星是否意味着爱正在到来？" },
        a: {
          en: "Yes, but on its own slow timeline. The card is about preparing the inner space first; the right love arrives after, not before.",
          zh: "是，但以它自己缓慢的时间表。这张牌是关于先准备内在空间；对的爱在之后到达，而非之前。",
        },
      },
      {
        q: { en: "Is The Star a sign of healing?", zh: "星星是疗愈的征兆吗？" },
        a: {
          en: "Yes — especially after The Tower. It often appears when you have been through something hard and are finally allowed to exhale.",
          zh: "是——尤其在高塔之后。它常常出现于你经历了艰难之事并终于被允许呼出气来之时。",
        },
      },
    ],
    related: ["temperance", "the-moon", "six-of-cups"],
  },

  "the-moon": {
    inLove: {
      en: "The Moon in love is the territory of unspoken feelings, mixed signals, and dreams that confuse you in the morning. Something is not what it appears — for better or worse. Don't make a permanent decision based on a feeling you cannot yet explain. Wait for the daylight.",
      zh: "月亮在爱中是未说出口的感受、混杂的信号，以及让你早晨感到困惑的梦境之地。某物并非它所显现——无论是好是坏。不要基于一个你尚无法解释的感受做永久的决定。等待天光。",
    },
    inCareer: {
      en: "At work, The Moon warns that the situation is not fully visible yet. Information is missing, or someone is performing a version of themselves. Trust your gut more than the agenda. This is not a season for committing to long-term plans built on incomplete data.",
      zh: "在工作中，月亮警告局面尚未完全可见。信息缺失，或某人正在表演自己的某个版本。信任你的直觉胜过议程。这不是基于不完整数据承诺长期计划的季节。",
    },
    advice: {
      en: "Honor what your gut is telling you, even if your head cannot yet justify it. The dream you remembered this morning is more reliable than the spreadsheet right now.",
      zh: "尊崇你的直觉所告诉你之事，即便你的头脑尚无法为之辩护。你今晨记得的那个梦，此刻比电子表格更可靠。",
    },
    yesNo: {
      answer: "maybe",
      explain: {
        en: "Maybe — there is hidden information you do not yet have. Wait until it surfaces.",
        zh: "也许——存在你尚未拥有的隐藏信息。等到它浮现为止。",
      },
    },
    element: { en: "Water", zh: "水" },
    numerology: {
      en: "18 — the lunar journey, the path that bends in the dark.",
      zh: "18——月之旅程、在暗中弯折之路。",
    },
    faqs: [
      {
        q: { en: "Is The Moon a bad card?", zh: "月亮是坏牌吗？" },
        a: {
          en: "Not bad, but disorienting. It signals that you cannot yet see clearly. The discomfort is the message; do not fight it.",
          zh: "不坏，但令人迷向。它示意你尚不能看清楚。不适本身就是信息；不要与之抗争。",
        },
      },
      {
        q: { en: "Does The Moon mean someone is lying?", zh: "月亮是否意味着有人在说谎？" },
        a: {
          en: "Sometimes — or hiding, or unable to name what they themselves feel. Don't accuse; just don't decide yet either.",
          zh: "有时——或在隐藏，或无法命名他们自己所感受。不要指责；但也尚不要决定。",
        },
      },
      {
        q: { en: "What does The Moon mean for intuition?", zh: "月亮在直觉上是什么意思？" },
        a: {
          en: "It is the strongest intuition card in the major arcana — a clear instruction to listen to dreams, hunches, and bodily knowing over logic.",
          zh: "它是大阿卡那中最强的直觉牌——明确指示倾听梦境、直觉与身体的知晓，胜过逻辑。",
        },
      },
    ],
    related: ["the-high-priestess", "the-star", "seven-of-cups"],
  },

  "the-sun": {
    inLove: {
      en: "The Sun in love is unambiguous joy. A relationship is in its sunny season — playful, generous, free of hidden agenda. For singles, this is one of the most affirming cards for new love. Stop overthinking it. Let yourself be happy without bracing for the catch.",
      zh: "太阳在爱中是毫不含糊的喜悦。一段关系正处于它的阳光季节——嬉戏、慷慨、无隐藏的议程。对单身者而言，这是新爱最具肯定力的牌之一。停止过度思考。允许自己快乐而不防范陷阱。",
    },
    inCareer: {
      en: "At work this card means visible success — recognition, a launch that goes well, a project finally being seen. Take the credit. The Sun is also a card of vitality; if you've been depleted, it signals the return of energy and the joy of the work itself.",
      zh: "在工作中，这张牌意味着可见的成功——认可、一个顺利进行的发布、一个终于被看见的项目。接受功劳。太阳也是活力之牌；若你一直在耗竭，它示意能量与工作本身的喜悦的回归。",
    },
    advice: {
      en: "Stop hedging. This time it is what it looks like. Let yourself enjoy it without immediately pivoting to the next thing.",
      zh: "停止防范。这一次，它就是它看起来的样子。允许自己享受它，而不立即转向下一件事。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — clearly and warmly so. One of the strongest yeses in the deck.",
        zh: "是——清晰且温暖地。牌组中最强的「是」之一。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "19 — the sun at full strength, vitality at its peak.",
      zh: "19——满力之太阳、活力的顶峰。",
    },
    faqs: [
      {
        q: { en: "Is The Sun the best tarot card?", zh: "太阳是最好的塔罗牌吗？" },
        a: {
          en: "It is one of the most affirmingly positive cards in the deck — joy, vitality, success, and the kind of clarity that doesn't need defending.",
          zh: "它是牌组中最具肯定性的正面牌之一——喜悦、活力、成功，以及那种不需被辩护的清明。",
        },
      },
      {
        q: { en: "Does The Sun mean a happy outcome?", zh: "太阳是否意味着幸福的结果？" },
        a: {
          en: "Yes — it almost always signals that the situation is moving toward genuine, sustainable happiness, not just surface relief.",
          zh: "是——它几乎总是示意局面正走向真实、可持续的幸福，而非仅是表面的解脱。",
        },
      },
      {
        q: { en: "What does The Sun mean spiritually?", zh: "太阳在灵性上是什么意思？" },
        a: {
          en: "Awakening, clarity, the warmth of being fully present without armor. The card of arriving at yourself in daylight.",
          zh: "觉醒、清明、毫无盔甲地完全在场的温暖。在天光下抵达自己之牌。",
        },
      },
    ],
    related: ["the-star", "the-world", "ten-of-cups"],
  },

  "judgement": {
    inLove: {
      en: "Judgement in love is a wake-up call — an old relationship coming back into your awareness, or a new clarity about whether the current one is true. It asks for honesty about what you have been pretending not to know. The answer is already in you; it is only being heard now.",
      zh: "审判在爱中是一次唤醒——一段旧关系回到你的觉知中，或对当前关系是否真实的新清明。它请求关于你一直假装不知道之事的诚实。答案已在你之内；只是现在才被听见。",
    },
    inCareer: {
      en: "At work this card brings a calling — the work you actually want to do, no longer easy to ignore. Sometimes a literal return: an old industry, a former colleague, a path you'd dismissed. Judgement asks you to answer the call honestly, even when the answer reorders your life.",
      zh: "在工作中，这张牌带来一次召唤——你真正想做的工作，不再容易忽略。有时是字面上的回归：一个旧行业、一位旧同事、一条你曾否定的路。审判请你诚实地回应那召唤，即便回应将重新排列你的生活。",
    },
    advice: {
      en: "Listen to the call. The voice has been there for months; the only new thing is that you are now ready to act on it. Don't argue with the knowing.",
      zh: "倾听那召唤。那声音已存在数月；唯一新的事是你现在已准备好为之行动。不要与那知晓争辩。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — and the answer is one you already know in your bones.",
        zh: "是——而答案是你早已在骨子里知道的。",
      },
    },
    element: { en: "Fire", zh: "火" },
    numerology: {
      en: "20 — the trumpet of awakening, the call that asks for an answer.",
      zh: "20——唤醒之号角、那请求回应的召唤。",
    },
    faqs: [
      {
        q: { en: "What does Judgement mean in tarot?", zh: "审判在塔罗中是什么意思？" },
        a: {
          en: "A wake-up call, a turning point, the moment you can no longer pretend not to know what you know. Often a reckoning with a past version of yourself.",
          zh: "一次唤醒、一个转折点，那个你不再能假装不知道你所知之事的时刻。常常是与过去某个自己的清算。",
        },
      },
      {
        q: { en: "Does Judgement mean a second chance?", zh: "审判是否意味着第二次机会？" },
        a: {
          en: "Often yes — something or someone returning, with a chance to handle it differently this time. The card favors taking the second chance.",
          zh: "常常是——某物或某人回归，并伴随这次以不同方式处理的机会。这张牌支持接受第二次机会。",
        },
      },
      {
        q: { en: "Is Judgement a positive card?", zh: "审判是正面的牌吗？" },
        a: {
          en: "Yes, though uncomfortable. It asks for honesty before it gives relief, but the relief is real and lasting.",
          zh: "是，尽管令人不适。它在给予解脱之前请求诚实，但那解脱是真实且持久的。",
        },
      },
    ],
    related: ["death", "the-world", "the-fool"],
  },

  "the-world": {
    inLove: {
      en: "The World in love is completion in the best sense — a relationship reaching real wholeness, a chapter closing well, or the end of a long search. For singles, it can mean meeting someone after you have finally come home to yourself. Either way, the prerequisite was your own integration.",
      zh: "世界在爱中是最好意义上的圆满——一段关系达到真正的完整、一个篇章善终，或长久寻觅的结束。对单身者而言，它可能意味着在你终于回到自己之后遇见某人。无论哪种，前提条件是你自己的整合。",
    },
    inCareer: {
      en: "Career-wise this is the card of arrival. A long project finishing well, a degree completed, the moment you can honestly say you have done the thing. Take the rest before the next chapter. The Fool is waiting on the other side, but only after the celebration.",
      zh: "在事业上，这是抵达之牌。一个长期项目善终、一个学位完成、你能诚实地说你已做成那件事的那一刻。在下一篇章之前休息。愚者在另一边等待，但只在庆祝之后。",
    },
    advice: {
      en: "Finish before you start the next thing. Mark the completion. Bow to the work. Then — and only then — pick up the next staff and walk on.",
      zh: "在开始下一件事之前先完成。标记那完成。向工作鞠躬。然后——只在那之后——拿起下一根杖，继续走。",
    },
    yesNo: {
      answer: "yes",
      explain: {
        en: "Yes — and with the satisfaction of a long task completed.",
        zh: "是——并伴随长久任务完成的满足。",
      },
    },
    element: { en: "Earth", zh: "土" },
    numerology: {
      en: "21 — completion, the cycle whole, the dance at the center of all four elements.",
      zh: "21——圆满、完整的循环、四元素中心的舞蹈。",
    },
    faqs: [
      {
        q: { en: "Is The World the best card in tarot?", zh: "世界是塔罗中最好的牌吗？" },
        a: {
          en: "It is one of the most fulfilling — the card of integration, completion, and arrival. It marks the end of a meaningful chapter, well lived.",
          zh: "它是最具满足感的牌之一——整合、完成与抵达之牌。它标记一个被善加生活的有意义篇章的结束。",
        },
      },
      {
        q: { en: "Does The World mean travel?", zh: "世界是否意味着旅行？" },
        a: {
          en: "Sometimes literally — international travel, a move, a horizon expanded. More often it means inner expansion: the world inside you has grown.",
          zh: "有时是字面上的——国际旅行、搬迁、视野的扩展。更常见的是内在的扩展：你内在的世界已成长。",
        },
      },
      {
        q: { en: "What comes after The World?", zh: "世界之后是什么？" },
        a: {
          en: "The Fool again — a new cycle, beginning at a higher turn of the spiral. Endings in tarot are always also beginnings.",
          zh: "再次是愚者——一个新的循环，在螺旋的更高一圈开始。塔罗中的结束总是也是开始。",
        },
      },
    ],
    related: ["the-fool", "the-sun", "ten-of-pentacles"],
  },
};

// ---------- Minor Arcana extras (templated by suit + rank) ----------
//
// Each suit has an "in love", "in career", "advice" voice keyed to the suit's
// element. Each rank brings a developmental angle. The combination produces
// per-card content that is consistent in tone with the existing meanings.

type Rank =
  | "ace" | "two" | "three" | "four" | "five" | "six" | "seven"
  | "eight" | "nine" | "ten" | "page" | "knight" | "queen" | "king";

const suitElement: Record<Suit, BilingualText> = {
  wands: { en: "Fire", zh: "火" },
  cups: { en: "Water", zh: "水" },
  swords: { en: "Air", zh: "风" },
  pentacles: { en: "Earth", zh: "土" },
};

// Per-suit love voice (used as a frame for each rank)
const suitLove: Record<Suit, BilingualText> = {
  wands: {
    en: "In love, Wands cards are about heat, attraction, and the willingness to act on what you feel. Energy is high — the question is whether you channel it or let it scatter.",
    zh: "在爱中，权杖牌关乎热度、吸引力，以及为所感而行动的意愿。能量很高——问题是你引导它，还是任它散乱。",
  },
  cups: {
    en: "In love, Cups cards live in the emotional weather — what you feel, what your partner feels, what is unsaid between you. Listen more than you speak.",
    zh: "在爱中，圣杯牌活在情感的天气中——你的感受、伴侣的感受、你们之间未言之物。多听少说。",
  },
  swords: {
    en: "In love, Swords cards are about communication and clarity — the conversations you keep avoiding, the truths that need naming, the words that build or wound.",
    zh: "在爱中，宝剑牌关乎沟通与清明——你一直在回避的对话、需要被命名的真相、能建造或伤害的言语。",
  },
  pentacles: {
    en: "In love, Pentacles cards are about steadiness — shared resources, daily routines, the quiet trust built by showing up consistently rather than dramatically.",
    zh: "在爱中，钱币牌关乎稳定——共享的资源、日常的惯例、借由始终如一而非戏剧性地出现所建立的安静信任。",
  },
};

// Per-suit career voice
const suitCareer: Record<Suit, BilingualText> = {
  wands: {
    en: "Professionally, Wands cards favor initiative, ambition, and the courage to start before you feel ready. Energy is on your side — the only obstacle is hesitation.",
    zh: "在事业上，权杖牌支持主动、野心，以及在感到准备好之前开始的勇气。能量站在你这一边——唯一的障碍是迟疑。",
  },
  cups: {
    en: "At work, Cups cards point to creative or care-based work — anything that requires you to bring genuine feeling rather than execution alone. Trust the emotional read of the room.",
    zh: "在工作中，圣杯牌指向创意或照护性的工作——任何需要你带入真实感受而非仅是执行的事。信任你对场域的情感读取。",
  },
  swords: {
    en: "Career-wise, Swords cards are about thinking clearly under pressure — strategy, decisions, hard conversations. Cut through the noise; do not let politics make the call for you.",
    zh: "在事业上，宝剑牌关乎在压力下清晰思考——策略、决定、艰难的对话。穿过噪音；不要让政治为你做决定。",
  },
  pentacles: {
    en: "At work, Pentacles cards favor patient, material building — money, contracts, resources, long-term skill. The slow path is the right one this season.",
    zh: "在工作中，钱币牌支持耐心的、物质性的建造——金钱、合同、资源、长期技能。这个季节，慢路是对的那条。",
  },
};

// Per-rank developmental phase (used for advice + yes/no feel)
const rankPhase: Record<Rank, { tone: string; tone_zh: string; yesNo: YesNoAnswer }> = {
  ace:    { tone: "the seed of something just beginning",                  tone_zh: "刚刚开始之物的种子",        yesNo: "yes" },
  two:    { tone: "a choice or balance between two paths",                 tone_zh: "两条路之间的选择或平衡",    yesNo: "maybe" },
  three:  { tone: "early growth and the first signs of result",            tone_zh: "早期生长与第一批结果的征兆", yesNo: "yes" },
  four:   { tone: "stability, consolidation, holding what you have built", tone_zh: "稳定、巩固、持守你所建之物",  yesNo: "yes" },
  five:   { tone: "friction, loss, or a necessary challenge",              tone_zh: "摩擦、失去，或必要的挑战",    yesNo: "no" },
  six:    { tone: "harmony, recovery, generous exchange",                  tone_zh: "和谐、恢复、慷慨的交换",      yesNo: "yes" },
  seven:  { tone: "reflection, choice under uncertainty",                  tone_zh: "反思、不确定下的抉择",        yesNo: "maybe" },
  eight:  { tone: "mastery through repetition or deliberate movement",     tone_zh: "借由重复或刻意移动而精通",    yesNo: "yes" },
  nine:   { tone: "near-completion, the last stretch",                     tone_zh: "近乎完成、最后一段",          yesNo: "yes" },
  ten:    { tone: "completion of the cycle, full weight of the suit",      tone_zh: "循环的完成、花色的全部分量",  yesNo: "maybe" },
  page:   { tone: "a curious beginner, a fresh message",                   tone_zh: "好奇的初学者、一封新讯息",    yesNo: "yes" },
  knight: { tone: "active pursuit, momentum, sometimes recklessness",      tone_zh: "主动的追求、势能，有时鲁莽",  yesNo: "yes" },
  queen:  { tone: "mature embodiment, inner authority of the suit",        tone_zh: "成熟的具身、花色的内在权威",  yesNo: "yes" },
  king:   { tone: "full mastery, outer authority, the suit at its peak",   tone_zh: "完全的精通、外在权威、花色的顶峰", yesNo: "yes" },
};

function rankFromId(id: string): Rank | null {
  const ranks: Rank[] = [
    "ace", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "page", "knight", "queen", "king",
  ];
  for (const r of ranks) {
    if (id.startsWith(`${r}-of-`)) return r;
  }
  return null;
}

function suitFromId(id: string): Suit | null {
  const m = id.match(/-of-(wands|cups|swords|pentacles)$/);
  return (m?.[1] as Suit) ?? null;
}

function buildMinorExtras(card: TarotCard): CardExtras {
  const rank = rankFromId(card.id);
  const suit = card.suit ?? suitFromId(card.id);
  if (!rank || !suit) {
    throw new Error(`Cannot derive extras for ${card.id}`);
  }
  const phase = rankPhase[rank];
  const love = suitLove[suit];
  const career = suitCareer[suit];

  // Compose love: suit voice + rank-tuned closer using the existing meaning
  const inLove: BilingualText = {
    en: `${love.en} This card — ${phase.tone} — colors the situation with ${card.upright.en.split(".")[0].toLowerCase()}. ${rank === "five" || phase.yesNo === "no" ? "If a relationship is straining, name what is hard rather than waiting it out." : "If you are open, the connection in front of you is more available than you think."}`,
    zh: `${love.zh}这张牌——${phase.tone_zh}——以${card.upright.zh.split("。")[0]}的色调染上当下处境。${rank === "five" || phase.yesNo === "no" ? "若一段关系正紧绷，命名艰难之事，而非等它过去。" : "若你敞开，眼前的连接比你以为的更可得。"}`,
  };

  const inCareer: BilingualText = {
    en: `${career.en} The ${rank.charAt(0).toUpperCase() + rank.slice(1)} of ${suit.charAt(0).toUpperCase() + suit.slice(1)} brings ${phase.tone}, which means: ${card.upright.en.split(".").slice(1).join(".").trim() || card.upright.en}`,
    zh: `${career.zh}这张牌带来${phase.tone_zh}，意味着：${card.upright.zh.split("。").slice(1).join("。").trim() || card.upright.zh}`,
  };

  const advice: BilingualText = {
    en: `${
      phase.yesNo === "yes"
        ? "Move with the energy of this card rather than against it."
        : phase.yesNo === "no"
        ? "Pause. The card is asking you to honor a difficulty rather than push past it."
        : "Hold the question lightly; the answer is still forming."
    } Let the suit element of ${suitElement[suit].en} guide your next small step.`,
    zh: `${
      phase.yesNo === "yes"
        ? "顺着这张牌的能量行动，而非与之对抗。"
        : phase.yesNo === "no"
        ? "暂停。这张牌请你尊崇困难，而非强行越过。"
        : "轻轻持着问题；答案仍在成形。"
    }让${suitElement[suit].zh}元素引导你下一个小步。`,
  };

  const yesNoExplain: BilingualText = {
    en:
      phase.yesNo === "yes"
        ? `Yes — the energy of this ${suit} card supports the question.`
        : phase.yesNo === "no"
        ? `No — this ${suit} card warns of cost or strain in the current direction.`
        : `Maybe — the answer depends on a choice still in motion.`,
    zh:
      phase.yesNo === "yes"
        ? `是——这张${suitElement[suit].zh}元素的牌支持你的问题。`
        : phase.yesNo === "no"
        ? `否——这张${suitElement[suit].zh}元素的牌警告当前方向的代价或紧绷。`
        : `也许——答案取决于一个仍在变动中的选择。`,
  };

  const faqs: FaqEntry[] = [
    {
      q: {
        en: `What does the ${capitalize(rank)} of ${capitalize(suit)} mean?`,
        zh: `${suitName(suit, "zh")}${rankName(rank, "zh")}是什么意思？`,
      },
      a: {
        en: `It marks ${phase.tone} within the ${suit} suit — ${card.upright.en}`,
        zh: `它标记${suitName(suit, "zh")}花色中的${phase.tone_zh}——${card.upright.zh}`,
      },
    },
    {
      q: {
        en: `Is the ${capitalize(rank)} of ${capitalize(suit)} a positive card?`,
        zh: `${suitName(suit, "zh")}${rankName(rank, "zh")}是正面的牌吗？`,
      },
      a: {
        en:
          phase.yesNo === "yes"
            ? "Generally yes — it favors action and trusts the suit's energy."
            : phase.yesNo === "no"
            ? "It is challenging, but the difficulty is informative. The card is not punishing you."
            : "It is neutral — supportive of careful thought, less so of sudden action.",
        zh:
          phase.yesNo === "yes"
            ? "通常是——它支持行动并信任花色的能量。"
            : phase.yesNo === "no"
            ? "它具挑战性，但困难是有信息量的。这张牌不是在惩罚你。"
            : "它是中性的——支持谨慎的思考，对突然的行动则不然。",
      },
    },
    {
      q: {
        en: `What does the ${capitalize(rank)} of ${capitalize(suit)} mean reversed?`,
        zh: `${suitName(suit, "zh")}${rankName(rank, "zh")}逆位是什么意思？`,
      },
      a: {
        en: card.reversed.en,
        zh: card.reversed.zh,
      },
    },
  ];

  // Related: same suit ±1 in rank, plus the suit's ace as anchor
  const ranks: Rank[] = [
    "ace", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "page", "knight", "queen", "king",
  ];
  const idx = ranks.indexOf(rank);
  const related: string[] = [];
  if (idx > 0) related.push(`${ranks[idx - 1]}-of-${suit}`);
  if (idx < ranks.length - 1) related.push(`${ranks[idx + 1]}-of-${suit}`);
  if (rank !== "ace") related.push(`ace-of-${suit}`);
  // Cap at 3
  const relatedFinal = related.slice(0, 3);

  return {
    inLove,
    inCareer,
    advice,
    yesNo: { answer: phase.yesNo, explain: yesNoExplain },
    element: suitElement[suit],
    numerology: numerologyFor(rank),
    faqs,
    related: relatedFinal,
  };
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function suitName(suit: Suit, lang: "en" | "zh"): string {
  const map = {
    wands: { en: "Wands", zh: "权杖" },
    cups: { en: "Cups", zh: "圣杯" },
    swords: { en: "Swords", zh: "宝剑" },
    pentacles: { en: "Pentacles", zh: "钱币" },
  };
  return map[suit][lang];
}

function rankName(rank: Rank, lang: "en" | "zh"): string {
  const map: Record<Rank, BilingualText> = {
    ace: { en: "Ace", zh: "首牌" },
    two: { en: "Two", zh: "二" },
    three: { en: "Three", zh: "三" },
    four: { en: "Four", zh: "四" },
    five: { en: "Five", zh: "五" },
    six: { en: "Six", zh: "六" },
    seven: { en: "Seven", zh: "七" },
    eight: { en: "Eight", zh: "八" },
    nine: { en: "Nine", zh: "九" },
    ten: { en: "Ten", zh: "十" },
    page: { en: "Page", zh: "侍从" },
    knight: { en: "Knight", zh: "骑士" },
    queen: { en: "Queen", zh: "皇后" },
    king: { en: "King", zh: "国王" },
  };
  return map[rank][lang];
}

function numerologyFor(rank: Rank): BilingualText {
  const numMap: Record<Rank, BilingualText> = {
    ace: { en: "1 — the seed, pure beginning of the suit.", zh: "1——种子，花色的纯粹开端。" },
    two: { en: "2 — duality, the meeting of two forces.", zh: "2——二元，两股力量的相遇。" },
    three: { en: "3 — first growth, the third born of two.", zh: "3——初生之长，二所生的第三。" },
    four: { en: "4 — stability, the four corners of the foundation.", zh: "4——稳定，根基的四角。" },
    five: { en: "5 — challenge, the destabilizing fifth.", zh: "5——挑战，扰动稳定的第五。" },
    six: { en: "6 — harmony restored, balance after challenge.", zh: "6——和谐回归，挑战之后的平衡。" },
    seven: { en: "7 — reflection, the inner pause of the suit.", zh: "7——反思，花色的内在停顿。" },
    eight: { en: "8 — mastery in motion, repeated practice.", zh: "8——在动中精通，重复的练习。" },
    nine: { en: "9 — near-completion, almost arrived.", zh: "9——近乎完成，几乎抵达。" },
    ten: { en: "10 — full completion, the cycle whole.", zh: "10——完全圆满，循环完整。" },
    page: { en: "Court — the student, fresh curiosity.", zh: "宫廷——学生，新鲜的好奇。" },
    knight: { en: "Court — the actor, bold movement.", zh: "宫廷——行动者，大胆的移动。" },
    queen: { en: "Court — inner mastery, embodied wisdom.", zh: "宫廷——内在精通，具身的智慧。" },
    king: { en: "Court — outer mastery, public authority.", zh: "宫廷——外在精通，公共权威。" },
  };
  return numMap[rank];
}

// ---------- Public API ----------

export function getCardExtras(card: TarotCard): CardExtras {
  if (card.arcana === "major") {
    const e = majorExtras[card.id];
    if (!e) {
      throw new Error(`Missing extras for major card: ${card.id}`);
    }
    return e;
  }
  return buildMinorExtras(card);
}
