import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal-page";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { pageMetadata } from "@/lib/seo";

const UPDATED = { nl: "Laatst bijgewerkt: 31 oktober 2026", en: "Last updated: 31 October 2026" };

const copy = defineCopy({
  nl: {
    metaTitle: "Privacybeleid",
    metaDescription: "Hoe VINVARO omgaat met persoonsgegevens van websitebezoekers, gebruikers en de klanten van autobedrijven, en met gegevens uit gekoppelde Google- en Microsoft-accounts.",
    eyebrow: "Privacy",
    title: "Privacybeleid",
    intro:
      "VINVARO is software voor autobedrijven. In dit privacybeleid lees je welke persoonsgegevens we verwerken, waarom, hoe lang en met wie we ze delen. We verwerken zo min mogelijk gegevens, verkopen nooit gegevens en gebruiken ze niet voor advertenties.",
    sections: [
      {
        title: "Wie we zijn",
        body: [
          "VINVARO (\"wij\") levert het VINVARO-platform op app.vinvaro.com en de mobiele VINVARO-app, en beheert de website vinvaro.com. Vragen over privacy stel je via info@vinvaro.com.",
          "We hebben twee rollen. Voor de website, accounts, facturatie en support zijn wij verwerkingsverantwoordelijke. Voor de gegevens die een autobedrijf in VINVARO vastlegt, zoals voertuigen, klanten, berichten en contracten, is het autobedrijf verwerkingsverantwoordelijke en zijn wij verwerker. Die verwerking regelen we in een verwerkersovereenkomst, die onderdeel is van onze algemene voorwaarden.",
        ],
      },
      {
        title: "Welke gegevens we verwerken",
        body: [
          [
            "Websitebezoekers: wat je invult in het contact- of demoformulier (naam, e-mailadres, bedrijf, telefoonnummer, bericht, gekozen demomoment) en anonieme bezoekstatistieken.",
            "Gebruikers van VINVARO: naam, e-mailadres, wachtwoord (alleen versleuteld opgeslagen), profielfoto, rol en rechten, taal- en weergavevoorkeuren, en een logboek van wie wat wanneer wijzigde.",
            "Facturatie: bedrijfsgegevens van het autobedrijf, het verbruik per periode en de facturen.",
            "Gegevens van autobedrijven: voertuigen, relaties en hun contactgegevens, aanvragen, afspraken, e-mail- en WhatsAppberichten, contracten, facturen, foto's en documenten die het autobedrijf vastlegt.",
            "Gekoppelde accounts: als een gebruiker Gmail, Outlook, WhatsApp of een agenda koppelt, bewaren we de toegangssleutels (versleuteld) en het e-mailadres of nummer van dat account. Zie ook hoofdstuk 4.",
          ],
        ],
      },
      {
        title: "Waarvoor en op welke grondslag",
        body: [
          [
            "Het leveren van VINVARO aan het autobedrijf en zijn gebruikers (uitvoering van de overeenkomst).",
            "Beantwoorden van contactaanvragen en het inplannen van demo's (gerechtvaardigd belang, of op jouw verzoek).",
            "Facturatie en het voldoen aan wettelijke bewaarplichten, zoals de fiscale bewaarplicht van zeven jaar (wettelijke verplichting).",
            "Beveiliging, het voorkomen van misbruik en het verbeteren van de dienst met geanonimiseerde statistieken (gerechtvaardigd belang).",
          ],
        ],
      },
      {
        title: "Gegevens uit Google- en Microsoft-accounts",
        body: [
          "Een gebruiker kan zelf een Google- of Microsoft-account koppelen. We vragen alleen de rechten die nodig zijn voor de functie die de gebruiker aanzet:",
          [
            "Gmail (gmail.send) en Outlook (Mail.Send): e-mail versturen namens de gebruiker vanuit VINVARO, bijvoorbeeld antwoorden aan klanten en documenten. We lezen je mailbox niet via Gmail; inkomende e-mail komt alleen binnen als je die zelf doorstuurt naar je VINVARO-inboxadres.",
            "Outlook (Mail.ReadWrite): nieuwe berichten in je inbox ophalen zodat je klantgesprekken in de gedeelde VINVARO-inbox ziet.",
            "Google Agenda (calendar.events) en Outlook-agenda (Calendars.ReadWrite): afspraken zoals proefritten en afleveringen in je eigen agenda zetten, wijzigen en verwijderen, en bezette tijden tonen zodat je niet dubbel boekt.",
          ],
          "Het gebruik en de overdracht van informatie die VINVARO via Google API's ontvangt, voldoen aan de Google API Services User Data Policy, inclusief de Limited Use-vereisten. Dat betekent: we gebruiken deze gegevens alleen voor de functies hierboven, die de gebruiker zelf aanzet; we verkopen ze niet, gebruiken ze niet voor advertenties en niet om AI-modellen te trainen; en mensen lezen ze niet, tenzij de gebruiker daar toestemming voor geeft, het nodig is voor beveiliging of het wettelijk verplicht is.",
          "Je kunt een koppeling altijd verbreken in VINVARO (Instellingen › Integraties of Inbox) of in je Google- of Microsoft-account. Daarna verwijderen we de toegangssleutels.",
        ],
      },
      {
        title: "Met wie we gegevens delen",
        body: [
          "We schakelen zorgvuldig gekozen leveranciers in, met wie we verwerkersafspraken hebben. Gegevens worden zoveel mogelijk binnen de Europese Economische Ruimte opgeslagen.",
          [
            "Supabase: database, opslag en inloggen (servers in Ierland).",
            "Vercel: hosting van de website en de app, en anonieme bezoekstatistieken.",
            "Resend: versturen en ontvangen van e-mail (EU, Ierland).",
            "Google: zakelijke e-mail, adres zoeken (Places) en, als je die koppelt, Gmail en Google Agenda.",
            "Microsoft: Outlook en de Outlook-agenda, als je die koppelt.",
            "Meta: WhatsApp Business, als het autobedrijf WhatsApp koppelt.",
            "AI-dienstverleners via Vercel AI Gateway: voor labels, leadscores, conceptantwoorden en het uitlezen van documenten. Zij gebruiken de gegevens niet om hun modellen te trainen.",
            "Kamer van Koophandel (KVK), RDW en de EU (VIES): voor bedrijfs-, voertuig- en btw-gegevens.",
            "Marktplaatsen zoals mobile.de en AutoScout24: alleen de advertentiegegevens van auto's die het autobedrijf publiceert.",
          ],
          "Als een leverancier buiten de EER is gevestigd, zorgen we voor passende waarborgen, zoals de modelcontractbepalingen van de Europese Commissie of het EU-VS Data Privacy Framework.",
        ],
      },
      {
        title: "Hoe lang we gegevens bewaren",
        body: [
          [
            "Contact- en demoaanvragen: tot twee jaar na het laatste contact.",
            "Accountgegevens: zolang het account bestaat, en daarna maximaal drie maanden in back-ups.",
            "Gegevens van autobedrijven: zolang het abonnement loopt. Na opzegging kan het autobedrijf alles exporteren; daarna verwijderen we de gegevens binnen drie maanden.",
            "Facturen en de administratie die daarbij hoort: zeven jaar (fiscale bewaarplicht).",
          ],
        ],
      },
      {
        title: "Beveiliging",
        body: [
          "Verbindingen zijn versleuteld (HTTPS). Wachtwoorden en toegangssleutels van gekoppelde accounts slaan we versleuteld op. Gegevens van autobedrijven zijn strikt van elkaar gescheiden: medewerkers zien alleen de gegevens van hun eigen bedrijf, en alleen wat hun rol toestaat. Wijzigingen worden gelogd.",
        ],
      },
      {
        title: "Cookies en lokale opslag",
        body: [
          "De website gebruikt geen tracking- of advertentiecookies. Bezoekstatistieken van Vercel zijn anoniem en werken zonder cookies. Het demoformulier bewaart je antwoorden tijdelijk in je eigen browser, zodat je later verder kunt.",
          "De VINVARO-app gebruikt alleen noodzakelijke cookies: om je ingelogd te houden en je taal- en weergavekeuze te onthouden.",
        ],
      },
      {
        title: "Jouw rechten",
        body: [
          "Je hebt recht op inzage, correctie, verwijdering, beperking en overdracht van je gegevens, en je kunt bezwaar maken tegen verwerking. Mail ons via info@vinvaro.com; we reageren binnen een maand. Gaat het om gegevens die een autobedrijf over jou vastlegt, dan sturen we je verzoek door naar dat autobedrijf of helpen we het om je verzoek af te handelen.",
          "Ben je het niet eens met hoe we met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.",
        ],
      },
      {
        title: "Wijzigingen",
        body: ["We kunnen dit privacybeleid aanpassen. De datum bovenaan laat zien wanneer dat voor het laatst gebeurde. Bij belangrijke wijzigingen informeren we gebruikers vooraf."],
      },
    ] satisfies LegalSection[],
  },
  en: {
    metaTitle: "Privacy policy",
    metaDescription: "How VINVARO handles personal data of website visitors, users and dealers' customers, and data from connected Google and Microsoft accounts.",
    eyebrow: "Privacy",
    title: "Privacy policy",
    intro:
      "VINVARO is software for automotive businesses. This privacy policy explains which personal data we process, why, for how long and with whom we share it. We process as little data as possible, never sell data and don't use it for advertising.",
    sections: [
      {
        title: "Who we are",
        body: [
          "VINVARO (\"we\") provides the VINVARO platform at app.vinvaro.com and the VINVARO mobile app, and runs the website vinvaro.com. Privacy questions can be sent to info@vinvaro.com.",
          "We have two roles. For the website, accounts, billing and support we are the controller. For the data a dealer records in VINVARO, such as vehicles, customers, messages and contracts, the dealer is the controller and we are the processor. That processing is governed by a data processing agreement, which is part of our terms of service.",
        ],
      },
      {
        title: "Which data we process",
        body: [
          [
            "Website visitors: what you enter in the contact or demo form (name, email address, company, phone number, message, chosen demo time) and anonymous visit statistics.",
            "VINVARO users: name, email address, password (stored only in hashed form), profile photo, role and permissions, language and display preferences, and a log of who changed what and when.",
            "Billing: the dealer's company details, usage per period and the invoices.",
            "Dealer data: vehicles, contacts and their contact details, inquiries, appointments, email and WhatsApp messages, contracts, invoices, photos and documents the dealer records.",
            "Connected accounts: when a user connects Gmail, Outlook, WhatsApp or a calendar, we store the access tokens (encrypted) and the email address or number of that account. See also section 4.",
          ],
        ],
      },
      {
        title: "Purposes and legal bases",
        body: [
          [
            "Providing VINVARO to the dealer and its users (performance of the contract).",
            "Answering contact requests and scheduling demos (legitimate interest, or at your request).",
            "Billing and meeting legal retention duties, such as the seven-year tax retention period (legal obligation).",
            "Security, preventing abuse and improving the service with anonymised statistics (legitimate interest).",
          ],
        ],
      },
      {
        title: "Data from Google and Microsoft accounts",
        body: [
          "A user can connect a Google or Microsoft account themselves. We only request the permissions needed for the feature the user turns on:",
          [
            "Gmail (gmail.send) and Outlook (Mail.Send): sending email on the user's behalf from VINVARO, for example replies to customers and documents. We don't read your mailbox through Gmail; incoming email only arrives when you forward it to your VINVARO inbox address yourself.",
            "Outlook (Mail.ReadWrite): fetching new messages in your inbox so you see customer conversations in the shared VINVARO inbox.",
            "Google Calendar (calendar.events) and Outlook calendar (Calendars.ReadWrite): adding, updating and removing appointments such as test drives and handovers in your own calendar, and showing busy times so you don't double-book.",
          ],
          "VINVARO's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements. This means: we use this data only for the features above, which the user turns on; we don't sell it, use it for advertising or use it to train AI models; and humans don't read it unless the user consents, it is needed for security, or the law requires it.",
          "You can disconnect at any time in VINVARO (Settings › Integrations or Inbox) or in your Google or Microsoft account. We then delete the access tokens.",
        ],
      },
      {
        title: "Who we share data with",
        body: [
          "We use carefully selected suppliers with whom we have data processing agreements. Data is stored within the European Economic Area wherever possible.",
          [
            "Supabase: database, storage and sign-in (servers in Ireland).",
            "Vercel: hosting of the website and the app, and anonymous visit statistics.",
            "Resend: sending and receiving email (EU, Ireland).",
            "Google: business email, address search (Places) and, if you connect them, Gmail and Google Calendar.",
            "Microsoft: Outlook and the Outlook calendar, if you connect them.",
            "Meta: WhatsApp Business, if the dealer connects WhatsApp.",
            "AI providers through Vercel AI Gateway: for labels, lead scores, reply drafts and reading documents. They don't use the data to train their models.",
            "Netherlands Chamber of Commerce (KVK), RDW and the EU (VIES): for company, vehicle and VAT data.",
            "Marketplaces such as mobile.de and AutoScout24: only the listing data of vehicles the dealer publishes.",
          ],
          "Where a supplier is based outside the EEA, we put appropriate safeguards in place, such as the European Commission's standard contractual clauses or the EU-US Data Privacy Framework.",
        ],
      },
      {
        title: "How long we keep data",
        body: [
          [
            "Contact and demo requests: up to two years after the last contact.",
            "Account data: as long as the account exists, then at most three months in backups.",
            "Dealer data: as long as the subscription runs. After cancellation the dealer can export everything; we then delete the data within three months.",
            "Invoices and the related records: seven years (tax retention duty).",
          ],
        ],
      },
      {
        title: "Security",
        body: [
          "Connections are encrypted (HTTPS). Passwords and access tokens of connected accounts are stored encrypted. Dealers' data is strictly separated: staff only see their own company's data, and only what their role allows. Changes are logged.",
        ],
      },
      {
        title: "Cookies and local storage",
        body: [
          "The website uses no tracking or advertising cookies. Vercel's visit statistics are anonymous and work without cookies. The demo form keeps your answers temporarily in your own browser, so you can continue later.",
          "The VINVARO app only uses necessary cookies: to keep you signed in and remember your language and display choice.",
        ],
      },
      {
        title: "Your rights",
        body: [
          "You have the right to access, correct, delete, restrict and port your data, and to object to processing. Email us at info@vinvaro.com; we reply within one month. If it concerns data a dealer records about you, we forward your request to that dealer or help it handle your request.",
          "Not happy with how we handle your data? You can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).",
        ],
      },
      {
        title: "Changes",
        body: ["We may update this privacy policy. The date at the top shows when that last happened. We inform users in advance of important changes."],
      },
    ] satisfies LegalSection[],
  },
});

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getLang();
  return pageMetadata({ lang, path: "/privacy", title: copy[lang].metaTitle, description: copy[lang].metaDescription });
}

export default async function PrivacyPage() {
  const lang = await getLang();
  const t = copy[lang];
  return <LegalPage eyebrow={t.eyebrow} title={t.title} updated={UPDATED[lang]} intro={t.intro} sections={t.sections} />;
}
