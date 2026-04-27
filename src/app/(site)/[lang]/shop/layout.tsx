import type { Metadata } from "next";
import { buildShopMetadata } from "../_routeMeta";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { lang } = await params;
  return buildShopMetadata(lang === "zh" ? "zh" : "en");
}

export default function ShopLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
