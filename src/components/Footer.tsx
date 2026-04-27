"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { guideSummaries } from "@/lib/guideSummaries";

export default function Footer() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 py-10 text-center text-sm text-muted">
        <Image
          src="/logo.png"
          alt="Stillpoint Tarot logo"
          width={64}
          height={64}
          className="rounded-full"
        />
        <p className="mt-3 font-serif-display text-base text-foreground">
          {t("nav.brand")}
        </p>
        <p className="mt-2">{t("footer.tagline")}</p>
        <div className="mt-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
            {t("footer.guides")}
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            {guideSummaries.map((guide) => (
              <Link
                key={guide.slug}
                href={`/${lang}/guides/${guide.slug}`}
                className="text-xs text-foreground/75 transition-colors hover:text-primary"
              >
                {guide.title[lang]}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-4">漏 {year} 路 {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
