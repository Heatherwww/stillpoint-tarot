import type { Metadata } from "next";
import { majorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

export const metadata: Metadata = {
  title: "Major Arcana — All 22 Tarot Cards & Meanings · Stillpoint Tarot",
  description:
    "Explore all 22 Major Arcana tarot cards: The Fool through The World. Full upright and reversed meanings, love, career, and yes/no interpretations for every card.",
  alternates: { canonical: `${SITE_URL}/cards/major` },
  openGraph: {
    title: "Major Arcana — All 22 Tarot Cards & Meanings",
    description:
      "Explore all 22 Major Arcana tarot cards with full upright, reversed, love, and career meanings.",
    url: `${SITE_URL}/cards/major`,
  },
};

export default function MajorArcanaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Major Arcana Tarot Cards",
            description: "All 22 Major Arcana cards from The Fool to The World.",
            url: `${SITE_URL}/cards/major`,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
          }),
        }}
      />
      <SuitPage
        titleKey="suit.major.title"
        bodyKey="suit.major.body"
        cards={majorArcana}
        themeKeywords={{
          en: ["soul lessons", "life chapters", "archetypes", "transformation", "inner journey"],
          zh: ["灵魂课题", "生命篇章", "原型", "转化", "内在旅程"],
        }}
      />
    </>
  );
}
