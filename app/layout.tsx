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
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preload" href="/models/logo3d.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
        <link rel="preload" href="/models/vic_hero.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
        <link rel="preload" href="/models/liver_card.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
        <link rel="preload" href="/models/kidney_card.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
        <link rel="preload" href="/models/pancreas_card.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
        <link rel="preload" href="/models/lungs_card.glb" as="fetch" type="model/gltf-binary" crossOrigin="anonymous" />
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
