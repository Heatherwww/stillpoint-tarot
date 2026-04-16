import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";
const cards = minorArcana.filter((c) => c.suit === "cups");

export const metadata: Metadata = {
  title: "Suit of Cups — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
  description:
    "Explore all 14 Cups tarot cards: Ace through King. Water, emotion, intuition, and relationships. Full upright, reversed, love, and career meanings.",
  alternates: { canonical: `${SITE_URL}/cards/cups` },
  openGraph: {
    title: "Suit of Cups — All 14 Tarot Cards & Meanings",
    description:
      "Explore all 14 Cups cards with water-element meanings for love, career, and advice.",
    url: `${SITE_URL}/cards/cups`,
  },
};

export default function CupsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Suit of Cups Tarot Cards",
            description: "All 14 Cups cards — water, emotion, and intuition.",
            url: `${SITE_URL}/cards/cups`,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
          }),
        }}
      />
      <SuitPage
        titleKey="suit.cups.title"
        bodyKey="suit.cups.body"
        cards={cards}
        themeKeywords={{
          en: ["water", "emotion", "intuition", "love", "relationships", "dreams"],
          zh: ["水", "情感", "直觉", "爱", "关系", "梦境"],
        }}
      />
    </>
  );
}
