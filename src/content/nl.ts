export const site = {
  name: "VINVARO",
  url: "https://vinvaro.com",
  /** to-confirm: production URL of the web app. */
  appUrl: "https://app.vinvaro.com/login",
  /** to-confirm: self-service sign-up in the web app (src/app/signup). */
  signupUrl: "https://app.vinvaro.com/signup",
  /** to-confirm: public contact details. Leave phone/address null until confirmed; they are hidden when null. */
  email: "info@vinvaro.com",
  phone: null as string | null,
  phoneHref: null as string | null,
  address: null as string | null,
  /** Office hours in Europe/Amsterdam; days use getDay() numbering (0 = zondag). */
  hours: { days: [1, 2, 3, 4, 5], open: "09:00", close: "17:00", label: "ma–vr 09:00–17:00" },
  legalName: "VINVARO",
  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/company/vinvaro/" }],
  category: "Het besturingssysteem voor autobedrijven",
  tagline: "Elk voertuig. Elk detail. Onder controle.",
  description:
    "VINVARO brengt voertuigen, klanten en processen samen in één werkplek. Van kenteken en intake tot proefrit, contract, publicatie en aflevering, voor autobedrijven die overzicht willen zonder losse systemen.",
  news: { label: "Publiceren naar mobile.de en AutoScout24", href: "/platform/publiceren" },
};

export type NavLink = { label: string; href: string; description?: string; logo?: string };

export type NavFeatured =
  | { kind: "intelligence"; label: string; title: string; body: string; cta: string; href: string; badge: string; findings: [label: string, zone: string][] }
  | { kind: "switch"; title: string; body: string; cta: string; href: string; steps: string[]; card: string; step: string }
  | { kind: "publish"; title: string; body: string; cta: string; href: string };

export const nav: {
  label: string;
  href?: string;
  groups?: { title: string; links: NavLink[] }[];
  featured?: NavFeatured;
}[] = [
  {
    label: "Platform",
    featured: {
      kind: "intelligence",
      label: "VINVARO Intelligence",
      title: "Afwijkingen worden bevindingen.",
      body: "Wat bij intake anders is dan verwacht, wordt automatisch een bevinding en zo nodig een taak. Met de originele foto erbij.",
      cta: "Bekijk AI & bevindingen",
      href: "/platform/intelligence",
      badge: "Bewijs, geen aannames",
      findings: [
        ["Mogelijke kras", "Linkerzijde"],
        ["Tweede sleutel ontbreekt", "Intake"],
      ],
    },
    groups: [
      {
        title: "Voertuigen",
        links: [
          { label: "Voorraad & dossier", href: "/platform/voorraad", description: "Eén voertuig, één complete geschiedenis" },
          { label: "Intake & aflevering", href: "/platform/intake-en-aflevering", description: "Vaste workflows met foto's en handtekening" },
          { label: "AI & bevindingen", href: "/platform/intelligence", description: "Afwijkingen, documenten en leads met AI" },
          { label: "Team-app", href: "/platform/team-app", description: "Vastleggen op de werkvloer, ook offline" },
        ],
      },
      {
        title: "Klanten & verkoop",
        links: [
          { label: "Inbox", href: "/platform/inbox", description: "WhatsApp, Gmail en Outlook in één inbox" },
          { label: "CRM & verkoop", href: "/platform/crm-en-verkoop", description: "Relaties, aanvragen, deals en pipeline" },
          { label: "Agenda & proefritten", href: "/platform/agenda", description: "Afspraken in de agenda van wie ze uitvoert" },
          { label: "Contracten & facturen", href: "/platform/contracten-en-facturen", description: "Digitaal tekenen en factureren" },
          { label: "Publiceren", href: "/platform/publiceren", description: "mobile.de, AutoScout24 en je eigen website" },
        ],
      },
    ],
  },
  {
    label: "Voor autobedrijven",
    featured: {
      kind: "switch",
      title: "Overstappen naar VINVARO?",
      body: "We importeren je voorraad en relaties, zetten je workflows klaar en koppelen je kanalen. Je team werkt binnen een paar dagen in één werkplek.",
      cta: "Plan een overstapgesprek",
      href: "/demo",
      card: "Overstap · Autobedrijf De Vries",
      step: "Stap 2/3",
      steps: ["Kennismaking en demo", "Voorraad en relaties importeren", "Live met inbox en workflows"],
    },
    groups: [
      {
        title: "Type bedrijf",
        links: [
          { label: "Merkonafhankelijke dealers", href: "/voor-autobedrijven/merkonafhankelijke-dealers", description: "Inkoop, voorbereiding en verkoop in één flow" },
          { label: "Specialisten", href: "/voor-autobedrijven/specialisten", description: "Premium, klassiek, EV en import" },
          { label: "Meerdere vestigingen", href: "/voor-autobedrijven/meerdere-vestigingen", description: "Eén werkwijze, per vestiging inzicht" },
        ],
      },
      {
        title: "Ontdek",
        links: [
          { label: "Platformoverzicht", href: "/platform", description: "Alle modules op een rij" },
          { label: "Integraties", href: "/integraties", description: "RDW, marktplaatsen, inbox en agenda" },
          { label: "Plan een demo", href: "/demo", description: "30 minuten, op jouw voorraad en werkwijze" },
          { label: "Contact", href: "/contact", description: "Stel je vraag aan ons team" },
        ],
      },
    ],
  },
  { label: "Integraties", href: "/integraties" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "Contact", href: "/contact" },
];

