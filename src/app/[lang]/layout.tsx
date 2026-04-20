import { notFound } from "next/navigation";
import { LanguageProvider, type Lang } from "@/lib/i18n";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
    <LanguageProvider initialLang={typedLang}>
      <div lang={typedLang === "zh" ? "zh-CN" : "en"} className="contents">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
