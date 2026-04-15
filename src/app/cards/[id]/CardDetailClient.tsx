"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import type { TarotCard } from "@/lib/cards";
import { fullDeck } from "@/lib/cards";
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

  // Resolve related cards
  const relatedCards = extras.related
    .map((id) => fullDeck.find((c) => c.id === id))
    .filter((c): c is TarotCard => c !== undefined);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      {/* Breadcrumb (also rendered as JSON-LD on the server) */}
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary transition-colors">
          {t("card.breadcrumb.home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href="/cards" className="hover:text-primary transition-colors">
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
            src={`/cards/${card.id}.jpg`}
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

      {/* Upright meaning */}
      <section className="mt-12 rounded-2xl border border-border bg-surface p-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="font-serif-display text-2xl text-primary">
            {t("card.upright.title")}
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
            {t("card.reversed.title")}
          </h2>
        </div>
        <p className="mt-4 text-foreground/85 leading-relaxed text-lg">
          {card.reversed[lang]}
        </p>
      </section>

      {/* In love */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {t("card.love.title")}
        </h2>
        <p className="mt-4 text-foreground/85 leading-relaxed">
          {extras.inLove[lang]}
        </p>
      </section>

      {/* In career */}
      <section className="mt-6 rounded-2xl border border-border bg-surface p-8">
        <h2 className="font-serif-display text-2xl text-primary">
          {t("card.career.title")}
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
            {t("card.yesno.title")}
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
                href={`/cards/${rc.id}`}
                className="group block text-center"
              >
                <div className="overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow bg-surface-muted">
                  <Image
                    src={`/cards/${rc.id}.jpg`}
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

      {/* CTA back to reading */}
      <div className="mt-12 text-center">
        <Link
          href="/reading"
          className="inline-block rounded-full bg-primary px-8 py-3 text-white font-medium hover:bg-primary-hover transition-colors"
        >
          {t("card.cta")}
        </Link>
      </div>
    </div>
  );
}
