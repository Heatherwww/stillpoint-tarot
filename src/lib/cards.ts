// Rider-Waite-Smith deck data. Bilingual (EN + ZH) keywords + meanings.
// 22 Major Arcana + 56 Minor Arcana = 78 cards.

import type { Lang } from "./i18n";

export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Arcana = "major" | "minor";

export interface BilingualText {
  en: string;
  zh: string;
}

export interface BilingualList {
  en: string[];
  zh: string[];
}

export interface TarotCard {
  id: string;
  name: BilingualText;
  arcana: Arcana;
  suit?: Suit;
  number?: number;
  keywords: BilingualList;
  upright: BilingualText;
  reversed: BilingualText;
}

// ---------- Major Arcana ----------
export const majorArcana: TarotCard[] = [
  {
    id: "the-fool",
    name: { en: "The Fool", zh: "愚者" },
    arcana: "major",
    number: 0,
    keywords: {
      en: ["beginnings", "leap", "openness", "innocence"],
      zh: ["开端", "跃起", "敞开", "纯真"],
    },
    upright: {
      en: "A new chapter is opening, and you are being asked to step toward it without all the answers. The Fool trusts that the ground will appear under each foot — courage here is the willingness to begin before you feel ready.",
      zh: "一段新的篇章正在开启，你被邀请走向它，无需先备齐所有答案。愚者相信，每一步落下时，地都会浮现——此处的勇气，是在尚未感到准备好时仍愿启程。",
    },
    reversed: {
      en: "Hesitation has hardened into avoidance, or you are leaping without honoring what is at stake. Slow down enough to feel the difference between wise caution and old fear.",
      zh: "犹豫已僵化为回避，或你在未顾及代价时盲目跃起。放慢脚步，足以分辨明智的谨慎与陈旧的恐惧。",
    },
  },
  {
    id: "the-magician",
    name: { en: "The Magician", zh: "魔术师" },
    arcana: "major",
    number: 1,
    keywords: {
      en: ["will", "manifestation", "focus", "action"],
      zh: ["意志", "显化", "专注", "行动"],
    },
    upright: {
      en: "You already have the elements you need — air, water, fire, earth — and the will to combine them. This is a moment for deliberate action, not waiting for permission.",
      zh: "你已拥有所需的元素——风、水、火、土——以及调和它们的意志。此刻当主动作为，而非等待被允许。",
    },
    reversed: {
      en: "Energy is scattered, or your skills are being used to manipulate rather than create. Return to your first intention and ask whether your means honor your end.",
      zh: "能量分散，或你的才能被用于操控而非创造。回到最初的意愿，问问你的手段是否对得起你的目的。",
    },
  },
  {
    id: "the-high-priestess",
    name: { en: "The High Priestess", zh: "女祭司" },
    arcana: "major",
    number: 2,
    keywords: {
      en: ["intuition", "mystery", "stillness", "knowing"],
      zh: ["直觉", "神秘", "静默", "知晓"],
    },
    upright: {
      en: "There is a knowing inside you that does not need to be argued for. The High Priestess invites silence, dreams, and the long pause before words — let what is hidden surface in its own time.",
      zh: "你内在有一种无需辩护的知晓。女祭司邀你进入静默、梦境，以及落言之前的长长停顿——让被隐藏之物以自己的时序浮现。",
    },
    reversed: {
      en: "You are talking past your own intuition, or someone is keeping a truth from you. Step away from the noise and listen for what only quiet reveals.",
      zh: "你正与自己的直觉擦肩而过，或有人在向你隐瞒真相。退离喧嚣，聆听唯有静默才能揭示之物。",
    },
  },
  {
    id: "the-empress",
    name: { en: "The Empress", zh: "皇后" },
    arcana: "major",
    number: 3,
    keywords: {
      en: ["abundance", "nurture", "creativity", "body"],
      zh: ["丰盛", "滋养", "创造", "身体"],
    },
    upright: {
      en: "Life is asking to flourish — through your hands, your senses, your care. The Empress reminds you that creating well requires being well-fed, in every meaning of the word.",
      zh: "生命正请求绽放——通过你的双手、感官与照料。皇后提醒你，要好好地创造，先要好好地被滋养——以这词的所有意义。",
    },
    reversed: {
      en: "You may be giving from an empty cup, or a creative project feels stuck because you have not tended your own ground. Self-neglect is the block.",
      zh: "你或许正以空杯予人，或一个创造项目因你未照料自身的土壤而停滞。自我忽视即是阻塞。",
    },
  },
  {
    id: "the-emperor",
    name: { en: "The Emperor", zh: "皇帝" },
    arcana: "major",
    number: 4,
    keywords: {
      en: ["structure", "order", "authority", "stability"],
      zh: ["结构", "秩序", "权威", "稳定"],
    },
    upright: {
      en: "A clear framework is what this moment needs — boundaries, rules, the shape of a plan. You are being asked to provide the steady center others can lean on.",
      zh: "此刻所需的是清晰的框架——界限、规则、计划的轮廓。你被请求成为他人可以倚靠的稳定中心。",
    },
    reversed: {
      en: "Order has hardened into control, or someone in authority is overreaching. Question whether the rules still serve life, or only themselves.",
      zh: "秩序已僵化为控制，或当权之人正越界。问问那些规则是否仍服务于生命，抑或只服务于自身。",
    },
  },
  {
    id: "the-hierophant",
    name: { en: "The Hierophant", zh: "教皇" },
    arcana: "major",
    number: 5,
    keywords: {
      en: ["tradition", "teaching", "lineage", "belonging"],
      zh: ["传统", "教导", "传承", "归属"],
    },
    upright: {
      en: "Look toward what has been carried forward — a teacher, a tradition, a community of people who walked this path before you. There is wisdom in not having to invent everything yourself.",
      zh: "望向那些被代代传递之物——一位老师、一个传统、一群曾走过此路的人。不必凡事自创，亦是一种智慧。",
    },
    reversed: {
      en: "Inherited rules no longer fit. It may be time to leave the institution, the inherited belief, the role you were handed — and walk your own path.",
      zh: "承袭的规则已不再合身。或许是时候离开那制度、那承袭的信念、那被递来的角色——走自己的路。",
    },
  },
  {
    id: "the-lovers",
    name: { en: "The Lovers", zh: "恋人" },
    arcana: "major",
    number: 6,
    keywords: {
      en: ["union", "choice", "harmony", "alignment"],
      zh: ["结合", "选择", "和谐", "对齐"],
    },
    upright: {
      en: "A meaningful connection — to a person, a path, a calling — is asking for your full yes. The Lovers is also a card of choice: align your actions with what your heart actually wants.",
      zh: "一段有意义的连接——与一个人、一条路、一种召唤——正请求你完整的应允。恋人亦是选择之牌：让你的行动与内心真正所欲对齐。",
    },
    reversed: {
      en: "Something is out of alignment — between people, or between your choices and your values. The crack is showing; pretending will not heal it.",
      zh: "有什么东西失了对齐——在人与人之间，或在你的选择与价值之间。裂缝已显，佯装不会让它愈合。",
    },
  },
  {
    id: "the-chariot",
    name: { en: "The Chariot", zh: "战车" },
    arcana: "major",
    number: 7,
    keywords: {
      en: ["will", "victory", "momentum", "focus"],
      zh: ["意志", "胜利", "势能", "专注"],
    },
    upright: {
      en: "Two opposing forces inside you can be yoked together if you hold the reins steady. Focused will moves you forward — this is a card of victory earned through discipline.",
      zh: "你内在两股相反的力量，若你稳握缰绳，便可并驾齐驱。专注的意志推你向前——这是凭自律所得的胜利之牌。",
    },
    reversed: {
      en: "You are trying to drive in two directions at once, or pushing through when the wise move is to pause. Aggression is not the same as progress.",
      zh: "你正试图同时驶向两个方向，或在该停下时强行前行。攻势并不等于进展。",
    },
  },
  {
    id: "strength",
    name: { en: "Strength", zh: "力量" },
    arcana: "major",
    number: 8,
    keywords: {
      en: ["courage", "compassion", "patience", "mastery"],
      zh: ["勇气", "慈悲", "耐心", "掌握"],
    },
    upright: {
      en: "Real strength is the gentle hand that quiets the lion — yours to your own fear, your own anger. You meet difficulty with steadiness, not force.",
      zh: "真正的力量是抚平狮子的那只温和之手——你抚平自己的恐惧与愤怒。你以从容而非强力面对艰难。",
    },
    reversed: {
      en: "Courage has dimmed; you are biting back what wants to be felt, or pushing too hard against something that needs softness.",
      zh: "勇气已黯，你正咽下本想被感受之物，或在该温柔之处过于用力。",
    },
  },
  {
    id: "the-hermit",
    name: { en: "The Hermit", zh: "隐士" },
    arcana: "major",
    number: 9,
    keywords: {
      en: ["solitude", "search", "wisdom", "lamp"],
      zh: ["独处", "寻索", "智慧", "灯"],
    },
    upright: {
      en: "Step away from the crowd and carry your lamp inward. The Hermit's wisdom is gathered in solitude — and offered, in time, to those who come asking.",
      zh: "离开人群，把灯举向心内。隐士的智慧采于独处——并在时机成熟时，献给前来求问之人。",
    },
    reversed: {
      en: "Solitude has tipped into isolation, or you are refusing to look at what is inside. Reach for one trusted person.",
      zh: "独处已倾向孤立，或你拒绝直视内心之物。向一位你信任的人伸出手。",
    },
  },
  {
    id: "wheel-of-fortune",
    name: { en: "Wheel of Fortune", zh: "命运之轮" },
    arcana: "major",
    number: 10,
    keywords: {
      en: ["cycle", "change", "fate", "turning"],
      zh: ["循环", "变化", "命运", "转动"],
    },
    upright: {
      en: "A door swings open. Cycles you cannot control are turning in your favor — meet the change with open hands rather than gripping the old shape.",
      zh: "一道门正荡开。你无法掌控的循环正向你倾斜——以张开的手迎接变化，而非紧握旧的形状。",
    },
    reversed: {
      en: "The wheel turns down. This is a hard chapter, but it is a chapter — not the whole story. What goes down also comes up.",
      zh: "轮子转向低处。这是一个艰难的章节，但只是章节，并非全部故事。下行之物亦会上升。",
    },
  },
  {
    id: "justice",
    name: { en: "Justice", zh: "正义" },
    arcana: "major",
    number: 11,
    keywords: {
      en: ["truth", "fairness", "accountability", "balance"],
      zh: ["真相", "公正", "责任", "平衡"],
    },
    upright: {
      en: "Cause and effect are surfacing. Tell the truth — to others and to yourself — and the situation will resolve along just lines.",
      zh: "因果正在浮现。说出真相——对他人也对自己——事情将沿着公正的轨迹归位。",
    },
    reversed: {
      en: "Something is being avoided: a hard conversation, a debt owed, a truth ducked. The longer it waits, the heavier it grows.",
      zh: "有什么正被回避：一场艰难的谈话、一笔未还的债、一句被绕过的真话。它等得越久，就越沉重。",
    },
  },
  {
    id: "the-hanged-man",
    name: { en: "The Hanged Man", zh: "倒吊人" },
    arcana: "major",
    number: 12,
    keywords: {
      en: ["surrender", "perspective", "pause", "reframe"],
      zh: ["臣服", "视角", "暂停", "重构"],
    },
    upright: {
      en: "The way forward is to stop pushing. Hang in the pause; let your usual angle of vision dissolve. A new perspective will arrive on its own.",
      zh: "前路在于停止推挤。在暂停中悬吊；让你惯常的视角溶解。新的视角会自行到来。",
    },
    reversed: {
      en: "You are stalling, or martyring yourself in a situation you could change. The pause has become avoidance.",
      zh: "你在拖延，或在一个本可改变的情境中自我牺牲。暂停已变为回避。",
    },
  },
  {
    id: "death",
    name: { en: "Death", zh: "死神" },
    arcana: "major",
    number: 13,
    keywords: {
      en: ["ending", "transformation", "release", "threshold"],
      zh: ["终结", "转化", "放下", "门槛"],
    },
    upright: {
      en: "Something is ready to end so something else can be born. Death is rarely literal — it is the necessary letting-go that clears the ground for new life.",
      zh: "有什么东西已准备结束，好让别的得以诞生。死神鲜少是字面意义——它是必要的放下，为新生命腾出土壤。",
    },
    reversed: {
      en: "You are holding on to what is already over. The longer you cling, the more painful the eventual release.",
      zh: "你正紧握已经结束之物。你抓得越久，最终的放手就越痛。",
    },
  },
  {
    id: "temperance",
    name: { en: "Temperance", zh: "节制" },
    arcana: "major",
    number: 14,
    keywords: {
      en: ["balance", "blending", "patience", "moderation"],
      zh: ["平衡", "调和", "耐心", "节制"],
    },
    upright: {
      en: "Mix things in right proportion: rest with effort, head with heart, give with receive. Temperance is the slow, careful art of the right amount.",
      zh: "以恰当的比例调和：休息与努力、头脑与心、给予与接受。节制是恰到好处的、缓慢而审慎的艺术。",
    },
    reversed: {
      en: "Excess somewhere, or impatience trying to rush a process that has its own time. Step back and find the middle.",
      zh: "某处过度，或急躁正在催赶一个有其自身节奏的过程。退一步，回到中道。",
    },
  },
  {
    id: "the-devil",
    name: { en: "The Devil", zh: "恶魔" },
    arcana: "major",
    number: 15,
    keywords: {
      en: ["attachment", "shadow", "chains", "addiction"],
      zh: ["执着", "阴影", "锁链", "瘾"],
    },
    upright: {
      en: "Look at what you are bound to — a habit, a relationship, a story you tell yourself — and notice the chains are loose. The Devil shows the shape of your own attachment.",
      zh: "看看你所被缚之物——一个习惯、一段关系、一个你对自己讲述的故事——你会发现锁链其实是松的。恶魔显示出你执着的形状。",
    },
    reversed: {
      en: "You are beginning to see the chain and reach for the latch. Release is possible now.",
      zh: "你开始看见锁链，也开始去摸那扣环。释放此刻是可能的。",
    },
  },
  {
    id: "the-tower",
    name: { en: "The Tower", zh: "高塔" },
    arcana: "major",
    number: 16,
    keywords: {
      en: ["upheaval", "collapse", "revelation", "sudden"],
      zh: ["剧变", "崩塌", "揭示", "骤然"],
    },
    upright: {
      en: "A structure built on something untrue is coming down — suddenly, painfully, but clean. What survives the lightning is what was real.",
      zh: "一个建立在不实之物上的结构正在坍塌——骤然、痛苦，但干净。雷电之后留下的，便是真实之物。",
    },
    reversed: {
      en: "You are postponing the inevitable, or the collapse is happening internally where no one can see. Do not white-knuckle a falling structure.",
      zh: "你在推迟无可避免之事，或那崩塌正发生于内里，无人能见。不要紧握一个正在倾倒的结构。",
    },
  },
  {
    id: "the-star",
    name: { en: "The Star", zh: "星星" },
    arcana: "major",
    number: 17,
    keywords: {
      en: ["hope", "renewal", "faith", "gentleness"],
      zh: ["希望", "更新", "信念", "温柔"],
    },
    upright: {
      en: "After the storm, the clear sky returns. Pour out what was held, drink what is offered, and trust the quiet. Healing has begun.",
      zh: "风暴过后，澄澈的夜空回归。倾出曾紧握之物，啜饮所得之水，信任这份静谧。疗愈已经开始。",
    },
    reversed: {
      en: "Faith is dim; you are looking for hope in places that cannot give it. Return to the simplest sources of light.",
      zh: "信念黯淡，你在无法给出希望之处寻找希望。回到最简单的光源。",
    },
  },
  {
    id: "the-moon",
    name: { en: "The Moon", zh: "月亮" },
    arcana: "major",
    number: 18,
    keywords: {
      en: ["dream", "illusion", "intuition", "fear"],
      zh: ["梦", "幻", "直觉", "恐惧"],
    },
    upright: {
      en: "Things are not quite what they seem. The Moon asks you to walk by feel and dream — to honor the parts of life that resist clear daylight.",
      zh: "事物并非表面所见。月亮请你凭感觉与梦境前行——尊重生命中那些抗拒清晰白昼的部分。",
    },
    reversed: {
      en: "Truth is surfacing. The fog is lifting and what you suspected is being confirmed.",
      zh: "真相正在浮现。雾在散去，你所怀疑的正被证实。",
    },
  },
  {
    id: "the-sun",
    name: { en: "The Sun", zh: "太阳" },
    arcana: "major",
    number: 19,
    keywords: {
      en: ["joy", "vitality", "clarity", "success"],
      zh: ["喜悦", "生命力", "清明", "成功"],
    },
    upright: {
      en: "A simple, generous joy. The Sun blesses what you are doing — your effort is seen, your warmth is felt, your good is real.",
      zh: "一种简单而慷慨的喜悦。太阳祝福你所做之事——你的努力被看见，你的温暖被感受到，你的善是真实的。",
    },
    reversed: {
      en: "A passing cloud rather than a long winter. Joy is delayed, not denied.",
      zh: "一片掠过的云，而非漫长的冬。喜悦被延迟，而非被否定。",
    },
  },
  {
    id: "judgement",
    name: { en: "Judgement", zh: "审判" },
    arcana: "major",
    number: 20,
    keywords: {
      en: ["awakening", "calling", "reckoning", "rebirth"],
      zh: ["觉醒", "召唤", "清算", "重生"],
    },
    upright: {
      en: "A trumpet sounds — something inside you is being called to a larger life. Honest self-assessment now leads to rebirth.",
      zh: "号角响起——你内在有什么正被召唤进入更宽阔的生命。此刻诚实的自省，引向重生。",
    },
    reversed: {
      en: "You hear the call but turn away, or your inner critic has become merciless. Distinguish between the call and the judgment.",
      zh: "你听见召唤却转身，或内在的评判者已变得无情。分辨召唤与审判的不同。",
    },
  },
  {
    id: "the-world",
    name: { en: "The World", zh: "世界" },
    arcana: "major",
    number: 21,
    keywords: {
      en: ["completion", "wholeness", "integration", "arrival"],
      zh: ["圆满", "完整", "整合", "抵达"],
    },
    upright: {
      en: "A long chapter is closing well. You have grown into something whole — let yourself feel the satisfaction of arrival before the next journey.",
      zh: "一段漫长的章节正在善终。你已成长为完整之物——在下一段旅程之前，让自己感受抵达的满足。",
    },
    reversed: {
      en: "You are at the threshold but hesitating to cross. Loose ends remain — gather them, then step through.",
      zh: "你已在门槛前却迟迟不踏过。仍有未尽之事——收拢它们，然后跨过去。",
    },
  },
];

