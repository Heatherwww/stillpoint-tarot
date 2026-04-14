import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fullDeck } from "@/lib/cards";
import CardDetailClient from "./CardDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return fullDeck.map((card) => ({ id: card.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const card = fullDeck.find((c) => c.id === id);
  if (!card) return { title: "Card not found" };

  // English metadata for crawlers (default). Bilingual hreflang is planned
  // as a separate task — see DECISIONS.md.
  const title = `${card.name.en} — Tarot Card Meaning · Stillpoint Tarot`;
  const description = `${card.name.en} tarot card: upright and reversed meanings, keywords, and how it shows up in love, work, and self-reflection. ${card.upright.en.slice(0, 100)}…`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = fullDeck.find((c) => c.id === id);
  if (!card) notFound();

  return <CardDetailClient card={card} />;
}