export type ModuleVisualKey = "inventory" | "intake" | "intelligence" | "app" | "inbox" | "crm" | "agenda" | "contracts" | "publish";

export type PlatformModule = {
  slug: string;
  name: string;
  /** Short product descriptor shown in the module list; maps to the module names in the product. */
  module: string;
  eyebrow: string;
  title: string;
  lead: string;
  visual: ModuleVisualKey;
  points: { title: string; body: string }[];
  steps?: string[];
  faq?: { q: string; a: string }[];
};

export const platform: PlatformModule[] = [
  {
    slug: "voorraad",
    name: "Voorraad & dossier",
    module: "VINVARO Core",
    eyebrow: "Voorraad & voertuigdossier",
    title: "Eén voertuig. Eén complete geschiedenis.",
    lead: "Typ een kenteken en VINVARO haalt merk, model, APK en tellerstandoordeel op bij de RDW. Foto's, documenten, kosten, workflows en verkoop komen samen in één dossier, van inkoop tot aflevering.",
    visual: "inventory",
    steps: ["Kenteken of VIN", "RDW-gegevens", "Voorraadperiode", "Dossier compleet"],
    points: [
      { title: "Kenteken in, gegevens erbij", body: "Merk, model, uitvoering, brandstof en APK-datum direct uit RDW Open Data. Ook het NAP-oordeel over de tellerstand." },
      { title: "Documenten en foto's op één plek", body: "Sleep een pdf of foto's in het dossier. Inspectie- en schadefoto's blijven intern, gescheiden van je advertentiefoto's." },
      { title: "Voorraadperiodes en kosten", body: "Inkoop, voorbereiding, kosten en betalingen per voorraadperiode. Zie per auto wat erin zit en wat er nog moet." },
      { title: "Importeren zonder overtypen", body: "Bestaande voorraad en relaties importeer je uit Excel of csv. VINVARO herkent de kolommen en laat je controleren voor je opslaat." },
      { title: "Bewijs, geen aannames", body: "Waargenomen, geïmporteerde en door AI voorgestelde informatie blijft gescheiden. Een taak kan sluiten; de oorspronkelijke waarneming blijft in de historie." },
      { title: "Zoeken in alles", body: "Zoek op kenteken, VIN, model of klant vanuit elk scherm, met sneltoetsen voor wie de hele dag in VINVARO werkt." },
    ],
    faq: [
      { q: "Welke gegevens haalt VINVARO bij de RDW op?", a: "Voor Nederlandse kentekens: merk, model, uitvoering, brandstof, eerste toelating, APK-vervaldatum, keuringen met gebreken en het oordeel over de tellerstand (NAP). De gegevens komen uit RDW Open Data en je kunt ze altijd opnieuw ophalen." },
      { q: "Kan ik mijn huidige voorraad importeren?", a: "Ja. Je importeert voertuigen en relaties uit Excel of csv. Bij de overstap helpen we je met de eerste import." },
      { q: "Wie ziet welke gegevens?", a: "Rollen en rechten bepalen per gebruiker wat zichtbaar is. Inkoopprijzen, kosten en interne notities blijven intern en worden nooit gedeeld via feeds of marktplaatsen." },
    ],
  },
  {
    slug: "intake-en-aflevering",
    name: "Intake & aflevering",
    module: "VINVARO Workflows",
    eyebrow: "Workflows",
    title: "Van intake tot aflevering. Elke stap vastgelegd.",
    lead: "Bouw je eigen checklists voor intake, poetsen, werkplaats, fotografie en aflevering. Elke uitvoering legt antwoorden, foto's en afwijkingen vast, en een fase gaat pas verder als de verplichte workflows af zijn.",
    visual: "intake",
    steps: ["Intake", "Inspectie", "Voorbereiding", "Verkoop", "Aflevering"],
    points: [
      { title: "Templates met versies", body: "Stappen met ja/nee, aanwezig/ontbreekt, foto's, documenten, video en handtekening. Bestaande uitvoeringen houden altijd hun oorspronkelijke versie." },
      { title: "Afwijking wordt bevinding", body: "Verwacht en aangetroffen verschillen? Dan ontstaat bij afronden automatisch een bevinding en zo nodig een taak, met opmerking en foto." },
      { title: "Fases die bewaken", body: "Koppel verplichte workflows aan een fase in je pipeline. Een auto gaat pas door naar verkoop als intake en voorbereiding klaar zijn." },
      { title: "Taken toewijzen", body: "Wijs stappen toe aan collega's of laat regels het doen. Iedereen ziet in de takenlijst wat er vandaag van hem verwacht wordt." },
      { title: "Externe partners via een link", body: "Poetsbedrijf, schadehersteller of transporteur vult zijn stap in via een beveiligde link, zonder account. Je krijgt een melding met de foto's." },
      { title: "Afleverprotocol met handtekening", body: "Sleutels, documenten, kilometerstand en de handtekening van de klant, vastgelegd bij de aflevering." },
    ],
    faq: [
      { q: "Kan ik workflows zelf aanpassen?", a: "Ja. Je maakt en publiceert je eigen templates. Wijzig je een template, dan krijgt alleen een nieuwe uitvoering de nieuwe versie; lopende uitvoeringen blijven ongewijzigd." },
      { q: "Werken workflows ook op de telefoon?", a: "Ja. Je team vult workflows in de VINVARO-app in, ook zonder verbinding. Foto's en antwoorden worden verstuurd zodra er weer bereik is." },
      { q: "Wat is een bevinding?", a: "Een vastgelegde afwijking ten opzichte van wat je verwachtte of van een eerdere inspectie, bijvoorbeeld een ontbrekende tweede sleutel of een kras. Een bevinding heeft een ernst en kan een taak opleveren." },
    ],
  },
  {
    slug: "intelligence",
    name: "AI & bevindingen",
    module: "VINVARO Intelligence",
    eyebrow: "VINVARO Intelligence",
    title: "AI die helpt controleren. Niet die beslist.",
    lead: "VINVARO leest documenten, labelt berichten, schat de warmte van een lead in en stelt antwoorden voor. Elke suggestie toont waar hij vandaan komt, en je team bevestigt wat ertoe doet.",
    visual: "intelligence",
    points: [
      { title: "Documenten lezen", body: "Sleep een pdf of foto van een aankoopfactuur of kentekenbewijs in VINVARO. De gegevens worden voorgesteld, jij controleert en slaat op." },
      { title: "Berichten labelen en scoren", body: "Binnenkomende berichten krijgen een label, zoals proefrit, inruil of financiering, en een leadscore, zodat de warmste vragen bovenaan staan." },
      { title: "Antwoordvoorstellen", body: "Een concept-antwoord in jouw toon, met de gegevens van de auto erbij. Jij past aan en verstuurt." },
      { title: "Bevindingen met bewijs", body: "Afwijkingen bij intake en inspectie staan in één overzicht, met ernst, zone en de originele foto." },
      { title: "Uitlegbaar en herleidbaar", body: "AI-voorstellen blijven gescheiden van wat je team heeft vastgesteld. Het auditlog laat zien wie wat bevestigde." },
      { title: "Jouw data blijft van jou", body: "Gegevens blijven strikt binnen je eigen organisatie en worden niet gebruikt om publieke AI-modellen te trainen." },
    ],
    faq: [
      { q: "Beslist de AI zelf iets?", a: "Nee. VINVARO stelt voor: gegevens uit een document, een label, een leadscore of een concept-antwoord. Je team bevestigt, past aan of verwerpt." },
      { q: "Welke AI-modellen gebruikt VINVARO?", a: "VINVARO werkt met gerenommeerde taalmodellen via een beveiligde gateway. Je gegevens worden alleen gebruikt om de dienst te leveren." },
    ],
  },
  {
    slug: "team-app",
    name: "Team-app",
    module: "VINVARO Staff",
    eyebrow: "Team-app voor iOS en Android",
    title: "Vastleggen waar het werk gebeurt.",
    lead: "Op de werkvloer, in de werkplaats of op het terrein: je team maakt foto's, doorloopt workflows en beantwoordt klanten vanaf de telefoon. Ook zonder bereik; alles wordt verstuurd zodra er weer verbinding is.",
    visual: "app",
    points: [
      { title: "Offline vastleggen", body: "Foto's en antwoorden worden op het toestel bewaard en verstuurd zodra er bereik is. Op dit toestel opgeslagen, twee uploads wachten: je ziet precies wat er nog onderweg is." },
      { title: "Camera voor dossierfoto's", body: "Een camera die gemaakt is voor auto's: snel achter elkaar fotograferen, direct in de juiste stap van de workflow." },
      { title: "Taken en meldingen", body: "Pushmeldingen voor nieuwe taken, toegewezen stappen en klantberichten. Je dagprioriteiten in één scherm." },
      { title: "Inbox op zak", body: "Beantwoord WhatsApp en e-mail met snelle antwoorden of een AI-voorstel, met de auto erbij." },
      { title: "Rechten per rol", body: "Iedere collega ziet alleen de onderdelen die bij zijn rol horen, net als in de webomgeving." },
    ],
  },
  {
    slug: "inbox",
    name: "Inbox",
    module: "VINVARO CRM",
    eyebrow: "Gedeelde inbox",
    title: "Elke klantvraag in één inbox. Met de auto erbij.",
    lead: "WhatsApp Business, Gmail, Outlook en je eigen mailserver komen samen in één gedeelde inbox. Gesprekken hangen aan de relatie en het voertuig, zodat iedereen weet wat er al is gezegd.",
    visual: "inbox",
    points: [
      { title: "Alle kanalen samen", body: "WhatsApp Business, Gmail, Outlook / Microsoft 365 en IMAP/SMTP. Aparte tabbladen per kanaal, of alles samen." },
      { title: "Labels en leadscore met AI", body: "Elk bericht krijgt een label en een score. Proefritaanvragen en serieuze kopers springen eruit." },
      { title: "Snelle antwoorden", body: "Sjablonen voor veelgestelde vragen en AI-concepten in jouw toon. Ook op de telefoon." },
      { title: "Gesprekken op het dossier", body: "Berichten, bijlagen en WhatsApp-media zijn zichtbaar bij de relatie en bij het voertuig." },
      { title: "Bulkacties en toewijzen", body: "Markeer, archiveer of wijs gesprekken in één keer toe aan een collega." },
      { title: "Meldingen", body: "Een melding bij een nieuw bericht, in de browser en in de app." },
    ],
  },
  {
    slug: "crm-en-verkoop",
    name: "CRM & verkoop",
    module: "VINVARO CRM",
    eyebrow: "Relaties & verkoop",
    title: "Van aanvraag tot getekende deal.",
    lead: "Aanvragen uit je website, marktplaatsen en inbox worden een relatie, een deal en een taak. Je verkooppipeline laat per fase zien welke auto bij welke klant hoort en wat de volgende stap is.",
    visual: "crm",
    points: [
      { title: "Aanvragen worden deals", body: "Een proefritaanvraag of vraag via je website wordt automatisch een relatie, deal en taak." },
      { title: "Verkooppipeline", body: "Eigen fases voor jouw verkoopproces. Sleep deals door, met per fase de waarde en de tijd in fase." },
      { title: "KVK-gegevens met één klik", body: "Typ een bedrijfsnaam en kies het bedrijf: KVK-nummer en adres worden ingevuld." },
      { title: "Btw-nummer gecontroleerd", body: "Controleer een btw-nummer bij VIES. Het resultaat wordt bewaard als bewijs, handig bij intracommunautaire levering." },
      { title: "Taken en opvolging", body: "Openstaande taken per persoon, met deadline en prioriteit. Niemand vergeet de terugbelafspraak." },
      { title: "Importeren", body: "Bestaande relaties importeer je uit Excel, csv of pdf." },
    ],
  },
  {
    slug: "agenda",
    name: "Agenda & proefritten",
    module: "VINVARO CRM",
    eyebrow: "Agenda & proefritten",
    title: "Proefritten, bezichtigingen en afleveringen. In ieders eigen agenda.",
    lead: "Plan afspraken met klant en auto erbij. Ieder teamlid koppelt zijn eigen Google- of Outlook-agenda, en de afspraak verschijnt bij wie hem uitvoert.",
    visual: "agenda",
    points: [
      { title: "Soorten afspraken", body: "Proefrit, aflevering, bezichtiging en gesprek, met klant, auto, locatie en notities." },
      { title: "Google en Outlook", body: "Afspraken komen automatisch in de agenda van wie ze uitvoert. Wijzig of annuleer in VINVARO en de agenda volgt." },
      { title: "Klant uitnodigen", body: "De klant krijgt een agenda-uitnodiging, en later ook wijzigingen of een annulering." },
      { title: "Bezet of vrij", body: "Bij het plannen zie je direct of je collega al een afspraak heeft." },
      { title: "Afgerond of niet gekomen", body: "Leg de uitkomst vast. Je ziet welke proefritten tot een deal leidden." },
    ],
  },
  {
    slug: "contracten-en-facturen",
    name: "Contracten & facturen",
    module: "VINVARO Finance",
    eyebrow: "Contracten & facturen",
    title: "Koopovereenkomst getekend. Factuur verstuurd.",
    lead: "Maak contracten uit je eigen sjablonen en laat de klant digitaal tekenen via een veilige link. Facturen en creditnota's maak je met je productcatalogus, en de financiële export gaat naar je boekhouding.",
    visual: "contracts",
    steps: ["Concept", "Uitgegeven", "Getekend", "Gefactureerd"],
    points: [
      { title: "Contracten uit sjablonen", body: "Koop-, inkoop- en inruilovereenkomsten met jouw voorwaarden, ingevuld met de gegevens van auto en klant." },
      { title: "Digitaal ondertekenen", body: "De klant tekent via een persoonlijke link op telefoon of laptop. Een uitgegeven contract kan niet meer worden gewijzigd." },
      { title: "Facturen en creditnota's", body: "Met een productcatalogus voor afleverpakketten, accessoires en garantie. De klant bekijkt de factuur online." },
      { title: "Btw- en margeregeling", body: "Btw-auto of marge-auto, vastgelegd per voertuig en zichtbaar op factuur en feed." },
      { title: "Export naar de boekhouding", body: "Financieel overzicht en export, via Autoboeker direct in Exact Online, Twinfield, SnelStart of e-Boekhouden.nl. Moneybird volgt binnenkort." },
      { title: "Financiering aanvragen", body: "Via Autus Finance vraag je financiering aan voor je klant, vanuit de deal." },
    ],
  },
  {
    slug: "publiceren",
    name: "Publiceren",
    module: "VINVARO Publishing",
    eyebrow: "Publiceren",
    title: "Eén keer invoeren. Overal online.",
    lead: "Zet een auto vanuit het dossier online op mobile.de en AutoScout24, en toon je voorraad op je eigen website met de VINVARO-feed. Verkocht of nieuwe prijs? Dan wordt alles bijgewerkt.",
    visual: "publish",
    points: [
      { title: "mobile.de", body: "Koppel je dealeraccount via de Seller-API en publiceer advertenties vanuit het dossier." },
      { title: "AutoScout24 en AutoTrack", body: "Publiceer naar AutoScout24, en desgewenst tegelijk naar AutoTrack." },
      { title: "Prijs en status blijven gelijk", body: "Een nieuwe vraagprijs of een verkochte auto wordt doorgezet naar de gekoppelde kanalen." },
      { title: "Voorraad op je eigen website", body: "Een script of iframe met je voorraad, in je eigen kleuren. Bezoekers vragen direct een proefrit aan; elke aanvraag wordt een deal in VINVARO." },
      { title: "Alleen openbare gegevens", body: "Inkoopprijzen, kosten, notities en relaties worden nooit gedeeld. VIN en kenteken staan standaard uit." },
      { title: "Meer marktplaatsen op de planning", body: "Marktplaats, Gaspedaal, ViaBOVAG en AutoWereld staan op de roadmap." },
    ],
  },
];

