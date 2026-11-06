import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

const UPDATED = { nl: "Laatst bijgewerkt: 31 oktober 2026", en: "Last updated: 31 October 2026" };

const copy = defineCopy({
  nl: {
    metaTitle: "Algemene voorwaarden",
    metaDescription: "De algemene voorwaarden voor het gebruik van VINVARO, inclusief proefperiode, prijzen, opzegging en de verwerkersovereenkomst.",
    eyebrow: "Voorwaarden",
    title: "Algemene voorwaarden",
    intro:
      "Deze voorwaarden gelden voor elk gebruik van VINVARO: het platform op app.vinvaro.com, de mobiele app en de bijbehorende diensten. Door een account aan te maken of VINVARO te gebruiken, ga je akkoord met deze voorwaarden namens het bedrijf waarvoor je het account aanmaakt.",
    sections: [
      {
        title: "Begrippen",
        body: [
          [
            "VINVARO, \"wij\": de leverancier van het platform, bereikbaar via info@vinvaro.com.",
            "Klant: het (auto)bedrijf dat een account voor zijn organisatie aanmaakt.",
            "Gebruiker: iedere medewerker of partner die via de klant toegang krijgt.",
            "Dienst: het VINVARO-platform, de mobiele app, koppelingen en support.",
            "Klantgegevens: alle gegevens die de klant of zijn gebruikers in de dienst vastleggen.",
          ],
        ],
      },
      {
        title: "De dienst",
        body: [
          "VINVARO is software voor autobedrijven voor onder meer voorraadbeheer, inkoop en verkoop, werkstromen, een gedeelde inbox, contracten en facturen. We leveren de dienst zoals die op dat moment beschikbaar is en ontwikkelen haar voortdurend door. We kunnen functies toevoegen, wijzigen of beëindigen; wezenlijke beperkingen kondigen we ruim vooraf aan.",
          "De klant is zelf verantwoordelijk voor de inhoud die hij vastlegt en verstuurt, voor de juistheid van zijn facturen, contracten en advertenties, en voor het naleven van de wet- en regelgeving die op zijn bedrijf van toepassing is.",
        ],
      },
      {
        title: "Account en gebruikers",
        body: [
          "De klant zorgt dat inloggegevens geheim blijven en dat alleen bevoegde personen toegang hebben. De eigenaar van het account bepaalt welke rollen en rechten gebruikers krijgen en is verantwoordelijk voor hun handelingen in de dienst. Vermoed je misbruik, meld het dan direct via info@vinvaro.com.",
        ],
      },
      {
        title: "Proefperiode, prijzen en betaling",
        body: [
          "Nieuwe klanten krijgen een gratis proefperiode van 30 dagen. Daarna loopt het abonnement door tegen de prijzen op vinvaro.com/prijzen, tenzij de klant vóór het einde van de proefperiode opzegt.",
          [
            "Het Dealer-abonnement kost € 199 per maand, inclusief onbeperkt gebruikers en partners.",
            "Daarnaast rekenen we € 4 per maand voor elk voertuig in voorraad, berekend over de periode.",
            "Voor sommige modules, zoals extra berichten of AI-verwerking, kan een verbruikstarief gelden. Het actuele verbruik en de verwachte factuur zie je altijd onder Instellingen › Facturatie.",
            "Alle prijzen zijn exclusief btw.",
          ],
          "We factureren per maand. Facturen moeten binnen 14 dagen worden betaald. Bij een betalingsachterstand mogen we na een herinnering de toegang opschorten tot er betaald is. Prijswijzigingen kondigen we minstens 30 dagen vooraf aan; de klant mag dan per de ingangsdatum opzeggen.",
        ],
      },
      {
        title: "Looptijd en opzegging",
        body: [
          "Het abonnement loopt per maand en wordt telkens stilzwijgend met een maand verlengd. De klant kan altijd opzeggen tegen het einde van de lopende maand, via de instellingen of per e-mail. We kunnen de overeenkomst met een opzegtermijn van drie maanden beëindigen, of direct bij ernstige of herhaalde schending van deze voorwaarden.",
          "Na het einde van de overeenkomst kan de klant nog 30 dagen zijn gegevens exporteren. Daarna verwijderen we de klantgegevens binnen drie maanden, behalve wat we wettelijk moeten bewaren.",
        ],
      },
      {
        title: "Redelijk gebruik",
        body: [
          "De klant gebruikt de dienst alleen voor zijn eigen bedrijfsvoering en volgens de wet. Het is niet toegestaan om:",
          [
            "spam of ongevraagde massamailings te versturen, of berichten in strijd met de regels van WhatsApp, Google of Microsoft;",
            "de dienst te gebruiken voor onrechtmatige, misleidende of inbreukmakende inhoud;",
            "de dienst te verstoren, beveiliging te omzeilen of geautomatiseerd gegevens te verzamelen buiten onze koppelingen om;",
            "de dienst door te verkopen of aan derden beschikbaar te stellen zonder onze toestemming.",
          ],
        ],
      },
      {
        title: "Koppelingen met derden",
        body: [
          "VINVARO kan gekoppeld worden aan diensten van derden, zoals Google, Microsoft, WhatsApp, KVK, RDW, mobile.de en AutoScout24. Voor die diensten gelden ook de voorwaarden van de aanbieder. We doen ons best om koppelingen werkend te houden, maar zijn niet verantwoordelijk voor storingen of wijzigingen aan de kant van die aanbieders.",
        ],
      },
      {
        title: "Gegevens en verwerkersovereenkomst",
        body: [
          "Klantgegevens blijven van de klant. We gebruiken ze alleen om de dienst te leveren, te beveiligen en te verbeteren, en nooit voor advertenties. Voor persoonsgegevens in de klantgegevens is de klant verwerkingsverantwoordelijke en VINVARO verwerker. Dit hoofdstuk geldt als verwerkersovereenkomst in de zin van artikel 28 AVG:",
          [
            "We verwerken persoonsgegevens alleen in opdracht van de klant en voor het leveren van de dienst.",
            "Medewerkers en leveranciers met toegang zijn gebonden aan geheimhouding.",
            "We nemen passende technische en organisatorische beveiligingsmaatregelen, zoals versleuteling, strikte scheiding van gegevens per klant en rechtenbeheer.",
            "De klant geeft toestemming voor de subverwerkers die in ons privacybeleid staan. Nieuwe subverwerkers melden we vooraf; de klant mag daar met redenen bezwaar tegen maken.",
            "We helpen de klant bij verzoeken van betrokkenen en bij een gegevensbeschermingseffectbeoordeling, voor zover redelijk.",
            "Een datalek dat klantgegevens raakt, melden we zonder onredelijke vertraging en binnen 48 uur na ontdekking.",
            "Na het einde van de overeenkomst verwijderen we de persoonsgegevens zoals beschreven in hoofdstuk 5.",
            "De klant mag één keer per jaar, op eigen kosten en na redelijke aankondiging, informatie opvragen om de naleving te controleren.",
          ],
          "Meer over welke gegevens we verwerken en met wie we ze delen staat in ons privacybeleid op vinvaro.com/privacy.",
        ],
      },
      {
        title: "Beschikbaarheid en support",
        body: [
          "We streven naar een zo hoog mogelijke beschikbaarheid en maken dagelijks back-ups. Gepland onderhoud doen we zoveel mogelijk buiten kantoortijden. Support is bereikbaar via info@vinvaro.com op werkdagen.",
        ],
      },
      {
        title: "Intellectueel eigendom",
        body: [
          "Alle rechten op de software, het ontwerp en de documentatie van VINVARO blijven bij ons. De klant krijgt voor de duur van het abonnement een niet-exclusief, niet-overdraagbaar recht om de dienst te gebruiken. Feedback en suggesties mogen we gebruiken om de dienst te verbeteren.",
        ],
      },
      {
        title: "Aansprakelijkheid",
        body: [
          "Onze totale aansprakelijkheid is beperkt tot het bedrag dat de klant in de twaalf maanden vóór de schade aan ons heeft betaald. We zijn niet aansprakelijk voor indirecte schade, zoals gederfde winst, gemiste omzet of verlies van gegevens die de klant had kunnen voorkomen. Deze beperkingen gelden niet bij opzet of grove nalatigheid.",
          "De klant vrijwaart ons voor aanspraken van derden die voortkomen uit de inhoud die de klant via de dienst vastlegt of verstuurt.",
        ],
      },
      {
        title: "Overig",
        body: [
          "We kunnen deze voorwaarden wijzigen. Belangrijke wijzigingen kondigen we minstens 30 dagen vooraf aan; gaat de klant niet akkoord, dan kan hij opzeggen per de ingangsdatum. Is een bepaling ongeldig, dan blijven de overige bepalingen gelden.",
          "Op deze voorwaarden is Nederlands recht van toepassing. Geschillen leggen we voor aan de bevoegde rechter in Nederland. Bij verschil tussen de Nederlandse en de Engelse tekst geldt de Nederlandse.",
        ],
      },
    ] satisfies LegalSection[],
  },
  en: {
    metaTitle: "Terms of service",
    metaDescription: "The terms of service for using VINVARO, including the trial, pricing, cancellation and the data processing agreement.",
    eyebrow: "Terms",
    title: "Terms of service",
    intro:
      "These terms apply to all use of VINVARO: the platform at app.vinvaro.com, the mobile app and related services. By creating an account or using VINVARO, you accept these terms on behalf of the company you create the account for.",
    sections: [
      {
        title: "Definitions",
        body: [
          [
            "VINVARO, \"we\": the provider of the platform, reachable at info@vinvaro.com.",
            "Customer: the (automotive) business that creates an account for its organisation.",
            "User: any employee or partner who gets access through the customer.",
            "Service: the VINVARO platform, the mobile app, integrations and support.",
            "Customer data: all data the customer or its users record in the service.",
          ],
        ],
      },
      {
        title: "The service",
        body: [
          "VINVARO is software for automotive businesses covering stock management, buying and selling, workflows, a shared inbox, contracts and invoices, among other things. We provide the service as available at the time and develop it continuously. We may add, change or discontinue features; we announce material limitations well in advance.",
          "The customer is responsible for the content it records and sends, for the accuracy of its invoices, contracts and listings, and for complying with the laws and regulations that apply to its business.",
        ],
      },
      {
        title: "Account and users",
        body: [
          "The customer keeps sign-in details confidential and ensures only authorised people have access. The account owner decides which roles and permissions users get and is responsible for their actions in the service. If you suspect misuse, report it immediately to info@vinvaro.com.",
        ],
      },
      {
        title: "Trial, pricing and payment",
        body: [
          "New customers get a free 30-day trial. After that the subscription continues at the prices on vinvaro.com/en/pricing, unless the customer cancels before the trial ends.",
          [
            "The Dealer plan costs €199 per month, including unlimited users and partners.",
            "On top of that we charge €4 per month for each vehicle in stock, calculated over the period.",
            "Some modules, such as additional messages or AI processing, may have a usage rate. You can always see current usage and the expected invoice under Settings › Billing.",
            "All prices exclude VAT.",
          ],
          "We invoice monthly. Invoices are payable within 14 days. If payment is overdue, we may suspend access after a reminder until payment is made. We announce price changes at least 30 days in advance; the customer may then cancel as of the effective date.",
        ],
      },
      {
        title: "Term and cancellation",
        body: [
          "The subscription runs monthly and renews automatically for another month each time. The customer can cancel at any time effective at the end of the current month, in the settings or by email. We may end the agreement with three months' notice, or immediately in case of serious or repeated breach of these terms.",
          "After the agreement ends, the customer can export its data for another 30 days. We then delete the customer data within three months, except what we are legally required to keep.",
        ],
      },
      {
        title: "Acceptable use",
        body: [
          "The customer uses the service only for its own business and in accordance with the law. It is not allowed to:",
          [
            "send spam or unsolicited bulk email, or messages that breach the rules of WhatsApp, Google or Microsoft;",
            "use the service for unlawful, misleading or infringing content;",
            "disrupt the service, circumvent security or collect data automatically outside our integrations;",
            "resell the service or make it available to third parties without our permission.",
          ],
        ],
      },
      {
        title: "Third-party integrations",
        body: [
          "VINVARO can be connected to third-party services such as Google, Microsoft, WhatsApp, KVK, RDW, mobile.de and AutoScout24. The provider's own terms also apply to those services. We do our best to keep integrations working, but we are not responsible for outages or changes on those providers' side.",
        ],
      },
      {
        title: "Data and data processing agreement",
        body: [
          "Customer data remains the customer's. We use it only to provide, secure and improve the service, and never for advertising. For personal data in the customer data, the customer is the controller and VINVARO the processor. This section serves as a data processing agreement within the meaning of Article 28 GDPR:",
          [
            "We process personal data only on the customer's instructions and to provide the service.",
            "Staff and suppliers with access are bound by confidentiality.",
            "We take appropriate technical and organisational security measures, such as encryption, strict separation of data per customer and permission management.",
            "The customer authorises the sub-processors listed in our privacy policy. We announce new sub-processors in advance; the customer may object on reasonable grounds.",
            "We assist the customer with data subject requests and data protection impact assessments, as far as reasonable.",
            "We report a data breach affecting customer data without undue delay and within 48 hours of discovery.",
            "After the agreement ends we delete the personal data as described in section 5.",
            "Once a year, at its own cost and with reasonable notice, the customer may request information to verify compliance.",
          ],
          "More about which data we process and with whom we share it is in our privacy policy at vinvaro.com/en/privacy.",
        ],
      },
      {
        title: "Availability and support",
        body: [
          "We aim for the highest possible availability and make daily backups. We schedule planned maintenance outside office hours where possible. Support is available at info@vinvaro.com on working days.",
        ],
      },
      {
        title: "Intellectual property",
        body: [
          "All rights to VINVARO's software, design and documentation remain ours. For the duration of the subscription the customer gets a non-exclusive, non-transferable right to use the service. We may use feedback and suggestions to improve the service.",
        ],
      },
      {
        title: "Liability",
        body: [
          "Our total liability is limited to the amount the customer paid us in the twelve months before the damage. We are not liable for indirect damage, such as lost profit, missed revenue or loss of data the customer could have prevented. These limits don't apply in case of intent or gross negligence.",
          "The customer indemnifies us against third-party claims arising from content the customer records or sends through the service.",
        ],
      },
      {
        title: "Other provisions",
        body: [
          "We may change these terms. We announce important changes at least 30 days in advance; if the customer doesn't agree, it may cancel as of the effective date. If a provision is invalid, the other provisions remain in force.",
          "These terms are governed by Dutch law. Disputes are submitted to the competent court in the Netherlands. In case of differences between the Dutch and English text, the Dutch text prevails.",
        ],
      },
    ] satisfies LegalSection[],
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata({ lang, path: "/voorwaarden", title: copy[lang].metaTitle, description: copy[lang].metaDescription });
}

export default async function TermsPage() {
  const lang = await getLang();
  const t = copy[lang];
  return <LegalPage eyebrow={t.eyebrow} title={t.title} updated={UPDATED[lang]} intro={t.intro} sections={t.sections} />;
}
