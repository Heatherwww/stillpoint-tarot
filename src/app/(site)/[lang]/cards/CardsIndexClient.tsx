"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import {
  fullDeck,
  getCardImagePath,
  majorArcana,
  minorArcana,
  type Suit,
} from "@/lib/cards";
import { guideSummaries } from "@/lib/guideSummaries";

type Filter = "all" | "major" | Suit;

const FILTERS: Filter[] = [
  "all",
  "major",
  "wands",
  "cups",
  "swords",
  "pentacles",
];

export default function CardsIndexClient() {
  const { t, lang } = useLang();
  const [filter, setFilter] = useState<Filter>("all");

  const cards =
    filter === "all"
      ? fullDeck
      : filter === "major"
        ? majorArcana
        : minorArcana.filter((c) => c.suit === filter);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <h1 className="font-serif-display text-4xl md:text-5xl text-primary">
          {t("cards.title")}
        </h1>
        <p className="mt-3 text-muted max-w-2xl mx-auto">
          {t("cards.subtitle")}
        </p>
        <div className="mx-auto mt-8 max-w-3xl rounded-3xl border border-primary/30 bg-primary/10 p-6 text-left shadow-lg shadow-primary/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-accent">
            {t("cards.readingCta.kicker")}
          </p>
          <div className="mt-3 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif-display text-2xl text-primary">
                {t("cards.readingCta.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                {t("cards.readingCta.body")}
              </p>
            </div>
            <Link
              href={`/${lang}/reading`}
              className="shrink-0 rounded-full bg-primary px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("cards.readingCta.button")}
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
            {t("footer.guides")}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {guideSummaries.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${lang}/guides/${guide.slug}`}
                className="rounded-full border border-border bg-surface px-4 py-2 text-sm text-foreground/80 transition-colors hover:border-primary hover:text-foreground"
              >
                {guide.title[lang]}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className="mt-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-foreground/80 border-border hover:border-primary"
              }`}
            >
              {t(`cards.filter.${f}` as never)}
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/${lang}/cards/${card.id}`}
            className="group rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-primary"
          >
            <div className="w-full overflow-hidden rounded-xl bg-surface-muted shadow-md transition-shadow group-hover:shadow-lg">
              <Image
                src={getCardImagePath(card.id)}
                alt={card.name[lang]}
                width={500}
                height={833}
                className="block h-auto w-full"
              />
            </div>
            <h3 className="mt-3 text-center font-serif-display text-base">
              {card.name[lang]}
            </h3>
            <div className="mt-1 text-center text-[10px] uppercase tracking-wider text-muted">
              {card.arcana === "major"
                ? t("card.arcana.major")
                : t(`cards.filter.${card.suit}` as never)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
