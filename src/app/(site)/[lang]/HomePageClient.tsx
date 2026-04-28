"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { fullDeck, getCardImagePath } from "@/lib/cards";
import { guideSummaries } from "@/lib/guideSummaries";

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
  { key: "swords", slug: "swords", emoji: "⚔️" },
  { key: "pentacles", slug: "pentacles", emoji: "🪙" },
] as const;

export default function HomePageClient() {
  const { t, lang } = useLang();
  return (
    <div>
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
          <h1 className="mt-8 font-serif-display text-5xl leading-tight text-foreground md:text-6xl">
            {t("home.hero.title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
            {t("home.hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href={`/${lang}/reading`}
              className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
            >
              {t("home.hero.cta")}
            </Link>
            <Link
              href={`/${lang}/cards`}
              className="rounded-full border border-border bg-surface px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary"
            >
              {t("home.hero.browse")}
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center font-serif-display text-3xl text-primary">
            {t("home.popular.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            {t("home.popular.subtitle")}
          </p>
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
            {popularCards.map((card) => (
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
                <h3 className="mt-3 text-center font-serif-display text-sm transition-colors group-hover:text-primary">
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

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center font-serif-display text-3xl text-primary">
            {t("home.suits.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            {t("home.suits.subtitle")}
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {SUITS.map((s) => (
              <Link
                key={s.key}
                href={`/${lang}/cards/${s.slug}`}
                className="group rounded-2xl border border-border bg-surface p-6 text-center transition-colors hover:border-primary"
              >
                <div className="text-3xl">{s.emoji}</div>
                <h3 className="mt-3 font-serif-display text-lg transition-colors group-hover:text-primary">
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h2 className="font-serif-display text-3xl text-primary">
            {t("home.what.title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            {t("home.what.body")}
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-center font-serif-display text-3xl text-primary">
            {t("home.guides.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted">
            {t("home.guides.subtitle")}
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {guideSummaries.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${lang}/guides/${guide.slug}`}
                className="group rounded-3xl border border-border bg-surface p-6 transition-colors hover:border-primary"
              >
                <h3 className="font-serif-display text-2xl text-foreground transition-colors group-hover:text-primary">
                  {guide.title[lang]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {guide.description[lang]}
                </p>
                <div className="mt-5 text-sm text-primary">
                  {t("home.guides.read")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-surface-muted">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center font-serif-display text-3xl text-primary">
            {t("home.how.title")}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-border bg-surface p-8"
              >
                <div className="font-serif-display text-3xl text-accent">
                  0{n}
                </div>
                <h3 className="mt-3 font-serif-display text-xl">
                  {t(`home.how.step${n}.title` as never)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {t(`home.how.step${n}.body` as never)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-center font-serif-display text-3xl text-primary">
            {t("home.arcana.title")}
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            <Link
              href={`/${lang}/cards/major`}
              className="group rounded-2xl border border-border p-8 transition-colors hover:border-primary"
            >
              <h3 className="font-serif-display text-2xl transition-colors group-hover:text-primary">
                {t("home.arcana.major.title")}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {t("home.arcana.major.body")}
              </p>
            </Link>
            <Link
              href={`/${lang}/cards/wands`}
              className="group rounded-2xl border border-border p-8 transition-colors hover:border-primary"
            >
              <h3 className="font-serif-display text-2xl transition-colors group-hover:text-primary">
                {t("home.arcana.minor.title")}
              </h3>
              <p className="mt-3 leading-relaxed text-muted">
                {t("home.arcana.minor.body")}
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
