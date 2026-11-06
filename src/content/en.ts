import type { Integration, NavFeatured, NavLink, PlatformModule, Segment } from "@/content/nl";
import { integrations as nlIntegrations, site as nlSite } from "@/content/nl";

export const site = {
  ...nlSite,
  hours: { ...nlSite.hours, label: "Mon–Fri 09:00–17:00" },
  category: "The Automotive Operating System",
  tagline: "Every vehicle. Every detail. Under control.",
  description:
    "VINVARO brings vehicles, customers and operations together in one workspace. From registration and intake to test drive, contract, listing and delivery, for automotive businesses that want control without scattered systems.",
  news: { label: "Publish to mobile.de and AutoScout24", href: "/platform/publiceren" },
};

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
      title: "Deviations become findings.",
      body: "Whatever differs from what you expected at intake automatically becomes a finding, and a task when needed. With the original photo attached.",
      cta: "Explore AI & findings",
      href: "/platform/intelligence",
      badge: "Evidence, not assumptions",
      findings: [
        ["Possible scratch", "Left side"],
        ["Second key missing", "Intake"],
      ],
    },
    groups: [
      {
        title: "Vehicles",
        links: [
          { label: "Inventory & dossier", href: "/platform/voorraad", description: "One vehicle, one complete history" },
          { label: "Intake & delivery", href: "/platform/intake-en-aflevering", description: "Fixed workflows with photos and signature" },
          { label: "AI & findings", href: "/platform/intelligence", description: "Deviations, documents and leads with AI" },
          { label: "Staff app", href: "/platform/team-app", description: "Capture on the floor, even offline" },
        ],
      },
      {
        title: "Customers & sales",
        links: [
          { label: "Inbox", href: "/platform/inbox", description: "WhatsApp, Gmail and Outlook in one inbox" },
          { label: "CRM & sales", href: "/platform/crm-en-verkoop", description: "Contacts, inquiries, deals and pipeline" },
          { label: "Calendar & test drives", href: "/platform/agenda", description: "Appointments in the calendar of whoever runs them" },
          { label: "Contracts & invoices", href: "/platform/contracten-en-facturen", description: "Sign digitally and invoice" },
          { label: "Publishing", href: "/platform/publiceren", description: "mobile.de, AutoScout24 and your own website" },
        ],
      },
    ],
  },
  {
    label: "For dealers",
    featured: {
      kind: "switch",
      title: "Switching to VINVARO?",
      body: "We import your stock and contacts, set up your workflows and connect your channels. Your team works in one workspace within a few days.",
      cta: "Plan a switch call",
      href: "/demo",
      card: "Switch · De Vries Automotive",
      step: "Step 2/3",
      steps: ["Introduction and demo", "Import stock and contacts", "Live with inbox and workflows"],
    },
    groups: [
      {
        title: "Business type",
        links: [
          { label: "Independent dealers", href: "/voor-autobedrijven/merkonafhankelijke-dealers", description: "Purchasing, preparation and sales in one flow" },
          { label: "Specialists", href: "/voor-autobedrijven/specialisten", description: "Premium, classic, EV and import" },
          { label: "Multi-site businesses", href: "/voor-autobedrijven/meerdere-vestigingen", description: "One way of working, insight per site" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Platform overview", href: "/platform", description: "Every module at a glance" },
          { label: "Integrations", href: "/integraties", description: "RDW, marketplaces, inbox and calendar" },
          { label: "Book a demo", href: "/demo", description: "30 minutes, on your stock and way of working" },
          { label: "Contact", href: "/contact", description: "Ask our team your question" },
        ],
      },
    ],
  },
  { label: "Integrations", href: "/integraties" },
  { label: "Contact", href: "/contact" },
];

