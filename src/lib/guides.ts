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
  {
    ...summaryBySlug["love-tarot-card-meanings"],
    intro: {
      en: [
        "Love readings are rarely asking for a generic card meaning. Most people are trying to understand closeness, timing, reciprocity, fear, desire, or whether a bond is growing into something steadier. The same card that feels ambitious in work can feel avoidant in love. Context changes the emotional center of the interpretation.",
        "That is why love tarot works best when you stop asking whether a card is simply good or bad for relationships. A stronger question is: what kind of emotional movement is this card describing? Is it opening, hesitating, deepening, withdrawing, idealizing, or ending? Once you read for movement, love meanings become much clearer.",
      ],
      zh: [
        "爱情解读很少真的在问一张牌的“通用含义”。大多数人想弄清楚的，其实是靠近、时机、互相回应、恐惧、欲望，或者一段关系有没有在朝更稳定的方向发展。同一张牌，放在工作里可能像野心，放进爱情里却可能像回避。情境会改变解读的情感重心。",
        "所以，爱情塔罗最好不要只问这张牌对关系来说“好不好”。更好的问题是：它正在描述什么样的情感流动？是在打开、犹疑、加深、抽离、理想化，还是在结束？当你开始读“流动”而不是只贴标签，爱情牌义会清楚很多。",
      ],
    },
    sections: [
      {
        id: "why-love-meanings-shift",
        title: {
          en: "Why a card changes in love readings",
          zh: "为什么同一张牌进了爱情问题会变",
        },
        paragraphs: {
          en: [
            "A tarot card does not become a different card in a love spread, but the pressure point changes. The Chariot in career can be about ambition, discipline, and forward drive. In love, the same card may point to pursuit, emotional control, or two people pulling in different directions while trying to stay in motion.",
            "That shift matters because relationship readings are rarely only about events. They are about attachment patterns, availability, honesty, pacing, and the emotional cost of staying or leaving. A good love reading keeps one foot in the image and one foot in the relationship dynamic.",
          ],
          zh: [
            "一张牌进入爱情牌阵后，并不会变成另一张牌，但它受力的位置会变。战车在事业里可以是野心、纪律和推进力；可一旦放进爱情，它也可能指向追逐、情感控制，或者两个人一边前进、一边朝不同方向拉扯。",
            "这件事很重要，因为关系解读通常不只是在讲事件，更是在讲依附模式、可得性、诚实度、节奏感，以及继续留下或离开的情感成本。好的爱情解读，会一只脚踩在牌面图像上，另一只脚踩在关系动力上。",
          ],
        },
      },
      {
        id: "suits-in-relationships",
        title: {
          en: "How the four suits speak in relationships",
          zh: "四种花色在关系里分别在说什么",
        },
        paragraphs: {
          en: [
            "The suits are one of the fastest ways to orient a love reading. Wands show chemistry, pursuit, excitement, friction, and the will to move. Cups show feeling, intimacy, vulnerability, and emotional exchange. Swords show distance, conflict, truth, anxiety, and the stories people tell themselves. Pentacles show consistency, embodiment, trust-building, shared routines, and long-term reality.",
            "When one suit dominates, it tells you what the relationship is currently made of. A Cups-heavy spread may feel emotionally rich but unclear in action. A Pentacles-heavy spread may show loyalty and steady building, but less spark. Suit balance often explains why a connection feels strong in one area and thin in another.",
          ],
          zh: [
            "花色是爱情解读里最快的定位方式之一。权杖讲化学反应、追逐、兴奋、摩擦和推进意志。圣杯讲情感、亲密、脆弱与彼此交换。宝剑讲距离、冲突、真相、焦虑，以及人们给自己讲的故事。星币讲稳定、身体感、信任累积、共同日常，以及长期现实。",
            "当某一种花色明显占上风时，它其实在告诉你，这段关系此刻主要由什么组成。圣杯很多，可能情感很满，但行动不够清楚；星币很多，可能忠诚和长期建设很强，但火花没有那么亮。花色的分布，常常能解释一段关系为什么某方面很强、某方面却很薄。",
          ],
        },
        bullets: {
          en: [
            "Wands: desire, flirtation, pursuit, heat",
            "Cups: closeness, tenderness, reciprocity, feeling",
            "Swords: conflict, uncertainty, boundaries, truth",
            "Pentacles: commitment, patience, consistency, real-life fit",
          ],
          zh: [
            "权杖：欲望、暧昧、追逐、热度",
            "圣杯：靠近、温柔、互相回应、感受",
            "宝剑：冲突、不确定、边界、真相",
            "星币：承诺、耐心、一致性、现实适配",
          ],
        },
      },
      {
        id: "upright-reversed-love",
        title: {
          en: "Upright and reversed cards in love",
          zh: "正位和逆位在爱情问题里怎么区分",
        },
        paragraphs: {
          en: [
            "In love readings, upright often shows the direct expression of the card's energy. Reversed does not automatically mean breakup or rejection. More often, it points to hesitation, blocked expression, emotional mismatch, private fear, or timing that is not yet ready.",
            "This is why reversed Cups may show difficulty expressing tenderness, reversed Swords may show suppressed truth, and reversed Pentacles may show inconsistency or practical instability. The reversal tells you how the feeling is moving, not just whether the feeling exists.",
          ],
          zh: [
            "在爱情解读里，正位通常代表这张牌的能量在比较直接地表达出来。逆位并不自动等于分手或拒绝。它更常在说犹疑、表达受阻、情感不同步、私下的恐惧，或者时机还没成熟。",
            "所以逆位圣杯可能是在说温柔表达不出来，逆位宝剑可能是在说真相被压着不讲，逆位星币可能是在说不稳定或现实层面的失衡。逆位告诉你的，是这份感情怎么流动，而不只是它存不存在。",
          ],
        },
      },
      {
        id: "read-for-relationship-movement",
        title: {
          en: "Read for movement, not verdict",
          zh: "先读关系的流动，不要急着判结果",
        },
        paragraphs: {
          en: [
            "Beginners often want one fast verdict: Is this good? Is this bad? But love spreads become more useful when you name the movement before the outcome. A relationship can be meaningful and still unstable. It can be loving and still badly timed. It can be intense and still unsustainable.",
            "Try describing what the cards are doing first. Are they opening intimacy, slowing things down, asking for honesty, exposing imbalance, or returning someone to themselves? Once you can name the movement, questions about commitment, reconciliation, or walking away become easier to answer.",
          ],
          zh: [
            "初学者最容易想要一个快速结论：这段关系好不好？能不能成？但爱情牌阵真正有用的地方，往往在于你先说清楚它在怎么动，而不是马上判决它的结局。一个关系可以很有意义，却依然不稳定；可以有爱，却时机不对；可以很强烈，却不可持续。",
            "试着先描述牌在做什么。它是在打开亲密、放慢节奏、要求诚实、暴露失衡，还是把一个人带回他自己？当你能先说出这种流动，关于承诺、复合或离开的判断，反而会更容易。",
          ],
        },
      },
    ],
    faqs: [
      {
        q: {
          en: "Do tarot cards mean something different in love readings?",
          zh: "塔罗牌在爱情解读里会变成不同的意思吗？",
        },
        a: {
          en: "The core card does not change, but the emotional center does. In love, the reading pays more attention to closeness, reciprocity, fear, timing, boundaries, and whether two people are actually moving together.",
          zh: "牌的核心不会变，但情感重心会变。到了爱情问题里，解读会更关注靠近、互相回应、恐惧、时机、边界，以及两个人有没有真的朝同一个方向移动。",
        },
      },
      {
        q: {
          en: "What are the best tarot cards for love?",
          zh: "哪些塔罗牌最常被看作爱情好牌？",
        },
        a: {
          en: "Cards like The Lovers, Two of Cups, Ten of Cups, and Queen of Cups are often read positively in relationships. But no card is good in every context, and even a strong love card can still point to imbalance, fantasy, or poor timing if the spread supports that reading.",
          zh: "恋人、圣杯二、圣杯十、圣杯皇后这些牌，常常会被读成关系中的积极信号。但没有哪张牌在所有情境里都一定是“好牌”，再强的爱情牌，也可能在牌阵里指向失衡、理想化或时机不对。",
        },
      },
      {
        q: {
          en: "Do difficult cards always mean breakup in tarot love readings?",
          zh: "爱情解读里抽到难牌，就一定代表分手吗？",
        },
        a: {
          en: "No. Difficult cards can show distance, grief, conflict, fear, incompatibility, or a truth that needs to be faced. Sometimes they do point to ending, but often they are naming the exact pressure the relationship is under.",
          zh: "不一定。难牌可能在说距离、伤心、冲突、恐惧、不适配，或者一段关系必须面对的真相。有时它们会指向结束，但更多时候，它们是在准确点出这段关系当前承受的压力。",
        },
      },
    ],
    relatedCardIds: ["the-lovers", "two-of-cups", "queen-of-cups", "knight-of-cups"],
    relatedGuideSlugs: ["tarot-card-meanings", "yes-no-tarot", "three-card-tarot-spread"],
  },
  {
    ...summaryBySlug["how-to-read-reversed-tarot-cards"],
    intro: {
      en: [
        "Reversed cards intimidate beginners because they look like an extra rule layer. People worry that every reversal means something bad, or that they need to memorize a second meaning for all 78 cards before they can read properly. In practice, neither is true.",
        "A reversal is best understood as a change in flow. The energy of the card is still present, but it may be blocked, delayed, internalized, exaggerated, or beginning to release. Once you learn a small handful of repeatable reversal patterns, the deck becomes much less confusing.",
      ],
      zh: [
        "逆位最容易吓到初学者，因为它看起来像在原本的规则之外又多了一层。很多人会担心：是不是每张逆位都代表坏事？是不是要把 78 张牌再背一遍，才能算会读？其实都不是。",
        "更实用的理解方式，是把逆位看成“流动方式变了”。这张牌的能量还在，只是它可能被卡住了、延迟了、往内走了、过头了，或者开始松动释放。只要抓住几种重复出现的逆位模式，整副牌就会一下子没那么难。",
      ],
    },
    sections: [
      {
        id: "reversal-is-not-bad",
        title: {
          en: "A reversed card is not automatically bad",
          zh: "逆位不是自动等于坏",
        },
        paragraphs: {
          en: [
            "The simplest mistake is to treat upright as good and reversed as bad. Tarot is not that flat. A reversed card may show blocked expression, but that same blockage can sometimes be protective. A reversed Tower may feel less explosive outwardly because the collapse is happening privately first. A reversed Death may show resistance to change, but it can also reveal exactly why a transition is taking so long.",
            "The real question is not whether reversal is negative. The real question is what has changed in the card's direction, speed, honesty, or visibility. Once you ask that, reversals stop feeling random.",
          ],
          zh: [
            "最常见的错误，就是把正位等于好、逆位等于坏。塔罗没有这么扁平。逆位可能代表表达受阻，但这种阻滞有时反而是一种保护。逆位高塔未必比正位轻，只是崩塌可能先在内部发生。逆位死神也不只是坏，它可能更准确地告诉你：为什么这场转变拖了这么久。",
            "真正该问的，不是逆位负不负面，而是这张牌在方向、速度、诚实度或可见性上，到底发生了什么变化。问到这里，逆位就不会再像随机噪音。",
          ],
        },
      },
      {
        id: "five-reversal-patterns",
        title: {
          en: "Five practical ways to read reversals",
          zh: "5 种最实用的逆位读法",
        },
        paragraphs: {
          en: [
            "Most reversals can be read through a small set of repeatable patterns. You do not need all five every time. You only need to test which one best fits the question, the spread position, and the surrounding cards.",
            "Blocked energy means the card wants to move, but cannot move cleanly. Inward energy means the theme is active privately before it becomes visible. Delay means the timing is not ready. Excess means the card's quality has tipped too far. Release means something that was stuck is finally beginning to loosen.",
          ],
          zh: [
            "大多数逆位，其实都可以落回几种会重复出现的模式里。你不需要每次把五种都用上，只需要判断：哪一种最符合这次的问题、牌位和周围的牌。",
            "受阻，表示这股能量想动却动不顺；内化，表示主题先在内部运作，还没完全显形；延迟，表示时机未到；过度，表示这张牌的品质走过了头；释放，则表示原本卡住的东西开始松开了。",
          ],
        },
        bullets: {
          en: [
            "Blocked: the energy is present but cannot land cleanly",
            "Inward: the theme is active privately or psychologically",
            "Delayed: the timing is not ready yet",
            "Excess: the card's quality has become too much",
            "Release: tension is loosening and movement is returning",
          ],
          zh: [
            "受阻：能量还在，但落不下来",
            "内化：主题先在内里发生，尚未外显",
            "延迟：不是没有，只是还没到时机",
            "过度：这张牌的品质已经用过头",
            "释放：紧绷正在松开，流动开始回来",
          ],
        },
      },
      {
        id: "pick-one-system",
        title: {
          en: "Pick one reversal system and stay consistent",
          zh: "先选一套逆位系统，再保持一致",
        },
        paragraphs: {
          en: [
            "Beginners often get lost because they mix too many reversal theories at once. One book says opposite meaning, another says weakened energy, another says karmic delay, and suddenly the reading becomes guesswork. Consistency matters more than complexity.",
            "Choose one working framework for a while. For example, you might read every reversal first as blocked or inward, and only switch to excess or release when the spread strongly supports it. The point is to build recognition, not to sound mystical.",
          ],
          zh: [
            "很多初学者会在逆位上越读越乱，不是因为直觉不够，而是因为一次混用了太多系统。一本书说要读反义，一本书说是能量削弱，另一本书又说是业力延迟，最后就只剩猜。",
            "更好的做法，是先选一套能稳定工作的框架，至少用一段时间。比如你可以先把所有逆位都优先读成“受阻”或“内化”，只有当牌阵非常明确时，才读成“过度”或“释放”。重点是建立识别力，不是听起来更玄。",
          ],
        },
      },
      {
        id: "context-before-reversal",
        title: {
          en: "Read the spread before you over-read the reversal",
          zh: "先读牌阵，再细读逆位",
        },
        paragraphs: {
          en: [
            "A reversal should never be interpreted in isolation. A reversed Two of Cups beside The Devil reads differently from a reversed Two of Cups beside Temperance. The spread tells you whether the reversal is about fear, mismatch, pause, healing, private processing, or something else entirely.",
            "If you are confused, zoom out instead of zooming in. Ask what role this card is playing in the spread first. Only then decide whether the reversal is blocking, delaying, internalizing, exaggerating, or releasing that role.",
          ],
          zh: [
            "逆位绝对不能脱离牌阵单独解释。逆位圣杯二放在恶魔旁边，和放在节制旁边，读法完全不同。牌阵会告诉你，这个逆位更像是在讲恐惧、不匹配、暂停、疗愈，还是某种私下进行中的处理过程。",
            "如果你读乱了，不要继续往里钻，先往外退一步。先问这张牌在整个牌阵里扮演什么角色，再决定这个逆位是在阻挡、延后、内化、放大，还是释放这个角色。",
          ],
        },
      },
    ],
    faqs: [
      {
        q: {
          en: "Are reversed tarot cards always negative?",
          zh: "逆位塔罗牌一定都是负面的吗？",
        },
        a: {
          en: "No. Reversals often show blocked, delayed, inward, excessive, or releasing energy. They describe how the card is moving, not simply whether it is good or bad.",
          zh: "不是。逆位更常在说受阻、延迟、内化、过度或释放。它描述的是这张牌怎么运作，而不只是它好还是坏。",
        },
      },
      {
        q: {
          en: "Can I read tarot without using reversals?",
          zh: "不读逆位，也可以学会塔罗吗？",
        },
        a: {
          en: "Yes. Many readers do not use reversals at all. If your upright-only readings are already clear and nuanced, you may not need them. Reversals are a tool, not a requirement.",
          zh: "可以。很多读者本来就不使用逆位。如果你只用正位也已经能读得清楚细腻，逆位并不是必须。它是工具，不是门槛。",
        },
      },
      {
        q: {
          en: "What if many cards in a spread are reversed?",
          zh: "如果一個牌阵里很多牌都逆位，代表什么？",
        },
        a: {
          en: "A reversal-heavy spread often suggests inwardness, blocked movement, delay, or a lot happening below the surface. It usually means the situation is less direct and more psychologically or privately charged.",
          zh: "如果一个牌阵里逆位很多，往往表示这件事更内向、更受阻、更延迟，或有大量过程在水面下进行。它通常说明情况没有表面看起来那么直接。",
        },
      },
    ],
    relatedCardIds: ["the-hanged-man", "death", "the-tower", "eight-of-swords"],
    relatedGuideSlugs: ["tarot-card-meanings", "yes-no-tarot", "three-card-tarot-spread"],
  },
  {
    ...summaryBySlug["court-cards-tarot-meanings"],
    intro: {
      en: [
        "Court cards confuse beginners because they do not behave like the numbered cards. An Eight of Pentacles clearly shows practice; a Queen of Swords feels less concrete. Is she a person, an energy, a role, a tone, or a decision-making style? The answer is often: any of those, depending on context.",
        "You do not need to guess wildly. Court cards become much easier once you stop treating them as mysterious personalities and start reading them as patterns. Rank tells you how the energy moves. Suit tells you what domain it moves through. The spread tells you where that pattern is landing.",
      ],
      zh: [
        "宫廷牌最容易让初学者卡住，因为它们不像数字牌那样直接。星币八很清楚是在讲练习和工艺；可一张宝剑皇后出现时，你很容易开始犹豫：她到底是某个人、某种能量、一种角色，还是一种做决定的方式？答案通常是：都可能，要看情境。",
        "但这不代表你只能靠猜。宫廷牌真正变简单，是从你不再把它们当成神秘人物开始，而是把它们读成一种模式。位阶告诉你能量怎么动，花色告诉你它在哪个领域里动，牌阵则告诉你这个模式落在什么位置上。",
      ],
    },
    sections: [
      {
        id: "what-court-cards-can-be",
        title: {
          en: "What a court card can represent",
          zh: "宫廷牌到底可以代表什么",
        },
        paragraphs: {
          en: [
            "A court card can represent an actual person, but it can also represent a role, a way of behaving, or the energy you are being asked to embody. A Page of Cups may be a literal young person, but it may also describe curiosity, tenderness, and a message arriving in an emotionally unguarded form.",
            "The fastest way to avoid confusion is to ask which reading makes the spread more coherent. If the card as a person makes the story clearer, use that. If the card as a behavioral pattern makes more sense, use that. Court cards reward usefulness, not rigid rules.",
          ],
          zh: [
            "宫廷牌可以是某个具体人物，但也可以是一个角色、一种行为方式，或者你此刻被要求发展出来的能量。比如圣杯侍从当然可能指向某个年轻人，但它也可能是在讲好奇、温柔，或一条以情感为入口的消息。",
            "避免混乱最快的方法，是问：哪一种读法能让整个牌阵更连贯？如果把它读成人物，故事更清楚，那就这么读；如果把它读成行为模式更合理，那就用后者。宫廷牌奖励的是“有用”，不是死规则。",
          ],
        },
      },
      {
        id: "rank-language",
        title: {
          en: "How the ranks move: Page, Knight, Queen, King",
          zh: "四个位阶怎么动：侍从、骑士、皇后、国王",
        },
        paragraphs: {
          en: [
            "Rank is the most important layer. Pages are openings: they bring messages, study, curiosity, and first contact. Knights move: they pursue, test, push, and carry energy forward. Queens deepen: they internalize, hold, nurture, refine, and stabilize. Kings direct: they decide, structure, command, and set the tone of the environment.",
            "When you understand the rank first, the suit becomes much easier to apply. A Knight of Cups is not just romantic; it is feeling in motion. A Queen of Swords is not just cold; it is discernment held with consistency. Rank tells you the verb before the suit supplies the subject matter.",
          ],
          zh: [
            "位阶是读宫廷牌时最重要的一层。侍从是打开：带来消息、学习、好奇和第一次接触。骑士是推进：追逐、试探、施压，把能量往前送。皇后是加深：内化、承托、滋养、提炼、稳定。国王是定向：决定、组织、发号施令，并为环境定调。",
            "当你先抓住位阶，花色就会变得好读很多。圣杯骑士不只是浪漫，而是“情感在移动”；宝剑皇后不只是冷，而是“一种稳定持有的辨别力”。位阶先给你动词，花色再告诉你这个动词发生在什么主题上。",
          ],
        },
        bullets: {
          en: [
            "Page: message, beginning, openness, study",
            "Knight: movement, pursuit, testing, momentum",
            "Queen: holding, maturing, refining, sustaining",
            "King: direction, authority, mastery, decision",
          ],
          zh: [
            "侍从：消息、开始、开放、学习",
            "骑士：移动、追逐、试探、推进",
            "皇后：承托、成熟、提炼、维系",
            "国王：定向、权威、掌握、决定",
          ],
        },
      },
      {
        id: "suit-language",
        title: {
          en: "How suits change the court card",
          zh: "花色怎样改变宫廷牌的表达",
        },
        paragraphs: {
          en: [
            "Once rank is clear, ask what suit is moving through it. Wands court cards move through fire: desire, initiative, charisma, volatility. Cups court cards move through feeling: empathy, affection, imagination, emotional permeability. Swords move through mind and truth: clarity, conflict, analysis, distance. Pentacles move through reality: embodiment, patience, resources, work, and reliability.",
            "This is why two court cards with the same rank can feel completely different. A Queen of Cups holds emotion softly; a Queen of Swords holds judgment cleanly. A Page of Pentacles studies slowly and practically; a Page of Wands enters with instinct and spark.",
          ],
          zh: [
            "当位阶已经清楚，下一步就问：是哪一种花色在通过它表达自己？权杖宫廷牌通过火来移动，讲欲望、主动、魅力和不稳定。圣杯宫廷牌通过情感移动，讲同理、亲近、想象和情绪渗透。宝剑通过心智与真相移动，讲清楚、冲突、分析与距离。星币通过现实移动，讲身体感、耐心、资源、工作和可靠性。",
            "这也是为什么同一位阶的两张宫廷牌会给人完全不同的感觉。圣杯皇后是柔软地承接情感，宝剑皇后则是清楚地持守判断；星币侍从是慢而务实地学习，权杖侍从则是凭着直觉和火花闯进来。",
          ],
        },
      },
      {
        id: "read-court-in-spread",
        title: {
          en: "Read the court card where it lands",
          zh: "宫廷牌要放回牌阵位置里读",
        },
        paragraphs: {
          en: [
            "A court card in a feelings position is not the same as a court card in an advice position. In feelings, it may describe emotional style or private attitude. In advice, it may describe the energy you need to adopt. In an obstacle position, it may show immaturity, over-control, avoidance, or mismatch.",
            "This is why context should decide whether the court card is a person, a role, or a pattern. Let the spread position do some of the interpretive work for you. Court cards become much less slippery when you stop trying to identify a character before you understand the function.",
          ],
          zh: [
            "一张宫廷牌落在“感受”位置，和落在“建议”位置，根本不是同一回事。放在感受里，它可能是在讲一个人的情绪风格或私下态度；放在建议里，它可能是在说你需要长出来的能量；放在阻碍位，它则可能是在点出幼稚、过度控制、回避，或根本不匹配。",
            "所以，真正决定宫廷牌是人物、角色还是模式的，不只是牌本身，还有它落在哪个位置上。先看功能，再猜人物。只要顺序对了，宫廷牌就不会再那么滑。",
          ],
        },
      },
    ],
    faqs: [
      {
        q: {
          en: "Do court cards always represent people?",
          zh: "宫廷牌一定都代表人物吗？",
        },
        a: {
          en: "No. They can represent people, but they can also show attitudes, roles, communication styles, relationship dynamics, or the energy you are being asked to step into.",
          zh: "不一定。它们可以代表人物，但也可以表示态度、角色、沟通方式、关系动力，或你此刻需要进入的一种能量状态。",
        },
      },
      {
        q: {
          en: "What is the difference between a Page and a Knight in tarot?",
          zh: "塔罗里的侍从和骑士有什么区别？",
        },
        a: {
          en: "Pages open and learn; Knights move and test. A Page usually brings curiosity, a message, or a beginning. A Knight pushes the energy outward through action, pursuit, or momentum.",
          zh: "侍从偏向打开和学习，骑士偏向移动和试探。侍从通常带来好奇、消息或开始；骑士则把这股能量通过行动、追逐和推进往外送。",
        },
      },
      {
        q: {
          en: "What does it mean when many court cards appear in one spread?",
          zh: "如果一个牌阵里出现很多宫廷牌，通常说明什么？",
        },
        a: {
          en: "A court-card-heavy spread often points to interpersonal complexity. Multiple people, multiple roles, mixed communication styles, or questions of maturity and emotional availability may be central to the reading.",
          zh: "如果一个牌阵里宫廷牌很多，往往说明这次解读的重点在人际复杂度上。它可能涉及多人、多种角色、不同的沟通方式，或者成熟度与情感可得性的问题。",
        },
      },
    ],
    relatedCardIds: ["page-of-cups", "knight-of-wands", "queen-of-swords", "king-of-pentacles"],
    relatedGuideSlugs: ["tarot-card-meanings", "three-card-tarot-spread", "how-to-read-reversed-tarot-cards"],
  },
];

export function getGuide(slug: string) {
  return guides.find((guide) => guide.slug === slug);
}

export { guideSlugs };
export type { GuideSlug };
