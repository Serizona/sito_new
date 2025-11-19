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
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/models/logo3d.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/vic_hero.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/liver_card.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/kidney_card.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/pancreas_card.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/models/lungs_card.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-white text-slate-900 antialiased">
        <LanguageProvider>{children}</LanguageProvider>
        {/* abilita il web component <model-viewer> prima dell'interazione per evitare elementi vuoti */}
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="beforeInteractive"
          id="model-viewer-script"
        />
      </body>
    </html>
  );
}