// ---------- Minor Arcana ----------
// Suit themes: wands=action/will/fire, cups=feeling/water,
// swords=mind/air, pentacles=body/material/earth.

interface MinorMeaning {
  keywords: BilingualList;
  upright: BilingualText;
  reversed: BilingualText;
}

const wands: Record<string, MinorMeaning> = {
  ace: {
    keywords: { en: ["spark", "inspiration", "impulse", "ignition"], zh: ["火花", "灵感", "冲动", "点燃"] },
    upright: { en: "A spark. Inspiration arrives, and with it the impulse to make something. Trust the heat — and act before the moment cools.", zh: "一束火花。灵感降临，伴随着创造的冲动。信任那份热度——在它冷却之前行动。" },
    reversed: { en: "The spark is delayed or distracted. What had energy yesterday feels flat — wait for the next true wind.", zh: "火花被延迟或分散。昨日尚有能量之物今日感到平淡——等待下一阵真正的风。" },
  },
  two: {
    keywords: { en: ["planning", "horizon", "choice", "vision"], zh: ["规划", "远景", "选择", "视野"] },
    upright: { en: "You stand on the wall and look out. The plan is forming; the world is wider than you thought. Choose your direction with care.", zh: "你站在城墙上向外眺望。计划正在成形；世界比你以为的更广。审慎地选择你的方向。" },
    reversed: { en: "Indecision, or fear of the long view. The world feels too big; you retreat into a safer, smaller question.", zh: "优柔，或对宏大视野的恐惧。世界感觉太大；你退回更安全、更窄的问题。" },
  },
  three: {
    keywords: { en: ["expansion", "anticipation", "first results", "watching"], zh: ["扩展", "期待", "初成果", "守望"] },
    upright: { en: "First ships are returning. Initial efforts are bearing fruit — keep watch, but trust that what you sent out is coming back.", zh: "最初的船正在归来。初步的努力开始结出果实——保持守望，但信任你送出之物正在归还。" },
    reversed: { en: "Ships delayed; an expansion stalls. Patience is asked, or the plan needs revision.", zh: "船被延迟；扩展停滞。被请求耐心，或计划需要修正。" },
  },
  four: {
    keywords: { en: ["celebration", "homecoming", "stable joy", "community"], zh: ["庆祝", "归家", "稳定喜悦", "社群"] },
    upright: { en: "Coming home to celebrate. A stable, joyful chapter — relationships and community are sources of warmth right now.", zh: "归家庆祝。一个稳定、欢愉的章节——眼下，关系与社群是温暖的来源。" },
    reversed: { en: "Home feels strained, or a celebration is postponed. Tend the foundation.", zh: "家中紧张，或一场庆祝被推迟。照看根基。" },
  },
  five: {
    keywords: { en: ["friction", "competition", "play", "growth"], zh: ["摩擦", "竞争", "较量", "成长"] },
    upright: { en: "Friction, lively conflict, the rough play of differing wills. This is competitive but not destructive — growth often happens here.", zh: "摩擦、活跃的冲突、不同意志的粗砺较量。这是竞争性的而非破坏性的——成长常发生在此。" },
    reversed: { en: "Avoiding the conflict, or it has turned bitter. Either name the issue or step back.", zh: "在回避冲突，或它已转为苦涩。要么说出问题，要么退开。" },
  },
  six: {
    keywords: { en: ["recognition", "victory", "praise", "return"], zh: ["认可", "胜利", "赞誉", "归还"] },
    upright: { en: "Riding home in triumph. Recognition arrives publicly — accept the laurel without losing your footing.", zh: "凯旋归来。认可公开降临——接受桂冠而不失立足。" },
    reversed: { en: "Empty victory, or the praise is inflating you. Notice who is missing from the parade.", zh: "空洞的胜利，或赞美正使你膨胀。留意游行中缺席之人。" },
  },
  seven: {
    keywords: { en: ["defense", "high ground", "resolve", "stand"], zh: ["防守", "高地", "决心", "坚守"] },
    upright: { en: "Standing your ground. Others challenge what you have built; defend it firmly but without panic. The high ground is yours.", zh: "坚守你的立场。他人挑战你所建之物；坚定地捍卫，但不必慌乱。高地是你的。" },
    reversed: { en: "Overwhelmed by challengers; ready to give up the ground. Reinforcements may be closer than you think.", zh: "被挑战者压倒，准备放弃高地。援军或许比你想的更近。" },
  },
  eight: {
    keywords: { en: ["movement", "messages", "speed", "momentum"], zh: ["流动", "讯息", "迅捷", "势能"] },
    upright: { en: "Things are in motion — messages flying, news arriving, momentum gathering. Move with the current.", zh: "事物在飞动——讯息穿梭，消息到达，势能聚集。顺流而行。" },
    reversed: { en: "Delays, miscommunication, plans stuck mid-flight. Pause and recheck.", zh: "延迟、误读、计划悬而未决。暂停并重新检查。" },
  },
  nine: {
    keywords: { en: ["resilience", "last stand", "weariness", "vigilance"], zh: ["韧性", "最后的坚守", "疲惫", "警戒"] },
    upright: { en: "Weary but standing. You have been in this struggle a long time — one more round, and then you can rest.", zh: "疲惫却仍立着。你已在这挣扎中很久——再撑一回合，然后可以休息。" },
    reversed: { en: "Walls too high. Burnout has made you suspicious of allies. Lower the guard one inch.", zh: "墙筑得太高。倦怠让你对盟友也生疑。把戒备放下一寸。" },
  },
  ten: {
    keywords: { en: ["burden", "overload", "responsibility", "carrying"], zh: ["重担", "超载", "责任", "承载"] },
    upright: { en: "Carrying too much. The load is no longer sustainable; it is time to set some of it down.", zh: "承载过多。负担已不可持续；是时候放下一些。" },
    reversed: { en: "Putting it down. Relief, delegation, the right things falling away.", zh: "放下了。解脱、分担、不当之物自然脱落。" },
  },
  page: {
    keywords: { en: ["enthusiasm", "fresh idea", "messenger", "beginning"], zh: ["热情", "新念", "信使", "开端"] },
    upright: { en: "An eager messenger of fire. Fresh ideas, beginner's enthusiasm, a project at its start.", zh: "一位急切的火焰信使。新鲜的想法、初学者的热情、一个刚启程的项目。" },
    reversed: { en: "Restless, scattered, immature. The fire is real but undirected.", zh: "不安、散乱、未成熟。火是真实的，但无方向。" },
  },
  knight: {
    keywords: { en: ["adventure", "boldness", "charge", "speed"], zh: ["冒险", "大胆", "冲锋", "迅捷"] },
    upright: { en: "Bold action, cavalry charging. Adventurous spirit moving fast — exhilarating, possibly reckless.", zh: "大胆的行动，骑兵冲锋。冒险的精神在疾驰——令人振奋，亦或鲁莽。" },
    reversed: { en: "Reckless, leaping without looking, burnout from the gallop.", zh: "鲁莽、跃出无视前路、因疾驰而倦怠。" },
  },
  queen: {
    keywords: { en: ["confidence", "warmth", "magnetism", "generosity"], zh: ["自信", "温暖", "魅力", "慷慨"] },
    upright: { en: "Confident, magnetic, warm in your power. People gather around your fire because it is generous.", zh: "自信、有吸引力、在你的力量中保持温暖。人们围聚于你的火，因为它是慷慨的。" },
    reversed: { en: "Jealous, scattered, the warmth turning to scorch. Tend your inner fire before sharing it.", zh: "嫉妒、分散、温暖转为灼烧。先照看内在之火，再去共享。" },
  },
  king: {
    keywords: { en: ["vision", "leadership", "principle", "charisma"], zh: ["远见", "领导力", "原则", "魅力"] },
    upright: { en: "Visionary leader, principled action. Charisma in service of something larger than yourself.", zh: "有远见的领袖，有原则的行动。魅力服务于比自身更大之事。" },
    reversed: { en: "Tyranny, hot temper, leadership turned to ego.", zh: "专横、火爆的脾气、领导沦为自我。" },
  },
};

