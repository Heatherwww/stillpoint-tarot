"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { getCardImagePath, type TarotCard } from "@/lib/cards";

interface SuitPageProps {
  titleKey: string;
  bodyKey: string;
  cards: TarotCard[];
  themeKeywords: { en: string[]; zh: string[] };
}

export default function SuitPage({
  titleKey,
  bodyKey,
  cards,
  themeKeywords,
}: SuitPageProps) {
  const { t, lang } = useLang();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Breadcrumb */}
      <nav className="text-sm text-muted" aria-label="Breadcrumb">
        <Link href={`/${lang}`} className="hover:text-primary transition-colors">
          {t("card.breadcrumb.home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/${lang}/cards`} className="hover:text-primary transition-colors">
          {t("card.breadcrumb.cards")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground/70">{t(titleKey as never)}</span>
      </nav>

      <header className="mt-8 text-center">
        <h1 className="font-serif-display text-4xl md:text-5xl text-primary">
          {t(titleKey as never)}
        </h1>
      </header>

      {/* Core themes */}
      <div className="mt-8 text-center">
        <div className="text-[10px] uppercase tracking-widest text-muted">
          {t("suit.keywords.label")}
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {themeKeywords[lang].map((kw) => (
            <span
              key={kw}
              className="text-sm px-3 py-1.5 rounded-full bg-surface-muted text-foreground/75 border border-border"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Long-form description */}
      <div className="mt-10 mx-auto max-w-3xl">
        <p className="text-lg text-foreground/80 leading-relaxed">
          {t(bodyKey as never)}
        </p>
      </div>

      {/* Card grid */}
      <div className="mt-14">
        <h2 className="font-serif-display text-2xl text-primary text-center">
          {t("suit.explore")}
        </h2>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/${lang}/cards/${card.id}`}
              className="group rounded-2xl border border-border bg-surface p-4 hover:border-primary transition-colors"
            >
              <div className="w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow bg-surface-muted">
                <Image
                  src={getCardImagePath(card.id)}
                  alt={card.name[lang]}
                  width={500}
                  height={833}
                  className="block h-auto w-full"
                />
              </div>
              <h3 className="mt-3 font-serif-display text-base text-center">
                {card.name[lang]}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
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