export type Segment = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  lead: string;
  pains: string[];
  outcomes: { title: string; body: string }[];
  modules: string[];
};

export const segments: Segment[] = [
  {
    slug: "merkonafhankelijke-dealers",
    name: "Merkonafhankelijke dealers",
    eyebrow: "Voor merkonafhankelijke dealers",
    title: "Meer auto's door de straat. Zonder losse lijstjes.",
    lead: "Inkoop, voorbereiding, verkoop en aflevering in één werkplek. Je ziet per auto waar hij staat, wat hij kost en wie er de volgende stap heeft.",
    pains: ["Voorraad in Excel, klanten in WhatsApp", "Niemand weet of de auto al gepoetst is", "Advertenties handmatig bijwerken", "Contracten op papier"],
    outcomes: [
      { title: "Overzicht per auto", body: "Status, kosten, workflows en gesprekken in één dossier." },
      { title: "Sneller verkoopklaar", body: "Verplichte workflows per fase en taken voor wie aan de beurt is." },
      { title: "Online zonder dubbel werk", body: "Publiceren naar mobile.de, AutoScout24 en je eigen website vanuit het dossier." },
    ],
    modules: ["voorraad", "intake-en-aflevering", "publiceren", "inbox"],
  },
  {
    slug: "specialisten",
    name: "Specialisten",
    eyebrow: "Voor specialisten",
    title: "Elk detail vastgelegd. Voor auto's waar het om details gaat.",
    lead: "Premium, klassiek, elektrisch of import: bij specialistische auto's telt de documentatie. VINVARO legt herkomst, staat, documenten en afspraken vast, zodat koper en verkoper weten waar ze aan toe zijn.",
    pains: ["Documentatie verspreid over mappen en mail", "Staat van de auto lastig aantoonbaar", "Internationale kopers en btw-controle", "Hoge verwachtingen bij aflevering"],
    outcomes: [
      { title: "Bewijs per detail", body: "Foto's per zone, documenten en bevindingen met de originele waarneming." },
      { title: "Internationaal verkopen", body: "Btw-nummer controleren bij VIES, met het resultaat als bewijs bij de relatie." },
      { title: "Een aflevering die klopt", body: "Afleverprotocol met sleutels, documenten en handtekening van de klant." },
    ],
    modules: ["voorraad", "intelligence", "crm-en-verkoop", "contracten-en-facturen"],
  },
  {
    slug: "meerdere-vestigingen",
    name: "Meerdere vestigingen",
    eyebrow: "Voor autobedrijven met meerdere vestigingen",
    title: "Eén werkwijze. Inzicht per vestiging.",
    lead: "Dezelfde workflows, rollen en afspraken op elke locatie, met per vestiging een eigen voorraad, feed en team. Het management ziet in één overzicht waar het stokt.",
    pains: ["Elke vestiging werkt net anders", "Geen zicht op doorlooptijd per locatie", "Rechten en toegang lastig te beheren", "Wie deed wat, en wanneer?"],
    outcomes: [
      { title: "Vestigingen en rollen", body: "Voorraad, websitefeed en team per vestiging, met rechten per rol." },
      { title: "Eén standaard", body: "Gepubliceerde workflowtemplates gelden overal, met versiebeheer." },
      { title: "Auditlog", body: "Elke wijziging met wie en wanneer, doorzoekbaar op kenteken, naam of factuurnummer." },
    ],
    modules: ["intake-en-aflevering", "team-app", "agenda", "crm-en-verkoop"],
  },
];

