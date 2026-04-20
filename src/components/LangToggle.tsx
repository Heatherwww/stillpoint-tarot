"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLang } from "@/lib/i18n";

function swapLang(pathname: string, target: "en" | "zh"): string {
  // pathname always starts with /en or /zh at this level
  const parts = pathname.split("/");
  if (parts[1] === "en" || parts[1] === "zh") {
    parts[1] = target;
    return parts.join("/") || `/${target}`;
  }
  return `/${target}`;
}

export default function LangToggle() {
  const { lang } = useLang();
  const pathname = usePathname() ?? `/${lang}`;
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface text-xs">
      <Link
        href={swapLang(pathname, "en")}
        className={`px-3 py-1 rounded-full transition-colors ${
          lang === "en" ? "bg-primary text-white" : "text-muted hover:text-foreground"
        }`}
        aria-pressed={lang === "en"}
        hrefLang="en"
      >
        EN
      </Link>
      <Link
        href={swapLang(pathname, "zh")}
        className={`px-3 py-1 rounded-full transition-colors ${
          lang === "zh" ? "bg-primary text-white" : "text-muted hover:text-foreground"
        }`}
        aria-pressed={lang === "zh"}
        hrefLang="zh"
      >
        中文
      </Link>
    </div>
  );
}
