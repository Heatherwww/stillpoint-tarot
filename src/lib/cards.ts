// Rider-Waite-Smith deck data. Concise meanings in EN + ZH.
// 22 Major Arcana + 56 Minor Arcana = 78 cards.

import type { Lang } from "./i18n";

export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Arcana = "major" | "minor";

export interface TarotCard {
  id: string;
  name: { en: string; zh: string };
  arcana: Arcana;
  suit?: Suit;
  number?: number;
  upright: { en: string; zh: string };
  reversed: { en: string; zh: string };
}

// ---------- Major Arcana ----------
export const majorArcana: TarotCard[] = [
  {
    id: "the-fool",
    name: { en: "The Fool", zh: "愚者" },
    arcana: "major",
    number: 0,
    upright: {
      en: "New beginnings, innocence, a leap of faith, openness to the unknown.",
      zh: "新的开始、纯真、一跃而起的信念、对未知的敞开。",
    },
    reversed: {
      en: "Recklessness, hesitation, fear of the new, unconsidered risks.",
      zh: "鲁莽、犹豫、对新事物的恐惧、未加思量的冒险。",
    },
  },
  {
    id: "the-magician",
    name: { en: "The Magician", zh: "魔术师" },
    arcana: "major",
    number: 1,
    upright: {
      en: "Manifestation, willpower, having the tools you need to act.",
      zh: "显化、意志力、拥有行动所需的一切工具。",
    },
    reversed: {
      en: "Manipulation, scattered energy, untapped potential.",
      zh: "操控、能量分散、未被开发的潜能。",
    },
  },
  {
    id: "the-high-priestess",
    name: { en: "The High Priestess", zh: "女祭司" },
    arcana: "major",
    number: 2,
    upright: {
      en: "Intuition, inner knowing, mystery, the wisdom of stillness.",
      zh: "直觉、内在的知晓、神秘、静默中的智慧。",
    },
    reversed: {
      en: "Secrets withheld, ignored intuition, surface answers.",
      zh: "被隐藏的秘密、被忽视的直觉、流于表面的答案。",
    },
  },
  {
    id: "the-empress",
    name: { en: "The Empress", zh: "皇后" },
    arcana: "major",
    number: 3,
    upright: {
      en: "Abundance, nurture, creativity, the fertile ground of life.",
      zh: "丰盛、滋养、创造力、生命肥沃的土壤。",
    },
    reversed: {
      en: "Creative block, dependence, neglect of self-care.",
      zh: "创造的阻塞、依赖、对自我的忽视。",
    },
  },
  {
    id: "the-emperor",
    name: { en: "The Emperor", zh: "皇帝" },
    arcana: "major",
    number: 4,
    upright: {
      en: "Structure, authority, the steady hand that builds.",
      zh: "结构、权威、稳定建造的手。",
    },
    reversed: {
      en: "Rigidity, control, abuse of power.",
      zh: "僵化、控制、权力的滥用。",
    },
  },
  {
    id: "the-hierophant",
    name: { en: "The Hierophant", zh: "教皇" },
    arcana: "major",
    number: 5,
    upright: {
      en: "Tradition, teaching, belonging to something larger.",
      zh: "传统、教导、归属于更大的事物。",
    },
    reversed: {
      en: "Rebellion, breaking from convention, finding your own path.",
      zh: "反叛、打破成规、寻找自己的道路。",
    },
  },
  {
    id: "the-lovers",
    name: { en: "The Lovers", zh: "恋人" },
    arcana: "major",
    number: 6,
    upright: {
      en: "Union, choice from the heart, harmony between opposites.",
      zh: "结合、出自内心的选择、对立之间的和谐。",
    },
    reversed: {
      en: "Disharmony, misalignment, a choice avoided.",
      zh: "失谐、错位、被回避的选择。",
    },
  },
  {
    id: "the-chariot",
    name: { en: "The Chariot", zh: "战车" },
    arcana: "major",
    number: 7,
    upright: {
      en: "Determination, victory through focus, forward momentum.",
      zh: "决心、因专注而胜、向前的势能。",
    },
    reversed: {
      en: "Loss of direction, scattered effort, stalled progress.",
      zh: "方向迷失、努力分散、停滞的进展。",
    },
  },
  {
    id: "strength",
    name: { en: "Strength", zh: "力量" },
    arcana: "major",
    number: 8,
    upright: {
      en: "Quiet courage, compassion, mastery of one's own nature.",
      zh: "静默的勇气、慈悲、对自身天性的掌握。",
    },
    reversed: {
      en: "Self-doubt, suppressed feelings, lost composure.",
      zh: "自我怀疑、被压抑的情绪、失去的从容。",
    },
  },
  {
    id: "the-hermit",
    name: { en: "The Hermit", zh: "隐士" },
    arcana: "major",
    number: 9,
    upright: {
      en: "Solitude, inner search, the lamp of self-knowledge.",
      zh: "独处、内在的探寻、自我认知之灯。",
    },
    reversed: {
      en: "Isolation, withdrawal, refusal to look inward.",
      zh: "孤立、退缩、拒绝内观。",
    },
  },
  {
    id: "wheel-of-fortune",
    name: { en: "Wheel of Fortune", zh: "命运之轮" },
    arcana: "major",
    number: 10,
    upright: {
      en: "Cycles turning, change, the door of luck swinging open.",
      zh: "循环转动、变化、幸运之门的开启。",
    },
    reversed: {
      en: "Bad timing, resistance to change, a downturn.",
      zh: "时机不佳、抗拒变化、向下的转折。",
    },
  },
  {
    id: "justice",
    name: { en: "Justice", zh: "正义" },
    arcana: "major",
    number: 11,
    upright: {
      en: "Fairness, truth, cause and effect made visible.",
      zh: "公正、真相、因果显现。",
    },
    reversed: {
      en: "Imbalance, dishonesty, accountability avoided.",
      zh: "失衡、不诚实、被回避的责任。",
    },
  },
  {
    id: "the-hanged-man",
    name: { en: "The Hanged Man", zh: "倒吊人" },
    arcana: "major",
    number: 12,
    upright: {
      en: "Surrender, a new perspective gained by waiting, sacred pause.",
      zh: "臣服、因等待而获得的新视角、神圣的暂停。",
    },
    reversed: {
      en: "Stalling, martyrdom, refusing the lesson of pause.",
      zh: "拖延、自我牺牲、拒绝暂停所教的功课。",
    },
  },
  {
    id: "death",
    name: { en: "Death", zh: "死神" },
    arcana: "major",
    number: 13,
    upright: {
      en: "Endings that make space, transformation, letting go.",
      zh: "腾出空间的结束、转化、放下。",
    },
    reversed: {
      en: "Clinging, fear of change, an ending postponed.",
      zh: "执着、对变化的恐惧、被推迟的结束。",
    },
  },
  {
    id: "temperance",
    name: { en: "Temperance", zh: "节制" },
    arcana: "major",
    number: 14,
    upright: {
      en: "Balance, patience, the art of mixing things in right measure.",
      zh: "平衡、耐心、以恰当的尺度调和事物的艺术。",
    },
    reversed: {
      en: "Excess, impatience, things out of proportion.",
      zh: "过度、急躁、失去比例。",
    },
  },
  {
    id: "the-devil",
    name: { en: "The Devil", zh: "恶魔" },
    arcana: "major",
    number: 15,
    upright: {
      en: "Attachment, the chains we choose, shadow material asking for attention.",
      zh: "执着、我们自选的锁链、寻求关注的阴影面。",
    },
    reversed: {
      en: "Release, breaking free, reclaiming power.",
      zh: "释放、挣脱、重夺力量。",
    },
  },
  {
    id: "the-tower",
    name: { en: "The Tower", zh: "高塔" },
    arcana: "major",
    number: 16,
    upright: {
      en: "Sudden upheaval, a false structure falling, hard truth.",
      zh: "突如其来的剧变、虚假结构的崩塌、难以承受的真相。",
    },
    reversed: {
      en: "A near miss, delaying the inevitable, internal collapse.",
      zh: "侥幸躲过、推迟无可避免的事、内部的崩塌。",
    },
  },
  {
    id: "the-star",
    name: { en: "The Star", zh: "星星" },
    arcana: "major",
    number: 17,
    upright: {
      en: "Hope, gentle renewal, the light returning after a hard night.",
      zh: "希望、温柔的更新、在艰难之夜后回归的光。",
    },
    reversed: {
      en: "Discouragement, faith dimmed, looking for light in the wrong places.",
      zh: "气馁、信心黯淡、在错误的地方寻找光。",
    },
  },
  {
    id: "the-moon",
    name: { en: "The Moon", zh: "月亮" },
    arcana: "major",
    number: 18,
    upright: {
      en: "Dreams, illusion, things not quite as they seem, a call to feel.",
      zh: "梦境、幻觉、事物并非表面那般、感受的召唤。",
    },
    reversed: {
      en: "Truth surfacing, fear releasing, fog lifting.",
      zh: "真相浮现、恐惧释放、迷雾散去。",
    },
  },
  {
    id: "the-sun",
    name: { en: "The Sun", zh: "太阳" },
    arcana: "major",
    number: 19,
    upright: {
      en: "Joy, vitality, success that warms everyone around it.",
      zh: "喜悦、生命力、温暖周遭的成功。",
    },
    reversed: {
      en: "Temporary clouds, dimmed enthusiasm, success delayed.",
      zh: "暂时的乌云、黯淡的热情、被延迟的成功。",
    },
  },
  {
    id: "judgement",
    name: { en: "Judgement", zh: "审判" },
    arcana: "major",
    number: 20,
    upright: {
      en: "Awakening, a calling answered, honest self-assessment.",
      zh: "觉醒、回应召唤、诚实的自我审视。",
    },
    reversed: {
      en: "Self-doubt, ignoring the call, harsh inner judge.",
      zh: "自我怀疑、忽视召唤、苛刻的内在评判。",
    },
  },
  {
    id: "the-world",
    name: { en: "The World", zh: "世界" },
    arcana: "major",
    number: 21,
    upright: {
      en: "Completion, wholeness, a chapter closing well.",
      zh: "圆满、完整、一个章节善始善终地合上。",
    },
    reversed: {
      en: "Loose ends, a goal not quite reached, hesitating at the threshold.",
      zh: "未尽之事、尚未抵达的目标、在门槛前犹豫。",
    },
  },
];