export const platform: PlatformModule[] = [
  {
    slug: "voorraad",
    name: "Inventory & dossier",
    module: "VINVARO Core",
    eyebrow: "Inventory & vehicle dossier",
    title: "One vehicle. One complete history.",
    lead: "Enter a registration and VINVARO pulls make, model, MOT and odometer verdict from the Dutch RDW. Photos, documents, costs, workflows and sales come together in one dossier, from purchase to delivery.",
    visual: "inventory",
    steps: ["Registration or VIN", "RDW data", "Stock period", "Dossier complete"],
    points: [
      { title: "Registration in, data out", body: "Make, model, variant, fuel and MOT due date straight from RDW Open Data. Including the NAP odometer verdict." },
      { title: "Documents and photos in one place", body: "Drop a PDF or photos into the dossier. Inspection and damage photos stay internal, separate from your listing photos." },
      { title: "Stock periods and costs", body: "Purchase, preparation, costs and payments per stock period. See what each car holds and what's still to do." },
      { title: "Import without retyping", body: "Import existing stock and contacts from Excel or CSV. VINVARO recognises the columns and lets you check before saving." },
      { title: "Evidence, not assumptions", body: "Observed, imported and AI-suggested information stays separate. A task can close; the original observation remains in the history." },
      { title: "Search everything", body: "Search by registration, VIN, model or customer from any screen, with shortcuts for people who work in VINVARO all day." },
    ],
    faq: [
      { q: "Which data does VINVARO pull from the RDW?", a: "For Dutch registrations: make, model, variant, fuel, first registration, MOT due date, inspections with defects and the odometer (NAP) verdict. The data comes from RDW Open Data and can be refreshed at any time." },
      { q: "Can I import my current stock?", a: "Yes. You import vehicles and contacts from Excel or CSV. We help you with the first import when you switch." },
      { q: "Who sees which data?", a: "Roles and permissions decide per user what's visible. Purchase prices, costs and internal notes stay internal and are never shared via feeds or marketplaces." },
    ],
  },
  {
    slug: "intake-en-aflevering",
    name: "Intake & delivery",
    module: "VINVARO Workflows",
    eyebrow: "Workflows",
    title: "From intake to delivery. Every step recorded.",
    lead: "Build your own checklists for intake, valeting, workshop, photography and delivery. Every run records answers, photos and deviations, and a stage only moves on once its required workflows are done.",
    visual: "intake",
    steps: ["Intake", "Inspection", "Preparation", "Sales", "Delivery"],
    points: [
      { title: "Versioned templates", body: "Steps with yes/no, present/missing, photos, documents, video and signature. Existing runs always keep their original version." },
      { title: "A deviation becomes a finding", body: "Expected and found don't match? Completing the run creates a finding, and a task when needed, with comment and photo." },
      { title: "Stages that guard", body: "Link required workflows to a pipeline stage. A car only moves to sales once intake and preparation are complete." },
      { title: "Assign tasks", body: "Assign steps to colleagues or let rules do it. Everyone sees in the task list what's expected of them today." },
      { title: "External partners via a link", body: "Your valeter, body shop or transporter completes their step via a secure link, without an account. You get a notification with the photos." },
      { title: "Delivery protocol with signature", body: "Keys, documents, odometer reading and the customer's signature, recorded at handover." },
    ],
    faq: [
      { q: "Can I customise workflows?", a: "Yes. You create and publish your own templates. Change a template and only new runs get the new version; runs in progress stay unchanged." },
      { q: "Do workflows work on a phone?", a: "Yes. Your team completes workflows in the VINVARO app, even without a connection. Photos and answers are sent once there's signal again." },
      { q: "What is a finding?", a: "A recorded deviation from what you expected or from an earlier inspection, such as a missing second key or a scratch. A finding has a severity and can create a task." },
    ],
  },
  {
    slug: "intelligence",
    name: "AI & findings",
    module: "VINVARO Intelligence",
    eyebrow: "VINVARO Intelligence",
    title: "AI that helps you check. Not AI that decides.",
    lead: "VINVARO reads documents, labels messages, estimates how warm a lead is and suggests replies. Every suggestion shows where it came from, and your team confirms what matters.",
    visual: "intelligence",
    points: [
      { title: "Read documents", body: "Drop a PDF or photo of a purchase invoice or registration document into VINVARO. The data is suggested; you check and save." },
      { title: "Label and score messages", body: "Incoming messages get a label, such as test drive, trade-in or financing, and a lead score, so the warmest questions rise to the top." },
      { title: "Suggested replies", body: "A draft reply in your tone, with the car's details included. You adjust and send." },
      { title: "Findings with evidence", body: "Deviations at intake and inspection in one overview, with severity, zone and the original photo." },
      { title: "Explainable and traceable", body: "AI suggestions stay separate from what your team has confirmed. The audit log shows who confirmed what." },
      { title: "Your data stays yours", body: "Data stays strictly within your own organisation and is not used to train public AI models." },
    ],
    faq: [
      { q: "Does the AI decide anything by itself?", a: "No. VINVARO suggests: data from a document, a label, a lead score or a draft reply. Your team confirms, adjusts or rejects." },
      { q: "Which AI models does VINVARO use?", a: "VINVARO works with established language models through a secure gateway. Your data is only used to deliver the service." },
    ],
  },
  {
    slug: "team-app",
    name: "Staff app",
    module: "VINVARO Staff",
    eyebrow: "Staff app for iOS and Android",
    title: "Capture where the work happens.",
    lead: "On the floor, in the workshop or on the lot: your team takes photos, completes workflows and answers customers from their phone. Even without signal; everything is sent once there's a connection again.",
    visual: "app",
    points: [
      { title: "Capture offline", body: "Photos and answers are saved on the device and sent once there's signal. Saved on this device, two uploads pending: you see exactly what's still on its way." },
      { title: "A camera for dossier photos", body: "A camera made for cars: shoot in quick succession, straight into the right workflow step." },
      { title: "Tasks and notifications", body: "Push notifications for new tasks, assigned steps and customer messages. Your daily priorities on one screen." },
      { title: "Inbox in your pocket", body: "Reply to WhatsApp and email with quick replies or an AI suggestion, with the car right there." },
      { title: "Permissions per role", body: "Each colleague only sees the parts that belong to their role, just like on the web." },
    ],
  },
  {
    slug: "inbox",
    name: "Inbox",
    module: "VINVARO CRM",
    eyebrow: "Shared inbox",
    title: "Every customer question in one inbox. With the car attached.",
    lead: "WhatsApp Business, Gmail, Outlook and your own mail server come together in one shared inbox. Conversations are linked to the contact and the vehicle, so everyone knows what's already been said.",
    visual: "inbox",
    points: [
      { title: "Every channel together", body: "WhatsApp Business, Gmail, Outlook / Microsoft 365 and IMAP/SMTP. Separate tabs per channel, or all together." },
      { title: "Labels and lead score with AI", body: "Every message gets a label and a score. Test drive requests and serious buyers stand out." },
      { title: "Quick replies", body: "Templates for common questions and AI drafts in your tone. On your phone too." },
      { title: "Conversations on the dossier", body: "Messages, attachments and WhatsApp media are visible on the contact and on the vehicle." },
      { title: "Bulk actions and assignment", body: "Mark, archive or assign conversations to a colleague in one go." },
      { title: "Notifications", body: "A notification for every new message, in the browser and in the app." },
    ],
  },
  {
    slug: "crm-en-verkoop",
    name: "CRM & sales",
    module: "VINVARO CRM",
    eyebrow: "Contacts & sales",
    title: "From inquiry to signed deal.",
    lead: "Inquiries from your website, marketplaces and inbox become a contact, a deal and a task. Your sales pipeline shows per stage which car belongs to which customer and what the next step is.",
    visual: "crm",
    points: [
      { title: "Inquiries become deals", body: "A test drive request or question via your website automatically becomes a contact, deal and task." },
      { title: "Sales pipeline", body: "Your own stages for your sales process. Drag deals along, with value and time in stage per stage." },
      { title: "Chamber of Commerce data in one click", body: "Type a company name and pick the company: KVK number and address are filled in." },
      { title: "VAT number verified", body: "Check a VAT number with VIES. The result is stored as evidence, useful for intra-community supplies." },
      { title: "Tasks and follow-up", body: "Open tasks per person, with due date and priority. Nobody forgets the call-back." },
      { title: "Import", body: "Import existing contacts from Excel, CSV or PDF." },
    ],
  },
  {
    slug: "agenda",
    name: "Calendar & test drives",
    module: "VINVARO CRM",
    eyebrow: "Calendar & test drives",
    title: "Test drives, viewings and handovers. In everyone's own calendar.",
    lead: "Plan appointments with customer and car attached. Each team member connects their own Google or Outlook calendar, and the appointment shows up for whoever runs it.",
    visual: "agenda",
    points: [
      { title: "Appointment types", body: "Test drive, handover, viewing and meeting, with customer, car, location and notes." },
      { title: "Google and Outlook", body: "Appointments appear automatically in the calendar of whoever runs them. Change or cancel in VINVARO and the calendar follows." },
      { title: "Invite the customer", body: "The customer gets a calendar invitation, and later any changes or a cancellation." },
      { title: "Busy or free", body: "While planning, you see straight away whether your colleague already has an appointment." },
      { title: "Completed or no-show", body: "Record the outcome. See which test drives led to a deal." },
    ],
  },
  {
    slug: "contracten-en-facturen",
    name: "Contracts & invoices",
    module: "VINVARO Finance",
    eyebrow: "Contracts & invoices",
    title: "Sales agreement signed. Invoice sent.",
    lead: "Create contracts from your own templates and let the customer sign digitally via a secure link. Build invoices and credit notes from your product catalogue, and send the financial export to your bookkeeping.",
    visual: "contracts",
    steps: ["Draft", "Issued", "Signed", "Invoiced"],
    points: [
      { title: "Contracts from templates", body: "Sales, purchase and trade-in agreements with your terms, filled with the car's and customer's details." },
      { title: "Sign digitally", body: "The customer signs via a personal link on phone or laptop. An issued contract can no longer be changed." },
      { title: "Invoices and credit notes", body: "With a product catalogue for delivery packages, accessories and warranty. The customer views the invoice online." },
      { title: "VAT and margin scheme", body: "VAT car or margin car, recorded per vehicle and shown on invoice and feed." },
      { title: "Export to bookkeeping", body: "Financial overview and export, with a connection to Autoboeker. Exact Online, Twinfield, Moneybird and SnelStart are on the roadmap." },
      { title: "Request financing", body: "Request financing for your customer through Autus Finance, from the deal." },
    ],
  },
  {
    slug: "publiceren",
    name: "Publishing",
    module: "VINVARO Publishing",
    eyebrow: "Publishing",
    title: "Enter once. Online everywhere.",
    lead: "Publish a car from its dossier to mobile.de and AutoScout24, and show your stock on your own website with the VINVARO feed. Sold or a new price? Everything is updated.",
    visual: "publish",
    points: [
      { title: "mobile.de", body: "Connect your dealer account via the Seller API and publish listings from the dossier." },
      { title: "AutoScout24 and AutoTrack", body: "Publish to AutoScout24, and to AutoTrack at the same time if you like." },
      { title: "Price and status stay in sync", body: "A new asking price or a sold car is pushed to the connected channels." },
      { title: "Stock on your own website", body: "A script or iframe with your stock, in your own colours. Visitors request a test drive directly; every inquiry becomes a deal in VINVARO." },
      { title: "Public data only", body: "Purchase prices, costs, notes and contacts are never shared. VIN and registration are off by default." },
      { title: "More marketplaces on the roadmap", body: "Marktplaats, Gaspedaal, ViaBOVAG and AutoWereld are on the roadmap." },
    ],
  },
];

