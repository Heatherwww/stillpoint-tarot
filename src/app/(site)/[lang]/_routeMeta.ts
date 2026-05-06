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
      en: "Stillpoint Tarot | Free Tarot Reading & 78 Card Meanings",
      zh: "Stillpoint Tarot | 免费在线塔罗抽牌与 78 张牌义",
    },
    {
      en: "Get a free online tarot reading, explore all 78 Rider-Waite-Smith cards, and read clear upright, reversed, love, and yes-or-no meanings in English and Chinese.",
      zh: "免费在线抽牌，浏览 78 张伟特塔罗牌，并查看中英双语的正位、逆位、爱情与是否解读。",
    },
  );
}

export function buildCardsMetadata(lang: Lang): Metadata {
  return buildPageMetadata(
    lang,
    "/cards",
    {
      en: "78 Tarot Card Meanings | Love, Yes/No, Upright & Reversed",
      zh: "78 张塔罗牌牌义大全 | 正位、逆位、爱情与是否",
    },
    {
      en: "Browse all 78 tarot cards across the Major Arcana, Wands, Cups, Swords, and Pentacles, with clear love, yes-or-no, upright, and reversed meanings.",
      zh: "按大阿尔卡那、权杖、圣杯、宝剑与星币浏览 78 张塔罗牌，快速查看爱情、是否、正位与逆位牌义。",
    },
  );
}

export function buildReadingMetadata(lang: Lang): Metadata {
  return buildPageMetadata(
    lang,
    "/reading",
    {
      en: "Should You Stay, Leave, or Wait? | Ask the Cards",
      zh: "该留下、离开，还是再等等？ | 问问牌",
    },
    {
      en: "Ask the cards one real question: stay or leave, wait or act, say it or let it go. Draw one card or a three-card spread for a grounded bilingual answer.",
      zh: "带着一个真实问题来问问牌：该留下还是离开、再等等还是行动、该说出口还是放下。抽一张牌或三张牌，得到一份克制、清楚的中英双语回应。",
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
        zh: "商店尚未正式开放。该页面仅供访客预览，在支付接入完成前不会参与搜索索引。",
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