export type IntegrationStatus = "live" | "beta" | "planned";
export type Integration = {
  name: string;
  category: string;
  status: IntegrationStatus;
  body: string;
  /** Logo file in /public/logos (favicon of the provider's domain, as in the app's integration settings). */
  slug?: string;
  /** Sharper SVG mark for inbox channels. */
  channel?: "gmail" | "outlook" | "whatsapp" | "imap";
  connectsTo?: { name: string; slug: string; soon?: boolean }[];
};

export const integrationCategories = ["Marktplaatsen", "Berichten", "Voertuiggegevens", "Agenda", "Relatiecontroles", "Boekhouding & financiering", "Website"] as const;

export const integrations: Integration[] = [
  { name: "mobile.de", category: "Marktplaatsen", status: "live", body: "Publiceren via de Seller-API, met prijs en status automatisch bijgewerkt.", slug: "mobilede" },
  { name: "AutoScout24", category: "Marktplaatsen", status: "beta", body: "Publiceren als dataleverancier, gekoppeld aan je klantnummer.", slug: "autoscout24" },
  { name: "AutoTrack", category: "Marktplaatsen", status: "beta", body: "Tegelijk met AutoScout24 online, met één vinkje.", slug: "autotrack" },
  { name: "Marktplaats Admarkt", category: "Marktplaatsen", status: "planned", body: "Advertenties op Marktplaats.", slug: "marktplaats" },
  { name: "Gaspedaal", category: "Marktplaatsen", status: "planned", body: "Voorraad op Gaspedaal.nl.", slug: "gaspedaal" },
  { name: "ViaBOVAG", category: "Marktplaatsen", status: "planned", body: "Voorraad op ViaBOVAG.nl.", slug: "viabovag" },
  { name: "AutoWereld", category: "Marktplaatsen", status: "planned", body: "Voorraad op AutoWereld.nl.", slug: "autowereld" },
  { name: "WhatsApp Business", category: "Berichten", status: "live", body: "Klantgesprekken in de gedeelde inbox, met media en snelle antwoorden.", channel: "whatsapp" },
  { name: "Gmail", category: "Berichten", status: "live", body: "Mail ontvangen en versturen vanuit VINVARO.", channel: "gmail" },
  { name: "Outlook / Microsoft 365", category: "Berichten", status: "live", body: "Mail ontvangen en versturen vanuit VINVARO.", channel: "outlook" },
  { name: "E-mail (IMAP/SMTP)", category: "Berichten", status: "live", body: "Via de mailserver van je eigen domein.", channel: "imap" },
  { name: "RDW Open Data", category: "Voertuiggegevens", status: "live", body: "Kentekengegevens, APK, keuringen en tellerstandoordeel.", slug: "rdw" },
  { name: "carVertical", category: "Voertuiggegevens", status: "planned", body: "Internationale voertuighistorie.", slug: "carvertical" },
  { name: "CARFAX", category: "Voertuiggegevens", status: "planned", body: "Historierapporten op VIN.", slug: "carfax" },
  { name: "Google Agenda", category: "Agenda", status: "live", body: "Afspraken in de agenda van wie ze uitvoert.", slug: "gcal" },
  { name: "Outlook-agenda", category: "Agenda", status: "live", body: "Afspraken in de agenda van wie ze uitvoert.", slug: "outlook" },
  { name: "KVK Handelsregister", category: "Relatiecontroles", status: "live", body: "Bedrijfsnaam typen, KVK-nummer en adres ingevuld.", slug: "kvk" },
  { name: "VIES", category: "Relatiecontroles", status: "live", body: "Btw-nummers controleren, met het resultaat als bewijs.", slug: "vies" },
  {
    name: "Autoboeker",
    category: "Boekhouding & financiering",
    status: "live",
    body: "Facturen en kosten automatisch naar je boekhouding.",
    slug: "autoboeker",
    connectsTo: [
      { name: "Exact Online", slug: "exact" },
      { name: "Twinfield", slug: "twinfield" },
      { name: "SnelStart", slug: "snelstart" },
      { name: "e-Boekhouden.nl", slug: "eboekhouden" },
      { name: "Moneybird", slug: "moneybird", soon: true },
    ],
  },
  { name: "Autus Finance", category: "Boekhouding & financiering", status: "live", body: "Financiering aanvragen voor je klant, vanuit de deal.", slug: "autus" },
  { name: "Websitefeed", category: "Website", status: "live", body: "Je voorraad op je eigen website, met aanvraagformulieren.", slug: "site" },
];

