"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import {
  drawCards,
  fullDeck,
  majorArcana,
  getName,
  getKeywords,
  getMeaning,
  type DrawnCard,
  type TarotCard,
} from "@/lib/cards";
import { getCardExtras } from "@/lib/cardExtras";

type SpreadKind = "single" | "three";
type DeckKind = "major" | "full";
type Area = "love" | "work" | "self" | "decision" | "general";
type Situation = "stuck" | "choosing" | "processing" | "curious";
type Intent = "clarity" | "permission" | "push" | "reflection";

const POSITION_KEYS = ["past", "present", "future"] as const;
const AREAS: Area[] = ["love", "work", "self", "decision", "general"];
const SITUATIONS: Situation[] = ["stuck", "choosing", "processing", "curious"];
const INTENTS: Intent[] = ["clarity", "permission", "push", "reflection"];

export default function ReadingPage() {
  const { t, lang } = useLang();

  // Questions
  const [area, setArea] = useState<Area | null>(null);
  const [situation, setSituation] = useState<Situation | null>(null);
  const [intent, setIntent] = useState<Intent | null>(null);

  // Spread/deck
  const [spread, setSpread] = useState<SpreadKind>("single");
  const [deck, setDeck] = useState<DeckKind>("major");

  // Drawn state
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null);
  const [clarifier, setClarifier] = useState<DrawnCard | null>(null);
  const [shuffling, setShuffling] = useState(false);

  // Follow-ups revealed
  const [showApplies, setShowApplies] = useState(false);
  const [showStep, setShowStep] = useState(false);

  // The answers locked in at draw-time (so later language-switches still match)
  const [lockedAnswers, setLockedAnswers] = useState<{
    area: Area;
    situation: Situation;
    intent: Intent;
  } | null>(null);

  const canDraw = area && situation && intent && !shuffling;

  const handleDraw = () => {
    if (!area || !situation || !intent) return;
    setShuffling(true);
    setDrawn(null);
    setClarifier(null);
    setShowApplies(false);
    setShowStep(false);
    const source = deck === "full" ? fullDeck : majorArcana;
    const count = spread === "single" ? 1 : 3;
    setTimeout(() => {
      setDrawn(drawCards(source, count));
      setLockedAnswers({ area, situation, intent });
      setShuffling(false);
    }, 900);
  };

  const handleClarify = () => {
    if (!drawn) return;
    // Exclude already-drawn cards from the clarifying draw
    const used = new Set(drawn.map((d) => d.card.id));
    if (clarifier) used.add(clarifier.card.id);
    const source = (deck === "full" ? fullDeck : majorArcana).filter(
      (c: TarotCard) => !used.has(c.id)
    );
    const [card] = drawCards(source, 1);
    setClarifier(card);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <header className="text-center">
        <h1 className="font-serif-display text-4xl md:text-5xl text-primary">
          {t("reading.title")}
        </h1>
        <p className="mt-3 text-muted">{t("reading.subtitle")}</p>
      </header>

      {/* Pre-reading questions */}
      <section className="mt-12 rounded-2xl border border-border bg-surface p-8">
        <div className="text-center">
          <h2 className="font-serif-display text-2xl text-primary">
            {t("reading.questions.title")}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {t("reading.questions.subtitle")}
          </p>
        </div>

        <div className="mt-8 space-y-8">
          <QuestionBlock
            label={t("reading.q.area")}
            options={AREAS.map((a) => ({
              value: a,
              label: t(`area.${a}` as never),
            }))}
            value={area}
            onChange={(v) => setArea(v as Area)}
          />
          <QuestionBlock
            label={t("reading.q.situation")}
            options={SITUATIONS.map((s) => ({
              value: s,
              label: t(`situation.${s}` as never),
            }))}
            value={situation}
            onChange={(v) => setSituation(v as Situation)}
          />
          <QuestionBlock
            label={t("reading.q.intent")}
            options={INTENTS.map((i) => ({
              value: i,
              label: t(`intent.${i}` as never),
            }))}
            value={intent}
            onChange={(v) => setIntent(v as Intent)}
          />
        </div>
      </section>

      {/* Spread + deck controls */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
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

      {/* Draw button */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <button
          onClick={handleDraw}
          disabled={!canDraw}
          className="rounded-full bg-primary px-8 py-3 text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {shuffling
            ? t("reading.shuffling")
            : drawn
            ? t("reading.redraw")
            : t("reading.draw")}
        </button>
        {!canDraw && !shuffling && (
          <p className="text-xs text-muted">
            {t("reading.draw.disabled")}
          </p>
        )}
      </div>

      {/* Reading result */}
      {drawn && lockedAnswers && (
        <div className="mt-16">
          {/* Opener, tuned to area */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-serif-display text-xl text-foreground/90 leading-relaxed">
              {t(`opener.${lockedAnswers.area}` as never)}
            </p>
          </div>

          {/* Drawn cards */}
          <div
            className={`mt-12 grid gap-8 ${
              drawn.length === 1 ? "max-w-2xl mx-auto" : "md:grid-cols-3"
            }`}
          >
            {drawn.map((d, i) => (
              <CardDisplay
                key={`${d.card.id}-${i}`}
                drawn={d}
                positionIndex={drawn.length > 1 ? i : null}
                delayMs={i * 150}
                area={lockedAnswers.area}
              />
            ))}
          </div>

          {/* Situation bridge */}
          <p className="mt-10 mx-auto max-w-2xl text-center text-sm italic text-muted leading-relaxed">
            {t(`bridge.${lockedAnswers.situation}` as never)}
          </p>

          {/* Intent closer */}
          <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-border bg-surface-muted p-8">
            <p className="text-foreground/85 leading-relaxed">
              {t(`closer.${lockedAnswers.intent}` as never)}
            </p>
          </div>

          {/* Follow-up buttons */}
          <div className="mt-12">
            <div className="text-center">
              <h3 className="font-serif-display text-2xl text-primary">
                {t("followup.title")}
              </h3>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <FollowUpButton
                onClick={() => setShowApplies((v) => !v)}
                active={showApplies}
                label={t("followup.applies")}
              />
              <FollowUpButton
                onClick={() => setShowStep((v) => !v)}
                active={showStep}
                label={t("followup.step")}
              />
              <FollowUpButton
                onClick={handleClarify}
                active={!!clarifier}
                label={t("followup.clarify")}
              />
            </div>

            {/* Applies panel */}
            {showApplies && (
              <div className="animate-float-in mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6">
                <p className="text-foreground/85 leading-relaxed">
                  {t(`applies.${lockedAnswers.area}` as never)}
                </p>
              </div>
            )}

            {/* Step panel */}
            {showStep && (
              <div className="animate-float-in mt-6 mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6">
                <p className="text-foreground/85 leading-relaxed">
                  {t(`step.${lockedAnswers.intent}` as never)}
                </p>
              </div>
            )}

            {/* Clarifying card */}
            {clarifier && (
              <div className="animate-float-in mt-8 mx-auto max-w-md">
                <div className="text-center text-xs uppercase tracking-wider text-accent mb-3">
                  {t("followup.clarify.label")}
                </div>
                <CardDisplay drawn={clarifier} positionIndex={null} delayMs={0} area={lockedAnswers.area} />
              </div>
            )}
          </div>

          {/* AI reading teaser hidden until DeepSeek + Airwallex are wired.
              Restore from branch: feature/shop-and-ai-payment */}
        </div>
      )}

      <p className="mt-16 text-center text-xs text-muted">
        {t("reading.disclaimer")}
      </p>
    </div>
  );
}

function QuestionBlock({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string | null;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-sm font-medium text-foreground/90">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`rounded-full px-4 py-2 text-sm border transition-colors ${
                active
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-foreground/80 border-border hover:border-primary"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
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

function CardDisplay({
  drawn,
  positionIndex,
  delayMs,
  area,
}: {
  drawn: DrawnCard;
  positionIndex: number | null;
  delayMs: number;
  area: Area;
}) {
  const { t, lang } = useLang();
  const extras = getCardExtras(drawn.card);
  const positionKey = positionIndex !== null ? POSITION_KEYS[positionIndex] : null;
  const positionLabel = positionKey
    ? t(`reading.position.${positionKey}` as never)
    : null;
  const positionIntro = positionKey
    ? t(`reading.position.intro.${positionKey}` as never)
    : null;

  // Pick the area-relevant context section from cardExtras
  const areaContext =
    area === "love"
      ? extras.inLove[lang]
      : area === "work"
        ? extras.inCareer[lang]
        : extras.advice[lang]; // self, decision, general → advice

  const areaLabel =
    area === "love"
      ? t("card.love.title")
      : area === "work"
        ? t("card.career.title")
        : t("card.advice.title");

  return (
    <article
      className="animate-float-in rounded-2xl border border-border bg-surface p-6"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      {positionLabel && (
        <div className="text-center text-xs uppercase tracking-wider text-accent">
          {positionLabel}
        </div>
      )}
      <div className="mx-auto mt-3 w-40 overflow-hidden rounded-xl shadow-lg bg-surface-muted">
        <Image
          src={`/cards/${drawn.card.id}.jpg`}
          alt={getName(drawn.card, lang)}
          width={500}
          height={833}
          className={`block h-auto w-full ${drawn.reversed ? "rotate-180" : ""}`}
          priority={positionIndex === null || positionIndex === 0}
        />
      </div>
      <h3 className="mt-5 font-serif-display text-2xl text-center">
        <Link
          href={`/cards/${drawn.card.id}`}
          className="hover:text-primary transition-colors"
        >
          {getName(drawn.card, lang)}
        </Link>
      </h3>
      <div className="mt-2 text-center">
        <span
          className={`inline-block text-xs px-2 py-0.5 rounded-full ${
            drawn.reversed
              ? "bg-accent-soft text-accent"
              : "bg-primary-soft text-primary"
          }`}
        >
          {drawn.reversed ? t("reading.reversed") : t("reading.upright")}
        </span>
      </div>
      <div className="mt-4">
        <div className="text-[10px] uppercase tracking-wider text-muted text-center">
          {t("reading.keywords.label")}
        </div>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          {getKeywords(drawn.card, lang).map((kw) => (
            <span
              key={kw}
              className="text-xs px-2.5 py-1 rounded-full bg-surface-muted text-foreground/70 border border-border"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
      {positionIntro && (
        <p className="mt-5 text-sm italic text-muted leading-relaxed text-center">
          {positionIntro}
        </p>
      )}
      {/* Core meaning */}
      <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
        {getMeaning(drawn, lang)}
      </p>
      {/* Area-specific context from cardExtras */}
      <div className="mt-5 pt-4 border-t border-border">
        <div className="text-[10px] uppercase tracking-wider text-accent">
          {areaLabel}
        </div>
        <p className="mt-2 text-sm text-foreground/80 leading-relaxed">
          {areaContext}
        </p>
      </div>
      {/* Yes/no indicator */}
      <div className="mt-4 flex items-center gap-2 text-xs text-muted">
        <span className="uppercase tracking-wider">{t("card.yesno.title")}</span>
        <span
          className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${
            extras.yesNo.answer === "yes"
              ? "bg-primary-soft text-primary"
              : extras.yesNo.answer === "no"
                ? "bg-accent-soft text-accent"
                : "bg-surface-muted text-foreground/60"
          }`}
        >
          {extras.yesNo.answer === "yes"
            ? t("card.yesno.yes")
            : extras.yesNo.answer === "no"
              ? t("card.yesno.no")
              : t("card.yesno.maybe")}
        </span>
      </div>
    </article>
  );
}

function FollowUpButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-sm border transition-colors ${
        active
          ? "bg-primary text-white border-primary"
          : "bg-surface text-foreground/80 border-border hover:border-primary"
      }`}
    >
      {label}
    </button>
  );
}

function LockIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}
