// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "IntusAI",
  description:
    "IntusAI builds software that turns medical images into reliable decisions.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {/* abilita il web component <model-viewer> prima dell'interazione per evitare elementi vuoti */}
        <Script
          type="module"
          src="/vendor/model-viewer.min.js"
          strategy="beforeInteractive"
          id="model-viewer-script"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
