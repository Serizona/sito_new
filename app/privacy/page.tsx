import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | IntusAI",
  description: "Informativa sulla privacy di IntusAI S.r.l. – intusai.com",
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

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-4xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-sm text-blue-700 hover:underline">← Torna al sito</Link>
          <span className="text-xs text-slate-400">Ultimo aggiornamento: 04-03-2026</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">intusai.com</p>

        <P>La presente informativa descrive le modalità di trattamento dei dati personali degli utenti che consultano il sito web <strong>www.intusai.com</strong> (di seguito il &quot;Sito&quot;), ai sensi del Regolamento (UE) 2016/679 (&quot;GDPR&quot;) e della normativa italiana applicabile.</P>

        <Section title="1. Titolare del trattamento">
          <P>Il Titolare del trattamento è:</P>
          <div className="bg-slate-50 rounded-2xl p-5 text-slate-700 leading-relaxed">
            <p className="font-semibold">INTUS.AI S.r.l.</p>
            <p>Via Fratelli Bronzetti 8</p>
            <p>20129 Milano – Italia</p>
            <p>P.IVA / C.F. 14342480960</p>
            <p>PEC: intus.ai@pec.it</p>
          </div>
          <P>Per qualsiasi richiesta relativa alla protezione dei dati personali è possibile scrivere a: <a href="mailto:info@intusai.com" className="text-blue-700 hover:underline">info@intusai.com</a>.</P>
        </Section>

        <Section title="2. Tipologie di dati trattati">
          <P>Durante la navigazione sul Sito possono essere trattati le seguenti categorie di dati personali.</P>

          <Sub title="2.1 Dati di navigazione">
            <P>I sistemi informatici e le procedure software del Sito acquisiscono automaticamente alcuni dati personali la cui trasmissione è implicita nell&apos;uso dei protocolli di comunicazione Internet.</P>
            <P>Tra questi:</P>
            <UL items={["indirizzo IP", "tipo di browser e dispositivo", "sistema operativo", "orario della richiesta", "pagine visitate", "eventuali codici identificativi tecnici"]} />
            <P>Tali dati sono utilizzati esclusivamente per:</P>
            <UL items={["garantire il corretto funzionamento del sito", "analizzare il traffico in forma aggregata", "garantire la sicurezza dei sistemi informatici"]} />
          </Sub>

          <Sub title="2.2 Dati forniti volontariamente dall'utente">
            <P>L&apos;utente può fornire dati personali volontariamente attraverso:</P>
            <UL items={["moduli di contatto", "richieste di informazioni", "candidature spontanee", "comunicazioni via email"]} />
            <P>I dati trattati possono includere:</P>
            <UL items={["nome e cognome", "indirizzo email", "organizzazione di appartenenza", "contenuto dei messaggi inviati"]} />
          </Sub>
        </Section>

        <Section title="3. Finalità del trattamento">
          <P>I dati personali sono trattati per le seguenti finalità:</P>

          <Sub title="a) Gestione delle richieste degli utenti">
            <P>Rispondere a richieste di informazioni, contatti o collaborazioni.</P>
            <P>Base giuridica: <strong>art. 6(1)(b) GDPR – esecuzione di misure precontrattuali</strong></P>
          </Sub>

          <Sub title="b) Funzionamento tecnico e sicurezza del sito">
            <P>Garantire la sicurezza della piattaforma, prevenire abusi e monitorare il corretto funzionamento del sito.</P>
            <P>Base giuridica: <strong>art. 6(1)(f) GDPR – legittimo interesse del titolare</strong></P>
          </Sub>

          <Sub title="c) Adempimento di obblighi legali">
            <P>Eventuale trattamento necessario per adempiere a obblighi di legge o richieste dell&apos;autorità.</P>
            <P>Base giuridica: <strong>art. 6(1)(c) GDPR – obbligo legale</strong></P>
          </Sub>
        </Section>

        <Section title="4. Modalità del trattamento">
          <P>Il trattamento dei dati avviene mediante strumenti informatici, telematici e organizzativi, con misure di sicurezza adeguate a garantire riservatezza, integrità e disponibilità dei dati.</P>
        </Section>

        <Section title="5. Conservazione dei dati">
          <P>I dati personali sono conservati per il tempo strettamente necessario alle finalità per cui sono stati raccolti. Indicativamente:</P>
          <UL items={["dati di contatto: fino a 12 mesi", "dati tecnici di navigazione: fino a 12 mesi (o meno se anonimizzati)"]} />
          <P>Salvo diversi obblighi di legge.</P>
        </Section>

        <Section title="6. Comunicazione dei dati">
          <P>I dati personali potranno essere comunicati a soggetti terzi che operano come:</P>
          <UL items={["fornitori di servizi IT e hosting", "fornitori di servizi cloud", "consulenti legali o tecnici", "autorità pubbliche, se richiesto dalla legge"]} />
          <P>Tali soggetti trattano i dati in qualità di Responsabili del trattamento ai sensi dell&apos;art. 28 GDPR oppure Titolari autonomi.</P>
        </Section>

        <Section title="7. Trasferimento dei dati fuori dall'UE">
          <P>Qualora alcuni fornitori tecnologici utilizzati dal sito siano stabiliti al di fuori dello Spazio Economico Europeo, il trasferimento dei dati avverrà nel rispetto delle garanzie previste dal GDPR, tra cui:</P>
          <UL items={["decisioni di adeguatezza della Commissione Europea", "clausole contrattuali standard (SCC)"]} />
        </Section>

        <Section title="8. Diritti dell'interessato">
          <P>Gli utenti possono esercitare in qualsiasi momento i diritti previsti dagli articoli 15-22 del GDPR, tra cui:</P>
          <UL items={["diritto di accesso ai dati", "diritto di rettifica", "diritto di cancellazione", "diritto di limitazione del trattamento", "diritto di opposizione", "diritto alla portabilità dei dati"]} />
          <P>Le richieste possono essere inviate a: <a href="mailto:privacy@intusai.com" className="text-blue-700 hover:underline font-semibold">privacy@intusai.com</a></P>
          <P>Gli utenti hanno inoltre il diritto di proporre reclamo al:<br />
            <strong>Garante per la Protezione dei Dati Personali</strong><br />
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">www.garanteprivacy.it</a>
          </P>
        </Section>

        <Section title="9. Cookie">
          <P>Il Sito può utilizzare cookie tecnici e, previo consenso dell&apos;utente, cookie di analisi o di terze parti. Le informazioni dettagliate sono disponibili nella <Link href="/cookies" className="text-blue-700 hover:underline">Cookie Policy</Link> dedicata.</P>
        </Section>

        <Section title="10. Modifiche alla presente informativa">
          <P>La presente Privacy Policy può essere aggiornata periodicamente. Eventuali modifiche saranno pubblicate su questa pagina con indicazione della data di aggiornamento.</P>
        </Section>
      </main>

      <footer className="border-t border-slate-200 mt-12">
        <div className="mx-auto max-w-4xl px-4 py-6 flex flex-col gap-2 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} IntusAI S.r.l. — All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/cookies" className="hover:text-slate-700">Cookies</Link>
            <a href="mailto:info@intusai.com" className="hover:text-slate-700">info@intusai.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
