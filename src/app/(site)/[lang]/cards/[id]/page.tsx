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

function yesNoWord(answer: "yes" | "no" | "maybe", lang: Lang) {
  if (answer === "yes") return lang === "zh" ? "是" : "Yes";
  if (answer === "no") return lang === "zh" ? "否" : "No";
  return lang === "zh" ? "也许" : "Maybe";
}

function buildCardTitle(
  card: (typeof fullDeck)[number],
  lang: Lang,
  answerWord: string,
) {
  return lang === "zh"
    ? `${card.name.zh}塔罗牌义 | 正位逆位、爱情与是否（${answerWord}）`
    : `${card.name.en} Tarot Card Meaning | Upright & Reversed, Love, Yes or No (${answerWord})`;
}

function buildCardDescription(
  card: (typeof fullDeck)[number],
  lang: Lang,
  answerWord: string,
) {
  return lang === "zh"
    ? `${card.name.zh}塔罗牌义速读：查看正位与逆位解读、爱情与事业指引，以及“是否”答案：${answerWord}。`
    : `${card.name.en} tarot card meaning at a glance: upright and reversed interpretations, love and career guidance, and a yes-or-no answer of ${answerWord.toLowerCase()}.`;
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
  const title = buildCardTitle(card, localizedLang, answerWord);
  const description = buildCardDescription(card, localizedLang, answerWord);

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
  const title = buildCardTitle(card, typedLang, answerWord);
  const description = buildCardDescription(card, typedLang, answerWord);
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
