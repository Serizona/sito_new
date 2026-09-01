"use client";

import { FormEvent, useState } from "react";
import { useLanguage } from "@/components/LanguageContext";
import { HeaderNav } from "@/components/HeaderNav";
import { RegulatoryBanner } from "@/components/RegulatoryBanner";
import { SiteFooter } from "@/components/SiteFooter";
import { translations } from "@/lib/translations";

type FormStatus = "idle" | "loading" | "success" | "error";

export function SupportPageContent() {
  const { dict, lang } = useLanguage();
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");

  const getValue = (entry: FormDataEntryValue | null) => (typeof entry === "string" ? entry.trim() : "");

  const contactMessages = {
    success: lang === "it" ? "Messaggio inviato. Ti risponderemo presto." : "Message sent. We'll get back to you shortly.",
    error: lang === "it" ? "Invio non riuscito. Riprova più tardi." : "Unable to send the message. Please try again later.",
    sending: lang === "it" ? "Invio in corso..." : "Sending...",
  };

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setContactStatus("loading");
    const formData = new FormData(formElement);
    const payload = {
      contactName: getValue(formData.get("contactName")),
      contactEmail: getValue(formData.get("contactEmail")),
      contactMessage: getValue(formData.get("contactMessage")),
      contactHealthcare: formData.has("contactHealthcare"),
      contactPrivacy: formData.has("contactPrivacy"),
      contactMarketing: formData.has("contactMarketing"),
    };

    try {
      const response = await fetch("/api/support/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setContactStatus("success");
      formElement.reset();
    } catch (error) {
      console.error(error);
      setContactStatus("error");
    }
  }

  const supportFallback = translations.en.supportPage;
  const supportPage = dict.supportPage ?? supportFallback;
  const hero = supportPage.hero ?? supportFallback.hero;
  const cards = {
    manual: supportPage.cards?.manual ?? supportFallback.cards.manual,
    contact: supportPage.cards?.contact ?? supportFallback.cards.contact,
  };
  const contactSection = {
    ...supportFallback.contactSection,
    ...(supportPage.contactSection ?? {}),
    form: {
      ...supportFallback.contactSection.form,
      ...(supportPage.contactSection?.form ?? {}),
    },
  };
  const t = { hero, cards, contactSection };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eef3ff] via-white to-[#e8fff4] text-slate-900">
      {/* Header e banner regolatorio scorrono insieme: il banner deve restare
          sempre visibile, e avvolgerli in un unico contenitore sticky evita di
          inchiodare l'altezza dell'header in un offset. */}
      <div className="sticky top-0 z-50">
        <HeaderNav active="support" cta={{ href: "/support#contact", labelKey: "emailSupport" }} />
        <RegulatoryBanner variant="short" />
      </div>

      <main className="mx-auto max-w-5xl px-4 py-16 lg:py-24">
        <div className="text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1 text-xs uppercase tracking-[0.3em] text-slate-500">
            {t.hero.badge}
          </p>
          {/* 40px e non text-5xl: a 48px il titolo misura 1101px contro i 992
              utili del contenitore e "su ViC." finiva da solo sulla seconda
              riga. A 40px sta in 917px. Sotto lg va a capo comunque, e
              text-balance evita che resti una riga orfana. */}
          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-[2.5rem] font-extrabold leading-tight tracking-tight text-balance text-slate-900">
            {t.hero.title}
          </h1>
          <p
            className="mt-4 text-lg text-slate-600"
            dangerouslySetInnerHTML={{ __html: t.hero.intro }}
          />
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 items-stretch">
          {/* Manuale utente: nessun form finche' la certificazione CE MDR non e' completata */}
          <div className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-lg shadow-slate-200/70 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-inner">
                <svg viewBox="0 0 32 32" className="h-6 w-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="7" y="6" width="18" height="20" rx="2.5" />
                  <path d="M7 11h18" />
                  <path d="M12 6v20" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">{t.cards.manual.title}</h2>
            </div>
            <p className="mt-3 text-slate-600">{t.cards.manual.body}</p>
          </div>

          <div className="flex h-full flex-col gap-4 rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-lg shadow-slate-200/70 backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white shadow-inner">
                <svg viewBox="0 0 32 32" className="h-6 w-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="1.3">
                  <rect x="5" y="7" width="22" height="16" rx="3" />
                  <path d="M5 10.5 16 18l11-7.5" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold">{t.cards.contact.title}</h2>
            </div>
            <p className="mt-3 text-slate-600">{t.cards.contact.body}</p>
            <a
              href="#contact"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              {t.cards.contact.cta}
            </a>
          </div>
        </div>

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
              <div>
                <ContactCard title={t.contactSection.hqTitle} subtitle={t.contactSection.hqCity} body={t.contactSection.hqAddress} />
              </div>
              <ContactCard title={t.contactSection.emailTitle} subtitle={t.contactSection.emailValue} body="" />
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/10 to-emerald-500/10 blur-3xl" />
                <iframe
                  title="Intus.AI HQ map"
                  src="https://www.google.com/maps?q=Via%20San%20Senatore%2C%20Milano&z=16&output=embed"
                  className="relative h-64 w-full rounded-3xl border border-slate-200 bg-white"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/70 space-y-6" onSubmit={handleContactSubmit}>
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

              <div className="flex flex-col gap-4 text-sm text-slate-700">
                {/* dichiarazione obbligatoria: le demo sono riservate ai professionisti sanitari */}
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="contactHealthcare" required className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600" />
                  <span>{t.contactSection.form.healthcareProfessional}</span>
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="contactPrivacy" required className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600" />
                  <span dangerouslySetInnerHTML={{ __html: t.contactSection.form.privacy }} />
                </label>
                <label className="flex items-start gap-3">
                  <input type="checkbox" name="contactMarketing" className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600" />
                  <span>{t.contactSection.form.marketingConsent}</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                disabled={contactStatus === "loading"}
              >
                {contactStatus === "loading" ? contactMessages.sending : t.contactSection.form.submit}
              </button>
              <div className="text-sm" aria-live="polite">
                {contactStatus === "success" && <span className="text-emerald-600">{contactMessages.success}</span>}
                {contactStatus === "error" && <span className="text-rose-600">{contactMessages.error}</span>}
              </div>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
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
