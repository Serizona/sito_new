"use client";

import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { translations } from "@/lib/translations";

export function SupportPageContent() {
  const { dict } = useLanguage();
  const supportFallback = translations.en.supportPage;
  const supportPage = dict.supportPage ?? supportFallback;
  const nav = supportPage.nav ?? supportFallback.nav;
  const hero = supportPage.hero ?? supportFallback.hero;
  const cards = {
    manual: supportPage.cards?.manual ?? supportFallback.cards.manual,
    contact: supportPage.cards?.contact ?? supportFallback.cards.contact,
  };
  const manualForm = {
    ...supportFallback.manualForm,
    ...(supportPage.manualForm ?? {}),
    fields: {
      ...supportFallback.manualForm.fields,
      ...(supportPage.manualForm?.fields ?? {}),
    },
    placeholders: {
      ...supportFallback.manualForm.placeholders,
      ...(supportPage.manualForm?.placeholders ?? {}),
    },
  };
  const contactSection = {
    ...supportFallback.contactSection,
    ...(supportPage.contactSection ?? {}),
    form: {
      ...supportFallback.contactSection.form,
      ...(supportPage.contactSection?.form ?? {}),
    },
  };
  const t = { nav, hero, cards, manualForm, contactSection };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <a href="/" className="flex items-center gap-1">
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
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/" className="hover:text-slate-700">
              {nav.company}
            </a>
            <a href="/product/vic" className="hover:text-slate-700">
              {nav.product}
            </a>
            <a href="/dataset" className="hover:text-slate-700">
              {nav.dataset}
            </a>
            <a href="/support" className="text-blue-700">
              {nav.support}
            </a>
          </nav>
          <div className="hidden sm:flex items-center gap-3">
            <LanguageSwitcher />
            <a href="/support#contact" className="rounded-full bg-blue-700 text-white px-4 py-2 text-sm hover:bg-blue-800">
              {nav.emailSupport}
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-16 lg:py-24">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
            {t.hero.badge}
          </p>
          <h1 className="mt-4 text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">{t.hero.title}</h1>
          <p
            className="mt-4 text-lg text-slate-600"
            dangerouslySetInnerHTML={{ __html: t.hero.intro }}
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {[t.cards.manual, t.cards.contact].map((card, idx) => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-inner">
                  {idx === 0 ? (
                    <svg viewBox="0 0 32 32" className="h-6 w-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <rect x="7" y="6" width="18" height="20" rx="2.5" />
                      <path d="M7 11h18" />
                      <path d="M12 6v20" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 32 32" className="h-6 w-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.3">
                      <rect x="5" y="7" width="22" height="16" rx="3" />
                      <path d="M5 10.5 16 18l11-7.5" />
                    </svg>
                  )}
                </div>
                <h2 className="text-2xl font-semibold">{card.title}</h2>
              </div>
              <p className="mt-3 text-slate-600">{card.body}</p>
              <a
                href={idx === 0 ? "#manual-request" : "#contact"}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
              >
                {card.cta}
              </a>
            </div>
          ))}
        </div>

        <section
          id="manual-request"
          className="mt-16 scroll-mt-32 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-lg shadow-slate-200/60 backdrop-blur"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-700">{t.manualForm.badge}</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">{t.manualForm.title}</h2>
            <p className="mt-3 text-slate-600">{t.manualForm.description}</p>
          </div>

          <form
            className="mt-8 grid gap-6"
            method="POST"
            action="mailto:info@intusai.com?subject=ViC%20User%20Manual%20Request"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label={`${t.manualForm.fields.firstName} *`} id="firstName" placeholder={t.manualForm.placeholders.firstName} required />
              <FormField label={`${t.manualForm.fields.lastName} *`} id="lastName" placeholder={t.manualForm.placeholders.lastName} required />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label={`${t.manualForm.fields.hospital} *`} id="hospital" placeholder={t.manualForm.placeholders.hospital} required />
              <FormField label={`${t.manualForm.fields.department} *`} id="department" placeholder={t.manualForm.placeholders.department} required />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                type="email"
                label={`${t.manualForm.fields.email} *`}
                id="workEmail"
                placeholder={t.manualForm.placeholders.email}
                required
              />
              <FormField
                label={t.manualForm.fields.phone}
                id="phone"
                placeholder={t.manualForm.placeholders.phone}
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <FormField label={`${t.manualForm.fields.country} *`} id="country" placeholder={t.manualForm.placeholders.country} required />
              <FormField label={t.manualForm.fields.useCase} id="useCase" placeholder={t.manualForm.placeholders.useCase} />
            </div>
            <FormField
              label={t.manualForm.fields.notes}
              id="notes"
              placeholder={t.manualForm.placeholders.notes}
              as="textarea"
              rows={4}
            />

            <div className="flex flex-col gap-4 text-sm text-slate-700">
              <label className="flex items-start gap-3">
                <input type="checkbox" name="privacy" required className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600" />
                <span dangerouslySetInnerHTML={{ __html: t.manualForm.consentPrimary }} />
              </label>
              <label className="flex items-start gap-3">
                <input type="checkbox" name="marketing" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600" />
                <span>{t.manualForm.consentSecondary}</span>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="rounded-full bg-blue-700 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800">
                {t.manualForm.submit}
              </button>
              <p
                className="text-sm text-slate-500"
                dangerouslySetInnerHTML={{ __html: t.manualForm.emailHint }}
              />
            </div>
          </form>
        </section>

        <section
          id="contact"
          className="mt-20 scroll-mt-32 rounded-[40px] border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50/60 p-8 shadow-xl shadow-slate-200/70 lg:p-12"
        >
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-700">{t.contactSection.badge}</p>
                <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-slate-900">{t.contactSection.title}</h2>
                <p className="mt-3 text-slate-600">{t.contactSection.intro}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ContactCard title={t.contactSection.hqTitle} subtitle={t.contactSection.hqCity} body={t.contactSection.hqAddress} />
                <ContactCard title={t.contactSection.phoneTitle} subtitle={t.contactSection.phoneValue} body={t.contactSection.phoneHours} />
              </div>
              <ContactCard title={t.contactSection.emailTitle} subtitle={t.contactSection.emailValue} body="" />
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/10 to-emerald-500/10 blur-3xl" />
                <iframe
                  title="IntusAI HQ map"
                  src="https://www.google.com/maps?q=Via%20San%20Senatore%2C%20Milano&z=16&output=embed"
                  className="relative h-64 w-full rounded-3xl border border-slate-200 bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70 space-y-6"
              method="POST"
              action="mailto:info@intusai.com?subject=Contact%20request%20from%20website"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-blue-700">{t.contactSection.form.badge}</p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900">{t.contactSection.form.title}</h3>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  label={`${t.contactSection.form.name} *`}
                  id="contactName"
                  placeholder={t.contactSection.form.placeholderName}
                  required
                />
                <FormField
                  label={`${t.contactSection.form.email} *`}
                  id="contactEmail"
                  type="email"
                  placeholder={t.contactSection.form.placeholderEmail}
                  required
                />
              </div>

              <FormField
                label={`${t.contactSection.form.message} *`}
                id="contactMessage"
                as="textarea"
                rows={5}
                placeholder={t.contactSection.form.placeholderMessage}
                required
              />

              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input type="checkbox" name="contactPrivacy" required className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600" />
                <span dangerouslySetInnerHTML={{ __html: t.contactSection.form.privacy }} />
              </label>

              <button type="submit" className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800">
                {t.contactSection.form.submit}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} IntusAI S.r.l. — All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-700">
              Privacy
            </a>
            <a href="mailto:info@intusai.com" className="hover:text-slate-700">
              info@intusai.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

type FormFieldProps = {
  label: string;
  id: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  as?: "input" | "textarea";
  rows?: number;
};

function FormField({ label, id, placeholder, required, type = "text", as = "input", rows }: FormFieldProps) {
  const className =
    "rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100";
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea id={id} name={id} rows={rows} placeholder={placeholder} required={required} className={className} />
      ) : (
        <input id={id} name={id} type={type} placeholder={placeholder} required={required} className={className} />
      )}
    </div>
  );
}

type ContactCardProps = {
  title: string;
  subtitle: string;
  body: string;
};

function ContactCard({ title, subtitle, body }: ContactCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">{title}</p>
      <p className="mt-2 text-lg font-semibold text-slate-900">{subtitle}</p>
      {body && (
        <p className="mt-1 text-sm text-slate-600 whitespace-pre-line">
          {body}
        </p>
      )}
    </div>
  );
}
