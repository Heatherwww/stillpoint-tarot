"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import type { TarotCard } from "@/lib/cards";

export default function CardDetailClient({ card }: { card: TarotCard }) {
  const { t, lang } = useLang();

  const arcanaLabel =
    card.arcana === "major"
      ? t("card.arcana.major")
      : t("card.arcana.minor");

  const suitLabel = card.suit
    ? t(`cards.filter.${card.suit}` as never)
    : null;

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <Link
        href="/cards"
        className="text-sm text-muted hover:text-primary transition-colors"
      >
        {t("card.back")}
      </Link>

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
        <div className="aspect-[2/3] w-56 rounded-2xl card-back flex items-center justify-center text-white/90 shadow-xl">
          <div className="font-serif-display text-3xl px-4 text-center">
            {card.name[lang]}
          </div>
        </div>
      </div>

      {/* Keywords */}
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