export const segments: Segment[] = [
  {
    slug: "merkonafhankelijke-dealers",
    name: "Independent dealers",
    eyebrow: "For independent dealers",
    title: "More cars through the door. Without scattered lists.",
    lead: "Purchasing, preparation, sales and delivery in one workspace. See per car where it is, what it costs and who has the next step.",
    pains: ["Stock in Excel, customers in WhatsApp", "Nobody knows if the car's been valeted", "Updating listings by hand", "Contracts on paper"],
    outcomes: [
      { title: "Overview per car", body: "Status, costs, workflows and conversations in one dossier." },
      { title: "Sale-ready sooner", body: "Required workflows per stage and tasks for whoever is up next." },
      { title: "Online without double work", body: "Publish to mobile.de, AutoScout24 and your own website from the dossier." },
    ],
    modules: ["voorraad", "intake-en-aflevering", "publiceren", "inbox"],
  },
  {
    slug: "specialisten",
    name: "Specialists",
    eyebrow: "For specialists",
    title: "Every detail recorded. For cars where details matter.",
    lead: "Premium, classic, electric or import: with specialist cars, documentation counts. VINVARO records provenance, condition, documents and agreements, so buyer and seller know where they stand.",
    pains: ["Documentation scattered across folders and email", "Condition hard to prove", "International buyers and VAT checks", "High expectations at handover"],
    outcomes: [
      { title: "Evidence for every detail", body: "Photos per zone, documents and findings with the original observation." },
      { title: "Sell internationally", body: "Check VAT numbers with VIES, with the result stored as evidence on the contact." },
      { title: "A handover that's right", body: "Delivery protocol with keys, documents and the customer's signature." },
    ],
    modules: ["voorraad", "intelligence", "crm-en-verkoop", "contracten-en-facturen"],
  },
  {
    slug: "meerdere-vestigingen",
    name: "Multi-site businesses",
    eyebrow: "For multi-site automotive businesses",
    title: "One way of working. Insight per site.",
    lead: "The same workflows, roles and agreements at every location, with each site's own stock, feed and team. Management sees in one overview where things stall.",
    pains: ["Every site works slightly differently", "No view of turnaround per location", "Permissions and access hard to manage", "Who did what, and when?"],
    outcomes: [
      { title: "Sites and roles", body: "Stock, website feed and team per site, with permissions per role." },
      { title: "One standard", body: "Published workflow templates apply everywhere, with version control." },
      { title: "Audit log", body: "Every change with who and when, searchable by registration, name or invoice number." },
    ],
    modules: ["intake-en-aflevering", "team-app", "agenda", "crm-en-verkoop"],
  },
];

