import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";
const cards = minorArcana.filter((c) => c.suit === "swords");

export const metadata: Metadata = {
  title: "Suit of Swords — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
  description:
    "Explore all 14 Swords tarot cards: Ace through King. Air, thought, truth, and conflict. Full upright, reversed, love, and career meanings.",
  alternates: { canonical: `${SITE_URL}/cards/swords` },
  openGraph: {
    title: "Suit of Swords — All 14 Tarot Cards & Meanings",
    description:
      "Explore all 14 Swords cards with air-element meanings for love, career, and advice.",
    url: `${SITE_URL}/cards/swords`,
  },
};

export default function SwordsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Suit of Swords Tarot Cards",
            description: "All 14 Swords cards — air, thought, and truth.",
            url: `${SITE_URL}/cards/swords`,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
          }),
        }}
      />
      <SuitPage
        titleKey="suit.swords.title"
        bodyKey="suit.swords.body"
        cards={cards}
        themeKeywords={{
          en: ["air", "thought", "truth", "conflict", "clarity", "decisions"],
          zh: ["风", "思维", "真相", "冲突", "清明", "决定"],
        }}
      />
    </>
  );
}