// ---------- Minor Arcana ----------
// Suit themes: wands=action/will, cups=feeling, swords=mind, pentacles=body/material.

interface MinorMeaning {
  upright: { en: string; zh: string };
  reversed: { en: string; zh: string };
}

const wands: Record<string, MinorMeaning> = {
  ace: {
    upright: {
      en: "A spark of inspiration, the beginning of a creative project.",
      zh: "灵感的火花，一个创造性项目的开端。",
    },
    reversed: {
      en: "Delays, lost spark, false start.",
      zh: "延迟、火花熄灭、错误的开始。",
    },
  },
  two: {
    upright: {
      en: "Planning the future, looking outward, weighing options.",
      zh: "规划未来、向外眺望、权衡选择。",
    },
    reversed: {
      en: "Indecision, fear of the unknown, plans abandoned.",
      zh: "优柔寡断、对未知的恐惧、被放弃的计划。",
    },
  },
  three: {
    upright: {
      en: "Expansion, ships coming in, the first results of effort.",
      zh: "扩展、归来的船、努力的初步成果。",
    },
    reversed: {
      en: "Setbacks, delays, narrow vision.",
      zh: "挫折、延迟、视野狭窄。",
    },
  },
  four: {
    upright: {
      en: "Celebration, homecoming, a stable joy.",
      zh: "庆祝、归家、稳定的喜悦。",
    },
    reversed: {
      en: "Tension at home, postponed celebration.",
      zh: "家中的紧张、被推迟的庆祝。",
    },
  },
  five: {
    upright: {
      en: "Friction, competition, growing through conflict.",
      zh: "摩擦、竞争、在冲突中成长。",
    },
    reversed: {
      en: "Avoiding conflict, internal struggle resolving.",
      zh: "回避冲突、内在挣扎的化解。",
    },
  },
  six: {
    upright: {
      en: "Public recognition, victory, riding home in triumph.",
      zh: "公开的认可、胜利、凯旋而归。",
    },
    reversed: {
      en: "Ego, fall from grace, private doubt.",
      zh: "自我膨胀、跌落、私下的怀疑。",
    },
  },
  seven: {
    upright: {
      en: "Standing your ground, defending what you've built.",
      zh: "坚守立场、捍卫你所建造的。",
    },
    reversed: {
      en: "Overwhelmed, giving up the high ground.",
      zh: "不堪重负、放弃高地。",
    },
  },
  eight: {
    upright: {
      en: "Swift movement, news arriving, momentum.",
      zh: "迅捷的行动、抵达的消息、势能。",
    },
    reversed: {
      en: "Delays, miscommunication, things stuck in flight.",
      zh: "延迟、沟通错位、滞留半空的事物。",
    },
  },
  nine: {
    upright: {
      en: "Resilience, the last stand, weary but standing.",
      zh: "韧性、最后的坚守、疲惫却仍站立。",
    },
    reversed: {
      en: "Burnout, paranoia, walls too high.",
      zh: "倦怠、多疑、高筑的墙。",
    },
  },
  ten: {
    upright: {
      en: "Carrying too much, the weight of responsibility.",
      zh: "承载过多、责任的重量。",
    },
    reversed: {
      en: "Putting down the load, delegating, relief.",
      zh: "放下重担、分派他人、解脱。",
    },
  },
  page: {
    upright: {
      en: "An eager messenger, fresh ideas, youthful enthusiasm.",
      zh: "热切的信使、新鲜的想法、青春的热情。",
    },
    reversed: {
      en: "Restless energy, news delayed, immaturity.",
      zh: "不安的能量、被延迟的消息、不成熟。",
    },
  },
  knight: {
    upright: {
      en: "Bold action, charging forward, adventurous spirit.",
      zh: "大胆的行动、向前冲、冒险的精神。",
    },
    reversed: {
      en: "Recklessness, burnout, leaping without looking.",
      zh: "鲁莽、倦怠、不看路就跃起。",
    },
  },
  queen: {
    upright: {
      en: "Confident, warm leadership; fierce kindness.",
      zh: "自信而温暖的领导力；炽烈的善意。",
    },
    reversed: {
      en: "Jealousy, scattered focus, smoldering temper.",
      zh: "嫉妒、注意力分散、隐隐燃烧的脾气。",
    },
  },
  king: {
    upright: {
      en: "Visionary leader, principled action, charisma with purpose.",
      zh: "有远见的领袖、有原则的行动、带着目的的魅力。",
    },
    reversed: {
      en: "Tyranny, impulsive decisions, hot temper.",
      zh: "专横、冲动的决定、火爆的脾气。",
    },
  },
};

