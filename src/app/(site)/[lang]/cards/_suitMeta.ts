import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

type SuitSlug = "major" | "wands" | "cups" | "swords" | "pentacles";

interface SuitMetaInput {
  slug: SuitSlug;
  titleEn: string;
  titleZh: string;
  descEn: string;
  descZh: string;
}

export function buildSuitMetadata(
  lang: "en" | "zh",
  input: SuitMetaInput,
): Metadata {
  const enUrl = `${SITE_URL}/en/cards/${input.slug}`;
  const zhUrl = `${SITE_URL}/zh/cards/${input.slug}`;
  const canonical = lang === "zh" ? zhUrl : enUrl;
  const title = lang === "zh" ? input.titleZh : input.titleEn;
  const description = lang === "zh" ? input.descZh : input.descEn;
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: enUrl,
        "zh-CN": zhUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: lang === "zh" ? "zh_CN" : "en_US",
      alternateLocale: lang === "zh" ? "en_US" : "zh_CN",
    },
  };
}

export { SITE_URL };
