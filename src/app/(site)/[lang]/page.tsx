"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { fullDeck } from "@/lib/cards";

// Most-searched tarot cards (high Google volume)
const POPULAR_IDS = [
  "the-fool",
  "the-lovers",
  "death",
  "the-tower",
  "three-of-swords",
  "ten-of-pentacles",
  "the-star",
  "queen-of-cups",
];
const popularCards = POPULAR_IDS.map((id) => fullDeck.find((c) => c.id === id)!);

const SUITS = [
  { key: "major", slug: "major", emoji: "✦" },
  { key: "wands", slug: "wands", emoji: "🔥" },
  { key: "cups", slug: "cups", emoji: "💧" },
  { key: "swords", slug: "swords", emoji: "🌬" },
  { key: "pentacles", slug: "pentacles", emoji: "🌿" },
] as const;

export default function HomePage() {
  const { t, lang } = useLang();
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="starfield absolute inset-0 opacity-60" aria-hidden />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
          <Image
            src="/logo.png"
            alt="Stillpoint Tarot logo"
            width={180}
            height={180}
            className="mx-auto rounded-full"
            priority
          />
          <h1 className="mt-8 font-serif-display text-5xl md:text-6xl text-foreground leading-tight">
            {t("home.hero.title")}
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/reading`}
              className="rounded-full bg-primary px-6 py-3 text-white text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              {t("home.hero.cta")}
            </Link>
            <Link
              href={`/${lang}/cards`}
              className="rounded-full border border-border bg-surface px-6 py-3 text-foreground text-sm font-medium hover:border-primary transition-colors"
            >
              {t("home.hero.browse")}
            </Link>
          </div>
        </div>
      </section>

      {/* Popular cards */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-serif-display text-3xl text-primary text-center">
            {t("home.popular.title")}
          </h2>
          <p className="mt-3 text-center text-muted max-w-2xl mx-auto">
            {t("home.popular.subtitle")}
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-5">
            {popularCards.map((card) => (
              <Link
                key={card.id}
                href={`/${lang}/cards/${card.id}`}
                className="group rounded-2xl border border-border bg-surface p-4 hover:border-primary transition-colors"
              >
                <div className="w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow bg-surface-muted">
                  <Image
                    src={`/cards/${card.id}.webp`}
                    alt={card.name[lang]}
                    width={500}
                    height={833}
                    className="block h-auto w-full"
                  />
                </div>
                <h3 className="mt-3 font-serif-display text-sm text-center group-hover:text-primary transition-colors">
                  {card.name[lang]}
                </h3>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={`/${lang}/cards`}
              className="text-sm text-primary hover:underline"
            >
              {t("home.popular.viewall")}
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by suit */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif-display text-3xl text-primary text-center">
            {t("home.suits.title")}
          </h2>
          <p className="mt-3 text-center text-muted max-w-2xl mx-auto">
            {t("home.suits.subtitle")}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SUITS.map((s) => (
              <Link
                key={s.key}
                href={`/${lang}/cards/${s.slug}`}
                className="group rounded-2xl border border-border bg-surface p-6 text-center hover:border-primary transition-colors"
              >
                <div className="text-3xl">{s.emoji}</div>
                <h3 className="mt-3 font-serif-display text-lg group-hover:text-primary transition-colors">
                  {t(`cards.filter.${s.key === "major" ? "major" : s.key}` as never)}
                </h3>
                <p className="mt-1 text-xs text-muted">
                  {s.key === "major" ? "22" : "14"} {t("home.suits.cards")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* What is tarot */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-serif-display text-3xl text-primary">
            {t("home.what.title")}
          </h2>
          <p className="mt-6 text-lg text-foreground/80 leading-relaxed">
            {t("home.what.body")}
          </p>
        </div>
      </section>

      {/* How a reading works */}
      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif-display text-3xl text-primary text-center">
            {t("home.how.title")}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-surface border border-border p-8"
              >
                <div className="font-serif-display text-3xl text-accent">
                  0{n}
                </div>
                <h3 className="mt-3 font-serif-display text-xl">
                  {t(`home.how.step${n}.title` as never)}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {t(`home.how.step${n}.body` as never)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two halves */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="font-serif-display text-3xl text-primary text-center">
            {t("home.arcana.title")}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Link
              href={`/${lang}/cards/major`}
              className="group rounded-2xl border border-border p-8 hover:border-primary transition-colors"
            >
              <h3 className="font-serif-display text-2xl group-hover:text-primary transition-colors">
                {t("home.arcana.major.title")}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {t("home.arcana.major.body")}
              </p>
            </Link>
            <Link
              href={`/${lang}/cards/wands`}
              className="group rounded-2xl border border-border p-8 hover:border-primary transition-colors"
            >
              <h3 className="font-serif-display text-2xl group-hover:text-primary transition-colors">
                {t("home.arcana.minor.title")}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {t("home.arcana.minor.body")}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
