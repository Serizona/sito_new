export const translations = {
  en: {
    nav: {
      company: "Company",
      product: "ViC Suite",
      surgicalPlanning: "ViC – Surgical Planning",
      surgicalPlanningNote: "Undergoing CE certification",
      anatomyExplorer: "ViC – Anatomy Explorer",
      anatomyExplorerNote: "Available today",
      dataset: "Dataset",
      support: "Support",
      exploreProduct: "Explore ViC",
      talkToUs: "Talk to us",
      requestDemo: "See ViC in action",
      emailSupport: "Email support",
    },
    home: {
      hero: {
        titleLine1: "We turn medical images",
        titleLine2: "into decisions.",
        description:
          "Intus.AI designs software for clinical teams. Our flagship product, VirtualClone (ViC), brings AI segmentation and accurate 3D-visualization to surgical planning.",
        discover: "Discover ViC",
        about: "About Intus.AI",
      },
      about: {
        title: "About Intus.AI",
        paragraph1:
          "We build tools that make imaging clearer and faster. By combining machine learning, clinical collaboration and careful product design, we help teams plan with confidence, communicate better and save time in high-stakes workflows.",
        paragraph2:
          "Our work focuses on thoraco-abdominal surgery, with tools designed to support pre-operative planning.",
        list: [
          "AI segmentation and 3D visualization",
          "DICOM/NRRD interoperability",
          "Web access from any platform",
          "Anonymization of patient information and privacy compliance",
        ],
      },
      why: {
        title: "Why Intus.AI",
        cards: [
          { title: "Clinical focus", body: "Designed with surgeons for planning and pre-operative guidance." },
          { title: "Time to value", body: "Fast inference, clear UI." },
          { title: "Interoperability", body: "Standards-based formats and patient-specific integrations." },
        ],
        cta: "Explore VirtualClone (ViC)",
      },
      regulatory: {
        title: "Regulatory and scientific pathway",
        body:
          "We develop ViC as Software as a Medical Device (SaMD) in accordance with Regulation (EU) 2017/745, with Class IIa CE MDR certification in progress, an ISO 13485 quality management system under implementation, and the support of a scientific committee of specialists from leading surgical and transplant centres.",
      },
      contact: {
        badge: "Contact us",
        title: "Want to see ViC in action?",
        description:
          "Request a demonstration in our demo environment: our team will guide you through the platform and collect your clinical feedback.",
        cta: "Request a demo",
      },
    },
    dataset: {
      hero: {
        badge: "High-quality surgical imaging dataset",
        title: "Algorithms trained on high-quality medical images.",
        description:
          "Intus.AI trains its ViC networks on a proprietary, multicenter dataset with more than 2,600 annotated abdominal and thoracic CT scans. The fidelity of that source data keeps our segmentation, visualization and decision layers dependable in surgical workflows.",
        explore: "Download Dataset",
      },
      stats: {
        title: "Network performance grounded in data",
        description:
          "Our segmentation models rely on high-quality, high-volume imaging. That foundation keeps the ViC stack reliable for AI training, radiomics and clinical validation.",
        metrics: [
          { label: "Dataset - high-quality CT scans", value: "> 2,600 annotated" },
          { label: "Reconstructed structures", value: "10 anatomy classes" },
          { label: "Mean DICE score", value: "0.85 average across ViC reconstructions" },
          { label: "Prediction time", value: "< 5 minutes" },
        ],
        note: "We maintain a continuous improvement loop: new clinical collaborations expand the dataset, while anonymization and bias checks keep it research-ready.",
      },
      ircad: {
        badge: "Dataset",
        title: "Built on trusted sources, refined by our team",
        description:
          "We selected 20 cases from the original IRCAD dataset and carried out a complete manual review, correcting the segmentations and enhancing anatomical consistency. The result is a cleaner, more accurate, and ready-to-use dataset, ideal as a reliable reference or for comparison with your own annotations and guidelines.",
        note:
          "We make our dataset directly accessible to users, enabling its use in research, development, training, and validation.",
        downloadCta: "Download ViC dataset",
      },
      collab: {
        badge: "Clinical & engineering",
        title: "Collaboration-ready networks",
        description:
          "We work with surgical teams, imaging labs and engineering departments to co-develop AI services, validation studies or bespoke reconstructions. Share your objectives - AI benchmarking, radiomic discovery, multi-center validation - and we tailor access plus expert support.",
        startCta: "Start a collaboration",
      },
    },
    sliceViewer: {
      title: "Example of a ViC segmented case",
      caption:
        "A short stack of slices from a ViC-segmented case - scroll through to see how our networks automatically outline organs and vessels.",
    },
    supportPage: {
      nav: {
        company: "Company",
        product: "Product",
        dataset: "Dataset",
        support: "Support",
        emailSupport: "Email support",
      },
      hero: {
        badge: "Support",
        title: "We're here to answer your questions about ViC.",
        intro:
          'Choose one of the options or write to <a href="mailto:info@intus-ai.com">info@intus-ai.com</a>.',
      },
      cards: {
        manual: {
          title: "User manual",
          body: "ViC's user manual will be made available on this page after the completion of the CE MDR certification process.",
        },
        contact: {
          title: "Contact us",
          body:
            "Want to request a demonstration or learn more about ViC? Our engineers and clinical specialists can follow you end-to-end.",
          cta: "Contact us",
        },
      },
      contactSection: {
        badge: "Contact us",
        title: "Talk directly with Intus.AI",
        intro: "We respond within two business days. Tell us how we can help your surgical planning workflow or integration.",
        hqTitle: "Headquarters",
        hqCity: "Milan, Italy",
        hqAddress: "Via San Senatore 6/1\n20122 Milano (MI)",
        phoneTitle: "Direct line",
        phoneValue: "0000 000000",
        phoneHours: "Mon-Fri, 09:00-18:00 CET",
        emailTitle: "Email",
        emailValue: "info@intus-ai.com",
        form: {
          badge: "Write to us",
          title: "Tell us about your request",
          name: "Full name",
          email: "Work email",
          message: "Message",
          placeholderName: "Maria Rossi",
          placeholderEmail: "nome@ospedale.it",
          placeholderMessage: "Describe your interest: demonstration, evaluation programme, ViC – Anatomy Explorer for education, other.",
          healthcareProfessional:
            "I declare that I am a healthcare professional or that I act on behalf of a healthcare, academic or research institution.",
          privacy:
            'I agree to the <a href="/privacy">privacy policy</a> and to be contacted about my request.',
          marketingConsent: "I would like to receive occasional product updates and clinical validation notes.",
          submit: "Send message",
        },
      },
    },
  },
  it: {
    nav: {
      company: "Azienda",
      product: "ViC Suite",
      surgicalPlanning: "ViC – Surgical Planning",
      surgicalPlanningNote: "In corso di certificazione CE",
      anatomyExplorer: "ViC – Anatomy Explorer",
      anatomyExplorerNote: "Disponibile oggi",
      dataset: "Dataset",
      support: "Supporto",
      exploreProduct: "Esplora ViC",
      talkToUs: "Contattaci",
      requestDemo: "See ViC in action",
      emailSupport: "Scrivi al supporto",
    },
    dataset: {
      hero: {
        badge: "Dataset chirurgico di alta qualità",
        title: "Algoritmi addestrati su immagini di alta qualità.",
        description:
          "Intus.AI addestra le reti ViC su un dataset multicentrico con oltre 2.600 TAC addominali e toraciche annotate. L'alta qualità delle immagini garantisce risultati affidabili in termini di segmentazione, visualizzazione e supporto decisionale nei flussi chirurgici.",
        explore: "Scarica il Dataset",
      },
      stats: {
        title: "Prestazioni ViC basate sui dati",
        description:
          "I nostri modelli di segmentazione si basano su immagini ad alta qualità e grandi volumi di dati. Questo approccio rende ViC una piattaforma affidabile per AI training, radiomica e validazione clinica.",
        metrics: [
          { label: "Dataset - TAC di alta qualità", value: "> 2.600 annotate" },
          { label: "Strutture ricostruite", value: ">10 classi anatomiche" },
          { label: "DICE medio", value: "0,85 di media sulle ricostruzioni ViC" },
          { label: "Tempo di predizione", value: "< 5 minuti" },
        ],
        note: "Manteniamo un ciclo di miglioramento continuo attraverso nuove collaborazioni cliniche che ampliano periodicamente il dataset.",
      },
      ircad: {
        badge: "Dataset",
        title: "Basato su fonti affidabili, perfezionato dal nostro team",
        description:
          "Abbiamo selezionato 20 casi dal dataset originale IRCAD e li abbiamo sottoposti a una revisione manuale completa, correggendo le segmentazioni e migliorandone la coerenza anatomica. Il risultato è un dataset più accurato, più pulito e pronto all’uso, ideale come riferimento affidabile.",
        note:
          "Rendiamo il dataset corretto direttamente accessibile agli utenti, così da poterlo utilizzare in attività di ricerca, sviluppo, training e validazione.",
        downloadCta: "Ottieni dataset",
      },
      collab: {
        badge: "Clinico & ingegneristico",
        title: "Reti pronte alla collaborazione",
        description:
          "Collaboriamo con team chirurgici, imaging lab e reparti ingegneristici per sviluppare servizi AI, studi di validazione o ricostruzioni paziente-specifico. Raccontaci obiettivi - benchmarking AI, radiomica - e adatteremo accesso e supporto specialistico.",
        startCta: "Avvia una collaborazione",
      },
    },
    sliceViewer: {
      title: "Esempio di caso segmentato da ViC",
      caption:
        "Una breve serie di slice provenienti da un caso segmentato automaticamente da ViC: scorri per vedere come le nostre reti segmentano organi, vasi e masse.",
    },
    home: {
      hero: {
        titleLine1: "Trasformiamo le immagini",
        titleLine2: "in decisioni.",
        description:
          "Intus.AI sviluppa software avanzati per i team clinici. Il nostro prodotto di punta, VirtualClone (ViC), integra segmentazione AI e visualizzazione 3D nella pianificazione chirurgica.",
        discover: "Scopri ViC",
        about: "Su Intus.AI",
      },
      about: {
        title: "Su Intus.AI",
        paragraph1:
          "Sviluppiamo strumenti che rendono l'imaging più chiaro e rapido. Uniamo machine learning, collaborazione clinica e design accurato per aiutare i team a pianificare con fiducia, comunicare meglio e risparmiare tempo in contesti critici.",
        paragraph2:
          "Il nostro lavoro si concentra sulla chirurgia toraco-addominale, con strumenti progettati per supportare la pianificazione pre-operatoria.",
        list: [
          "Segmentazione AI e visualizzazione 3D",
          "Interoperabilità DICOM/NRRD",
          "Accesso web da qualsiasi piattaforma",
          "Anonimizzazione delle informazioni sul paziente e rispetto della privacy",
        ],
      },
      why: {
        title: "Perché Intus.AI",
        cards: [
          { title: "Focus clinico", body: "Progettato con i chirurghi per la pianificazione e la guida pre-operatoria." },
          { title: "Time to value", body: "Inferenza rapida, interfaccia chiara." },
          { title: "Interoperabilità", body: "Formati standard e integrazioni paziente-specifico." },
        ],
        cta: "Esplora VirtualClone (ViC)",
      },
      regulatory: {
        title: "Percorso regolatorio e scientifico",
        body:
          "Sviluppiamo ViC come dispositivo medico software (SaMD) secondo il Regolamento (UE) 2017/745, con certificazione CE MDR Classe IIa in corso, un sistema qualità ISO 13485 in implementazione e il supporto di un comitato scientifico di specialisti provenienti da centri chirurgici e trapiantologici di riferimento.",
      },
      contact: {
        badge: "Contattaci",
        title: "Vuoi vedere ViC in azione?",
        description:
          "Richiedi una dimostrazione in ambiente demo: il nostro team ti guiderà nell'utilizzo della piattaforma e raccoglierà il tuo feedback clinico.",
        cta: "Richiedi una demo",
      },
    },
    supportPage: {
      nav: {
        company: "Azienda",
        product: "Prodotto",
        dataset: "Dataset",
        support: "Supporto",
        emailSupport: "Scrivi al supporto",
      },
      hero: {
        badge: "Supporto",
        title: "Siamo qui per rispondere alle tue domande su ViC.",
        intro:
          'Scegli una delle opzioni oppure scrivi a <a href="mailto:info@intus-ai.com">info@intus-ai.com</a>.',
      },
      cards: {
        manual: {
          title: "Manuale utente",
          body: "Il manuale utente di ViC sarà reso disponibile su questa pagina a seguito del completamento del processo di certificazione CE MDR.",
        },
        contact: {
          title: "Contattaci",
          body:
            "Vuoi richiedere una dimostrazione o saperne di più su ViC? I nostri ingegneri e specialisti clinici possono seguirti end-to-end.",
          cta: "Parla con noi",
        },
      },
      contactSection: {
        badge: "Contattaci",
        title: "Parla direttamente con Intus.AI",
        intro: "Rispondiamo entro due giorni lavorativi. Raccontaci come possiamo supportare il tuo workflow o le tue richieste.",
        hqTitle: "Sede",
        hqCity: "Milano, Italia",
        hqAddress: "Via San Senatore 6/1\n20122 Milano (MI)",
        phoneTitle: "Linea diretta",
        phoneValue: "0000 000000",
        phoneHours: "Lun-Ven, 09:00-18:00 CET",
        emailTitle: "Email",
        emailValue: "info@intus-ai.com",
        form: {
          badge: "Scrivici",
          title: "Parlaci di cosa hai bisogno",
          name: "Nome e cognome",
          email: "Email professionale",
          message: "Messaggio",
          placeholderName: "Maria Rossi",
          placeholderEmail: "nome@ospedale.it",
          placeholderMessage: "Descrivi il tuo interesse: dimostrazione, programma di valutazione, ViC – Anatomy Explorer per la formazione, altro.",
          healthcareProfessional:
            "Dichiaro di essere un professionista sanitario o di operare per conto di una struttura sanitaria, universitaria o di ricerca.",
          privacy:
            "Accetto l'<a href=\"/privacy\">informativa privacy</a> e di essere contattato per la mia richiesta.",
          marketingConsent: "Desidero ricevere aggiornamenti sul prodotto.",
          submit: "Invia messaggio",
        },
      },
    },
  },
};

export type Locale = keyof typeof translations;
export type TranslationDict = typeof translations.en;