const cups: Record<string, MinorMeaning> = {
  ace: {
    keywords: { en: ["new feeling", "love", "overflow", "opening"], zh: ["新感受", "爱", "满溢", "开启"] },
    upright: { en: "A new feeling, opening like a flower. Love, creativity, intuition — the cup overflows.", zh: "一种新的感受，如花朵般绽开。爱、创造、直觉——杯满而溢。" },
    reversed: { en: "Feeling blocked, or love withheld. The cup is there but you have closed your hand.", zh: "感受被阻塞，或爱被收回。杯子在那里，但你已合上手掌。" },
  },
  two: {
    keywords: { en: ["partnership", "connection", "mutuality", "respect"], zh: ["伴侣", "连接", "相互", "尊重"] },
    upright: { en: "Two beings raise their cups in mutual recognition. A connection deepens — friendship, partnership, romance.", zh: "两位相互举杯。一段连接在深化——友谊、伙伴关系、爱情。" },
    reversed: { en: "Imbalance in the connection; one gives more than the other. A misunderstanding is forming.", zh: "连接中的失衡；一方给予多于另一方。一场误解正在形成。" },
  },
  three: {
    keywords: { en: ["friendship", "celebration", "community", "joy"], zh: ["友谊", "庆祝", "群体", "喜悦"] },
    upright: { en: "Three friends raise their cups in joy. Community, celebration, the support of people you love.", zh: "三位好友举杯欢庆。社群、庆祝、所爱之人的支持。" },
    reversed: { en: "Gossip, exclusion, a third party causing trouble. Joy isolated from others.", zh: "闲言、被排斥、第三方制造麻烦。喜悦被孤立。" },
  },
  four: {
    keywords: { en: ["apathy", "withdrawal", "overlooking", "gift"], zh: ["冷漠", "退缩", "忽略", "礼物"] },
    upright: { en: "Sitting under a tree with three cups before you, a fourth offered by an unseen hand — and you do not see it. Tend your apathy.", zh: "你坐在树下，前有三杯，第四杯由看不见的手伸出——而你视而不见。照看你的冷漠。" },
    reversed: { en: "Reawakening. You look up and accept what is offered.", zh: "重新觉醒。你抬眼，接纳所给予之物。" },
  },
  five: {
    keywords: { en: ["grief", "loss", "narrow sight", "mourning"], zh: ["悲伤", "失去", "窄视", "哀悼"] },
    upright: { en: "Three cups spilled, two still standing — and you stare only at the spilled. Grief has narrowed your sight.", zh: "三只杯倾倒，两只仍立着——你只盯着倒下的。悲伤窄化了你的目光。" },
    reversed: { en: "Looking up at what remains. Healing begins by seeing what was not lost.", zh: "抬眼看仍存之物。疗愈始于看见未失之物。" },
  },
  six: {
    keywords: { en: ["nostalgia", "innocence", "memory", "reconnection"], zh: ["怀旧", "纯真", "记忆", "重连"] },
    upright: { en: "A child offers another child a cup of flowers. Nostalgia, innocent gifts, reconnecting with the past.", zh: "一个孩子递给另一个孩子一杯花。怀旧、纯真的礼物、与过去的重新连接。" },
    reversed: { en: "Stuck in the past, or rose-tinted memory hiding what was hard.", zh: "停滞于过去，或玫瑰色的记忆遮盖了艰难。" },
  },
  seven: {
    keywords: { en: ["choice", "fantasy", "illusion", "possibility"], zh: ["选择", "幻想", "幻象", "可能"] },
    upright: { en: "Seven cups filled with visions — wealth, love, adventure, monsters. Many possibilities, only one of which is real. Choose carefully.", zh: "七只杯盛满异象——财富、爱、冒险、怪物。许多可能，仅一者为真。审慎选择。" },
    reversed: { en: "Clarity returning. The fog of fantasy lifts and you choose.", zh: "清明回归。幻想的雾散去，你做出选择。" },
  },
  eight: {
    keywords: { en: ["walking away", "leaving", "deeper search", "departure"], zh: ["离开", "出走", "更深的寻", "出发"] },
    upright: { en: "Walking away from eight cups, into the night, toward the mountains. Leaving what no longer feeds you.", zh: "离开八只杯，走入夜色，朝向群山。离开不再滋养你之物。" },
    reversed: { en: "Hesitating to leave. Returning to a closed chapter, hoping it will open again.", zh: "迟迟不愿离开。重返已合上的篇章，盼它再次开启。" },
  },
  nine: {
    keywords: { en: ["contentment", "wish", "satisfaction", "ease"], zh: ["知足", "愿望", "满足", "安逸"] },
    upright: { en: "A wish granted. Contentment, the simple pleasures of a good day, the inner smile of having enough.", zh: "心愿成就。知足，美好一天的简单愉悦，足够的内在微笑。" },
    reversed: { en: "The wrong wish granted, or smugness covering hollowness. Check what you actually wanted.", zh: "错的心愿被实现，或自得遮掩空洞。检查你真正所欲为何。" },
  },
  ten: {
    keywords: { en: ["family", "lasting joy", "home", "belonging"], zh: ["家人", "长久喜悦", "家", "归属"] },
    upright: { en: "A rainbow of cups over a happy family. Lasting joy, home, the deep contentment of belonging.", zh: "一道杯子的彩虹悬于幸福家庭之上。长久的喜悦、家、归属的深度满足。" },
    reversed: { en: "Strain at home, idealized family hiding real disconnection.", zh: "家中紧张，被理想化的家庭遮盖真实的疏离。" },
  },
  page: {
    keywords: { en: ["imagination", "tenderness", "message", "wonder"], zh: ["想象", "温柔", "讯息", "惊奇"] },
    upright: { en: "A young messenger holding a cup with a fish leaping inside. Imagination, tenderness, an emotional message.", zh: "一位年少的信使举着杯，鱼自其中跃出。想象力、温柔、一封情感的讯息。" },
    reversed: { en: "Emotional immaturity, blocked imagination.", zh: "情感不成熟、想象力受阻。" },
  },
  knight: {
    keywords: { en: ["romance", "offer", "poetic action", "heart"], zh: ["浪漫", "提议", "诗意行动", "心"] },
    upright: { en: "A romantic offer, following the heart, action led by feeling. Poetic, sometimes impractical.", zh: "一份浪漫的提议，追随内心，由感受引领的行动。诗意，有时不切实际。" },
    reversed: { en: "Moodiness, broken promise, charm without depth.", zh: "情绪化、被打破的承诺、徒有魅力而无深度。" },
  },
  queen: {
    keywords: { en: ["empathy", "intuition", "holding space", "care"], zh: ["共情", "直觉", "留空", "关怀"] },
    upright: { en: "Empathic, intuitive, holding space for others' feelings without losing your own.", zh: "共情、直觉敏锐，能为他人的感受留出空间，而不失自己的。" },
    reversed: { en: "Emotional overwhelm, codependence, drowning in others' tides.", zh: "情绪不堪、共依赖、淹没于他人的潮水。" },
  },
  king: {
    keywords: { en: ["steadiness", "wise counsel", "calm", "depth"], zh: ["稳定", "睿智之言", "从容", "深度"] },
    upright: { en: "Emotionally steady, wise counsel, calm in storms. The heart that has been through it and learned to hold.", zh: "情绪稳定、睿智的忠告、风暴中的从容。心走过一切，学会承载。" },
    reversed: { en: "Suppressed feelings, hidden moodiness, manipulation under a calm mask.", zh: "压抑的情感、隐藏的情绪起伏、平静面具下的操控。" },
  },
};

