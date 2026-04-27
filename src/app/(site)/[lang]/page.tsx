import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";
import HomePageClient from "./HomePageClient";
import { buildHomeMetadata, SITE_URL } from "./_routeMeta";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  return buildHomeMetadata(lang === "zh" ? "zh" : "en");
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const typedLang: Lang = lang === "zh" ? "zh" : "en";

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stillpoint Tarot",
    alternateName: ["静点塔罗", "Stillpoint"],
    url: SITE_URL,
    inLanguage: typedLang === "zh" ? "zh-CN" : "en",
    publisher: {
      "@type": "Organization",
      name: "Stillpoint Tarot",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stillpoint Tarot",
    alternateName: "静点塔罗",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HomePageClient />
    </>
  );
}
