import Link from "next/link";
import { fullDeck, type TarotCard } from "@/lib/cards";
import { guides, type Guide } from "@/lib/guides";
import type { Lang } from "@/lib/i18n";

const guideUi = {
  contents: { en: "In This Guide", zh: "本页内容" },
  ctaTitle: { en: "Put It Into Practice", zh: "把它带回真实牌阵" },
  ctaBody: {
    en: "Once the structure is clear, the next step is to read actual cards in context. Use the reading tool or browse the full deck to ground the theory.",
    zh: "当结构已经理清，下一步就是把它带回真实牌阵里。你可以直接去抽牌，也可以先浏览整副牌，把这些原则落到具体图像上。",
  },
  ctaReading: { en: "Try The Tarot Reading", zh: "去做一次在线抽牌" },
  ctaCards: { en: "Browse All 78 Cards", zh: "浏览 78 张塔罗牌" },
  relatedCards: { en: "Cards To Read Next", zh: "接下来可以继续看的牌" },
  relatedGuides: { en: "Related Guides", zh: "相关指南" },
  faqTitle: { en: "Frequently Asked Questions", zh: "常见问题" },
} as const;

export default function GuidePage({
  guide,
  lang,
}: {
  guide: Guide;
  lang: Lang;
}) {
  const relatedCards = guide.relatedCardIds
    .map((id) => fullDeck.find((card) => card.id === id))
    .filter((card): card is TarotCard => Boolean(card));

  const relatedGuides = guide.relatedGuideSlugs
    .map((slug) => guides.find((entry) => entry.slug === slug))
    .filter((entry): entry is Guide => Boolean(entry));

  return (
    <article className="mx-auto max-w-5xl px-6 py-16">
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif-display text-4xl md:text-5xl text-primary leading-tight">
          {guide.title[lang]}
        </h1>
        <p className="mt-5 text-lg text-muted leading-relaxed">
          {guide.description[lang]}
        </p>
      </header>

      <section className="mx-auto mt-12 max-w-3xl space-y-5 text-base leading-relaxed text-foreground/85">
        {guide.intro[lang].map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-3xl rounded-3xl border border-border bg-surface-muted p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {guideUi.contents[lang]}
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {guide.sections.map((section, index) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              className="rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
            >
              {index + 1}. {section.title[lang]}
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto mt-14 max-w-3xl space-y-12">
        {guide.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-28 border-t border-border pt-10"
          >
            <h2 className="font-serif-display text-3xl text-primary">
              {section.title[lang]}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/85">
              {section.paragraphs[lang].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets && (
              <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted">
                {section.bullets[lang].map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      <section className="mx-auto mt-16 max-w-4xl rounded-3xl border border-border bg-surface p-8 md:p-10">
        <h2 className="font-serif-display text-3xl text-primary">
          {guideUi.ctaTitle[lang]}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          {guideUi.ctaBody[lang]}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${lang}/reading`}
            className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {guideUi.ctaReading[lang]}
          </Link>
          <Link
            href={`/${lang}/cards`}
            className="rounded-full border border-border bg-surface-muted px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
          >
            {guideUi.ctaCards[lang]}
          </Link>
        </div>
      </section>

      <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-2">
        <section className="rounded-3xl border border-border bg-surface p-8">
          <h2 className="font-serif-display text-2xl text-primary">
            {guideUi.relatedCards[lang]}
          </h2>
          <div className="mt-5 grid gap-3">
            {relatedCards.map((card) => (
              <Link
                key={card.id}
                href={`/${lang}/cards/${card.id}`}
                className="rounded-2xl border border-border px-4 py-4 transition-colors hover:border-primary"
              >
                <div className="font-serif-display text-lg text-foreground">
                  {card.name[lang]}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.upright[lang]}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-surface p-8">
          <h2 className="font-serif-display text-2xl text-primary">
            {guideUi.relatedGuides[lang]}
          </h2>
          <div className="mt-5 grid gap-3">
            {relatedGuides.map((entry) => (
              <Link
                key={entry.slug}
                href={`/${lang}/guides/${entry.slug}`}
                className="rounded-2xl border border-border px-4 py-4 transition-colors hover:border-primary"
              >
                <div className="font-serif-display text-lg text-foreground">
                  {entry.title[lang]}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {entry.description[lang]}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section className="mx-auto mt-16 max-w-3xl border-t border-border pt-10">
        <h2 className="font-serif-display text-3xl text-primary">
          {guideUi.faqTitle[lang]}
        </h2>
        <div className="mt-6 space-y-6">
          {guide.faqs.map((faq) => (
            <div key={faq.q.en} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-serif-display text-xl text-foreground">
                {faq.q[lang]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {faq.a[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