const swords: Record<string, MinorMeaning> = {
  ace: {
    keywords: { en: ["clarity", "truth", "decision", "cut"], zh: ["清明", "真相", "决定", "切割"] },
    upright: { en: "A clear thought cuts through. A truth named, a decision finally made — the sword is double-edged, so name it well.", zh: "一念清明，破开迷雾。真相被说出，决定终被做出——剑是双刃，故须好好命名。" },
    reversed: { en: "Confusion, sharp words misused, mental fog clouding the cut.", zh: "混乱、尖语错用、心智之雾遮蔽了利刃。" },
  },
  two: {
    keywords: { en: ["stalemate", "blindfold", "balance", "avoidance"], zh: ["僵局", "蒙眼", "平衡", "回避"] },
    upright: { en: "Blindfolded, balancing two swords. A decision avoided by refusing to look.", zh: "蒙眼，平衡两柄剑。一个被回避的决定，因你拒绝看。" },
    reversed: { en: "The blindfold lifts. Information arrives, the choice is finally made.", zh: "蒙眼之布被掀起。信息抵达，选择终被做出。" },
  },
  three: {
    keywords: { en: ["heartbreak", "painful truth", "necessary cut", "rain"], zh: ["心碎", "痛真", "必要的切割", "雨"] },
    upright: { en: "A heart pierced by three swords under rain. Heartbreak, painful truth, the necessary cut.", zh: "一颗心在雨中被三剑所刺。心碎、痛的真相、必要的切割。" },
    reversed: { en: "Healing begins. The grief is being released; forgiveness is possible.", zh: "疗愈开始。悲伤正在释放；原谅是可能的。" },
  },
  four: {
    keywords: { en: ["rest", "recovery", "stillness", "retreat"], zh: ["休憩", "恢复", "静默", "退隐"] },
    upright: { en: "Lying down in stillness, three swords above and one beneath. Rest, recovery, the mind needing quiet.", zh: "静卧，三剑在上，一剑在下。休憩、恢复、心智需要安静。" },
    reversed: { en: "Restlessness, returning to the fray too soon. Honor the rest.", zh: "焦躁，过早重返争斗。尊重休息。" },
  },
  five: {
    keywords: { en: ["hollow win", "conflict", "cost", "loss"], zh: ["空洞胜利", "冲突", "代价", "失"] },
    upright: { en: "A hollow victory; you took the swords but lost the friends. Conflict that costs more than it gives.", zh: "空洞的胜利；你赢得了剑，却失去了朋友。得不偿失的冲突。" },
    reversed: { en: "Reconciliation, lowering the blade, walking away from the old quarrel.", zh: "和解，垂下剑刃，离开旧争执。" },
  },
  six: {
    keywords: { en: ["transition", "moving on", "calmer waters", "passage"], zh: ["过渡", "前行", "更平静的水", "穿越"] },
    upright: { en: "Crossing dark water toward calmer shores. A transition — necessary, sad, hopeful.", zh: "渡过黑水，朝向更平静的岸。一段过渡——必要的、悲伤的、有希望的。" },
    reversed: { en: "Stuck mid-water, unable to leave. Baggage too heavy.", zh: "困于水中，无法离开。包袱过重。" },
  },
  seven: {
    keywords: { en: ["cunning", "strategy", "stealth", "selectivity"], zh: ["机巧", "策略", "潜行", "取舍"] },
    upright: { en: "Sneaking away with five swords, leaving two behind. Cunning, strategy, taking only what you can carry.", zh: "偷偷带着五柄剑离开，留下两柄。机巧、策略、只取你能带走的。" },
    reversed: { en: "Caught, or returning what was taken. Confession brings relief.", zh: "被发现，或归还所取之物。坦白带来解脱。" },
  },
  eight: {
    keywords: { en: ["self-imposed cage", "perceived trap", "bound", "blind"], zh: ["自设之笼", "假想的困", "被缚", "盲"] },
    upright: { en: "Bound and blindfolded among eight swords — but the bonds are loose and the path is open. The cage is in your mind.", zh: "被缚被蒙，立于八剑之间——但绳是松的，路是开的。笼子在你心中。" },
    reversed: { en: "The blindfold falls. You see the way out and take it.", zh: "蒙眼之布坠落。你看见出路并迈出。" },
  },
  nine: {
    keywords: { en: ["anxiety", "sleeplessness", "fear", "night"], zh: ["焦虑", "失眠", "恐惧", "夜"] },
    upright: { en: "Sitting up in the dark with hands over your face, nine swords on the wall. Anxiety, sleeplessness, fear amplified by night.", zh: "在黑暗中坐起，双手掩面，九剑悬于墙。焦虑、不眠、被夜放大的恐惧。" },
    reversed: { en: "Despair lifting. The morning is coming; share the burden.", zh: "绝望散去。清晨将至；与人分担。" },
  },
  ten: {
    keywords: { en: ["rock bottom", "ending", "the worst is over", "release"], zh: ["谷底", "结束", "最坏已过", "释放"] },
    upright: { en: "Face down with ten swords in the back. The worst has happened — and is now over.", zh: "面朝下，十剑插背。最坏已发生——也已过去。" },
    reversed: { en: "Slow recovery. Lessons gathered, getting up at last.", zh: "缓慢恢复。功课已积聚，终于起身。" },
  },
  page: {
    keywords: { en: ["curiosity", "vigilance", "questioning", "wind"], zh: ["好奇", "警觉", "发问", "风"] },
    upright: { en: "A young figure on a hilltop, sword raised, watching the wind. Curiosity, sharp questions, vigilance.", zh: "一位年少的身影立于山顶，举剑，观风。好奇、尖锐的发问、警觉。" },
    reversed: { en: "Gossip, careless words, scattered thinking.", zh: "闲言、不慎之言、思维散乱。" },
  },
  knight: {
    keywords: { en: ["charge", "directness", "swift argument", "intellect"], zh: ["冲锋", "直接", "迅捷辩论", "智识"] },
    upright: { en: "Charging forward at full speed, blade extended. Direct action, swift argument, intellect on the move.", zh: "全速冲锋，剑前伸。直接的行动、迅捷的辩论、行进中的智识。" },
    reversed: { en: "Reckless speech, impulsive cruelty, action without thought.", zh: "鲁莽之言、冲动的残酷、不假思索的行动。" },
  },
  queen: {
    keywords: { en: ["independence", "clear sight", "earned wisdom", "discernment"], zh: ["独立", "明视", "经验智慧", "辨识"] },
    upright: { en: "Independent, clear-eyed, judgment earned through experience. The wisdom of someone who has seen sorrow and learned from it.", zh: "独立、目光清明，由经验所得的判断。一个见过忧伤并从中学习之人的智慧。" },
    reversed: { en: "Coldness, harsh tongue, isolation by sharpness.", zh: "冷漠、严苛之舌、因锋利而孤立。" },
  },
  king: {
    keywords: { en: ["reason", "fair judgment", "integrity", "decision"], zh: ["理智", "公正之判", "正直", "决断"] },
    upright: { en: "Authority through reason, fair judgment, integrity. The mind that decides cleanly and follows through.", zh: "因理智而立的权威、公正的判断、正直。一个清晰决断并贯彻到底的心智。" },
    reversed: { en: "Cold control, manipulation, intellect without heart.", zh: "冰冷的控制、操控、无心之智。" },
  },
};

