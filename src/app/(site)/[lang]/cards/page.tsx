import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import CardsIndexClient from "./CardsIndexClient";
import { buildCardsMetadata, SITE_URL } from "../_routeMeta";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildCardsMetadata(lang === "zh" ? "zh" : "en");
}

export default async function CardsIndexPage({ params }: PageProps) {
  const { lang } = await params;
  const typedLang: Lang = lang === "zh" ? "zh" : "en";
  const url = `${SITE_URL}/${typedLang}/cards`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name:
      typedLang === "zh"
        ? "78 张塔罗牌牌义大全"
        : "78 Tarot Card Meanings",
    description:
      typedLang === "zh"
        ? "按花色浏览全部 78 张伟特塔罗牌，并查看正位与逆位牌义。"
        : "Browse all 78 Rider-Waite-Smith tarot cards by suit with upright and reversed meanings.",
    url,
    isPartOf: {
      "@type": "WebSite",
      name: "Stillpoint Tarot",
      url: SITE_URL,
    },
    inLanguage: typedLang === "zh" ? "zh-CN" : "en",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <CardsIndexClient />
    </>
  );
}
