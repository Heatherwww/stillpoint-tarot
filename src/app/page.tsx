"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";

export default function HomePage() {
  const { t } = useLang();
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
              href="/reading"
              className="rounded-full bg-primary px-6 py-3 text-white text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              {t("home.hero.cta")}
            </Link>
            <Link
              href="/shop"
              className="rounded-full border border-border bg-surface px-6 py-3 text-foreground text-sm font-medium hover:border-primary transition-colors"
            >
              {t("home.hero.shop")}
            </Link>
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
            <div className="rounded-2xl border border-border p-8">
              <h3 className="font-serif-display text-2xl">
                {t("home.arcana.major.title")}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {t("home.arcana.major.body")}
              </p>
            </div>
            <div className="rounded-2xl border border-border p-8">
              <h3 className="font-serif-display text-2xl">
                {t("home.arcana.minor.title")}
              </h3>
              <p className="mt-3 text-muted leading-relaxed">
                {t("home.arcana.minor.body")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
