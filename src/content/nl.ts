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
  news: { label: "De VINVARO Agent: vraag het in gewone taal", href: "/agent" },
};

export type NavLink = { label: string; href: string; description?: string; logo?: string };

export type NavFeatured =
  | { kind: "intelligence"; label: string; title: string; body: string; cta: string; href: string; badge: string; findings: [label: string, zone: string][] }
  | { kind: "switch"; title: string; body: string; cta: string; href: string; steps: string[]; card: string; step: string }
  | { kind: "publish"; title: string; body: string; cta: string; href: string };

export const nav: {
  label: string;
  href?: string;
  badge?: string;
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
          { label: "Fotostudio", href: "/platform/fotostudio", description: "Studiofoto's en kenteken afdekken met AI" },
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
      {
        title: "VINVARO-netwerk",
        links: [
          { label: "Handelsplein", href: "/platform/handelsplein", description: "Kopen en verkopen met andere autobedrijven, gratis" },
          { label: "Marktplaats", href: "/platform/marktplaats", description: "Je voorraad voor consumenten, met je reputatie" },
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
          { label: "VINVARO Agent", href: "/agent", description: "Vraag en regel alles in gewone taal" },
          { label: "Integraties", href: "/integraties", description: "RDW, marktplaatsen, inbox en agenda" },
          { label: "Plan een demo", href: "/demo", description: "30 minuten, op jouw voorraad en werkwijze" },
          { label: "Contact", href: "/contact", description: "Stel je vraag aan ons team" },
        ],
      },
    ],
  },
  { label: "Agent", href: "/agent", badge: "Nieuw" },
  { label: "Integraties", href: "/integraties" },
  { label: "Prijzen", href: "/prijzen" },
  { label: "Contact", href: "/contact" },
];

export type ModuleVisualKey = "inventory" | "intake" | "intelligence" | "studio" | "app" | "inbox" | "crm" | "agenda" | "contracts" | "publish" | "trade" | "market";

export type ModuleGroup = "vehicles" | "sales" | "network";