const cups: Record<string, MinorMeaning> = {
  ace: {
    upright: {
      en: "A new feeling, love opening, the cup overflowing.",
      zh: "一种新的感受、爱的开启、满溢的杯。",
    },
    reversed: {
      en: "Blocked feeling, love withheld, emotional fatigue.",
      zh: "情感的阻塞、被压抑的爱、情绪的疲惫。",
    },
  },
  two: {
    upright: {
      en: "Connection, mutual respect, a partnership formed.",
      zh: "连接、互相尊重、伙伴关系的形成。",
    },
    reversed: {
      en: "Imbalance in connection, miscommunication, drifting apart.",
      zh: "连接中的失衡、沟通错位、渐行渐远。",
    },
  },
  three: {
    upright: {
      en: "Friendship, celebration, a community of joy.",
      zh: "友谊、庆祝、欢乐的群体。",
    },
    reversed: {
      en: "Gossip, third-party trouble, isolated joy.",
      zh: "闲言碎语、第三方麻烦、孤立的喜悦。",
    },
  },
  four: {
    upright: {
      en: "Apathy, an offered gift overlooked, going inward.",
      zh: "冷漠、被忽略的礼物、向内退缩。",
    },
    reversed: {
      en: "Reawakening, accepting what's offered.",
      zh: "重新觉醒、接纳所给予的。",
    },
  },
  five: {
    upright: {
      en: "Grief, what was lost crowding out what remains.",
      zh: "悲伤、失去之物遮蔽了余下之物。",
    },
    reversed: {
      en: "Acceptance, looking up, healing begins.",
      zh: "接纳、抬眼看见、疗愈开始。",
    },
  },
  six: {
    upright: {
      en: "Nostalgia, innocent gifts, reconnecting with the past.",
      zh: "怀旧、纯真的礼物、与过去的重新连接。",
    },
    reversed: {
      en: "Stuck in the past, rose-colored memory.",
      zh: "停滞于过去、玫瑰色的记忆。",
    },
  },
  seven: {
    upright: {
      en: "Many choices, fantasies, illusion mixed with possibility.",
      zh: "诸多选择、幻想、幻象与可能交织。",
    },
    reversed: {
      en: "Clarity returning, choosing one path.",
      zh: "清明回归、选定一条路。",
    },
  },
  eight: {
    upright: {
      en: "Walking away from what no longer feeds you.",
      zh: "离开不再滋养你的事物。",
    },
    reversed: {
      en: "Hesitation to leave, returning to a closed chapter.",
      zh: "迟迟不愿离开、重返已合上的篇章。",
    },
  },
  nine: {
    upright: {
      en: "Contentment, a wish fulfilled, simple satisfaction.",
      zh: "知足、愿望成真、简单的满足。",
    },
    reversed: {
      en: "Smugness, hollow comfort, the wrong wish granted.",
      zh: "自得、空洞的安逸、被实现的错误愿望。",
    },
  },
  ten: {
    upright: {
      en: "Lasting joy, family, the rainbow over the home.",
      zh: "长久的喜悦、家人、家上的彩虹。",
    },
    reversed: {
      en: "Disconnection at home, idealized family strain.",
      zh: "家中的疏离、被理想化的家庭张力。",
    },
  },
  page: {
    upright: {
      en: "An emotional message, tender curiosity, creative whispers.",
      zh: "一封情感的讯息、温柔的好奇、创造的低语。",
    },
    reversed: {
      en: "Emotional immaturity, blocked imagination.",
      zh: "情感的不成熟、被阻塞的想象力。",
    },
  },
  knight: {
    upright: {
      en: "A romantic offer, following the heart, poetic action.",
      zh: "一份浪漫的提议、追随内心、诗意的行动。",
    },
    reversed: {
      en: "Moodiness, broken promise, charm without substance.",
      zh: "情绪化、被打破的承诺、徒有魅力却无实质。",
    },
  },
  queen: {
    upright: {
      en: "Empathy, intuition, holding space for others.",
      zh: "共情、直觉、为他人留出空间。",
    },
    reversed: {
      en: "Emotional overwhelm, self-neglect, codependence.",
      zh: "情绪上的不堪、自我忽视、共依赖。",
    },
  },
  king: {
    upright: {
      en: "Emotionally steady, wise counsel, calm in storms.",
      zh: "情绪稳定、睿智的劝告、风暴中的从容。",
    },
    reversed: {
      en: "Suppressed feelings, manipulation, moodiness hidden under calm.",
      zh: "被压抑的情感、操控、平静下的情绪起伏。",
    },
  },
};

