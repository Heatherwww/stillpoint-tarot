"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import {
  drawCards,
  fullDeck,
  majorArcana,
  getName,
  getMeaning,
  type DrawnCard,
} from "@/lib/cards";

type SpreadKind = "single" | "three";
type DeckKind = "major" | "full";

export default function ReadingPage() {
  const { t, lang } = useLang();
  const [spread, setSpread] = useState<SpreadKind>("single");
  const [deck, setDeck] = useState<DeckKind>("major");
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null);
  const [shuffling, setShuffling] = useState(false);

  const positions = (["past", "present", "future"] as const).map((k) =>
    t(`reading.position.${k}` as never)
  );

  const handleDraw = () => {
    setShuffling(true);
    setDrawn(null);
    const source = deck === "full" ? fullDeck : majorArcana;
    const count = spread === "single" ? 1 : 3;
    setTimeout(() => {
      setDrawn(drawCards(source, count));
      setShuffling(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <h1 className="font-serif-display text-4xl md:text-5xl text-primary">
          {t("reading.title")}
        </h1>
        <p className="mt-3 text-muted">{t("reading.subtitle")}</p>
      </header>

      {/* Controls */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="text-xs uppercase tracking-wider text-muted">
            {t("reading.spread.label")}
          </div>
          <div className="mt-3 space-y-2">
            <RadioRow
              checked={spread === "single"}
              onChange={() => setSpread("single")}
              label={t("reading.spread.single")}
            />
            <RadioRow
              checked={spread === "three"}
              onChange={() => setSpread("three")}
              label={t("reading.spread.three")}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="text-xs uppercase tracking-wider text-muted">
            {t("reading.deck.label")}
          </div>
          <div className="mt-3 space-y-2">
            <RadioRow
              checked={deck === "major"}
              onChange={() => setDeck("major")}
              label={t("reading.deck.major")}
            />
            <RadioRow
              checked={deck === "full"}
              onChange={() => setDeck("full")}
              label={t("reading.deck.full")}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleDraw}
          disabled={shuffling}
          className="rounded-full bg-primary px-8 py-3 text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-60"
        >
          {shuffling
            ? t("reading.shuffling")
            : drawn
            ? t("reading.redraw")
            : t("reading.draw")}
        </button>
      </div>

      {/* Drawn cards */}
      {drawn && (
        <div
          className={`mt-14 grid gap-8 ${
            drawn.length === 1
              ? "md:grid-cols-1 max-w-sm mx-auto"
              : "md:grid-cols-3"
          }`}
        >
          {drawn.map((d, i) => (
            <article
              key={`${d.card.id}-${i}`}
              className="animate-float-in rounded-2xl border border-border bg-surface p-6 text-center"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {drawn.length > 1 && (
                <div className="text-xs uppercase tracking-wider text-accent">
                  {positions[i]}
                </div>
              )}
              <div className="mx-auto mt-3 aspect-[2/3] w-40 rounded-xl card-back flex items-center justify-center text-white/90 shadow-lg">
                <div
                  className={`font-serif-display text-2xl px-3 ${
                    d.reversed ? "rotate-180" : ""
                  }`}
                >
                  {getName(d.card, lang)}
                </div>
              </div>
              <h3 className="mt-5 font-serif-display text-xl">
                {getName(d.card, lang)}
              </h3>
              <div
                className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full ${
                  d.reversed
                    ? "bg-accent-soft text-accent"
                    : "bg-primary-soft text-primary"
                }`}
              >
                {d.reversed ? t("reading.reversed") : t("reading.upright")}
              </div>
              <p className="mt-4 text-sm text-foreground/80 leading-relaxed">
                {getMeaning(d, lang)}
              </p>
            </article>
          ))}
        </div>
      )}

      <p className="mt-16 text-center text-xs text-muted">
        {t("reading.disclaimer")}
      </p>
    </div>
  );
}

function RadioRow({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer text-sm">
      <span
        className={`inline-block h-4 w-4 rounded-full border-2 transition-colors ${
          checked ? "border-primary bg-primary" : "border-border"
        }`}
      />
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span>{label}</span>
    </label>
  );
}
