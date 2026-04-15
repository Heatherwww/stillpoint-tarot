import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fullDeck } from "@/lib/cards";
import { getCardExtras } from "@/lib/cardExtras";
import CardDetailClient from "./CardDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

export function generateStaticParams() {
  return fullDeck.map((card) => ({ id: card.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const card = fullDeck.find((c) => c.id === id);
  if (!card) return { title: "Card not found" };

  const extras = getCardExtras(card);
  const url = `${SITE_URL}/cards/${card.id}`;
  const ogImage = `${SITE_URL}/cards/${card.id}.jpg`;

  // English-first metadata for crawlers; bilingual hreflang hint until full
  // bilingual URL routing lands (see DECISIONS.md).
  const title = `${card.name.en} Tarot Card Meaning · Upright, Reversed, Love & Yes/No`;
  const description = `${card.name.en} tarot card: full upright and reversed meanings, love and career interpretations, advice, and yes/no answer. ${extras.inLove.en.slice(0, 140)}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        zh: url,
      },
    },
    openGraph: {
      title: `${card.name.en} · ${card.name.zh}`,
      description,
      url,
      type: "article",
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
      title: `${card.name.en} Tarot Card Meaning`,
      description,
      images: [ogImage],
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = fullDeck.find((c) => c.id === id);
  if (!card) notFound();

  const extras = getCardExtras(card);
  const url = `${SITE_URL}/cards/${card.id}`;
  const ogImage = `${SITE_URL}/cards/${card.id}.jpg`;

  // JSON-LD: Article + BreadcrumbList + FAQPage. English-only for now;
  // bilingual variants will follow when /zh/ routes land.
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${card.name.en} Tarot Card Meaning`,
    name: card.name.en,
    description: extras.inLove.en,
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
    inLanguage: "en",
    about: { "@type": "Thing", name: "Tarot" },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Cards", item: `${SITE_URL}/cards` },
      { "@type": "ListItem", position: 3, name: card.name.en, item: url },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: extras.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q.en,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a.en,
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
