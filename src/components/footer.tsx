import Link from "@/components/link";
import { getContent } from "@/lib/content";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { Container, Mark } from "@/components/ui";
import { Logo } from "@/components/header";
import { LangSwitch } from "@/components/lang-switch";
import { ContactStrip } from "@/components/sections";
import { StoreBadges } from "@/components/store-badges";

type FooterLink = { label: string; href: string };

const copy = defineCopy({
  nl: {
    tagline: "Het besturingssysteem voor autobedrijven. Voertuigen, klanten en processen samen in één werkplek, van intake tot aflevering.",
    vehicles: "Voertuigen",
    sales: "Klanten & verkoop",
    forDealers: "Voor autobedrijven",
    company: "VINVARO",
    allPlatform: "Platformoverzicht",
    agent: "VINVARO Agent",
    integrations: "Integraties",
    pricing: "Prijzen",
    demo: "Plan een demo",
    login: "Inloggen",
    madeIn: "Gebouwd in Nederland",
    illustrative: "Alle schermen, kentekens en gegevens op deze website zijn illustratief.",
    privacy: "Privacy",
    terms: "Voorwaarden",
    app: "Download de app",
  },
  en: {
    tagline: "The operating system for automotive businesses. Vehicles, customers and operations together in one workspace, from intake to delivery.",
    vehicles: "Vehicles",
    sales: "Customers & sales",
    forDealers: "For dealers",
    company: "VINVARO",
    allPlatform: "Platform overview",
    agent: "VINVARO Agent",
    integrations: "Integrations",
    pricing: "Pricing",
    demo: "Book a demo",
    login: "Log in",
    madeIn: "Built in the Netherlands",
    illustrative: "All screens, registrations and data on this website are illustrative.",
    privacy: "Privacy",
    terms: "Terms",
    app: "Get the app",
  },
});

export async function Footer() {
  const lang = await getLang();
  const t = copy[lang];
  const { platform, segments, site, nav } = getContent(lang);
  const groups = nav[0].groups ?? [];
  const toLinks = (hrefs: string[]): FooterLink[] =>
    hrefs.map((href) => platform.find((p) => href.endsWith(p.slug))).filter((p) => p !== undefined).map((p) => ({ label: p.name, href: `/platform/${p.slug}` }));

  const columns: { title: string; links: FooterLink[] }[] = [
    { title: t.vehicles, links: toLinks(groups[0]?.links.map((l) => l.href) ?? []) },
    { title: t.sales, links: toLinks(groups[1]?.links.map((l) => l.href) ?? []) },
    { title: t.forDealers, links: segments.map((s) => ({ label: s.name, href: `/voor-autobedrijven/${s.slug}` })) },
    {
      title: t.company,
      links: [
        { label: t.allPlatform, href: "/platform" },
        { label: t.agent, href: "/agent" },
        { label: t.integrations, href: "/integraties" },
        { label: t.pricing, href: "/prijzen" },
        { label: "Contact", href: "/contact" },
        { label: t.demo, href: "/demo" },
        { label: t.login, href: site.appUrl },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-surface">
      <Mark className="pointer-events-none absolute -right-10 -bottom-20 h-[300px] w-auto text-ink/[0.025]" />
      <Container className="relative pt-16 pb-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-16">
          <div>
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">{t.tagline}</p>
            <ul className="mt-5 flex gap-2">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex size-9 items-center justify-center rounded-lg bg-sunken text-ink-2 ring-1 ring-line transition-colors hover:bg-brand hover:text-white hover:ring-brand"
                  >
                    <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
                      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.83v1.54h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.13V21h-4v-4.98c0-1.19-.02-2.72-1.66-2.72-1.66 0-1.92 1.3-1.92 2.63V21h-4V9.75Z" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ContactStrip stacked />
            </div>
            <div className="mt-7">
              <p className="mb-3 text-[12px] font-medium tracking-[0.06em] text-subtle uppercase">{t.app}</p>
              <StoreBadges lang={lang} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="mb-4 text-[12px] font-medium tracking-[0.06em] text-subtle uppercase">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[13.5px] text-ink-2 transition-colors hover:text-brand">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-14 flex flex-col-reverse justify-between gap-4 border-t border-line pt-6 text-[12.5px] text-subtle sm:flex-row sm:items-center">
          <div>
            <p>© 2026 {site.legalName}</p>
            <p className="mt-1 text-[12px]">{t.illustrative}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-brand">
              {t.privacy}
            </Link>
            <Link href="/voorwaarden" className="transition-colors hover:text-brand">
              {t.terms}
            </Link>
            <span className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center overflow-hidden rounded-full ring-1 ring-line" aria-hidden>
                <svg viewBox="0 0 9 6" className="h-full w-auto">
                  <path fill="#ae1c28" d="M0 0h9v2H0z" />
                  <path fill="#fff" d="M0 2h9v2H0z" />
                  <path fill="#21468b" d="M0 4h9v2H0z" />
                </svg>
              </span>
              {t.madeIn}
            </span>
            <LangSwitch />
          </div>
        </div>
      </Container>
    </footer>
  );
}
