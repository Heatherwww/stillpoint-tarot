"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import {
  fullDeck,
  majorArcana,
  minorArcana,
  type Suit,
} from "@/lib/cards";

type Filter = "all" | "major" | Suit;

const FILTERS: Filter[] = [
  "all",
  "major",
  "wands",
  "cups",
  "swords",
  "pentacles",
];

export default function CardsIndexPage() {
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
      </header>

      {/* Filter chips */}
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

      {/* Card grid */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {cards.map((card) => (
          <Link
            key={card.id}
            href={`/cards/${card.id}`}
            className="group rounded-2xl border border-border bg-surface p-4 hover:border-primary transition-colors"
          >
            <div className="w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow bg-surface-muted">
              <Image
                src={`/cards/${card.id}.jpg`}
                alt={card.name[lang]}
                width={500}
                height={833}
                className="block h-auto w-full"
              />
            </div>
            <h3 className="mt-3 font-serif-display text-base text-center">
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
