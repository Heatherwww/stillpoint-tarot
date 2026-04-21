import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "../../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.stillpointtarot.com"),
  title: "Stillpoint Tarot | 静点塔罗",
  description:
    "A quiet space for tarot to learn, draw a reading, and gather your tools. 一个安静的塔罗空间，用来学习、抽牌与整理思绪。",
  verification: {
    google: "kA97GookJNlM6436PRe8Nu-m8NE6Osvukedg2VswpJ0",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    siteName: "Stillpoint Tarot | 静点塔罗",
    locale: "en_US",
    alternateLocale: "zh_CN",
    images: [{ url: "/logo.png", width: 500, height: 500, alt: "Stillpoint Tarot logo" }],
  },
};

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "zh" }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  if (lang !== "en" && lang !== "zh") notFound();
  const typedLang = lang as Lang;

  return (
    <html
      lang={typedLang === "zh" ? "zh-CN" : "en"}
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider initialLang={typedLang}>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
