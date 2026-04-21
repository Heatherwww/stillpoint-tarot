import type { Metadata } from "next";
import { minorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";
import { buildSuitMetadata, SITE_URL } from "../_suitMeta";

const cards = minorArcana.filter((c) => c.suit === "swords");

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const typed = lang === "zh" ? "zh" : "en";
  return buildSuitMetadata(typed, {
    slug: "swords",
    titleEn: "Suit of Swords — All 14 Tarot Cards & Meanings · Stillpoint Tarot",
    titleZh: "宝剑花色——全部 14 张塔罗牌与含义 · 静点塔罗",
    descEn:
      "Explore all 14 Swords tarot cards: Ace through King. Air, thought, communication, and truth. Full upright, reversed, love, and career meanings.",
    descZh:
      "探索全部 14 张宝剑塔罗牌：从首牌到国王。风、思维、沟通与真相。每张牌都附有正位、逆位、爱情与事业含义。",
  });
}

export default async function SwordsPage({ params }: PageProps) {
  const { lang } = await params;
  const url = `${SITE_URL}/${lang}/cards/swords`;
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
            url,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
            inLanguage: lang === "zh" ? "zh-CN" : "en",
          }),
        }}
      />
      <SuitPage
        titleKey="suit.swords.title"
        bodyKey="suit.swords.body"
        cards={cards}
        themeKeywords={{
          en: ["air", "thought", "communication", "clarity", "truth", "conflict"],
          zh: ["风", "思维", "沟通", "清晰", "真相", "冲突"],
        }}
      />
    </>
  );
}
