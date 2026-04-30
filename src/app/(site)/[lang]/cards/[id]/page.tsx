import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fullDeck, getCardImagePath } from "@/lib/cards";
import { getCardExtras } from "@/lib/cardExtras";
import type { Lang } from "@/lib/i18n";
import { SITE_URL } from "../../_routeMeta";
import CardDetailClient from "./CardDetailClient";

interface PageProps {
  params: Promise<{ id: string; lang: string }>;
}

interface CardMetadataCopy {
  title: string;
  description: string;
}

function yesNoWord(answer: "yes" | "no" | "maybe", lang: Lang) {
  if (answer === "yes") return lang === "zh" ? "是" : "Yes";
  if (answer === "no") return lang === "zh" ? "否" : "No";
  return lang === "zh" ? "也许" : "Maybe";
}

const cardMetadataOverrides: Partial<
  Record<string, Record<Lang, (answerWord: string) => CardMetadataCopy>>
> = {
  "the-fool": {
    en: () => ({
      title: "The Fool Yes or No? Tarot Meaning, Love, Upright & Reversed",
      description:
        "Is The Fool a yes or no card? Usually yes. Read The Fool upright and reversed meanings, love advice, and what this card says about a leap of faith.",
    }),
    zh: () => ({
      title: "愚者塔罗牌义 | 是否、正位逆位与爱情",
      description:
        "愚者在塔罗中常给出“是”的答案。查看愚者正位与逆位牌义、爱情解读、行动建议，以及它对新开始的提示。",
    }),
  },
  "the-lovers": {
    en: () => ({
      title: "The Lovers Tarot Meaning | Love, Soulmate, Upright & Reversed",
      description:
        "Read The Lovers tarot meaning for love, soulmate questions, choices, and relationships, plus upright and reversed interpretations and yes-or-no guidance.",
    }),
    zh: () => ({
      title: "恋人塔罗牌义 | 爱情、灵魂伴侣、正位逆位",
      description:
        "恋人在塔罗中多指爱情、选择与价值对齐。查看恋人牌正位逆位、关系解读，以及它是否代表灵魂伴侣。",
    }),
  },
  "the-moon": {
    en: (answerWord) => ({
      title: "The Moon Tarot Meaning | Symbolism, Love, Upright & Reversed",
      description:
        `What does The Moon symbolize in tarot? Read The Moon upright and reversed meanings, hidden feelings, intuition, love, and a yes-or-no answer of ${answerWord.toLowerCase()}.`,
    }),
    zh: () => ({
      title: "月亮塔罗牌义与象征 | 正位逆位、爱情与是否（也许）",
      description:
        "月亮在塔罗中象征潜意识、幻象与直觉。查看月亮牌正位逆位、爱情解读，以及“是否”答案：也许。",
    }),
  },
  "ace-of-swords": {
    en: () => ({
      title:
        "Ace of Swords Yes or No? Tarot Meaning, Love, Upright & Reversed",
      description:
        "Is Ace of Swords a yes or no card? Usually yes. Read the Ace of Swords meaning for clarity, truth, love, career, and upright and reversed readings.",
    }),
    zh: () => ({
      title: "宝剑首牌塔罗牌义 | 是否、正位逆位与爱情",
      description:
        "宝剑首牌在“是否”问题里通常偏向“是”。查看它在清晰、真相、爱情与事业中的正位逆位解读。",
    }),
  },
  "three-of-pentacles": {
    en: () => ({
      title: "Three of Pentacles Meaning | Work, Collaboration, Love & Advice",
      description:
        "What does the Three of Pentacles mean in tarot? Read its meaning for teamwork, work, love, upright and reversed advice, and yes-or-no guidance.",
    }),
    zh: () => ({
      title: "星币三塔罗牌义 | 合作、事业、正位逆位",
      description:
        "星币三多指合作、学习与把事做好。查看它在事业、关系、正位逆位与“是否”问题中的含义。",
    }),
  },
};

