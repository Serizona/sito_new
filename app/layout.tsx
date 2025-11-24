// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import { LanguageProvider } from "@/components/LanguageContext";

export const metadata: Metadata = {
  title: "IntusAI",
  description:
    "IntusAI builds software that turns medical images into reliable decisions.",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <head>
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
