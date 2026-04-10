"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import {
  drawCards,
  fullDeck,
  majorArcana,
  getName,
  getKeywords,
  getMeaning,
  type DrawnCard,
} from "@/lib/cards";

type SpreadKind = "single" | "three";
type DeckKind = "major" | "full";

const POSITION_KEYS = ["past", "present", "future"] as const;

export default function ReadingPage() {
  const { t, lang } = useLang();
  const [spread, setSpread] = useState<SpreadKind>("single");
  const [deck, setDeck] = useState<DeckKind>("major");
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null);
  const [shuffling, setShuffling] = useState(false);

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
          <div className="mt-3 space-y-4">
            <ChoiceRow
              checked={spread === "single"}
              onChange={() => setSpread("single")}
              label={t("reading.spread.single")}
              help={t("reading.spread.single.help")}
            />
            <ChoiceRow
              checked={spread === "three"}
              onChange={() => setSpread("three")}
              label={t("reading.spread.three")}
              help={t("reading.spread.three.help")}
            />
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-6">
          <div className="text-xs uppercase tracking-wider text-muted">
            {t("reading.deck.label")}
          </div>
          <div className="mt-3 space-y-4">
            <ChoiceRow
              checked={deck === "major"}
              onChange={() => setDeck("major")}
              label={t("reading.deck.major")}
              help={t("reading.deck.major.help")}
            />
            <ChoiceRow
              checked={deck === "full"}
              onChange={() => setDeck("full")}
              label={t("reading.deck.full")}
              help={t("reading.deck.full.help")}
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
        <>
          <div
            className={`mt-14 grid gap-8 ${
              drawn.length === 1
                ? "max-w-2xl mx-auto"
                : "md:grid-cols-3"
            }`}
          >
            {drawn.map((d, i) => {
              const positionKey =
                drawn.length > 1 ? POSITION_KEYS[i] : null;
              const positionLabel = positionKey
                ? t(`reading.position.${positionKey}` as never)
                : null;
              const positionIntro = positionKey
                ? t(`reading.position.intro.${positionKey}` as never)
                : null;
              return (
                <article
                  key={`${d.card.id}-${i}`}
                  className="animate-float-in rounded-2xl border border-border bg-surface p-6"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  {positionLabel && (
                    <div className="text-center text-xs uppercase tracking-wider text-accent">
                      {positionLabel}
                    </div>
                  )}
                  <div className="mx-auto mt-3 aspect-[2/3] w-40 rounded-xl card-back flex items-center justify-center text-white/90 shadow-lg">
                    <div
                      className={`font-serif-display text-2xl px-3 text-center ${
                        d.reversed ? "rotate-180" : ""
                      }`}
                    >
                      {getName(d.card, lang)}
                    </div>
                  </div>
                  <h3 className="mt-5 font-serif-display text-2xl text-center">
                    {getName(d.card, lang)}
                  </h3>
                  <div className="mt-2 text-center">
                    <span
                      className={`inline-block text-xs px-2 py-0.5 rounded-full ${
                        d.reversed
                          ? "bg-accent-soft text-accent"
                          : "bg-primary-soft text-primary"
                      }`}
                    >
                      {d.reversed
                        ? t("reading.reversed")
                        : t("reading.upright")}
                    </span>
                  </div>

                  {/* Keywords */}
                  <div className="mt-4">
                    <div className="text-[10px] uppercase tracking-wider text-muted text-center">
                      {t("reading.keywords.label")}
                    </div>
                    <div className="mt-2 flex flex-wrap justify-center gap-1.5">
                      {getKeywords(d.card, lang).map((kw) => (
                        <span
                          key={kw}
                          className="text-xs px-2.5 py-1 rounded-full bg-surface-muted text-foreground/70 border border-border"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Position framing (3-card only) */}
                  {positionIntro && (
                    <p className="mt-5 text-sm italic text-muted leading-relaxed text-center">
                      {positionIntro}
                    </p>
                  )}

                  {/* Full meaning */}
                  <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
                    {getMeaning(d, lang)}
                  </p>
                </article>
              );
            })}
          </div>

          {/* Closing reflection */}
          <div className="mt-14 mx-auto max-w-2xl rounded-2xl border border-border bg-surface-muted p-8 text-center">
            <div className="font-serif-display text-2xl text-primary">
              {drawn.length === 1
                ? t("reading.single.synthesis.title")
                : t("reading.synthesis.title")}
            </div>
            <p className="mt-3 text-foreground/80 leading-relaxed">
              {drawn.length === 1
                ? t("reading.single.synthesis.body")
                : t("reading.synthesis.body")}
            </p>
          </div>
        </>
      )}

      <p className="mt-16 text-center text-xs text-muted">
        {t("reading.disclaimer")}
      </p>
    </div>
  );
}

function ChoiceRow({
  checked,
  onChange,
  label,
  help,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  help: string;
}) {
  return (
    <label className="flex gap-3 cursor-pointer">
      <span
        className={`mt-1 inline-block h-4 w-4 flex-shrink-0 rounded-full border-2 transition-colors ${
          checked ? "border-primary bg-primary" : "border-border"
        }`}
      />
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span className="flex-1">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block mt-1 text-xs text-muted leading-relaxed">
          {help}
        </span>
      </span>
    </label>
  );
}
