"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col items-center text-center text-sm text-muted">
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
        <p className="mt-4">© {year} · {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