export const securityControls = [
  { title: "Strikt per organisatie", body: "Je gegevens blijven binnen je eigen bedrijf. Elke query is afgeschermd per organisatie." },
  { title: "Rollen en rechten", body: "Per rol bepaal je welke pagina's en gegevens zichtbaar zijn, ook in de app." },
  { title: "Auditlog", body: "Elke wijziging met wie en wanneer. Financiële velden tonen alleen dat er iets veranderde." },
  { title: "Gevoelige gegevens afgeschermd", body: "API-sleutels en koppelingen worden versleuteld bewaard; inkoopprijzen en notities worden nooit gedeeld." },
];

export const faq = [
  { q: "Wat is VINVARO?", a: "VINVARO is het besturingssysteem voor autobedrijven: één werkplek voor voertuigen, klanten en processen. Voorraad en voertuigdossier, workflows voor intake en aflevering, een gedeelde inbox, CRM, agenda, contracten, facturen en publiceren naar marktplaatsen en je eigen website." },
  { q: "Voor wie is VINVARO bedoeld?", a: "Voor zelfstandige autobedrijven: merkonafhankelijke dealers, specialisten en bedrijven met meerdere vestigingen. Eigenaren, verkopers, de werkvloer en de administratie werken in dezelfde omgeving." },
  { q: "Werkt VINVARO met de RDW?", a: "Ja. Voor Nederlandse kentekens haalt VINVARO merk, model, APK, keuringen met gebreken en het tellerstandoordeel op uit RDW Open Data." },
  { q: "Op welke marktplaatsen kan ik publiceren?", a: "Vandaag op mobile.de en AutoScout24 (met AutoTrack), plus je eigen website via de VINVARO-feed. Marktplaats, Gaspedaal, ViaBOVAG en AutoWereld staan op de roadmap." },
  { q: "Welke kanalen komen in de inbox?", a: "WhatsApp Business, Gmail, Outlook / Microsoft 365 en e-mail via je eigen mailserver (IMAP/SMTP)." },
  { q: "Is er een app voor mijn team?", a: "Ja. De VINVARO-app voor iOS en Android werkt ook offline: foto's en workflowantwoorden worden verstuurd zodra er weer bereik is." },
  { q: "Hoe snel kan ik overstappen?", a: "Je voorraad en relaties importeer je uit Excel of csv; kanalen en agenda's koppel je zelf in een paar minuten. We plannen de overstap samen in de demo." },
  { q: "Wat kost VINVARO?", a: "Het Dealer-plan kost € 199 per maand plus € 4 per voertuig in voorraad, exclusief btw. Alle modules, gebruikers en partners zijn inbegrepen. Je start met 30 dagen proefperiode." },
];

