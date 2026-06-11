import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { guideSummaries } from "@/lib/guideSummaries";
import type { Lang } from "@/lib/i18n";
import { buildGuidesIndexMetadata, SITE_URL } from "../_routeMeta";

interface PageProps {
  params: Promise<{ lang: string }>;
}

const pageText = {
  title: {
    en: "Tarot Guides Library",
    zh: "塔罗指南库",
  },
  description: {
    en: "A growing library of grounded tarot guides for card meanings, love readings, feelings, spreads, reversals, and better questions.",
    zh: "一个持续扩展的塔罗指南库，整理牌义、爱情解读、感受问题、牌阵、逆位与更好的提问方式。",
  },
  kicker: {
    en: "Start with one clear question, then follow the related cards and guides.",
    zh: "先从一个清楚的问题开始，再沿着相关牌义与指南继续读下去。",
  },
  read: {
    en: "Read guide",
    zh: "阅读指南",
  },
  cardsCta: {
    en: "Browse all 78 cards",
    zh: "浏览 78 张牌",
  },
  readingCta: {
    en: "Ask the cards",
    zh: "问问牌",
  },
} as const;

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") return { title: "Guides not found" };

  return buildGuidesIndexMetadata(lang);
}

export default async function GuidesIndexRoute({ params }: PageProps) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();

  const typedLang: Lang = lang;
  const url = `${SITE_URL}/${typedLang}/guides`;
  const homeUrl = `${SITE_URL}/${typedLang}`;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: pageText.title[typedLang],
    description: pageText.description[typedLang],
    url,
    inLanguage: typedLang === "zh" ? "zh-CN" : "en",
    hasPart: guideSummaries.map((guide) => ({
      "@type": "Article",
      headline: guide.title[typedLang],
      description: guide.description[typedLang],
      url: `${url}/${guide.slug}`,
      inLanguage: typedLang === "zh" ? "zh-CN" : "en",
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: typedLang === "zh" ? "首页" : "Home",
        item: homeUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageText.title[typedLang],
        item: url,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif-display text-4xl leading-tight text-primary md:text-5xl">
            {pageText.title[typedLang]}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            {pageText.description[typedLang]}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/75">
            {pageText.kicker[typedLang]}
          </p>
        </header>

        <section className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guideSummaries.map((guide) => (
            <Link
              key={guide.slug}
              href={`/${typedLang}/guides/${guide.slug}`}
              className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary"
            >
              <h2 className="font-serif-display text-2xl text-foreground transition-colors group-hover:text-primary">
                {guide.title[typedLang]}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {guide.description[typedLang]}
              </p>
              <div className="mt-5 text-sm text-primary">
                {pageText.read[typedLang]}
              </div>
            </Link>
          ))}
        </section>

        <section className="mx-auto mt-16 max-w-3xl border-t border-border pt-10 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/${typedLang}/cards`}
              className="rounded-full border border-border bg-surface-muted px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
            >
              {pageText.cardsCta[typedLang]}
            </Link>
            <Link
              href={`/${typedLang}/reading`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {pageText.readingCta[typedLang]}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
