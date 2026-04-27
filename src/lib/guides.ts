import type { Lang } from "@/lib/i18n";
import {
  guideSummaries,
  guideSlugs,
  type GuideSlug,
} from "@/lib/guideSummaries";

type LocalizedText = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

export interface GuideSection {
  id: string;
  title: LocalizedText;
  paragraphs: LocalizedList;
  bullets?: LocalizedList;
}

export interface GuideFaq {
  q: LocalizedText;
  a: LocalizedText;
}

export interface Guide {
  slug: GuideSlug;
  title: LocalizedText;
  description: LocalizedText;
  intro: LocalizedList;
  sections: GuideSection[];
  faqs: GuideFaq[];
  relatedCardIds: string[];
  relatedGuideSlugs: GuideSlug[];
}

const summaryBySlug = Object.fromEntries(
  guideSummaries.map((guide) => [guide.slug, guide]),
) as Record<GuideSlug, (typeof guideSummaries)[number]>;

export const guides: Guide[] = [
  {
    ...summaryBySlug["tarot-card-meanings"],
    intro: {
      en: [
        "Most people first meet tarot through isolated keywords: transformation, heartbreak, intuition, abundance. Those keywords are useful, but they are not the reading itself. A tarot card meaning becomes clear only when it is placed inside a larger structure: the question, the spread position, the card's direction, and the surrounding cards.",
        "That is why you do not need to memorize 78 separate speeches. What you need is a reliable way to notice patterns. Once you can recognize the difference between a Major Arcana card and a Minor Arcana card, between Cups and Swords, between upright momentum and reversed resistance, the deck becomes much easier to read.",
      ],
      zh: [
        "很多人第一次接触塔罗，都是从零散关键词开始的：转化、心碎、直觉、丰盛。关键词有用，但它们本身并不是解读。真正的牌义，只有放回更大的结构里才会清楚：你问的是什么、它落在什么牌位、是正位还是逆位、旁边又站着哪些牌。",
        "所以你不需要为 78 张牌各背一段独立解释。你需要的是一套稳定的观察方法。当你能分辨大阿尔卡那和小阿尔卡那、圣杯和宝剑、正位的推动感与逆位的阻滞感，整副牌会一下子变得容易读得多。",
      ],
    },
    sections: [
      {
        id: "how-meanings-work",
        title: {
          en: "How tarot meanings actually work",
          zh: "塔罗牌义究竟是怎么运作的",
        },
        paragraphs: {
          en: [
            "A card does not carry one fixed sentence forever. It carries a field of meaning. The Fool can point to freedom, risk, innocence, foolishness, trust, or the beginning of a journey. Which layer becomes most important depends on the question being asked and on the cards around it.",
            "The practical rule is this: start broad, then narrow. Read the image, then the suit or arcana, then the spread position, then the specific life area. If a card feels too vague, that usually means you are trying to jump straight to the answer before you have described the situation clearly enough.",
          ],
          zh: [
            "一张牌并不永远只对应一句固定的话。它更像是一片意义场。愚者既可能指向自由、冒险、天真、轻率，也可能意味着一段旅程的开始。哪一层意义最重要，取决于你正在问什么，以及它身边站着哪些牌。",
            "最实用的规则是：先宽，后窄。先看图像，再看花色或大牌属性，再看牌位，最后再落到具体生活领域。如果一张牌让你觉得太空泛，通常不是牌不清楚，而是你还没把情境描述得足够具体，就急着追问结论了。",
          ],
        },
      },
      {
        id: "major-minor-suits",
        title: {
          en: "Major Arcana, Minor Arcana, and the four suits",
          zh: "大阿尔卡那、小阿尔卡那与四种花色",
        },
        paragraphs: {
          en: [
            "The Major Arcana usually describe bigger chapters: identity shifts, spiritual lessons, turning points, and themes that stay with you long after the week ends. The Minor Arcana describe the texture of ordinary life: work, messages, arguments, emotions, money, habits, and timing.",
            "Inside the Minor Arcana, each suit has its own language. Wands speak through fire and action. Cups speak through feeling and relationship. Swords speak through thought, conflict, and truth. Pentacles speak through body, money, craft, and the material world.",
          ],
          zh: [
            "大阿尔卡那通常描述更大的生命章节：身份转变、灵魂课题、关键转折，以及那些不会随着一周结束就消散的主题。小阿尔卡那则更贴近日常生活的纹理：工作、消息、争执、情绪、金钱、习惯与节奏。",
            "而在小阿尔卡那内部，每一种花色又有自己的语言。权杖通过火与行动发声。圣杯通过情感与关系发声。宝剑通过思维、冲突与真相发声。星币则通过身体、金钱、手艺与物质世界发声。",
          ],
        },
        bullets: {
          en: [
            "Wands: action, desire, momentum, ambition",
            "Cups: emotion, love, intuition, connection",
            "Swords: thought, tension, communication, decisions",
            "Pentacles: money, health, work, practical results",
          ],
          zh: [
            "权杖：行动、欲望、推进、野心",
            "圣杯：情感、爱情、直觉、联结",
            "宝剑：思维、张力、沟通、决定",
            "星币：金钱、健康、工作、现实结果",
          ],
        },
      },
      {
        id: "upright-reversed",
        title: {
          en: "Upright and reversed cards",
          zh: "正位与逆位该怎么理解",
        },
        paragraphs: {
          en: [
            "A reversed card does not automatically mean something bad. More often, it shows blocked movement, internalization, delay, resistance, or excess. The energy of the card is still present, but it is not flowing cleanly.",
            "A good reading habit is to ask one simple question when a card is reversed: what is being slowed down, hidden, or turned inward here? That question keeps reversals readable without flattening them into negativity.",
          ],
          zh: [
            "逆位并不自动等于坏事。更常见的情况是：这股能量被卡住了、内化了、延迟了、被抗拒了，或者走过了头。牌的主题还在，只是没有顺畅地流动。",
            "读逆位时，一个很好用的问题是：这里到底是什么被放慢了、隐藏了，或者转向了内部？这个问题能让逆位保持细腻，而不是被粗暴地压扁成“负面”。",
          ],
        },
      },
      {
        id: "read-in-context",
        title: {
          en: "Context matters more than memorization",
          zh: "情境比死记更重要",
        },
        paragraphs: {
          en: [
            "The same card reads differently in love, work, and self-inquiry. The Tower in a career spread may describe an unsustainable structure collapsing. In a personal growth reading it may describe a painful but clarifying realization. The image is the same; the context changes what is being disrupted.",
            "That is why strong tarot reading depends on pattern recognition instead of performance. Start with the card's core meaning, then let the question refine it. If you do that consistently, you will sound calmer, clearer, and much more accurate than someone reciting memorized definitions.",
          ],
          zh: [
            "同一张牌，放在爱情、工作与自我探索里，读法会不同。高塔在事业牌阵里，可能是在说一个无法持续的结构正在倒塌；放在个人成长里，则可能是在说一个痛苦但必要的醒悟。图像没有变，变的是被冲击的对象。",
            "所以，好的塔罗解读依赖的是模式识别，而不是表演。先抓住牌的核心，再让问题去收窄它。如果你一直这样读，你的语言会更平静、更清楚，也会比背定义的人准确得多。",
          ],
        },
      },
    ],
    faqs: [
      {
        q: {
          en: "Do I need to memorize all 78 tarot card meanings?",
          zh: "我需要把 78 张塔罗牌全部背下来吗？",
        },
        a: {
          en: "No. It is more useful to learn the structure of the deck first: Major vs Minor Arcana, the four suits, court cards, and how upright vs reversed energy changes the flow. Once those patterns are familiar, individual card meanings are much easier to remember and interpret.",
          zh: "不需要。更有用的做法，是先学整副牌的结构：大牌与小牌、四种花色、宫廷牌，以及正位与逆位如何改变能量流动。结构熟了之后，每张牌的具体牌义会更容易记住，也更容易解释。",
        },
      },
      {
        q: {
          en: "What is the difference between Major and Minor Arcana?",
          zh: "大阿尔卡那和小阿尔卡那有什么区别？",
        },
        a: {
          en: "The Major Arcana usually point to larger life lessons, turning points, or archetypal themes. The Minor Arcana speak to the everyday texture of experience: relationships, work, emotions, communication, and practical concerns.",
          zh: "大阿尔卡那通常指向更大的生命课题、关键转折或原型主题；小阿尔卡那则更贴近日常经验的纹理，比如关系、工作、情绪、沟通与现实事务。",
        },
      },
      {
        q: {
          en: "Are reversed tarot cards always negative?",
          zh: "逆位塔罗牌一定是负面的吗？",
        },
        a: {
          en: "No. Reversed cards often show delay, resistance, internalization, or imbalance rather than simple negativity. They describe how the energy is moving, not just whether it is good or bad.",
          zh: "不一定。逆位更常描述延迟、抗拒、内化或失衡，而不只是单纯的“坏”。它讲的是能量如何运作，而不只是它好还是坏。",
        },
      },
    ],
    relatedCardIds: ["the-fool", "the-magician", "death", "queen-of-cups"],
    relatedGuideSlugs: ["yes-no-tarot", "three-card-tarot-spread"],
  },
  {
    ...summaryBySlug["yes-no-tarot"],
    intro: {
      en: [
        "Yes-or-no tarot is popular because it promises relief. When you are tired, anxious, or stuck in a decision, a clear answer feels merciful. The problem is not the format itself. The problem is that many people use it on questions too large, too vague, or too emotionally loaded to be reduced to a clean binary.",
        "A better approach is to treat yes-or-no tarot as a narrow instrument. Use it for timing, direction, readiness, or whether an option is broadly supported right now. When the answer comes back as maybe, do not force certainty. A maybe is often the deck's way of saying there is movement here, but it depends on what you do next.",
      ],
      zh: [
        "Yes or No 塔罗之所以受欢迎，是因为它看起来像一种快速止痛。人在疲惫、焦虑，或卡在选择里时，一个明确答案会让人立刻松一口气。问题不在形式本身，而在于很多人把它用在太大、太模糊，或情绪负荷太重的问题上，硬要把它压成简单的二元判断。",
        "更好的做法，是把 Yes or No 塔罗当作一种范围较窄的工具。它适合处理时机、方向、准备度，或者某个选项此刻是否大致被支持。如果答案落在 Maybe，不要急着把它拧成一个确定答案。很多时候，Maybe 的意思并不是“没用”，而是“这里有流动，但下一步要看你怎么做”。",
      ],
    },
    sections: [
      {
        id: "when-it-works",
        title: {
          en: "When yes-or-no tarot works best",
          zh: "Yes or No 塔罗最适合什么时候用",
        },
        paragraphs: {
          en: [
            "Binary tarot works best when the decision itself is concrete. Should I send the message today? Is this the right week to apply? Am I ready to restart this conversation? Those are manageable questions because the cards can reflect current support, resistance, or hesitation.",
            "It works much less well for oversized questions like Will this person be my soulmate forever? or Will my whole life turn around if I quit next month? When the scope is huge, the deck usually answers with complexity, and a forced yes or no becomes misleading.",
          ],
          zh: [
            "二元式塔罗最好用在问题本身已经足够具体的时候。比如：我今天该发这条消息吗？这周适合投这个申请吗？我现在准备好重新开启这段对话了吗？这些问题之所以可读，是因为牌可以反映出当下的支持、阻力或犹疑。",
            "它不太适合那种体量过大的提问，比如：这个人会不会是我一生的灵魂伴侣？或者：我下个月辞职，整个人生会不会彻底翻盘？问题一旦太大，牌通常回给你的就不是简单二元，而是更复杂的现实；这时硬逼出 Yes/No，反而更容易误导。",
          ],
        },
      },
      {
        id: "ask-better-question",
        title: {
          en: "How to ask a better yes-or-no question",
          zh: "怎样把 Yes or No 问题问得更好",
        },
        paragraphs: {
          en: [
            "The strongest yes-or-no questions are specific, time-bound, and about your own next step. They aim at action rather than fantasy. Instead of asking Will this relationship work?, ask Is it wise for me to continue investing in this relationship right now? The second question gives the cards something real to respond to.",
            "If you can attach a timeframe, do it. Today, this week, this month, for this conversation, for this application. Time windows reduce ambiguity and make the reading more honest.",
          ],
          zh: [
            "最好的 Yes or No 提问，往往足够具体、有时间边界，而且围绕你自己的下一步行动。它们指向行动，而不是幻想。与其问“这段关系会不会成功？”，不如问“在当下继续把精力投入这段关系，对我来说明智吗？”后者给了牌一个真正可以回应的对象。",
            "如果能加上时间边界，就尽量加上：今天、这周、这个月、这次对话、这份申请。时间窗口会减少含混，也让解读更诚实。",
          ],
        },
      },
      {
        id: "yes-no-maybe",
        title: {
          en: "Yes, no, and maybe are not equally simple",
          zh: "Yes、No 与 Maybe，并不是同样简单",
        },
        paragraphs: {
          en: [
            "A yes card usually shows open movement, clean support, or a natural forward lean. A no card usually shows blockage, mismatch, weak timing, or a cost you are not naming. A maybe card often means mixed conditions: part of the path is open, but another part still needs clarity, maturity, or information.",
            "When you receive maybe, do not treat it as failure. Treat it as a cue to ask a better follow-up. What needs to become true for this to turn into a yes? What am I not seeing that makes this a no for now?",
          ],
          zh: [
            "Yes 牌通常意味着能量相对顺畅、支持明确，或者事情天然地向前倾。No 牌则常常表示阻滞、不匹配、时机不佳，或者你还没有说出口的代价。Maybe 最值得细看：它往往表示条件混合，路的一部分已经开了，另一部分却仍然需要更多清晰度、成熟度或信息。",
            "所以拿到 Maybe 时，不要把它当成失败。把它当成一个提示：你该把下一问问得更准了。什么条件成熟之后，这件事才会变成 Yes？我又忽略了什么，才让它此刻还是 No？",
          ],
        },
      },
      {
        id: "clarifier-or-spread",
        title: {
          en: "When to draw a clarifier or switch to a 3-card spread",
          zh: "什么时候该补牌，什么时候该换成三张牌",
        },
        paragraphs: {
          en: [
            "If the first card feels clear but incomplete, one clarifier is enough. Use it to understand what is supporting the answer or what is interfering with it. If the first card feels muddy from the start, do not keep stacking clarifiers. Switch to a three-card spread so the reading can show past, present, future or option, obstacle, advice.",
            "In other words: clarifiers are for refinement, not rescue. When the core question is structurally too complex for a yes-or-no draw, a larger spread is not overkill. It is simply the right tool.",
          ],
          zh: [
            "如果第一张牌已经有方向，只是还不够完整，那么补一张牌就够了。它可以帮助你看清答案背后的支持条件，或真正的阻碍在哪里。但如果第一张牌从一开始就很浑，别继续无止境地叠补牌。直接换成三张牌，让牌阵把过去、现在、未来，或者选项、阻碍、建议分开说清楚。",
            "换句话说，补牌是为了修整，不是为了抢救。当一个问题在结构上就比 Yes/No 更复杂时，换成更大的牌阵并不是“小题大做”，而只是换回更合适的工具。",
          ],
        },
      },
    ],
    faqs: [
      {
        q: {
          en: "Can tarot really answer yes or no questions?",
          zh: "塔罗真的能回答 Yes or No 问题吗？",
        },
        a: {
          en: "Yes, but only when the question is concrete enough. Tarot handles yes-or-no questions best when they concern timing, readiness, direction, or a specific next action. Very broad or emotionally loaded questions usually need a fuller spread.",
          zh: "可以，但前提是问题足够具体。塔罗最适合回答与时机、准备度、方向或某个具体行动有关的 Yes or No 问题。太宏大或情绪负荷太重的问题，通常更适合用更完整的牌阵。",
        },
      },
      {
        q: {
          en: "What does a maybe card mean in yes-or-no tarot?",
          zh: "Yes or No 里抽到 Maybe 牌是什么意思？",
        },
        a: {
          en: "A maybe card usually means mixed conditions. Something about the path is open, but another part is blocked, unclear, immature, or still developing. It often points to a better follow-up question rather than a final answer.",
          zh: "Maybe 牌通常表示条件混合：路的一部分是开的，另一部分却还在受阻、模糊、尚未成熟，或者仍在发展中。它更像是在邀请你提出更好的追问，而不是给出最终结论。",
        },
      },
      {
        q: {
          en: "Should I pull more cards after a yes-or-no reading?",
          zh: "做完 Yes or No 抽牌后，我还要继续补牌吗？",
        },
        a: {
          en: "You can pull one clarifier if the first answer is mostly clear and you want detail. But if the question itself is complex, it is better to switch to a three-card spread than to keep stacking clarifiers.",
          zh: "如果第一张牌已经大致清楚，只是还想补一点细节，可以再抽一张补牌。但如果问题本身就很复杂，最好的做法往往不是不停补牌，而是直接换成三张牌牌阵。",
        },
      },
    ],
    relatedCardIds: ["the-sun", "the-world", "two-of-swords", "the-moon"],
    relatedGuideSlugs: ["tarot-card-meanings", "three-card-tarot-spread"],
  },
  {
    ...summaryBySlug["three-card-tarot-spread"],
    intro: {
      en: [
        "The three-card spread is one of the best formats in tarot because it gives movement without giving chaos. A single card can be elegant, but it can also be too condensed. Larger spreads offer detail, but they can blur the central thread. Three cards give just enough room for a story to emerge.",
        "That story does not have to be past, present, future, though that is the best-known version. Three cards can also read as situation, obstacle, advice; option A, option B, what you need to know; mind, body, spirit. What matters is not the labels themselves, but whether the positions help you ask a cleaner question.",
      ],
      zh: [
        "三张牌牌阵之所以经典，是因为它既给了你流动，也没有把你淹没。单张牌很优雅，但也可能太浓缩；更大的牌阵能给出细节，却容易把主线摊散。三张牌刚好给了一段故事冒头的空间。",
        "而这段故事不一定非得是过去、现在、未来，虽然这是最常见的读法。三张牌也可以读成：现状、阻碍、建议；选项 A、选项 B、你真正需要知道的事；或者身、心、灵。重要的不是标签本身，而是这些位置能不能帮你把问题问得更干净。",
      ],
    },
    sections: [
      {
        id: "why-three-cards",
        title: {
          en: "Why three cards work so well",
          zh: "为什么三张牌这么好用",
        },
        paragraphs: {
          en: [
            "A three-card spread lets you compare forces instead of staring at one symbol in isolation. The middle card can show the current center of gravity, while the cards around it reveal where the situation came from and where it is tending. Even when the spread is not explicitly time-based, three positions naturally create relationship and sequence.",
            "That sequence matters because most real-life questions are not static. They contain momentum, pressure, resistance, and change. Three cards are often enough to show whether something is building, dissolving, repeating, or asking for intervention.",
          ],
          zh: [
            "三张牌的好处，在于你终于能比较力量，而不是把视线锁死在单一符号上。中间那张牌常常会显出此刻真正的重心，而两侧的牌则揭示事情从哪里来、又往哪里去。就算牌阵本身不是时间型，三张位置也天然会形成关系和顺序。",
            "而顺序之所以重要，是因为现实中的问题几乎都不是静止的。它们里面有惯性、有压力、有阻力，也有变化。很多时候，三张牌就已经足够让你看出：一件事是在累积、在瓦解、在重复，还是在请求介入。",
          ],
        },
      },
      {
        id: "common-position-systems",
        title: {
          en: "Common three-card position systems",
          zh: "常见的三张牌位置系统",
        },
        paragraphs: {
          en: [
            "Past, present, future is the most familiar spread because it helps people feel narrative flow quickly. But it is not always the best choice. If you are making a decision, situation, obstacle, advice may be clearer. If you are comparing paths, option A, option B, and underlying truth can be more honest than a timeline.",
            "Choose the position system that matches the shape of the question. A relationship question may need self, other, dynamic. A work question may need current pattern, what is draining you, next practical move. Cleaner positions lead to cleaner readings.",
          ],
          zh: [
            "过去、现在、未来之所以最常见，是因为它能让人很快感受到故事的流动。但它并不永远是最好的选择。如果你正在做决定，现状、阻碍、建议往往更清楚；如果你在比较不同路径，选项 A、选项 B、底层真相，有时会比时间线更诚实。",
            "所以，先根据问题的形状去选牌位。感情问题可能更适合“我、对方、关系动力”；工作问题可能更适合“当前模式、正在消耗你的东西、下一步现实动作”。位置越干净，解读通常就越干净。",
          ],
        },
        bullets: {
          en: [
            "Past, present, future",
            "Situation, obstacle, advice",
            "Option A, option B, what you need to know",
            "Mind, body, spirit",
          ],
          zh: [
            "过去、现在、未来",
            "现状、阻碍、建议",
            "选项 A、选项 B、你需要知道的事",
            "身、心、灵",
          ],
        },
      },
      {
        id: "read-the-relationship",
        title: {
          en: "Read the relationship between the cards",
          zh: "别只读单牌，要读牌与牌之间的关系",
        },
        paragraphs: {
          en: [
            "Many beginners read each position correctly and still miss the spread because they never compare the cards. Look for repeated suits, repeated numbers, repeated tone, or strong contrast. Three Swords cards together create a very different atmosphere than one Sword card surrounded by Cups and Pentacles.",
            "Also notice motion. Are the cards becoming lighter or heavier? More grounded or more unstable? Moving from confusion to clarity, or from enthusiasm into overload? Spread reading becomes much stronger when you describe the arc, not just the individual meanings.",
          ],
          zh: [
            "很多初学者其实每一张单牌都读得不算错，却还是错过了整副牌阵，因为他们没有把牌放在一起比较。去看重复的花色、重复的数字、重复的语气，或者强烈的对比。三张宝剑一起出现，和一张宝剑夹在圣杯与星币之间，氛围会完全不同。",
            "还要看运动方向。牌是越来越轻，还是越来越重？是越来越落地，还是越来越失稳？是从混乱走向清楚，还是从热情滑向过载？当你能描述这条弧线，而不只是逐张解释，牌阵就会立刻强很多。",
          ],
        },
      },
      {
        id: "one-practical-step",
        title: {
          en: "Turn the spread into one practical next step",
          zh: "最后，把牌阵收束成一个可执行的下一步",
        },
        paragraphs: {
          en: [
            "A useful reading does not end with insight alone. It ends with orientation. After you finish the spread, ask: if I respect what these three cards are showing, what one small action makes sense in the next day or week? That action may be a conversation, a pause, a boundary, a draft, a payment, a rest, or a decision.",
            "This step matters because tarot is not meant to replace agency. It is meant to sharpen it. The cards point. You still walk.",
          ],
          zh: [
            "一场真正有用的解读，不会只停在“我懂了”。它会落到“那我接下来怎么站位”。牌阵结束后，可以问自己：如果我认真尊重这三张牌正在显示的东西，那么在接下来的一天或一周里，最合理的一个小动作是什么？它可能是一场对话、一次暂停、一条边界、一个草稿、一笔支付、一段休息，或者一个决定。",
            "这一步很重要，因为塔罗不是拿来替代行动力的，而是拿来校准行动力的。牌负责指向，路还是要你自己走。",
          ],
        },
      },
    ],
    faqs: [
      {
        q: {
          en: "What is the best way to read a three-card tarot spread?",
          zh: "三张牌塔罗牌阵最好的读法是什么？",
        },
        a: {
          en: "Start by defining clear positions, then read each card, then compare the cards as a set. Look for repeated suits, repeated themes, contrast, and movement across the spread. End by naming one practical next step.",
          zh: "先把三个位置定义清楚，再逐张读牌，最后把三张牌当成一个整体来比较。去看重复的花色、重复的主题、对比，以及整个牌阵的运动方向。最后，把它收束成一个现实可行的下一步。",
        },
      },
      {
        q: {
          en: "Does a three-card spread always mean past, present, future?",
          zh: "三张牌一定等于过去、现在、未来吗？",
        },
        a: {
          en: "No. Past, present, future is only one of several useful three-card systems. Depending on the question, situation, obstacle, advice or option A, option B, what you need to know may work better.",
          zh: "不是。过去、现在、未来只是三张牌里最常见的一种。根据问题不同，现状、阻碍、建议，或者选项 A、选项 B、你需要知道的事，常常会更适合。",
        },
      },
      {
        q: {
          en: "What should I do if the three cards seem contradictory?",
          zh: "如果三张牌彼此矛盾，我该怎么办？",
        },
        a: {
          en: "Do not assume the reading failed. Contradiction often means the situation itself contains competing forces or mixed timing. Compare the suits, the emotional tone, and the direction of movement to see what tension the spread is naming.",
          zh: "不要急着判断这次解读失败了。很多时候，矛盾只是说明现实本身就存在拉扯或混合时机。去比较花色、情绪语气，以及它们的运动方向，看看牌阵真正点出的张力是什么。",
        },
      },
    ],
    relatedCardIds: ["the-hermit", "wheel-of-fortune", "three-of-wands", "judgement"],
    relatedGuideSlugs: ["tarot-card-meanings", "yes-no-tarot"],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export { guideSlugs };
export type { GuideSlug };