const swords: Record<string, MinorMeaning> = {
  ace: {
    upright: {
      en: "A clear thought, a truth named, a decision cutting cleanly.",
      zh: "一个清晰的念头、被说出的真相、干净利落的决定。",
    },
    reversed: {
      en: "Confusion, a sharp word badly used, mental fog.",
      zh: "混乱、被误用的尖锐之语、心智的迷雾。",
    },
  },
  two: {
    upright: {
      en: "A stalemate, a decision avoided, blindfolded balance.",
      zh: "僵局、被回避的决定、蒙眼的平衡。",
    },
    reversed: {
      en: "Information revealed, the decision finally made.",
      zh: "信息揭晓、决定终于做出。",
    },
  },
  three: {
    upright: {
      en: "Heartbreak, painful truth, the necessary cut.",
      zh: "心碎、痛的真相、必要的切割。",
    },
    reversed: {
      en: "Healing, releasing grief, forgiving.",
      zh: "疗愈、释放悲伤、原谅。",
    },
  },
  four: {
    upright: {
      en: "Rest, recovery, the mind needing quiet.",
      zh: "休憩、恢复、心智需要安静。",
    },
    reversed: {
      en: "Restlessness, returning to battle too soon.",
      zh: "焦躁不安、过早重返战场。",
    },
  },
  five: {
    upright: {
      en: "A hollow victory, conflict that costs more than it gives.",
      zh: "空洞的胜利、得不偿失的冲突。",
    },
    reversed: {
      en: "Reconciliation, putting down old quarrels.",
      zh: "和解、放下旧争执。",
    },
  },
  six: {
    upright: {
      en: "Moving on, transition to calmer waters.",
      zh: "继续前行、过渡到更平静的水域。",
    },
    reversed: {
      en: "Stuck, unable to leave, baggage held tight.",
      zh: "被困、无法离开、紧握的包袱。",
    },
  },
  seven: {
    upright: {
      en: "Cunning, strategy, taking only what you can carry.",
      zh: "机巧、策略、只带走你能带走的。",
    },
    reversed: {
      en: "Confession, getting caught, returning what was taken.",
      zh: "坦白、被发现、归还所取之物。",
    },
  },
  eight: {
    upright: {
      en: "Self-imposed limits, the cage you can step out of.",
      zh: "自设的限制、你可以走出去的笼子。",
    },
    reversed: {
      en: "Freeing yourself, seeing the way out.",
      zh: "释放自我、看见出路。",
    },
  },
  nine: {
    upright: {
      en: "Anxiety, sleepless nights, fears amplified by darkness.",
      zh: "焦虑、不眠的夜、被黑暗放大的恐惧。",
    },
    reversed: {
      en: "Despair lifting, sharing the burden, dawn arriving.",
      zh: "绝望散去、与人分担、黎明降临。",
    },
  },
  ten: {
    upright: {
      en: "An ending, rock bottom, the worst already over.",
      zh: "一个结束、谷底、最坏已经过去。",
    },
    reversed: {
      en: "Recovery, slowly rising, lessons gathered.",
      zh: "恢复、缓慢起身、积聚的功课。",
    },
  },
  page: {
    upright: {
      en: "Curiosity, sharp questions, eager to learn.",
      zh: "好奇心、尖锐的发问、渴望学习。",
    },
    reversed: {
      en: "Gossip, careless words, scattered thinking.",
      zh: "闲话、不慎之言、思维散乱。",
    },
  },
  knight: {
    upright: {
      en: "Direct action, intellect on the move, swift argument.",
      zh: "直接的行动、行进中的智识、迅捷的辩论。",
    },
    reversed: {
      en: "Recklessness in speech, impulsive cruelty.",
      zh: "言语上的鲁莽、冲动的残酷。",
    },
  },
  queen: {
    upright: {
      en: "Independent judgment, clarity earned through experience.",
      zh: "独立的判断、由经验换来的清明。",
    },
    reversed: {
      en: "Coldness, harsh words, isolation by sharpness.",
      zh: "冷漠、严苛之言、因锋利而孤立。",
    },
  },
  king: {
    upright: {
      en: "Authority through reason, fair judgment, integrity.",
      zh: "因理智而立的权威、公正的判断、正直。",
    },
    reversed: {
      en: "Cold control, manipulation, intellect without heart.",
      zh: "冰冷的控制、操控、无心的智识。",
    },
  },
};

