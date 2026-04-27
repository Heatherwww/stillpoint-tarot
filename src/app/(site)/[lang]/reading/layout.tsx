import type { Metadata } from "next";
import { buildReadingMetadata } from "../_routeMeta";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  return buildReadingMetadata(lang === "zh" ? "zh" : "en");
}

export default function ReadingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