function buildDefaultCardMetadataCopy(
  card: (typeof fullDeck)[number],
  lang: Lang,
  answerWord: string,
) : CardMetadataCopy {
  return lang === "zh"
    ? {
        title: `${card.name.zh}塔罗牌义 | 正位逆位、爱情与是否（${answerWord}）`,
        description: `${card.name.zh}塔罗牌义速读：查看正位与逆位解读、爱情与事业指引，以及“是否”答案：${answerWord}。`,
      }
    : {
        title: `${card.name.en} Tarot Card Meaning | Upright & Reversed, Love, Yes or No (${answerWord})`,
        description: `${card.name.en} tarot card meaning at a glance: upright and reversed interpretations, love and career guidance, and a yes-or-no answer of ${answerWord.toLowerCase()}.`,
      };
}

function buildCardMetadataCopy(
  card: (typeof fullDeck)[number],
  lang: Lang,
  answerWord: string,
): CardMetadataCopy {
  const override = cardMetadataOverrides[card.id]?.[lang];
  return override
    ? override(answerWord)
    : buildDefaultCardMetadataCopy(card, lang, answerWord);
}

export function generateStaticParams() {
  const langs: Lang[] = ["en", "zh"];
  return langs.flatMap((lang) =>
    fullDeck.map((card) => ({ lang, id: card.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id, lang } = await params;
  const card = fullDeck.find((c) => c.id === id);
  if (!card) return { title: "Card not found" };
  if (lang !== "en" && lang !== "zh") return { title: "Card not found" };

  const extras = getCardExtras(card);
  const localizedLang: Lang = lang;
  const enUrl = `${SITE_URL}/en/cards/${card.id}`;
  const zhUrl = `${SITE_URL}/zh/cards/${card.id}`;
  const canonical = localizedLang === "zh" ? zhUrl : enUrl;
  const ogImage = `${SITE_URL}${getCardImagePath(card.id)}`;
  const answerWord = yesNoWord(extras.yesNo.answer, localizedLang);
  const { title, description } = buildCardMetadataCopy(
    card,
    localizedLang,
    answerWord,
  );

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        "zh-CN": zhUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: localizedLang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: localizedLang === "zh" ? "en_US" : "zh_CN",
      images: [
        {
          url: ogImage,
          width: 500,
          height: 833,
          alt: `${card.name.en} tarot card from the Rider-Waite-Smith deck`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id, lang } = await params;
  const card = fullDeck.find((c) => c.id === id);
  if (!card) notFound();
  if (lang !== "en" && lang !== "zh") notFound();

  const extras = getCardExtras(card);
  const typedLang: Lang = lang;
  const answerWord = yesNoWord(extras.yesNo.answer, typedLang);
  const { title, description } = buildCardMetadataCopy(
    card,
    typedLang,
    answerWord,
  );
  const url = `${SITE_URL}/${typedLang}/cards/${card.id}`;
  const ogImage = `${SITE_URL}${getCardImagePath(card.id)}`;
  const homeUrl = `${SITE_URL}/${typedLang}`;
  const cardsUrl = `${SITE_URL}/${typedLang}/cards`;
  const name = typedLang === "zh" ? card.name.zh : card.name.en;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    name,
    description,
    image: ogImage,
    url,
    author: {
      "@type": "Organization",
      name: "Stillpoint Tarot",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Stillpoint Tarot",
      url: SITE_URL,
    },
    inLanguage: typedLang === "zh" ? "zh-CN" : "en",
    about: { "@type": "Thing", name: "Tarot" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: typedLang === "zh" ? "首页" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: typedLang === "zh" ? "牌库" : "Cards",
        item: cardsUrl,
      },
      { "@type": "ListItem", position: 3, name, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: extras.faqs.map((faq) => ({
      "@type": "Question",
      name: typedLang === "zh" ? faq.q.zh : faq.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: typedLang === "zh" ? faq.a.zh : faq.a.en,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <CardDetailClient card={card} />
    </>
  );
}