const pentacles: Record<string, MinorMeaning> = {
  ace: {
    upright: {
      en: "A new opportunity, a seed planted in good soil.",
      zh: "一个新机会、播在好土里的种子。",
    },
    reversed: {
      en: "Missed chance, financial worry, scarcity mindset.",
      zh: "错失的机会、财务上的忧虑、匮乏心态。",
    },
  },
  two: {
    upright: {
      en: "Juggling, adapting to flow, balance in motion.",
      zh: "权衡、顺势而变、动中的平衡。",
    },
    reversed: {
      en: "Overwhelm, dropping the ball, poor priorities.",
      zh: "不堪重负、失手坠落、优先次序不当。",
    },
  },
  three: {
    upright: {
      en: "Collaboration, craft, learning by doing.",
      zh: "协作、技艺、在实践中学习。",
    },
    reversed: {
      en: "Disjointed teamwork, sloppy work, lack of recognition.",
      zh: "脱节的合作、潦草的工作、缺乏认可。",
    },
  },
  four: {
    upright: {
      en: "Holding tight, security, fear of loss.",
      zh: "紧握、安稳、对失去的恐惧。",
    },
    reversed: {
      en: "Letting go, generosity, releasing control.",
      zh: "放手、慷慨、放下控制。",
    },
  },
  five: {
    upright: {
      en: "Hardship, lack, walking past the warm window.",
      zh: "困苦、匮乏、走过温暖的窗。",
    },
    reversed: {
      en: "Recovery, asking for help, the door opening.",
      zh: "恢复、寻求帮助、门的开启。",
    },
  },
  six: {
    upright: {
      en: "Generosity, giving and receiving in balance.",
      zh: "慷慨、给予与接受的平衡。",
    },
    reversed: {
      en: "Strings attached, debt, uneven exchange.",
      zh: "附带条件、欠债、不对等的交换。",
    },
  },
  seven: {
    upright: {
      en: "Patience with growth, evaluating progress.",
      zh: "对成长的耐心、评估进展。",
    },
    reversed: {
      en: "Impatience, poor returns, doubt in the work.",
      zh: "急躁、回报不佳、对工作的怀疑。",
    },
  },
  eight: {
    upright: {
      en: "Diligent practice, skill built day by day.",
      zh: "勤勉的练习、日复一日打磨的技艺。",
    },
    reversed: {
      en: "Cutting corners, perfectionism, dull repetition.",
      zh: "偷工减料、完美主义、乏味的重复。",
    },
  },
  nine: {
    upright: {
      en: "Self-sufficiency, comfort earned, quiet luxury.",
      zh: "自给自足、应得的舒适、静谧的优雅。",
    },
    reversed: {
      en: "Overwork, hollow comfort, dependence on appearances.",
      zh: "过劳、空洞的舒适、对表象的依赖。",
    },
  },
  ten: {
    upright: {
      en: "Legacy, generational wealth, settled abundance.",
      zh: "传承、世代的财富、安顿的丰盛。",
    },
    reversed: {
      en: "Family money trouble, broken legacy.",
      zh: "家族财务的麻烦、破碎的传承。",
    },
  },
  page: {
    upright: {
      en: "A studious beginner, practical curiosity, an opportunity.",
      zh: "勤学的初学者、务实的好奇、一个机会。",
    },
    reversed: {
      en: "Procrastination, unrealistic plans, missed lessons.",
      zh: "拖延、不切实际的计划、错失的功课。",
    },
  },
  knight: {
    upright: {
      en: "Steady effort, reliability, finishing what you start.",
      zh: "稳定的努力、可靠、把开始的事做完。",
    },
    reversed: {
      en: "Stagnation, boredom, work without purpose.",
      zh: "停滞、乏味、无目的的劳作。",
    },
  },
  queen: {
    upright: {
      en: "Nurturing abundance, practical care, a fertile home.",
      zh: "滋养的丰盛、务实的关怀、肥沃的家。",
    },
    reversed: {
      en: "Self-neglect, smothering care, work-life imbalance.",
      zh: "自我忽视、令人窒息的关心、工作与生活失衡。",
    },
  },
  king: {
    upright: {
      en: "Prosperous, generous provider, mastery of the material.",
      zh: "繁盛、慷慨的供养者、对物质的掌握。",
    },
    reversed: {
      en: "Greed, materialism, success without joy.",
      zh: "贪婪、物质主义、无喜的成功。",
    },
  },
};

