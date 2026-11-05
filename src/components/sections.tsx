import Image from "next/image";
import clsx from "clsx";
import { Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { getContent, type IntegrationStatus } from "@/lib/content";
import { defineCopy, type Lang } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { Button, Container, Eyebrow, Mark } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { IconTile } from "@/components/icons";
import { OfficeHours } from "@/components/office-hours";
import { ChannelLogo } from "@/components/channel-logo";
import { Car } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    ctaEyebrow: "Plan een demo",
    ctaTitle: "Zie VINVARO werken met jouw voorraad.",
    ctaLead: "In 30 minuten laten we zien hoe intake, inbox, verkoop en publiceren samenkomen, afgestemd op jouw autobedrijf.",
    bookDemo: "Plan een demo",
    contact: "Neem contact op",
    terms: ["Demo van 30 minuten", "Hulp bij de overstap", "Modulair: kies wat je nodig hebt"],
    status: { live: "Live", beta: "Bèta", planned: "Gepland" } satisfies Record<IntegrationStatus, string>,
    marquee: "Van Abarth tot Volvo: elk merk in één dossier",
  },
  en: {
    ctaEyebrow: "Book a demo",
    ctaTitle: "See VINVARO work with your stock.",
    ctaLead: "In 30 minutes we show you how intake, inbox, sales and publishing come together, tailored to your automotive business.",
    bookDemo: "Book a demo",
    contact: "Get in touch",
    terms: ["30-minute demo", "Help with switching", "Modular: pick what you need"],
    status: { live: "Live", beta: "Beta", planned: "Planned" } satisfies Record<IntegrationStatus, string>,
    marquee: "From Abarth to Volvo: every make in one dossier",
  },
});

export function PageHero({ eyebrow, title, lead, children, center }: { eyebrow: string; title: ReactNode; lead: ReactNode; children?: ReactNode; center?: boolean }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[520px] opacity-70" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[900px] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-3xl" />
      <Container className={clsx("relative animate-rise", center && "text-center")}>
        <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
        <h1 className={clsx("text-h1 max-w-[900px] text-balance", center && "mx-auto")}>{title}</h1>
        <p className={clsx("text-lead mt-6 max-w-[660px] text-muted text-pretty", center && "mx-auto")}>{lead}</p>
        {children && <div className={clsx("mt-9 flex flex-wrap gap-3", center && "justify-center")}>{children}</div>}
      </Container>
    </section>
  );
}

