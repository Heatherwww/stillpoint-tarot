import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  title: "Stillpoint Tarot · 静点塔罗",
  description:
    "A quiet space for tarot — learn, draw a reading, and gather your tools. 塔罗的静谧之所——学习、解读、寻找工具。",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    languages: {
      en: "https://www.stillpointtarot.com",
      zh: "https://www.stillpointtarot.com",
      "x-default": "https://www.stillpointtarot.com",
    },
  },
  openGraph: {
    siteName: "Stillpoint Tarot · 静点塔罗",
    locale: "en_US",
    alternateLocale: "zh_CN",
    images: [{ url: "/logo.png", width: 500, height: 500, alt: "Stillpoint Tarot logo" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
