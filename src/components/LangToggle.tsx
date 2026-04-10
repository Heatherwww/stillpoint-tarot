"use client";

import { useLang } from "@/lib/i18n";

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="inline-flex items-center rounded-full border border-border bg-surface text-xs">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded-full transition-colors ${
          lang === "en" ? "bg-primary text-white" : "text-muted hover:text-foreground"
        }`}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("zh")}
        className={`px-3 py-1 rounded-full transition-colors ${
          lang === "zh" ? "bg-primary text-white" : "text-muted hover:text-foreground"
        }`}
        aria-pressed={lang === "zh"}
      >
        中文
      </button>
    </div>
  );
}
