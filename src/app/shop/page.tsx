"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { products } from "@/lib/products";

export default function ShopPage() {
  const { t, lang } = useLang();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatPrice = (cents: number) =>
    `$${(cents / 100).toFixed(2)}`;

  const handleBuy = async (productId: string) => {
    setLoadingId(productId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, lang }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout unavailable. Set STRIPE_SECRET_KEY in .env.local.");
        setLoadingId(null);
      }
    } catch {
      alert("Checkout unavailable. Set STRIPE_SECRET_KEY in .env.local.");
      setLoadingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <header className="text-center">
        <h1 className="font-serif-display text-4xl md:text-5xl text-primary">
          {t("shop.title")}
        </h1>
        <p className="mt-3 text-muted max-w-2xl mx-auto">
          {t("shop.subtitle")}
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article
            key={p.id}
            className="rounded-2xl border border-border bg-surface p-6 flex flex-col"
          >
            <div className="aspect-square rounded-xl bg-surface-muted flex items-center justify-center text-6xl">
              {p.emoji}
            </div>
            <h3 className="mt-5 font-serif-display text-xl">{p.name[lang]}</h3>
            <p className="mt-2 text-sm text-muted flex-1">
              {p.description[lang]}
            </p>
            <div className="mt-5 flex items-center justify-between">
              <span className="font-serif-display text-2xl text-accent">
                {formatPrice(p.priceCents)}
              </span>
              <button
                onClick={() => handleBuy(p.id)}
                disabled={loadingId === p.id}
                className="rounded-full bg-primary px-4 py-2 text-white text-sm font-medium hover:bg-primary-hover transition-colors disabled:opacity-60"
              >
                {loadingId === p.id ? t("shop.loading") : t("shop.add")}
              </button>
            </div>
          </article>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-muted max-w-xl mx-auto">
        {t("shop.testmode")}
      </p>
    </div>
  );
}
