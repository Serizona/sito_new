import { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Cookie Policy | Intus.AI",
  description: "Cookie Policy di Intus.AI S.r.l. – intusai.com",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      {children}
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-slate-600 leading-relaxed mb-3">{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-1 mb-3 pl-2">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-blue-700 hover:underline">← Torna al sito</Link>
          <span className="text-xs text-slate-400">Ultimo aggiornamento: 04-03-2026</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Cookie Policy</h1>
        <p className="text-slate-500 mb-8">intusai.com</p>

        <P>La presente Cookie Policy descrive l&apos;utilizzo dei cookie e tecnologie simili sul sito <strong>www.intusai.com</strong> (di seguito il &quot;Sito&quot;).</P>
        <P>Per informazioni sul trattamento dei dati personali è possibile consultare la <Link href="/privacy" className="text-blue-700 hover:underline">Privacy Policy</Link> del sito.</P>

        <Section title="1. Titolare del trattamento">
          <P>Il titolare del trattamento è:</P>
          <div className="bg-slate-50 rounded-2xl p-5 text-slate-700 leading-relaxed">
            <p className="font-semibold">INTUS.AI S.r.l.</p>
            <p>Via Fratelli Bronzetti 8</p>
            <p>20129 Milano – Italia</p>
            <p>P.IVA / C.F. 14342480960</p>
            <p>Email: <a href="mailto:info@intus-ai.com" className="text-blue-700 hover:underline">info@intus-ai.com</a></p>
          </div>
        </Section>

        <Section title="2. Cosa sono i cookie">
          <P>I cookie sono piccoli file di testo che i siti web visitati dall&apos;utente inviano al dispositivo dell&apos;utente (computer, tablet o smartphone), dove vengono memorizzati per essere poi ritrasmessi agli stessi siti alla visita successiva.</P>
          <P>I cookie permettono al sito di:</P>
          <UL items={["funzionare correttamente", "migliorare l'esperienza di navigazione", "raccogliere informazioni statistiche sull'utilizzo del sito"]} />
        </Section>

        <Section title="3. Tipologie di cookie utilizzati">
          <Sub title="3.1 Cookie tecnici (necessari)">
            <P>Questi cookie sono necessari per il corretto funzionamento del sito e non richiedono il consenso dell&apos;utente. Servono ad esempio per:</P>
            <UL items={["gestire la navigazione", "mantenere la sessione utente", "garantire la sicurezza del sito", "ricordare preferenze tecniche (es. lingua)"]} />
            <P>Base giuridica: <strong>art. 6(1)(f) GDPR – legittimo interesse del titolare.</strong></P>
          </Sub>

          <Sub title="3.2 Cookie analitici (eventuali)">
            <P>Il sito può utilizzare cookie analitici per raccogliere informazioni statistiche sull&apos;utilizzo del sito, come:</P>
            <UL items={["numero di visitatori", "pagine visitate", "tempo di permanenza", "provenienza geografica approssimativa"]} />
            <P>Se utilizzati in forma <strong>anonimizzata</strong>, tali cookie possono essere equiparati ai cookie tecnici.</P>
            <P>Esempi di strumenti che potrebbero essere utilizzati:</P>
            <UL items={["Google Analytics", "servizi analoghi di analisi del traffico web"]} />
          </Sub>

          <Sub title="3.3 Cookie di terze parti (eventuali)">
            <P>Il sito potrebbe integrare contenuti o servizi forniti da terze parti, che possono installare cookie sul dispositivo dell&apos;utente. Ad esempio:</P>
            <UL items={["video incorporati (es. YouTube, Vimeo)", "mappe interattive (es. Google Maps)", "plugin social"]} />
            <P>Questi cookie sono gestiti direttamente dalle terze parti e l&apos;utente deve fare riferimento alle rispettive informative.</P>
          </Sub>
        </Section>

        <Section title="4. Gestione dei cookie">
          <P>Al primo accesso al sito l&apos;utente può:</P>
          <UL items={["accettare tutti i cookie", "rifiutare i cookie non necessari", "gestire le proprie preferenze tramite il banner cookie"]} />
          <P>In qualsiasi momento è possibile modificare le preferenze tramite il sistema di gestione dei cookie presente sul sito.</P>
        </Section>

        <Section title="5. Disabilitazione tramite browser">
          <P>L&apos;utente può inoltre gestire o disabilitare i cookie tramite le impostazioni del proprio browser.</P>
          <P>Di seguito i link alle istruzioni dei principali browser:</P>
          <ul className="list-disc list-inside text-slate-600 space-y-1 mb-3 pl-2">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Microsoft Edge</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">Safari</a></li>
          </ul>
          <P>La disabilitazione dei cookie tecnici potrebbe compromettere il funzionamento del sito.</P>
        </Section>

        <Section title="6. Conservazione dei cookie">
          <P>I cookie possono avere durata:</P>
          <div className="space-y-3 mb-3">
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-1">Cookie di sessione</p>
              <p className="text-slate-600 text-sm">Vengono cancellati alla chiusura del browser.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <p className="font-semibold text-slate-800 mb-1">Cookie persistenti</p>
              <p className="text-slate-600 text-sm">Rimangono memorizzati sul dispositivo per un periodo determinato.</p>
            </div>
          </div>
        </Section>

        <Section title="7. Diritti dell'utente">
          <P>Gli utenti possono esercitare i diritti previsti dal GDPR, tra cui:</P>
          <UL items={["accesso ai dati", "rettifica", "cancellazione", "limitazione del trattamento", "opposizione"]} />
          <P>Le richieste possono essere inviate a: <a href="mailto:info@intus-ai.com" className="text-blue-700 hover:underline font-semibold">info@intus-ai.com</a></P>
          <P>Gli utenti hanno inoltre il diritto di proporre reclamo al <strong>Garante per la protezione dei dati personali</strong>.</P>
        </Section>

        <Section title="8. Aggiornamenti della Cookie Policy">
          <P>La presente Cookie Policy può essere aggiornata periodicamente. La versione aggiornata sarà pubblicata su questa pagina con indicazione della data di revisione.</P>
        </Section>
      </main>

      <SiteFooter width="narrow" />
    </div>
  );
}
