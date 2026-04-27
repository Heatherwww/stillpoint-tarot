import type { Metadata } from "next";
import { majorArcana } from "@/lib/cards";
import SuitPage from "@/components/SuitPage";
import { buildSuitMetadata, SITE_URL } from "../_suitMeta";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const typed = lang === "zh" ? "zh" : "en";
  return buildSuitMetadata(typed, {
    slug: "major",
    titleEn: "Major Arcana — All 22 Tarot Cards & Meanings · Stillpoint Tarot",
    titleZh: "大阿尔卡那——全部 22 张塔罗牌与含义 · 静点塔罗",
    descEn:
      "Explore all 22 Major Arcana tarot cards: The Fool through The World. Full upright and reversed meanings, love, career, and yes/no interpretations for every card.",
    descZh:
      "探索全部 22 张大阿尔卡那塔罗牌：从愚者到世界。每张牌都附有正位与逆位含义、爱情、事业与「是否」解读。",
  });
}

export default async function MajorArcanaPage({ params }: PageProps) {
  const { lang } = await params;
  const url = `${SITE_URL}/${lang}/cards/major`;
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
            url,
            isPartOf: { "@type": "WebSite", name: "Stillpoint Tarot", url: SITE_URL },
            inLanguage: lang === "zh" ? "zh-CN" : "en",
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
