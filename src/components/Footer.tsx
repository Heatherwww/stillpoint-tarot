"use client";

import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="mx-auto max-w-6xl px-6 py-10 text-center text-sm text-muted">
        <p className="font-serif-display text-base text-foreground">
          {t("nav.brand")}
        </p>
        <p className="mt-2">{t("footer.tagline")}</p>
        <p className="mt-4">© {year} · {t("footer.rights")}</p>
      </div>
    </footer>
  );
}