const categoryNames: Record<string, string> = {
  Voertuiggegevens: "Vehicle data",
  Marktplaatsen: "Marketplaces",
  Berichten: "Messaging",
  Agenda: "Calendar",
  Relatiecontroles: "Contact checks",
  "Boekhouding & financiering": "Accounting & financing",
  "Betalen & ondertekenen": "Payments & signing",
  Website: "Website",
};

export const integrationCategories = ["Marketplaces", "Messaging", "Vehicle data", "Calendar", "Contact checks", "Accounting & financing", "Payments & signing", "Website"] as const;

const integrationBodies: Record<string, string> = {
  "mobile.de": "Publish via the Seller API, with price and status updated automatically.",
  AutoScout24: "Publish as a data provider, linked to your customer number.",
  AutoTrack: "Online together with AutoScout24, with one tick.",
  "Marktplaats Admarkt": "Listings on Marktplaats.",
  Gaspedaal: "Stock on Gaspedaal.nl.",
  ViaBOVAG: "Stock on ViaBOVAG.nl.",
  AutoWereld: "Stock on AutoWereld.nl.",
  "WhatsApp Business": "Customer conversations in the shared inbox, with media and quick replies.",
  Gmail: "Receive and send email from VINVARO.",
  "Outlook / Microsoft 365": "Receive and send email from VINVARO.",
  "E-mail (IMAP/SMTP)": "Through your own domain's mail server.",
  "RDW Open Data": "Registration data, MOT, inspections and odometer verdict.",
  Autotelex: "Extended vehicle and option data.",
  VWE: "Vehicle data and value indications.",
  carVertical: "International vehicle history.",
  CARFAX: "History reports by VIN.",
  "Google Agenda": "Appointments in the calendar of whoever runs them.",
  "Outlook-agenda": "Appointments in the calendar of whoever runs them.",
  "KVK Handelsregister": "Type a company name; KVK number and address are filled in.",
  VIES: "Verify VAT numbers, with the result kept as evidence.",
  Creditsafe: "Creditworthiness of business customers.",
  Autoboeker: "Invoices and costs to your bookkeeping automatically.",
  "Autus Finance": "Request financing for your customer, from the deal.",
  "Exact Online": "Direct export of invoices and costs.",
  Moneybird: "Direct export of invoices and costs.",
  Mollie: "Online payment of invoices and deposits.",
  Signhost: "Qualified digital signing. Built-in signing already works.",
  Websitefeed: "Your stock on your own website, with inquiry forms.",
};

