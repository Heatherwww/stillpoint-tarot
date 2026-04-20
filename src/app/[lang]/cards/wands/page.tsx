import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";
import { buildSuitMetadata, SITE_URL } from "../_suitMeta";

const cards = minorArcana.filter((c) => c.suit === "wands");

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const typed = lang === "zh" ? "zh" : "en";
  return buildSuitMetadata(typed, {
    slug: "wands",
    titleEn: "Suit of Wands — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
    titleZh: "权杖花色——全部 14 张塔罗牌与含义 · 静点塔罗",
    descEn:
      "Explore all 14 Wands tarot cards: Ace through King. Fire, passion, ambition, and creative action. Full upright, reversed, love, and career meanings.",
    descZh:
      "探索全部 14 张权杖塔罗牌：从首牌到国王。火、激情、野心与创造性的行动。每张牌都附有正位、逆位、爱情与事业含义。",
  });
}

export default async function WandsPage({ params }: PageProps) {
  const { lang } = await params;
  const url = `${SITE_URL}/${lang}/cards/wands`;
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
            url,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
            inLanguage: lang === "zh" ? "zh-CN" : "en",
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