const suitNames: Record<Suit, { en: string; zh: string }> = {
  wands: { en: "Wands", zh: "权杖" },
  cups: { en: "Cups", zh: "圣杯" },
  swords: { en: "Swords", zh: "宝剑" },
  pentacles: { en: "Pentacles", zh: "星币" },
};

const rankNames: Record<string, { en: string; zh: string; num: number }> = {
  ace: { en: "Ace", zh: "首牌", num: 1 },
  two: { en: "Two", zh: "二", num: 2 },
  three: { en: "Three", zh: "三", num: 3 },
  four: { en: "Four", zh: "四", num: 4 },
  five: { en: "Five", zh: "五", num: 5 },
  six: { en: "Six", zh: "六", num: 6 },
  seven: { en: "Seven", zh: "七", num: 7 },
  eight: { en: "Eight", zh: "八", num: 8 },
  nine: { en: "Nine", zh: "九", num: 9 },
  ten: { en: "Ten", zh: "十", num: 10 },
  page: { en: "Page", zh: "侍从", num: 11 },
  knight: { en: "Knight", zh: "骑士", num: 12 },
  queen: { en: "Queen", zh: "皇后", num: 13 },
  king: { en: "King", zh: "国王", num: 14 },
};

function buildMinor(
  suit: Suit,
  meanings: Record<string, MinorMeaning>
): TarotCard[] {
  return Object.entries(meanings).map(([rank, m]) => {
    const r = rankNames[rank];
    const s = suitNames[suit];
    return {
      id: `${rank}-of-${suit}`,
      name: {
        en: `${r.en} of ${s.en}`,
        zh: `${s.zh}${r.zh}`,
      },
      arcana: "minor" as const,
      suit,
      number: r.num,
      upright: m.upright,
      reversed: m.reversed,
    };
  });
}

export const minorArcana: TarotCard[] = [
  ...buildMinor("wands", wands),
  ...buildMinor("cups", cups),
  ...buildMinor("swords", swords),
  ...buildMinor("pentacles", pentacles),
];

export const fullDeck: TarotCard[] = [...majorArcana, ...minorArcana];

export interface DrawnCard {
  card: TarotCard;
  reversed: boolean;
}

export function drawCards(
  source: TarotCard[],
  count: number
): DrawnCard[] {
  const pool = [...source];
  const out: DrawnCard[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    const [card] = pool.splice(idx, 1);
    out.push({ card, reversed: Math.random() < 0.5 });
  }
  return out;
}

export function getName(card: TarotCard, lang: Lang): string {
  return card.name[lang];
}

export function getMeaning(drawn: DrawnCard, lang: Lang): string {
  return drawn.reversed ? drawn.card.reversed[lang] : drawn.card.upright[lang];
}
