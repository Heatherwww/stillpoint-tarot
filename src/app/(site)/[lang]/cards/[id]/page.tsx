import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fullDeck } from "@/lib/cards";
import { getCardExtras } from "@/lib/cardExtras";
import type { Lang } from "@/lib/i18n";
import CardDetailClient from "./CardDetailClient";

interface PageProps {
  params: Promise<{ id: string; lang: string }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

export function generateStaticParams() {
  const langs: Lang[] = ["en", "zh"];
  return langs.flatMap((lang) =>
    fullDeck.map((card) => ({ lang, id: card.id }))
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
  const enUrl = `${SITE_URL}/en/cards/${card.id}`;
  const zhUrl = `${SITE_URL}/zh/cards/${card.id}`;
  const canonical = lang === "zh" ? zhUrl : enUrl;
  const ogImage = `${SITE_URL}/cards/${card.id}.webp`;

  const yesNoWord =
    extras.yesNo.answer === "yes"
      ? lang === "zh" ? "是" : "Yes"
      : extras.yesNo.answer === "no"
        ? lang === "zh" ? "否" : "No"
        : lang === "zh" ? "也许" : "Maybe";

  const title =
    lang === "zh"
      ? `${card.name.zh}塔罗牌含义——正位、逆位、爱情与是否（${yesNoWord}）`
      : `${card.name.en} Tarot Card Meaning — Upright, Reversed, Love & Yes or No (${yesNoWord})`;

  const description =
    lang === "zh"
      ? `${card.name.zh}塔罗牌指南：正位与逆位含义、爱情与事业解读、是否答案（${yesNoWord}），以及这张牌代表什么样的人。${extras.inLove.zh.slice(0, 80)}`
      : `${card.name.en} tarot card guide: upright and reversed meanings, love and career interpretations, yes-or-no answer (${yesNoWord}), and what kind of person this card represents. ${extras.inLove.en.slice(0, 120)}`;

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
      title: `${card.name.en} · ${card.name.zh}`,
      description,
      url: canonical,
      type: "article",
      locale: lang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: lang === "zh" ? "en_US" : "zh_CN",
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
      title: lang === "zh" ? `${card.name.zh}塔罗牌含义` : `${card.name.en} Tarot Card Meaning`,
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
  const url = `${SITE_URL}/${lang}/cards/${card.id}`;
  const ogImage = `${SITE_URL}/cards/${card.id}.webp`;
  const homeUrl = `${SITE_URL}/${lang}`;
  const cardsUrl = `${SITE_URL}/${lang}/cards`;

  const name = lang === "zh" ? card.name.zh : card.name.en;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline:
      lang === "zh"
        ? `${card.name.zh}塔罗牌含义`
        : `${card.name.en} Tarot Card Meaning`,
    name,
    description: lang === "zh" ? extras.inLove.zh : extras.inLove.en,
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
    inLanguage: lang === "zh" ? "zh-CN" : "en",
    about: { "@type": "Thing", name: "Tarot" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "zh" ? "首页" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "zh" ? "牌库" : "Cards",
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
      name: lang === "zh" ? faq.q.zh : faq.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: lang === "zh" ? faq.a.zh : faq.a.en,
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
