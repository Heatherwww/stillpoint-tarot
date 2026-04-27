import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";
import { buildSuitMetadata, SITE_URL } from "../_suitMeta";

const cards = minorArcana.filter((c) => c.suit === "pentacles");

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const typed = lang === "zh" ? "zh" : "en";
  return buildSuitMetadata(typed, {
    slug: "pentacles",
    titleEn: "Suit of Pentacles — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
    titleZh: "星币花色——全部 14 张塔罗牌与含义 · 静点塔罗",
    descEn:
      "Explore all 14 Pentacles tarot cards: Ace through King. Earth, money, home, body, and craft. Full upright, reversed, love, and career meanings.",
    descZh:
      "探索全部 14 张星币塔罗牌：从首牌到国王。土、金钱、家园、身体与手艺。每张牌都附有正位、逆位、爱情与事业含义。",
  });
}

export default async function PentaclesPage({ params }: PageProps) {
  const { lang } = await params;
  const url = `${SITE_URL}/${lang}/cards/pentacles`;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Suit of Pentacles Tarot Cards",
            description: "All 14 Pentacles cards — earth, money, and the body.",
            url,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
            inLanguage: lang === "zh" ? "zh-CN" : "en",
          }),
        }}
      />
      <SuitPage
        titleKey="suit.pentacles.title"
        bodyKey="suit.pentacles.body"
        cards={cards}
        themeKeywords={{
          en: ["earth", "money", "home", "body", "craft", "stability"],
          zh: ["土", "金钱", "家", "身体", "手艺", "稳定"],
        }}
      />
    </>
  );
}
