import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";
import { buildSuitMetadata, SITE_URL } from "../_suitMeta";

const cards = minorArcana.filter((c) => c.suit === "cups");

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const typed = lang === "zh" ? "zh" : "en";
  return buildSuitMetadata(typed, {
    slug: "cups",
    titleEn: "Suit of Cups — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
    titleZh: "圣杯花色——全部 14 张塔罗牌与含义 · 静点塔罗",
    descEn:
      "Explore all 14 Cups tarot cards: Ace through King. Water, emotion, intuition, and relationships. Full upright, reversed, love, and career meanings.",
    descZh:
      "探索全部 14 张圣杯塔罗牌：从首牌到国王。水、情感、直觉与关系。每张牌都附有正位、逆位、爱情与事业含义。",
  });
}

export default async function CupsPage({ params }: PageProps) {
  const { lang } = await params;
  const url = `${SITE_URL}/${lang}/cards/cups`;
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
            url,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
            inLanguage: lang === "zh" ? "zh-CN" : "en",
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
