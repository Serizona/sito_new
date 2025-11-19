"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "./LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";

type NavKey = "company" | "product" | "dataset" | "support";
type CTAKey = "exploreProduct" | "talkToUs" | "requestDemo" | "emailSupport";

type HeaderNavProps = {
  active?: NavKey;
  cta?: {
    href: string;
    labelKey: CTAKey;
  };
};

export function HeaderNav({ active, cta }: HeaderNavProps) {
  const { dict } = useLanguage();
  const { nav } = dict;

  const navItems: Array<{ key: NavKey; href: string }> = [
  { key: "company", href: "/" },
  { key: "product", href: "/product/vic" },
  { key: "dataset", href: "/dataset" },
  { key: "support", href: "/support" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/logo.png"
            alt="IntusAI"
            width={240}
            height={100}
            quality={100}
            priority
            className="h-12 w-auto drop-shadow-sm"
          />
          <span className="font-semibold tracking-wide">IntusAI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={item.key === active ? "text-blue-700 font-semibold" : "hover:text-slate-700"}
            >
              {nav[item.key]}
            </Link>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          <LanguageSwitcher />
          {cta && (
            <Link
              href={cta.href}
              className="rounded-full bg-blue-700 text-white px-4 py-2 text-sm hover:bg-blue-800"
            >
              {nav[cta.labelKey]}
            </Link>
          )}
          {!cta && (
            <Link href="/support#contact" className="rounded-full bg-blue-700 text-white px-4 py-2 text-sm hover:bg-blue-800">
              {nav.emailSupport}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