export type PlatformModule = {
  slug: string;
  group: ModuleGroup;
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
    group: "vehicles",
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
      { title: "Start met de juiste workflow", body: "Kies bij het toevoegen van een auto meteen met welke workflow hij begint, bijvoorbeeld transport en ophalen of intake. De eerste taak staat direct klaar." },
      { title: "APK en keuringen in één kaart", body: "APK-vervaldatum, keuringen met gebreken en het tellerstandoordeel op het overzicht, met één klik opnieuw opgehaald. Een APK-rapport voeg je toe als document." },
      { title: "Historie checken", body: "Open met één klik een historierapport bij carVertical of CARFAX op het VIN van de auto." },
      { title: "Tenaamstelling en vrijwaring", body: "Na de verkoop zie je per auto of de tenaamstelling en vrijwaring rond zijn. Een filter toont alle auto's waar de vrijwaring nog openstaat." },
      { title: "Marge, btw en BPM per auto", body: "Inkoop, kosten, vraagprijs en marge per auto, met btw- of margeregeling en BPM. Aanbetalingen en betalingen staan op het tabblad Betalingen." },
      { title: "Meerdere auto's tegelijk", body: "Selecteer auto's in de lijst en wijzig in één keer de verkoopstatus, fase, vestiging of prijs op aanvraag, haal APK-gegevens op of zet kanalen aan en uit." },
    ],
    faq: [
      { q: "Kan ik meerdere auto's tegelijk bewerken?", a: "Ja. In de voertuiglijst selecteer je auto's en wijzig je in één keer de status, fase, vestiging of prijsweergave, ververs je de APK-gegevens of zet je publicatiekanalen aan en uit." },
      { q: "Zijn grote foto's en pdf's een probleem?", a: "Nee. Foto's en documenten gaan rechtstreeks naar de beveiligde opslag, dus ook grote bestanden van een camera of scanner uploaden zonder problemen." },
      { q: "Welke gegevens haalt VINVARO bij de RDW op?", a: "Voor Nederlandse kentekens: merk, model, uitvoering, brandstof, eerste toelating, APK-vervaldatum, keuringen met gebreken en het oordeel over de tellerstand (NAP). De gegevens komen uit RDW Open Data en je kunt ze altijd opnieuw ophalen." },
      { q: "Kan ik mijn huidige voorraad importeren?", a: "Ja. Je importeert voertuigen en relaties uit Excel of csv. Bij de overstap helpen we je met de eerste import." },
      { q: "Wie ziet welke gegevens?", a: "Rollen en rechten bepalen per gebruiker wat zichtbaar is. Inkoopprijzen, kosten en interne notities blijven intern en worden nooit gedeeld via feeds of marktplaatsen." },
    ],
  },
  {
    slug: "intake-en-aflevering",
    group: "vehicles",
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
      { title: "Transport en ophalen", body: "Plan het ophalen van een ingekochte auto met adreszoeker, transporteur en ophaalfoto's. De transporteur vult zijn stap in via een link; jij ziet de foto's direct in het dossier." },
      { title: "Intake vergeleken met eerder", body: "Bij een nieuwe inspectie zie je wat er sinds de vorige is veranderd. Nieuwe schade of een ontbrekend onderdeel valt meteen op." },
      { title: "Waarnemingen tussendoor", body: "Iets gezien buiten een workflow om? Leg een waarneming vast met foto. Je beoordeelt hem later en maakt er zo nodig een bevinding of taak van." },
    ],
    faq: [
      { q: "Kan ik workflows zelf aanpassen?", a: "Ja. Je maakt en publiceert je eigen templates. Wijzig je een template, dan krijgt alleen een nieuwe uitvoering de nieuwe versie; lopende uitvoeringen blijven ongewijzigd." },
      { q: "Werken workflows ook op de telefoon?", a: "Ja. Je team vult workflows in de VINVARO-app in, ook zonder verbinding. Foto's en antwoorden worden verstuurd zodra er weer bereik is." },
      { q: "Wat is een bevinding?", a: "Een vastgelegde afwijking ten opzichte van wat je verwachtte of van een eerdere inspectie, bijvoorbeeld een ontbrekende tweede sleutel of een kras. Een bevinding heeft een ernst en kan een taak opleveren." },
    ],
  },
  {
    slug: "intelligence",
    group: "vehicles",
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
      { title: "Foto's bewerken met AI", body: "Achtergrond weg, studio-achtergrond, retoucheren en het kenteken afdekken, rechtstreeks in de Fotostudio van het dossier." },
      { title: "Importeren vanuit elke plek", body: "Sleep een document in de webomgeving of scan het met de camera in de app, ook meerdere pagina's. VINVARO herkent het type en stelt de gegevens voor." },
      { title: "Kosten onder controle", body: "AI-acties en foto-bewerkingen hebben een ruime maandbundel en een daglimiet per organisatie. Je ziet het verbruik live onder Instellingen › Facturatie." },
    ],
    faq: [
      { q: "Wat kost AI in VINVARO?", a: "Elk plan bevat per maand 500 AI-acties (labels, leadscores en conceptantwoorden) en 100 foto-bewerkingen. Daarboven betaal je € 0,02 per AI-actie en € 0,10 per foto-bewerking, exclusief btw." },
      { q: "Beslist de AI zelf iets?", a: "Nee. VINVARO stelt voor: gegevens uit een document, een label, een leadscore of een concept-antwoord. Je team bevestigt, past aan of verwerpt." },
      { q: "Welke AI-modellen gebruikt VINVARO?", a: "VINVARO werkt met gerenommeerde taalmodellen via een beveiligde gateway. Je gegevens worden alleen gebruikt om de dienst te leveren." },
    ],
  },
  {
    slug: "fotostudio",
    group: "vehicles",
    name: "Fotostudio",
    module: "VINVARO Studio",
    eyebrow: "Fotostudio · AI-fotobewerking",
    title: "Studiofoto's. Zonder fotostudio.",
    lead: "Bewerk advertentiefoto's rechtstreeks in het voertuigdossier. Haal de achtergrond weg, zet de auto in een lichte studio, retoucheer belichting en kleur of dek het kenteken af met een blanco plaat of je eigen logo. Het origineel blijft altijd bewaard.",
    visual: "studio",
    steps: ["Foto kiezen", "AI of handmatig", "Vergelijken", "Opslaan in advertentie"],
    points: [
      { title: "Achtergrond weg", body: "De auto wordt vrijgesneden. Kies daarna een witte, grijze of transparante achtergrond voor een rustige, consistente advertentie." },
      { title: "Studio-achtergrond", body: "Zet de auto in een lichte fotostudio met een zachte schaduw. Een foto op het terrein ziet eruit als een studio-opname." },
      { title: "Auto-retouche", body: "Corrigeert belichting en kleur en haalt stof, vuil en kleine plekjes weg, in één klik." },
      { title: "Kenteken afdekken", body: "Vervang het kenteken door een blanco plaat, het logo van je autobedrijf of een eigen afbeelding. Handig voor auto's die nog niet op naam staan." },
      { title: "Beschrijf je bewerking", body: "Typ wat er anders moet, zoals 'haal de pion naast de auto weg', en de AI past alleen dat deel van de foto aan." },
      { title: "Wegpoetsen", body: "Kwast over een vlek, een sticker of een object op de achtergrond en het verdwijnt, met een natuurlijk ingevulde ondergrond." },
      { title: "Aanpassen en bijsnijden", body: "Helderheid, contrast, verzadiging en warmte, draaien, spiegelen en bijsnijden in de verhoudingen die marktplaatsen vragen." },
      { title: "Vergelijken en terugdraaien", body: "Vergelijk het resultaat met het origineel en draai elke stap terug. Pas als je opslaat wordt er iets bewaard." },
      { title: "Direct in je advertentie", body: "Vervang de foto op dezelfde plek in de advertentie of sla hem op als kopie. Het origineel blijft bewaard onder Overige foto's." },
    ],
    faq: [
      { q: "Wat kost de Fotostudio?", a: "Handmatig aanpassen, bijsnijden en draaien is altijd gratis. AI-bewerkingen zoals achtergrond weg of retoucheren: 100 per maand zijn inbegrepen, daarna € 0,10 per bewerking, exclusief btw." },
      { q: "Raak ik mijn originele foto kwijt?", a: "Nee. Een bewerkte foto vervangt de foto alleen in de advertentie of wordt als kopie toegevoegd. Het origineel blijft bewaard in het dossier." },
      { q: "Werkt het op elke foto?", a: "Het beste resultaat krijg je met een scherpe foto waarop de hele auto staat. Elke bewerking kun je vergelijken met het origineel voordat je opslaat; een AI-resultaat kan afwijken van de werkelijkheid." },
      { q: "Kan ik een eigen kentekenafbeelding gebruiken?", a: "Ja. Kies bij Kenteken afdekken voor een blanco plaat, het logo van je organisatie of upload een eigen afbeelding in PNG, JPG of WebP." },
    ],
  },
  {
    slug: "team-app",
    group: "vehicles",
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
      { title: "Auto toevoegen met kenteken", body: "Typ een kenteken of VIN, haal de RDW-gegevens op en kies met welke workflow de auto start. Klaar voor de eerste stap, vanaf de telefoon." },
      { title: "Documenten scannen", body: "Scan een aankoopfactuur of kentekenbewijs met de camera, ook meerdere pagina's achter elkaar. De gegevens worden voorgesteld, jij bevestigt." },
      { title: "Meldingen zoals jij wilt", body: "Zet pushmeldingen aan vanuit de app, met de juiste uitleg als je ze eerder hebt uitgezet. Per soort melding bepaal je zelf wat je ontvangt." },
      { title: "Hulp in de app", body: "Chat met Linda, onze AI-assistent, of volg je supporttickets, zonder opnieuw in te loggen. Tijdens kantooruren neemt een collega het over." },
    ],
    faq: [
      { q: "Voor welke telefoons is de app?", a: "Voor iPhone en Android-telefoons. De app gebruikt hetzelfde account als de webomgeving; je logt in met e-mail en wachtwoord, een inloglink of Google of Microsoft." },
      { q: "Moet ik de app steeds bijwerken?", a: "Kleine verbeteringen komen automatisch binnen zodra je de app opnieuw opent. Alleen grotere updates lopen via de App Store of Google Play." },
      { q: "Werkt de app zonder internet?", a: "Je kunt foto's maken en workflowstappen invullen zonder bereik. De app laat zien wat er nog wacht en verstuurt alles zodra er weer verbinding is." },
    ],
  },
  {
    slug: "inbox",
    group: "sales",
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
    group: "sales",
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
      { title: "Aanvragen op één plek", body: "Proefritten, informatievragen en terugbelverzoeken van je website en de VINVARO Marktplaats in één lijst, met de auto erbij en de status van de opvolging." },
      { title: "Reviews vragen", body: "Vraag na een aflevering met één klik om een review, of laat VINVARO dat automatisch doen. Beoordelingen staan op je openbare profiel en bij je auto's." },
      { title: "Adres zoeken", body: "Typ een straat of bedrijf en kies het juiste adres. Voor relaties, vestigingen, partners en ophaallocaties." },
    ],
  },
  {
    slug: "agenda",
    group: "sales",
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
    group: "sales",
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
      { title: "Documenten in je huisstijl", body: "Kies layout, kleur, lettertype en logo voor facturen en contracten, met teksten per taal. Klanten krijgen documenten die er professioneel uitzien." },
      { title: "Meerdere rechtspersonen", body: "Werk je met meerdere bv's? Per vestiging of auto bepaal je welke rechtspersoon op contract en factuur staat." },
      { title: "Betalingen per auto", body: "Registreer wat je hebt betaald en ontvangen, ook aanbetalingen en deelbetalingen. Je ziet per auto wat er nog openstaat." },
    ],
  },
  {
    slug: "publiceren",
    group: "sales",
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
      { title: "Alle kanalen in één kaart", body: "Op het overzicht van een auto zie je per kanaal of hij online staat, wordt geplaatst of een fout heeft. Met één schakelaar zet je een kanaal aan of uit." },
      { title: "Publiceren in bulk", body: "Selecteer auto's in de voertuiglijst en zet ze in één keer online of offline, op alle kanalen of op één kanaal." },
      { title: "VINVARO Marktplaats erbij", body: "Naast mobile.de, AutoScout24 en je website staat de gratis VINVARO Marktplaats als kanaal klaar, met je reputatie bij elke auto." },
      { title: "Meer marktplaatsen op de planning", body: "Marktplaats, Gaspedaal, ViaBOVAG en AutoWereld staan op de roadmap." },
    ],
    faq: [
      { q: "Wat gebeurt er als een auto verkocht is?", a: "Zodra je een auto op gereserveerd of verkocht zet, haalt VINVARO hem automatisch van alle gekoppelde kanalen. Een nieuwe vraagprijs wordt ook overal doorgevoerd." },
      { q: "Kan ik kiezen welke auto's waar online staan?", a: "Ja. Per auto zet je elk kanaal apart aan of uit, en in de voertuiglijst doe je dat voor meerdere auto's tegelijk." },
      { q: "Wat kost publiceren?", a: "€ 10 per maand per gekoppelde marktplaats en € 15 per maand per websitefeed, exclusief btw. De VINVARO Marktplaats en het Handelsplein zijn gratis." },
    ],
  },
  {
    slug: "handelsplein",
    group: "network",
    name: "Handelsplein",
    module: "VINVARO Handelsplein",
    eyebrow: "VINVARO Handelsplein · gratis",
    title: "Rechtstreeks handelen met andere autobedrijven.",
    lead: "Het besloten B2B-netwerk in VINVARO. Zet een auto met een handelsprijs op het Handelsplein, bied op het aanbod van collega's en rond de deal af. De auto gaat daarna vanzelf naar de voorraad van de koper, met foto's, opties en inkoopprijs. Gratis, zonder transactiekosten.",
    visual: "trade",
    steps: ["Handelsprijs instellen", "Bod en tegenbod", "Akkoord", "Auto in voorraad koper"],
    points: [
      { title: "Een handelsprijs per auto", body: "Naast je vraagprijs zet je optioneel een handelsprijs. Alleen andere autobedrijven zien die; consumenten nooit." },
      { title: "Bieden en tegenbieden", body: "Doe een bod of koop direct voor de handelsprijs. De verkoper accepteert, wijst af of doet een tegenbod; je ziet precies wie aan zet is." },
      { title: "De auto verhuist vanzelf", body: "Na de deal staat de auto bij de koper in voorraad als inkoop, met foto's, opties en de afgesproken prijs. Bij de verkoper staat hij op verkocht, klaar voor tenaamstelling." },
      { title: "Zoeken zoals je gewend bent", body: "Filter op merk, carrosserie, brandstof, prijs, bouwjaar en kilometerstand. Bewaar een zoekopdracht en krijg een melding zodra er een passende auto bijkomt." },
      { title: "Reputatie van collega's", body: "Na elke deal beoordelen koper en verkoper elkaar. Je ziet bij elke auto hoe betrouwbaar het autobedrijf is." },
      { title: "Jij bepaalt wat zichtbaar is", body: "Het Handelsplein staat standaard uit. Je doet mee wanneer je wilt, en zet per auto aan wat je aanbiedt." },
    ],
    faq: [
      { q: "Wat kost het Handelsplein?", a: "Niets. Het Handelsplein zit gratis in elk VINVARO-plan, zonder transactiekosten of commissie." },
      { q: "Wie zien mijn handelsprijs?", a: "Alleen andere autobedrijven die meedoen met het Handelsplein. Consumenten, je website en marktplaatsen tonen altijd je vraagprijs." },
      { q: "Hoe wordt een deal afgerond?", a: "Na akkoord regelen koper en verkoper betaling en levering. De verkoper rondt de deal af; de auto verschijnt dan bij de koper in de voorraad en staat bij de verkoper op verkocht." },
    ],
  },
  {
    slug: "marktplaats",
    group: "network",
    name: "Marktplaats",
    module: "VINVARO Marktplaats",
    eyebrow: "VINVARO Marktplaats · gratis",
    title: "Je voorraad voor consumenten. Met je reputatie erbij.",
    lead: "Op de openbare VINVARO Marktplaats zoeken kopers in het aanbod van alle aangesloten autobedrijven, tegen vraagprijs. Bij elke auto staan je beoordelingen en hoe ze contact opnemen. Je doet standaard mee en zet per auto aan wat online staat.",
    visual: "market",
    points: [
      { title: "Zoeken en filteren", body: "Merk, carrosserie, brandstof, transmissie, prijs, bouwjaar en kilometerstand, met het aantal auto's per keuze." },
      { title: "Jouw reputatie, openbaar", body: "Vraag na een verkoop om een review. Klantbeoordelingen staan op je profiel, bij je auto's en in een kaart voor je eigen website." },
      { title: "Per auto aan of uit", body: "Het kanaal VINVARO Marktplaats staat naast je website, mobile.de en AutoScout24 bij Publiceren." },
      { title: "Altijd de actuele prijs", body: "Nieuwe vraagprijs, gereserveerd of verkocht: de marktplaats volgt je voorraad automatisch." },
      { title: "Alleen openbare gegevens", body: "Inkoop- en handelsprijzen, kosten en notities blijven intern." },
      { title: "Voor je eigen website", body: "Een JSON-feed en insluitbare pagina's om het aanbod ook op je eigen site te tonen." },
    ],
    faq: [
      { q: "Wat kost de Marktplaats?", a: "Niets. De VINVARO Marktplaats zit gratis in elk plan, zonder kosten per lead." },
      { q: "Kan ik niet meedoen?", a: "Ja. Je zet de marktplaats uit onder Instellingen › Integraties of Modules. Per auto bepaal je bovendien zelf of hij online staat." },
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
  { name: "VINVARO Marktplaats", category: "Marktplaatsen", status: "live", body: "Je voorraad gratis op de openbare VINVARO Marktplaats, met je reputatie erbij.", slug: "vinvaro" },
  { name: "VINVARO Handelsplein", category: "Marktplaatsen", status: "live", body: "Gratis kopen en verkopen met andere autobedrijven tegen handelsprijzen.", slug: "vinvaro" },
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
  { title: "Veilig inloggen", body: "Wachtwoordregels met een live controle bij aanmelden en herstellen. Inloggen kan ook met een eenmalige inloglink of je Google- of Microsoft-account." },
  { title: "Je account, jouw keuze", body: "Gebruikers verwijderen hun account zelf, op het web en in de app. Bedrijfsgegevens zoals voertuigen en contracten blijven bij je autobedrijf." },
];

export const faq = [
  { q: "Wat is VINVARO?", a: "VINVARO is het besturingssysteem voor autobedrijven: één werkplek voor voertuigen, klanten en processen. Voorraad en voertuigdossier, workflows voor intake en aflevering, een gedeelde inbox, CRM, agenda, contracten, facturen en publiceren naar marktplaatsen en je eigen website." },
  { q: "Voor wie is VINVARO bedoeld?", a: "Voor zelfstandige autobedrijven: merkonafhankelijke dealers, specialisten en bedrijven met meerdere vestigingen. Eigenaren, verkopers, de werkvloer en de administratie werken in dezelfde omgeving." },
  { q: "Wat is de VINVARO Agent?", a: "Een AI-assistent in VINVARO die je vragen en opdrachten in gewone taal uitvoert, getypt of ingesproken. Hij kan alles wat jij mag: auto's aanmaken vanaf een kenteken, prijzen en fases wijzigen, publiceren, contracten en facturen, workflows en rapportages. Risicovolle acties vraagt hij eerst aan je, en elke actie staat in het auditlog." },
  { q: "Werkt VINVARO met de RDW?", a: "Ja. Voor Nederlandse kentekens haalt VINVARO merk, model, APK, keuringen met gebreken en het tellerstandoordeel op uit RDW Open Data." },
  { q: "Op welke marktplaatsen kan ik publiceren?", a: "Vandaag op mobile.de en AutoScout24 (met AutoTrack), plus je eigen website via de VINVARO-feed. Marktplaats, Gaspedaal, ViaBOVAG en AutoWereld staan op de roadmap." },
  { q: "Wat zijn het Handelsplein en de Marktplaats?", a: "Twee gratis VINVARO-netwerken. Op het Handelsplein handel je rechtstreeks met andere autobedrijven tegen handelsprijzen; de auto gaat na de deal vanzelf naar de voorraad van de koper. Op de Marktplaats zoeken consumenten in het aanbod van alle aangesloten autobedrijven, tegen vraagprijs en met je reputatie erbij." },
  { q: "Welke kanalen komen in de inbox?", a: "WhatsApp Business, Gmail, Outlook / Microsoft 365 en e-mail via je eigen mailserver (IMAP/SMTP)." },
  { q: "Is er een app voor mijn team?", a: "Ja. De VINVARO-app voor iOS en Android werkt ook offline: foto's en workflowantwoorden worden verstuurd zodra er weer bereik is." },
  { q: "Kan ik advertentiefoto's bewerken in VINVARO?", a: "Ja. In de Fotostudio haal je de achtergrond weg, zet je de auto in een studio, retoucheer je met AI en dek je het kenteken af met een blanco plaat of je logo. Bijsnijden, draaien en kleur aanpassen kan ook. Het origineel blijft altijd bewaard." },
  { q: "Hoe krijg ik hulp als ik vastloop?", a: "Klik in VINVARO op Support. Linda, onze AI-assistent, beantwoordt vragen direct, dag en nacht. Tijdens kantooruren (ma–vr 09:00–17:00) neemt een collega het gesprek over, en via tickets volg je de voortgang. Het helpcentrum staat vol handleidingen." },
  { q: "Hoe snel kan ik overstappen?", a: "Je voorraad en relaties importeer je uit Excel of csv; kanalen en agenda's koppel je zelf in een paar minuten. We plannen de overstap samen in de demo." },
  { q: "Wat kost VINVARO?", a: "Het Dealer-plan kost € 199 per maand plus € 4 per voertuig in voorraad, exclusief btw. Alle modules, gebruikers en partners zijn inbegrepen. Je start met 30 dagen proefperiode." },
];

/**
 * Pricing, mirrored from the billing catalogue in vinvaro-web-client
 * (supabase/migrations/20261106120000_billing.sql, 20261106130000_billing_dealer_pricing.sql and 20261107123226_billing_photo_edits.sql). Amounts in cents, excl. VAT.
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
    { key: "photo_edits", name: "Foto-bewerkingen", unit: "bewerking", description: "AI-bewerkingen in de Fotostudio", kind: "usage", module: "fotostudio", unitPriceCents: 10, included: 100 },
    { key: "sign_requests", name: "Digitale ondertekeningen", unit: "verzoek", description: "Contracten verstuurd om te tekenen", kind: "usage", module: "contracten-en-facturen", unitPriceCents: 50, included: 10 },
    { key: "kvk_lookups", name: "KVK-opvragingen", unit: "opvraging", description: "Bedrijfsgegevens uit het Handelsregister", kind: "usage", module: "crm-en-verkoop", unitPriceCents: 10, included: 50 },
  ] as PriceItem[],
  included: [
    "Alle modules: voorraad, workflows, inbox, CRM, agenda, contracten, facturen, publiceren, AI en de Fotostudio",
    "100 AI-foto-bewerkingen en 500 AI-acties per maand",
    "Support via Linda (AI, dag en nacht), tickets en het helpcentrum",
    "Onbeperkt gebruikers en partners",
    "Team-app voor iOS en Android",
    "RDW-gegevens, KVK en VIES",
    "Koppelingen met Gmail, Outlook, WhatsApp en je agenda",
    "Hulp bij de overstap en import van je voorraad",
    "VINVARO Handelsplein en Marktplaats, gratis en zonder transactiekosten",
  ],
  faq: [
    { q: "Wat betaal ik precies?", a: "€ 199 per maand voor het hele bedrijf, plus € 4 per voertuig dat in voorraad staat. Gekoppelde marktplaatsen en een websitefeed tel je erbij op; AI-acties, foto-bewerkingen, ondertekeningen en KVK-opvragingen hebben een ruime maandbundel. Alle prijzen zijn exclusief btw." },
    { q: "Hoe wordt een voertuig in voorraad geteld?", a: "Elke open voorraadpositie telt. Verkoop of lever je een auto af en sluit je de voorraadperiode, dan telt hij niet meer mee in de volgende periode." },
    { q: "Betaal ik per gebruiker?", a: "Nee. Gebruikers en externe partners zijn onbeperkt en gratis. Je hele team, inclusief werkplaats en poetsers, werkt in VINVARO zonder extra kosten." },
    { q: "Hoe werkt de proefperiode?", a: "Je probeert VINVARO 30 dagen met alle modules. De proefperiode is kosteloos; daarna start je eerste maandperiode." },
    { q: "Wanneer factureren jullie?", a: "Aan het einde van elke maandperiode. Loopt het verbruik binnen een periode op tot de factuurdrempel (standaard € 250), dan factureren we dat verbruik tussentijds. Je ziet het verbruik live terug onder Instellingen › Facturatie." },
    { q: "Kost het Handelsplein of de Marktplaats extra?", a: "Nee. Beide VINVARO-netwerken zijn gratis inbegrepen, zonder transactiekosten, commissie of kosten per lead." },
    { q: "Kan ik modules uitzetten?", a: "Alle modules zitten in het Dealer-plan. Gebruik je een onderdeel niet, zoals marktplaatsen of de websitefeed, dan betaal je er ook niets voor." },
  ],
};
