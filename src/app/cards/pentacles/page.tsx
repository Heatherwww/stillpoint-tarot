import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";
const cards = minorArcana.filter((c) => c.suit === "pentacles");

export const metadata: Metadata = {
  title:
    "Suit of Pentacles — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
  description:
    "Explore all 14 Pentacles tarot cards: Ace through King. Earth, material world, money, and health. Full upright, reversed, love, and career meanings.",
  alternates: { canonical: `${SITE_URL}/cards/pentacles` },
  openGraph: {
    title: "Suit of Pentacles — All 14 Tarot Cards & Meanings",
    description:
      "Explore all 14 Pentacles cards with earth-element meanings for love, career, and advice.",
    url: `${SITE_URL}/cards/pentacles`,
  },
};

export default function PentaclesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Suit of Pentacles Tarot Cards",
            description: "All 14 Pentacles cards — earth, material, and body.",
            url: `${SITE_URL}/cards/pentacles`,
            isPartOf: {
              "@type": "WebSite",
              name: "Stillpoint Tarot",
              url: SITE_URL,
            },
          }),
        }}
      />
      <SuitPage
        titleKey="suit.pentacles.title"
        bodyKey="suit.pentacles.body"
        cards={cards}
        themeKeywords={{
          en: ["earth", "material", "money", "health", "patience", "craft"],
          zh: ["土", "物质", "金钱", "健康", "耐心", "工艺"],
        }}
      />
    </>
  );
}