const integrationNames: Record<string, string> = {
  "Google Agenda": "Google Calendar",
  "Outlook-agenda": "Outlook calendar",
  "E-mail (IMAP/SMTP)": "Email (IMAP/SMTP)",
  "KVK Handelsregister": "KVK (Dutch Chamber of Commerce)",
  Websitefeed: "Website feed",
};

export const integrations: Integration[] = nlIntegrations.map((i) => ({
  ...i,
  name: integrationNames[i.name] ?? i.name,
  category: categoryNames[i.category] ?? i.category,
  body: integrationBodies[i.name] ?? i.body,
}));

export const securityControls = [
  { title: "Strictly per organisation", body: "Your data stays within your own business. Every query is scoped to your organisation." },
  { title: "Roles and permissions", body: "Per role you decide which pages and data are visible, in the app too." },
  { title: "Audit log", body: "Every change with who and when. Financial fields only show that something changed." },
  { title: "Sensitive data protected", body: "API keys and connections are stored encrypted; purchase prices and notes are never shared." },
];

export const faq = [
  { q: "What is VINVARO?", a: "VINVARO is the operating system for automotive businesses: one workspace for vehicles, customers and operations. Inventory and vehicle dossier, intake and delivery workflows, a shared inbox, CRM, calendar, contracts, invoices and publishing to marketplaces and your own website." },
  { q: "Who is VINVARO for?", a: "Independent automotive businesses: independent dealers, specialists and businesses with multiple sites. Owners, sales, the workshop floor and administration work in the same environment." },
  { q: "Does VINVARO work with the RDW?", a: "Yes. For Dutch registrations, VINVARO pulls make, model, MOT, inspections with defects and the odometer verdict from RDW Open Data." },
  { q: "Which marketplaces can I publish to?", a: "Today, mobile.de and AutoScout24 (with AutoTrack), plus your own website via the VINVARO feed. Marktplaats, Gaspedaal, ViaBOVAG and AutoWereld are on the roadmap." },
  { q: "Which channels come into the inbox?", a: "WhatsApp Business, Gmail, Outlook / Microsoft 365 and email through your own mail server (IMAP/SMTP)." },
  { q: "Is there an app for my team?", a: "Yes. The VINVARO app for iOS and Android works offline too: photos and workflow answers are sent once there's signal again." },
  { q: "How quickly can I switch?", a: "Import your stock and contacts from Excel or CSV; connect channels and calendars yourself in a few minutes. We plan the switch together in the demo." },
  { q: "What does VINVARO cost?", a: "VINVARO is modular: you choose the modules you need. We'll put together a proposal tailored to your organisation during or after the demo." },
];
