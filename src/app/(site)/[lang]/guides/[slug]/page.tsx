import { notFound } from "next/navigation";
import type { Metadata } from "next";
import GuidePage from "@/components/GuidePage";
import { getGuide, guideSlugs } from "@/lib/guides";
import type { Lang } from "@/lib/i18n";
import { buildGuideMetadata, SITE_URL } from "../../_routeMeta";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export function generateStaticParams() {
  const langs: Lang[] = ["en", "zh"];
  return langs.flatMap((lang) =>
    guideSlugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return { title: "Guide not found" };
  if (lang !== "en" && lang !== "zh") return { title: "Guide not found" };

  return buildGuideMetadata(
    lang,
    guide.slug,
    guide.title,
    guide.description,
  );
}

export default async function GuideRoute({ params }: PageProps) {
  const { lang, slug } = await params;
  if (lang !== "en" && lang !== "zh") notFound();

  const guide = getGuide(slug);
  if (!guide) notFound();

  const typedLang: Lang = lang;
  const url = `${SITE_URL}/${typedLang}/guides/${guide.slug}`;
  const homeUrl = `${SITE_URL}/${typedLang}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title[typedLang],
    name: guide.title[typedLang],
    description: guide.description[typedLang],
    url,
    author: {
      "@type": "Organization",
      name: "Stillpoint Tarot",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Stillpoint Tarot",
      url: SITE_URL,
    },
    image: `${SITE_URL}/logo.png`,
    inLanguage: typedLang === "zh" ? "zh-CN" : "en",
    about: { "@type": "Thing", name: "Tarot" },
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
        name: guide.title[typedLang],
        item: url,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q[typedLang],
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a[typedLang],
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <GuidePage guide={guide} lang={typedLang} />
    </>
  );
}
