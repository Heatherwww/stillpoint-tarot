"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import LangToggle from "./LangToggle";

export default function Nav() {
  const { t } = useLang();
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif-display text-2xl text-primary">
          {t("nav.brand")}
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-muted hover:text-foreground transition-colors">
            {t("nav.home")}
          </Link>
          <Link
            href="/reading"
            className="text-muted hover:text-foreground transition-colors"
          >
            {t("nav.reading")}
          </Link>
          <Link
            href="/shop"
            className="text-muted hover:text-foreground transition-colors"
          >
            {t("nav.shop")}
          </Link>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}