const pentacles: Record<string, MinorMeaning> = {
  ace: {
    keywords: { en: ["opportunity", "seed", "offering", "ground"], zh: ["机会", "种子", "赠礼", "土"] },
    upright: { en: "A coin in an open hand. A new opportunity — material, practical, real. A seed in good soil.", zh: "张开的手中一枚金币。一个新机会——物质的、务实的、真实的。播在好土里的种子。" },
    reversed: { en: "Missed chance, financial worry, scarcity thinking.", zh: "错失的机会、财务忧虑、匮乏思维。" },
  },
  two: {
    keywords: { en: ["juggling", "adaptation", "flow", "balance"], zh: ["权衡", "顺应", "流", "平衡"] },
    upright: { en: "Juggling two coins in the rhythm of the waves. Adapting to flow, balance in motion.", zh: "在浪涛的节奏中抛接两枚金币。顺势而变，动中的平衡。" },
    reversed: { en: "Overwhelm, dropping the ball, poor priorities.", zh: "不堪重负、失手坠落、优先次序失当。" },
  },
  three: {
    keywords: { en: ["collaboration", "craft", "apprenticeship", "skill"], zh: ["协作", "技艺", "学徒", "技能"] },
    upright: { en: "A craftsperson and two patrons in a cathedral. Collaboration, craft, learning by doing well together.", zh: "一位工匠与两位赞助者在大教堂中。协作、技艺、在共做中学习。" },
    reversed: { en: "Disjointed teamwork, sloppy work, lack of recognition.", zh: "脱节的合作、潦草的工作、缺乏认可。" },
  },
  four: {
    keywords: { en: ["security", "holding tight", "fear of loss", "boundary"], zh: ["安稳", "紧握", "怕失去", "界限"] },
    upright: { en: "Sitting tightly on four coins. Security, but also fear of loss — the grip is too firm.", zh: "紧坐于四枚金币之上。安稳，但亦有对失去的恐惧——抓得太紧。" },
    reversed: { en: "Beginning to let go. Generosity, opening the hand.", zh: "开始放手。慷慨，张开手掌。" },
  },
  five: {
    keywords: { en: ["hardship", "lack", "loneliness", "outside the window"], zh: ["困苦", "匮乏", "孤独", "窗外"] },
    upright: { en: "Two figures pass a warm window in the snow. Hardship, lack, the loneliness of going without.", zh: "两个身影在雪中走过温暖的窗。困苦、匮乏、缺乏中的孤独。" },
    reversed: { en: "Recovery, asking for help, the door opening.", zh: "恢复、寻求帮助、门的开启。" },
  },
  six: {
    keywords: { en: ["generosity", "exchange", "give and receive", "balance"], zh: ["慷慨", "交换", "予与受", "平衡"] },
    upright: { en: "A merchant weighing coins, giving to those who hold out their hands. Generosity, balance of give and receive.", zh: "一位商人称着金币，分给伸手者。慷慨，给予与接受的平衡。" },
    reversed: { en: "Strings attached, debt, uneven exchange.", zh: "附带条件的给予、欠债、不对等的交换。" },
  },
  seven: {
    keywords: { en: ["patience", "evaluation", "slow growth", "review"], zh: ["耐心", "评估", "缓慢成长", "复查"] },
    upright: { en: "A farmer leaning on a hoe, looking at the slowly ripening fruit. Patience with growth, evaluating progress.", zh: "一位农夫倚锄而立，凝视缓慢成熟的果实。对成长的耐心，评估进展。" },
    reversed: { en: "Impatience, poor returns, doubt in the work.", zh: "急躁、回报不佳、对工作的怀疑。" },
  },
  eight: {
    keywords: { en: ["practice", "diligence", "craft", "repetition"], zh: ["练习", "勤勉", "技艺", "重复"] },
    upright: { en: "A craftsperson at a bench, hammering coin after coin. Diligent practice, skill built day by day.", zh: "一位工匠伏案，一枚一枚地敲打。勤勉的练习，日复一日打磨的技艺。" },
    reversed: { en: "Cutting corners, perfectionism, dull repetition without growth.", zh: "偷工减料、完美主义、无成长的乏味重复。" },
  },
  nine: {
    keywords: { en: ["self-sufficiency", "comfort earned", "quiet luxury", "garden"], zh: ["自足", "应得的舒适", "静谧优雅", "园"] },
    upright: { en: "A solitary figure in a vineyard, gloved bird at hand. Self-sufficiency, comfort earned, quiet luxury.", zh: "葡萄园中一位独身之人，戴手套的鸟立于手上。自给自足、应得的舒适、静谧的优雅。" },
    reversed: { en: "Overwork, hollow comfort, dependence on appearances.", zh: "过劳、空洞的舒适、对表象的依赖。" },
  },
  ten: {
    keywords: { en: ["legacy", "family wealth", "settled abundance", "lineage"], zh: ["传承", "家族之富", "安顿的丰盛", "血脉"] },
    upright: { en: "Three generations of family in a courtyard. Legacy, generational wealth, settled abundance.", zh: "庭院中三代同堂。传承、世代的财富、安顿的丰盛。" },
    reversed: { en: "Family money trouble, broken legacy, inheritance dispute.", zh: "家族财务的麻烦、破碎的传承、继承之争。" },
  },
  page: {
    keywords: { en: ["study", "practical curiosity", "opportunity", "beginner"], zh: ["研习", "务实好奇", "机会", "初学者"] },
    upright: { en: "A studious young figure contemplating a coin. Practical curiosity, an opportunity asking to be studied.", zh: "一位勤勉的年少身影端详一枚金币。务实的好奇，一个请求被研习的机会。" },
    reversed: { en: "Procrastination, unrealistic plans, missed lessons.", zh: "拖延、不切实际的计划、错失的功课。" },
  },
  knight: {
    keywords: { en: ["steady effort", "reliability", "follow-through", "patience"], zh: ["稳努", "可靠", "贯彻", "耐心"] },
    upright: { en: "A still, patient knight on a still horse, holding one coin. Steady effort, reliability, finishing what you start.", zh: "一位静默而耐心的骑士骑在静默的马上，持一枚金币。稳定的努力、可靠、把开始的事做完。" },
    reversed: { en: "Stagnation, boredom, work without purpose.", zh: "停滞、乏味、无目的的劳作。" },
  },
  queen: {
    keywords: { en: ["nurture", "abundance", "practical care", "fertile home"], zh: ["滋养", "丰盛", "务实关怀", "肥沃之家"] },
    upright: { en: "A queen in a fertile garden with a coin in her lap. Nurturing abundance, practical care, a fertile home.", zh: "一位皇后在丰盛的花园中，金币置于膝上。滋养的丰盛、务实的关怀、肥沃的家。" },
    reversed: { en: "Self-neglect, smothering care, work-life imbalance.", zh: "自我忽视、令人窒息的关心、工作与生活失衡。" },
  },
  king: {
    keywords: { en: ["prosperity", "provider", "mastery", "stewardship"], zh: ["繁盛", "供养", "掌握", "守护"] },
    upright: { en: "A king on a throne carved with grapevines, a coin in his hand. Prosperous, generous provider, mastery of the material.", zh: "一位国王坐于刻满葡萄藤的王座上，手持金币。繁盛、慷慨的供养者、对物质的掌握。" },
    reversed: { en: "Greed, materialism, success without joy.", zh: "贪婪、物质主义、无喜的成功。" },
  },
};

const suitNames: Record<Suit, BilingualText> = {
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
      name: { en: `${r.en} of ${s.en}`, zh: `${s.zh}${r.zh}` },
      arcana: "minor" as const,
      suit,
      number: r.num,
      keywords: m.keywords,
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

export function drawCards(source: TarotCard[], count: number): DrawnCard[] {
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

export function getKeywords(card: TarotCard, lang: Lang): string[] {
  return card.keywords[lang];
}

export function getMeaning(drawn: DrawnCard, lang: Lang): string {
  return drawn.reversed ? drawn.card.reversed[lang] : drawn.card.upright[lang];
}
