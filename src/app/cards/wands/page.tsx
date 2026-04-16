import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";
const cards = minorArcana.filter((c) => c.suit === "wands");

export const metadata: Metadata = {
  title: "Suit of Wands — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
  description:
    "Explore all 14 Wands tarot cards: Ace through King. Fire, passion, ambition, and creative action. Full upright, reversed, love, and career meanings.",
  alternates: { canonical: `${SITE_URL}/cards/wands` },
  openGraph: {
    title: "Suit of Wands — All 14 Tarot Cards & Meanings",
    description:
      "Explore all 14 Wands cards with fire-element meanings for love, career, and advice.",
    url: `${SITE_URL}/cards/wands`,
  },
};

export default function WandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Suit of Wands Tarot Cards",
            description: "All 14 Wands cards — fire, passion, and action.",
            url: `${SITE_URL}/cards/wands`,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
          }),
        }}
      />
      <SuitPage
        titleKey="suit.wands.title"
        bodyKey="suit.wands.body"
        cards={cards}
        themeKeywords={{
          en: ["fire", "passion", "ambition", "creativity", "action", "will"],
          zh: ["火", "激情", "野心", "创造力", "行动", "意志"],
        }}
      />
    </>
  );
}