export async function CTASection({ title, lead }: { title?: string; lead?: string }) {
  const lang = await getLang();
  const t = copy[lang];
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <div className="bg-obsidian-glow relative overflow-hidden rounded-[28px] px-6 pt-16 text-center shadow-float sm:px-12 sm:pt-24">
            <div className="bg-grid-dark mask-fade-radial pointer-events-none absolute inset-0" />
            <Mark className="pointer-events-none absolute -right-16 -bottom-24 h-[380px] w-auto text-white/[0.03]" />
            <div className="relative">
              <Eyebrow tone="light">{t.ctaEyebrow}</Eyebrow>
              <h2 className="text-h2 mx-auto mt-5 max-w-[760px] text-balance text-white">{title ?? t.ctaTitle}</h2>
              <p className="text-lead mx-auto mt-5 max-w-[560px] text-white/60">{lead ?? t.ctaLead}</p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Button href="/demo" size="lg" arrow>
                  {t.bookDemo}
                </Button>
                <Button href="/contact" size="lg" variant="light">
                  {t.contact}
                </Button>
              </div>
              <p className="mt-6 text-[13px] text-white/45">{t.terms.join(" · ")}</p>
            </div>
            <div className="relative mt-12 h-[120px] overflow-hidden sm:h-[150px]">
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="absolute inset-x-0 bottom-3 h-3 w-full" aria-hidden>
                <line x1="0" y1="10" x2="1000" y2="10" stroke="rgb(255 255 255 / 0.18)" strokeWidth="2" strokeDasharray="22 18" className="animate-dash" style={{ animationDuration: "0.5s" }} />
              </svg>
              <div className="absolute bottom-1 w-[200px] sm:w-[260px]" style={{ animation: "cta-drive 9s cubic-bezier(0.45,0,0.55,1) infinite" }}>
                <Car tone="dark" spin className="w-full" />
                <span className="absolute top-[58%] -right-24 h-6 w-28 rounded-full bg-brand-300/25 blur-xl" />
              </div>
            </div>
            <style>{`@keyframes cta-drive { 0% { left: -30%; } 40%, 55% { left: 50%; transform: translateX(-50%); } 100% { left: 110%; transform: translateX(0); } }`}</style>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export async function ContactStrip({ stacked }: { stacked?: boolean }) {
  const { site } = getContent(await getLang());
  const link = "flex items-center gap-2 text-[14px] text-ink-2 hover:text-ink";
  return (
    <div className={clsx("flex flex-col gap-3", !stacked && "sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8")}>
      <a href={`mailto:${site.email}`} className={link}>
        <Mail className="size-4 text-subtle" /> {site.email}
      </a>
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        {site.phone && site.phoneHref && (
          <a href={site.phoneHref} className={link}>
            <Phone className="size-4 text-subtle" /> {site.phone}
          </a>
        )}
        <OfficeHours />
      </span>
      {site.address && (
        <a href={`https://maps.google.com/?q=${encodeURIComponent(site.address)}`} target="_blank" rel="noreferrer" className={link}>
          <MapPin className="size-4 text-subtle" /> {site.address}
        </a>
      )}
    </div>
  );
}

export function FeatureList({ items, columns = 2, dark }: { items: { title: string; body: string }[]; columns?: 2 | 3 | 4; dark?: boolean }) {
  return (
    <div
      className={clsx(
        "grid gap-x-10 gap-y-10 border-t pt-10",
        dark ? "border-white/10" : "border-line",
        columns === 2 && "sm:grid-cols-2",
        columns === 3 && "sm:grid-cols-2 lg:grid-cols-3",
        columns === 4 && "sm:grid-cols-2 lg:grid-cols-4",
      )}
    >
      {items.map((p) => (
        <div key={p.title}>
          <IconTile text={p.title} hint={p.body} tone={dark ? "dark" : "brand"} />
          <h3 className={clsx("mt-4 text-[16px] font-semibold tracking-[-0.02em]", dark && "text-white")}>{p.title}</h3>
          <p className={clsx("mt-2 text-[14.5px] leading-relaxed", dark ? "text-white/55" : "text-muted")}>{p.body}</p>
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status, lang }: { status: IntegrationStatus; lang: Lang }) {
  return (
    <span
      className={clsx(
        "flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10.5px]",
        status === "live" && "bg-ok-50 text-ok",
        status === "beta" && "bg-brand-50 text-brand",
        status === "planned" && "bg-sunken text-muted",
      )}
    >
      <span className={clsx("size-1.5 rounded-full", status === "live" ? "bg-ok" : status === "beta" ? "bg-brand" : "bg-subtle")} />
      {copy[lang].status[status]}
    </span>
  );
}

export async function IntegrationGrid({ only }: { only?: IntegrationStatus[] }) {
  const lang = await getLang();
  const { integrations, integrationCategories } = getContent(lang);
  const list = only ? integrations.filter((i) => only.includes(i.status)) : integrations;
  return (
    <div className="space-y-10">
      {integrationCategories.map((cat) => {
        const items = list.filter((i) => i.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat}>
            <p className="mb-4 font-mono text-[11.5px] tracking-[0.1em] text-subtle uppercase">{cat}</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((i) => (
                <div key={i.name} className={clsx("flex items-start gap-3.5 rounded-2xl bg-surface p-5 shadow-card", i.status === "planned" && "opacity-80")}>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-canvas ring-1 ring-line">
                    {i.logo ? <ChannelLogo kind={i.logo} size={20} /> : <IconTile text={`${i.name} ${i.category}`} hint={i.body} size="sm" tone={i.status === "planned" ? "neutral" : "brand"} />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-2">
                      <span className="text-[14.5px] font-semibold tracking-[-0.015em]">{i.name}</span>
                      <StatusBadge status={i.status} lang={lang} />
                    </span>
                    <span className="mt-1 block text-[13px] leading-snug text-muted">{i.body}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

const makes = ["volkswagen", "bmw", "mercedes-benz", "audi", "volvo", "kia", "hyundai", "toyota", "peugeot", "renault", "skoda", "tesla", "polestar", "porsche", "ford", "opel", "mini", "cupra", "lynk-and-co", "mazda", "byd", "land-rover"];

export async function BrandMarquee() {
  const t = copy[await getLang()];
  return (
    <div>
      <p className="mb-6 text-center text-[13px] text-muted">{t.marquee}</p>
      <div className="mask-fade-x relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-3">
          {[...makes, ...makes].map((m, i) => (
            <span key={`${m}-${i}`} className="flex h-14 w-24 shrink-0 items-center justify-center rounded-xl bg-surface ring-1 ring-line" aria-hidden={i >= makes.length}>
              <Image src={`/brands/${m}.png`} alt={i < makes.length ? m.replace(/-/g, " ") : ""} width={72} height={48} className="h-7 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
