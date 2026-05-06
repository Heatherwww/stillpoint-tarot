"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { fullDeck, getCardImagePath, type TarotCard } from "@/lib/cards";
import { getCardExtras } from "@/lib/cardExtras";

export default function CardDetailClient({ card }: { card: TarotCard }) {
  const { t, lang } = useLang();
  const extras = getCardExtras(card);

  const arcanaLabel =
    card.arcana === "major"
      ? t("card.arcana.major")
      : t("card.arcana.minor");

  const suitLabel = card.suit
    ? t(`cards.filter.${card.suit}` as never)
    : null;

  const yesNoLabel =
    extras.yesNo.answer === "yes"
      ? t("card.yesno.yes")
      : extras.yesNo.answer === "no"
        ? t("card.yesno.no")
        : t("card.yesno.maybe");

  const yesNoColor =
    extras.yesNo.answer === "yes"
      ? "bg-primary text-white"
      : extras.yesNo.answer === "no"
        ? "bg-accent text-white"
        : "bg-surface-muted text-foreground";

  // Prev / next navigation
  const idx = fullDeck.findIndex((c) => c.id === card.id);
  const prevCard = idx > 0 ? fullDeck[idx - 1] : null;
  const nextCard = idx < fullDeck.length - 1 ? fullDeck[idx + 1] : null;

  // Resolve related cards
  const relatedCards = extras.related
    .map((id) => fullDeck.find((c) => c.id === id))
    .filter((c): c is TarotCard => c !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Breadcrumb (also rendered as JSON-LD on the server) */}
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href={`/${lang}`} className="hover:text-primary transition-colors">
          {t("card.breadcrumb.home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${lang}/cards`} className="hover:text-primary transition-colors">
          {t("card.breadcrumb.cards")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/70">{card.name[lang]}</span>
      </nav>

      <header className="mt-6 text-center">
        <div className="text-xs uppercase tracking-widest text-accent">
          {arcanaLabel}
          {suitLabel && <> · {suitLabel}</>}
          {card.number !== undefined && <> · {card.number}</>}
        </div>
        <h1 className="mt-3 font-serif-display text-5xl md:text-6xl text-primary">
          {card.name[lang]}
        </h1>
      </header>

      {/* Card visual */}
      <div className="mt-10 flex justify-center">
        <div className="w-56 overflow-hidden rounded-2xl shadow-xl bg-surface-muted">
          <Image
            src={getCardImagePath(card.id)}
            alt={card.name[lang]}
            width={500}
            height={833}
            className="block h-auto w-full"
            priority
          />
        </div>
      </div>

      {/* At a glance: keywords + element + numerology */}
      <div className="mt-10 text-center">
        <div className="text-[10px] uppercase tracking-widest text-muted">
          {t("card.keywords.label")}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {card.keywords[lang].map((kw) => (
            <span
              key={kw}
              className="text-sm px-3 py-1.5 rounded-full bg-surface-muted text-foreground/75 border border-border"
            >
              {kw}
            </span>
          ))}
        </div>
        {(extras.element || extras.numerology) && (
          <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-muted">
            {extras.element && (
              <div>
                <span className="text-xs uppercase tracking-wider mr-2">
                  {t("card.element.label")}
                </span>
                <span className="text-foreground/80">
                  {extras.element[lang]}
                </span>
              </div>
            )}
            {extras.numerology && (
              <div className="max-w-md">
                <span className="text-xs uppercase tracking-wider mr-2">
                  {t("card.numerology.label")}
                </span>
                <span className="text-foreground/80">
                  {extras.numerology[lang]}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Primary CTA for search visitors who land on a card meaning page */}
      <section className="mt-10 rounded-3xl border border-primary/30 bg-primary/10 p-6 shadow-lg shadow-primary/10 md:p-8">
        <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
          {t("card.readingCta.kicker")}
        </p>
        <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif-display text-2xl text-primary">
              {t("card.readingCta.title")}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground/75">
              {t("card.readingCta.body")}
            </p>
          </div>
          <Link
            href={`/${lang}/reading`}
            className="shrink-0 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {t("card.readingCta.button")}
          </Link>
        </div>
      </section>

      {/* Upright meaning */}
      <section className="mt-12 rounded-2xl border border-border bg-surface p-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="font-serif-display text-2xl text-primary">
            {lang === "zh"
              ? `${card.name.zh}正位含义`
              : `${card.name.en} upright meaning`}
          </h2>
        </div>
        <p className="mt-4 text-foreground/85 leading-relaxed text-lg">
          {card.upright[lang]}
        </p>
      </section>

      {/* Reversed meaning */}
      <section className="mt-6 rounded-2xl border border-border bg-surface-muted p-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-accent" />
          <h2 className="font-serif-display text-2xl text-accent">
            {lang === "zh"
              ? `${card.name.zh}逆位含义`
              : `${card.name.en} reversed meaning`}
          </h2>
        </div>
        <p className="mt-4 text-foreground/85 leading-relaxed text-lg">
          {card.reversed[lang]}
        </p>
      </section>

      {/* In love */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {lang === "zh"
            ? `${card.name.zh}在爱情与关系中`
            : `${card.name.en} in love & relationships`}
        </h2>
        <p className="mt-4 text-foreground/85 leading-relaxed">
          {extras.inLove[lang]}
        </p>
      </section>

      {/* In career */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {lang === "zh"
            ? `${card.name.zh}在事业与金钱中`
            : `${card.name.en} in career & money`}
        </h2>
        <p className="mt-4 text-foreground/85 leading-relaxed">
          {extras.inCareer[lang]}
        </p>
      </section>

      {/* As advice */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {t("card.advice.title")}
        </h2>
        <p className="mt-4 text-foreground/85 leading-relaxed italic">
          {extras.advice[lang]}
        </p>
      </section>

      {/* Yes or no */}
      <section className="mt-6 rounded-2xl border border-border bg-surface-muted p-8">
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="font-serif-display text-2xl text-primary">
            {lang === "zh"
              ? `${card.name.zh}是「是」还是「否」？`
              : `Is ${card.name.en} a yes or no?`}
          </h2>
          <span
            className={`inline-block rounded-full px-4 py-1.5 text-sm font-medium ${yesNoColor}`}
          >
            {yesNoLabel}
          </span>
        </div>
        <p className="mt-4 text-foreground/85 leading-relaxed">
          {extras.yesNo.explain[lang]}
        </p>
      </section>

      {/* Related cards */}
      {relatedCards.length > 0 && (
        <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
          <h2 className="font-serif-display text-2xl text-primary">
            {t("card.related.title")}
          </h2>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {relatedCards.map((rc) => (
              <Link
                key={rc.id}
                href={`/${lang}/cards/${rc.id}`}
                className="group block text-center"
              >
                <div className="overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow bg-surface-muted">
                  <Image
                    src={getCardImagePath(rc.id)}
                    alt={rc.name[lang]}
                    width={500}
                    height={833}
                    className="block h-auto w-full"
                  />
                </div>
                <div className="mt-2 font-serif-display text-sm text-foreground/80 group-hover:text-primary transition-colors">
                  {rc.name[lang]}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {t("card.faq.title")}
        </h2>
        <div className="mt-5 space-y-5">
          {extras.faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-medium text-foreground/90">
                {faq.q[lang]}
              </h3>
              <p className="mt-2 text-foreground/75 leading-relaxed text-sm">
                {faq.a[lang]}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Prev / Next navigation */}
      <nav className="mt-12 flex items-stretch justify-between gap-4" aria-label="Card navigation">
        {prevCard ? (
          <Link
            href={`/${lang}/cards/${prevCard.id}`}
            className="group flex-1 rounded-2xl border border-border bg-surface p-5 hover:border-primary transition-colors"
          >
            <div className="text-xs text-muted">{t("card.prev")}</div>
            <div className="mt-1 font-serif-display text-sm group-hover:text-primary transition-colors">
              ← {prevCard.name[lang]}
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
        {nextCard ? (
          <Link
            href={`/${lang}/cards/${nextCard.id}`}
            className="group flex-1 rounded-2xl border border-border bg-surface p-5 text-right hover:border-primary transition-colors"
          >
            <div className="text-xs text-muted">{t("card.next")}</div>
            <div className="mt-1 font-serif-display text-sm group-hover:text-primary transition-colors">
              {nextCard.name[lang]} →
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </nav>

      {/* CTA back to reading */}
      <div className="mt-8 text-center">
        <Link
          href={`/${lang}/reading`}
          className="inline-block rounded-full bg-primary px-8 py-3 text-white font-medium hover:bg-primary-hover transition-colors"
        >
          {t("card.cta")}
        </Link>
      </div>
    </div>
  );
}