/**
 * Pricing, mirrored from the billing catalogue in vinvaro-web-client
 * (supabase/migrations/20261106120000_billing.sql and 20261106130000_billing_dealer_pricing.sql). Amounts in cents, excl. VAT.
 */
export type PriceItem = {
  key: string;
  name: string;
  unit: string;
  description: string;
  kind: "recurring" | "usage";
  /** Website module slug the item belongs to. */
  module: string;
  unitPriceCents: number;
  /** Included per month; null means unlimited. */
  included: number | null;
};

export const pricing = {
  plan: "Dealer",
  planBody: "Alles voor één autobedrijf.",
  basePriceCents: 19900,
  trialDays: 30,
  vatRate: 21,
  thresholdCents: 25000,
  items: [
    { key: "users", name: "Gebruikers", unit: "gebruiker", description: "Actieve teamleden", kind: "recurring", module: "team-app", unitPriceCents: 0, included: null },
    { key: "partners", name: "Partners", unit: "partner", description: "Transporteurs, poetsers en garages", kind: "recurring", module: "intake-en-aflevering", unitPriceCents: 0, included: null },
    { key: "stock_vehicles", name: "Voertuigen in voorraad", unit: "voertuig", description: "Open voorraadposities", kind: "recurring", module: "voorraad", unitPriceCents: 400, included: 0 },
    { key: "marketplaces", name: "Marktplaatsen", unit: "koppeling", description: "Gekoppelde marktplaatsen", kind: "recurring", module: "publiceren", unitPriceCents: 1000, included: 0 },
    { key: "website_feed", name: "Websitefeed", unit: "feed", description: "Actieve voorraadfeeds", kind: "recurring", module: "publiceren", unitPriceCents: 1500, included: 0 },
    { key: "ai_actions", name: "AI-acties", unit: "actie", description: "Labels, leadscores en conceptantwoorden", kind: "usage", module: "intelligence", unitPriceCents: 2, included: 500 },
    { key: "sign_requests", name: "Digitale ondertekeningen", unit: "verzoek", description: "Contracten verstuurd om te tekenen", kind: "usage", module: "contracten-en-facturen", unitPriceCents: 50, included: 10 },
    { key: "kvk_lookups", name: "KVK-opvragingen", unit: "opvraging", description: "Bedrijfsgegevens uit het Handelsregister", kind: "usage", module: "crm-en-verkoop", unitPriceCents: 10, included: 50 },
  ] as PriceItem[],
  included: [
    "Alle modules: voorraad, workflows, inbox, CRM, agenda, contracten, facturen, publiceren en AI",
    "Onbeperkt gebruikers en partners",
    "Team-app voor iOS en Android",
    "RDW-gegevens, KVK en VIES",
    "Koppelingen met Gmail, Outlook, WhatsApp en je agenda",
    "Hulp bij de overstap en import van je voorraad",
  ],
  faq: [
    { q: "Wat betaal ik precies?", a: "€ 199 per maand voor het hele bedrijf, plus € 4 per voertuig dat in voorraad staat. Gekoppelde marktplaatsen en een websitefeed tel je erbij op; AI-acties, ondertekeningen en KVK-opvragingen hebben een ruime maandbundel. Alle prijzen zijn exclusief btw." },
    { q: "Hoe wordt een voertuig in voorraad geteld?", a: "Elke open voorraadpositie telt. Verkoop of lever je een auto af en sluit je de voorraadperiode, dan telt hij niet meer mee in de volgende periode." },
    { q: "Betaal ik per gebruiker?", a: "Nee. Gebruikers en externe partners zijn onbeperkt en gratis. Je hele team, inclusief werkplaats en poetsers, werkt in VINVARO zonder extra kosten." },
    { q: "Hoe werkt de proefperiode?", a: "Je probeert VINVARO 30 dagen met alle modules. De proefperiode is kosteloos; daarna start je eerste maandperiode." },
    { q: "Wanneer factureren jullie?", a: "Aan het einde van elke maandperiode. Loopt het verbruik binnen een periode op tot de factuurdrempel (standaard € 250), dan factureren we dat verbruik tussentijds. Je ziet het verbruik live terug onder Instellingen › Facturatie." },
    { q: "Kan ik modules uitzetten?", a: "Alle modules zitten in het Dealer-plan. Gebruik je een onderdeel niet, zoals marktplaatsen of de websitefeed, dan betaal je er ook niets voor." },
  ],
};
