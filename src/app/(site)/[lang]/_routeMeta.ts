import type { Metadata } from "next";
import type { Lang } from "@/lib/i18n";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stillpointtarot.com";

const SITE_NAME = "Stillpoint Tarot";
const OG_IMAGE_URL = `${SITE_URL}/logo.png`;

type LocalizedText = Record<Lang, string>;

function localizedUrls(path: string) {
  const suffix = path === "/" ? "" : path;
  return {
    en: `${SITE_URL}/en${suffix}`,
    zh: `${SITE_URL}/zh${suffix}`,
  };
}

function buildPageMetadata(
  lang: Lang,
  path: string,
  title: LocalizedText,
  description: LocalizedText,
): Metadata {
  const { en, zh } = localizedUrls(path);
  const canonical = lang === "zh" ? zh : en;
  const localizedTitle = title[lang];
  const localizedDescription = description[lang];
  const locale = lang === "zh" ? "zh_CN" : "en_US";
  const alternateLocale = lang === "zh" ? "en_US" : "zh_CN";

  return {
    title: localizedTitle,
    description: localizedDescription,
    alternates: {
      canonical,
      languages: {
        en,
        "zh-CN": zh,
        "x-default": en,
      },
    },
    openGraph: {
      title: localizedTitle,
      description: localizedDescription,
      url: canonical,
      type: "website",
      siteName: SITE_NAME,
      locale,
      alternateLocale,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 500,
          height: 500,
          alt: "Stillpoint Tarot logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localizedTitle,
      description: localizedDescription,
      images: [OG_IMAGE_URL],
    },
  };
}

export function buildGuideMetadata(
  lang: Lang,
  slug: string,
  title: LocalizedText,
  description: LocalizedText,
): Metadata {
  const metadata = buildPageMetadata(lang, `/guides/${slug}`, title, description);
  return {
    ...metadata,
    openGraph: metadata.openGraph
      ? {
          ...metadata.openGraph,
          type: "article",
        }
      : undefined,
  };
}

export function buildHomeMetadata(lang: Lang): Metadata {
  return buildPageMetadata(
    lang,
    "/",
    {
      en: "Stillpoint Tarot | Tarot Card Meanings, Readings & Guides",
      zh: "Stillpoint Tarot | 塔罗牌义、在线抽牌与中英双语解读",
    },
    {
      en: "Explore all 78 Rider-Waite-Smith tarot cards, read upright and reversed meanings, and draw bilingual tarot readings for love, work, and life questions.",
      zh: "浏览 78 张伟特塔罗牌，查看正位与逆位牌义，并用中英双语在线抽牌，梳理爱情、工作与人生问题。",
    },
  );
}

export function buildCardsMetadata(lang: Lang): Metadata {
  return buildPageMetadata(
    lang,
    "/cards",
    {
      en: "78 Tarot Card Meanings | Upright, Reversed & Suit Guides",
      zh: "78 张塔罗牌牌义大全 | 正位、逆位与花色导览",
    },
    {
      en: "Browse all 78 Rider-Waite-Smith tarot cards across the Major Arcana, Wands, Cups, Swords, and Pentacles with bilingual meanings and suit guides.",
      zh: "按大阿尔卡那、权杖、圣杯、宝剑与星币浏览 78 张伟特塔罗牌，查看中英双语牌义、正位逆位与花色说明。",
    },
  );
}

export function buildReadingMetadata(lang: Lang): Metadata {
  return buildPageMetadata(
    lang,
    "/reading",
    {
      en: "Online Tarot Reading | Single Card & 3-Card Spread",
      zh: "在线塔罗抽牌 | 单张牌与三张牌牌阵解读",
    },
    {
      en: "Draw a single-card or three-card tarot reading online. Choose your focus, set the context, and receive a grounded bilingual interpretation.",
      zh: "在线进行单张牌或三张牌塔罗抽牌。先选主题与情境，再获得一份克制、清晰的中英双语解读。",
    },
  );
}

export function buildShopMetadata(lang: Lang): Metadata {
  return {
    ...buildPageMetadata(
      lang,
      "/shop",
      {
        en: "Stillpoint Tarot Shop | Preview Only",
        zh: "Stillpoint Tarot 商店 | 预览页",
      },
      {
        en: "The shop is not yet live. This preview page stays available to visitors, but is excluded from search indexing until payments are wired.",
        zh: "商店尚未正式开放。该页面仅供访客预览，在支付接入完成前不参与搜索索引。",
      },
    ),
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
      },
    },
  };
}
