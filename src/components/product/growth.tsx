"use client";

import { Building2, Calendar, Check, Clock, FileText, Globe, KeyRound, Phone, ShieldCheck, Sparkles, Star, UserRound } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { Pill, Plate, delay } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    check: {
      query: "autobedrijf-voorbeeld.nl",
      verdict: "Betrouwbaar",
      took: "Gecontroleerd in 4,2 s",
      rows: [
        ["KvK", "Ingeschreven sinds 2011"],
        ["Google", "4,6 ★ uit 212 reviews"],
        ["Domein", "Bestaat al 14 jaar"],
        ["Btw-nummer", "Geldig volgens VIES"],
        ["Social media", "Actief, laatste post deze week"],
      ],
      live: "Live gecontroleerd",
      steps: [
        ["KvK-register", "0,6 s"],
        ["Google-reviews", "1,1 s"],
        ["Website en webarchief", "2,4 s"],
        ["Social media", "3,8 s"],
      ],
    },
    responder: {
      customer: "Is de Golf nog beschikbaar? Kan ik zaterdag langskomen?",
      draft: "Hoi Sanne, ja, de Golf staat nog klaar. Zaterdag kan om 10:00 of 11:30. Zal ik er een inplannen?",
      badge: "AI-concept",
      approve: "Goedkeuren en versturen",
      goals: ["Proefrit inplannen", "Klant kwalificeren", "Zoekprofiel vastleggen"],
      handoff: "Prijsonderhandeling → doorgegeven aan collega",
      slots: ["za 10:00", "za 11:30"],
    },
    glovebox: {
      eyebrow: "Digitaal dashboardkastje",
      hello: "Hallo Sanne,",
      car: "Volkswagen Golf",
      docs: ["Factuur", "Koopcontract", "Afleverprotocol"],
      apk: "APK: nog 214 dagen",
      review: "Review schrijven",
      tradeIn: "Wat is mijn auto nu waard?",
    },
  },
  en: {
    check: {
      query: "example-dealer.nl",
      verdict: "Trustworthy",
      took: "Checked in 4.2 s",
      rows: [
        ["KvK", "Registered since 2011"],
        ["Google", "4.6 ★ from 212 reviews"],
        ["Domain", "Exists for 14 years"],
        ["VAT number", "Valid according to VIES"],
        ["Social media", "Active, last post this week"],
      ],
      live: "Checked live",
      steps: [
        ["KvK register", "0.6 s"],
        ["Google reviews", "1.1 s"],
        ["Website and web archive", "2.4 s"],
        ["Social media", "3.8 s"],
      ],
    },
    responder: {
      customer: "Is the Golf still available? Can I come by on Saturday?",
      draft: "Hi Sanne, yes, the Golf is still here. Saturday works at 10:00 or 11:30. Shall I book one?",
      badge: "AI draft",
      approve: "Approve and send",
      goals: ["Book a test drive", "Qualify the lead", "Save a search profile"],
      handoff: "Price negotiation → handed to a colleague",
      slots: ["Sat 10:00", "Sat 11:30"],
    },
    glovebox: {
      eyebrow: "Digital glovebox",
      hello: "Hello Sanne,",
      car: "Volkswagen Golf",
      docs: ["Invoice", "Purchase contract", "Delivery protocol"],
      apk: "MOT: 214 days left",
      review: "Write a review",
      tradeIn: "What is my car worth now?",
    },
  },
});

const ROW_ICONS = [Building2, Star, Globe, ShieldCheck, UserRound];

function Tick() {
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#ecfdf3] text-[#067647]">
      <Check className="size-3" strokeWidth={3} />
    </span>
  );
}

/** Check: a company scored from public sources, with the time each source took. */
export function TrustCheck() {
  const t = copy[useLang()].check;
  return (
    <div className="grid items-start gap-4 md:grid-cols-[1.15fr_0.85fr]">
      <div className="rounded-2xl bg-surface p-5 shadow-float">
        <div className="flex items-center gap-4 rounded-xl bg-[#ecfdf3] p-4">
          <span className="relative grid size-16 shrink-0 place-items-center">
            <svg viewBox="0 0 36 36" className="absolute inset-0 -rotate-90" aria-hidden>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#d1fadf" strokeWidth="3.5" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#12b76a" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="88 94.2" className="animate-draw" style={{ "--path-length": 94, animationDuration: "1.4s" } as React.CSSProperties} />
            </svg>
            <span className="text-[18px] font-semibold text-[#067647] tabular-nums">94</span>
          </span>
          <div className="min-w-0">
            <p className="truncate text-[11.5px] text-muted">{t.query}</p>
            <p className="flex items-center gap-1.5 text-[17px] font-semibold text-[#067647]">
              <Check className="size-4" strokeWidth={3} /> {t.verdict}
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted">
              <Clock className="size-3" /> {t.took}
            </p>
          </div>
        </div>
        <ul className="mt-4 divide-y divide-line">
          {t.rows.map(([k, v], i) => {
            const RowIcon = ROW_ICONS[i];
            return (
              <li key={k} className="flex animate-toast-in items-center gap-3 py-2.5" style={delay(0.3 + i * 0.25)}>
                <Tick />
                <RowIcon className="size-3.5 shrink-0 text-subtle" />
                <span className="text-[12.5px] font-medium">{k}</span>
                <span className="ml-auto truncate text-[12px] text-muted">{v}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="rounded-2xl bg-surface p-5 shadow-float md:mt-10">
        <p className="text-[11px] font-semibold tracking-[0.1em] text-subtle uppercase">{t.live}</p>
        <ul className="mt-3 space-y-2.5">
          {t.steps.map(([label, took], i) => (
            <li key={label} className="flex animate-toast-in items-center gap-2.5 text-[12.5px]" style={delay(0.4 + i * 0.35)}>
              <Tick />
              <span className="font-medium">{label}</span>
              <span className="ml-auto font-mono text-[11px] text-subtle tabular-nums">{took}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** AI lead responder: a customer question, a draft that follows the dealer's goals and free calendar slots. */
export function LeadResponder() {
  const t = copy[useLang()].responder;
  return (
    <div className="grid items-start gap-4 md:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-2xl bg-surface p-5 shadow-float">
        <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-sunken px-3.5 py-2.5 text-[13px]">{t.customer}</div>
        <div className="mt-3 ml-auto max-w-[90%] animate-toast-in rounded-2xl rounded-tr-sm bg-[#eef4ff] p-3.5 ring-1 ring-[#c7d7fe]" style={delay(0.8)}>
          <Pill tone="ai">
            <Sparkles className="size-2.5" /> {t.badge}
          </Pill>
          <p className="mt-2 text-[13px] leading-relaxed">{t.draft}</p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {t.slots.map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[11.5px] font-medium ring-1 ring-line">
                <Calendar className="size-3 text-brand" /> {s}
              </span>
            ))}
          </div>
          <span className="mt-3 inline-flex h-8 items-center gap-1.5 rounded-lg bg-brand px-3 text-[12px] font-semibold text-white">
            <Check className="size-3.5" strokeWidth={3} /> {t.approve}
          </span>
        </div>
      </div>
      <div className="grid gap-3 md:mt-8">
        <div className="animate-toast-in rounded-2xl bg-surface p-5 shadow-float" style={delay(1.2)}>
          <ul className="space-y-2.5">
            {t.goals.map((g, i) => (
              <li key={g} className="flex items-center gap-2.5 text-[12.5px]">
                <span className="grid size-5 place-items-center rounded-full bg-brand/10 text-[11px] font-semibold text-brand tabular-nums">{i + 1}</span>
                {g}
                <span className="ml-auto flex h-4 w-7 justify-end rounded-full bg-brand p-0.5">
                  <span className="size-3 rounded-full bg-white" />
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="animate-toast-in rounded-2xl bg-surface p-4 text-[12px] text-muted shadow-float" style={delay(1.6)}>
          <Phone className="mr-1.5 inline size-3.5 text-subtle" />
          {t.handoff}
        </div>
      </div>
    </div>
  );
}

/** Digital glovebox: the buyer's page with documents, APK, review and trade-in. */
export function Glovebox() {
  const t = copy[useLang()].glovebox;
  return (
    <div className="mx-auto w-full max-w-[380px] overflow-hidden rounded-[28px] bg-[#f4f6f9] p-3 shadow-float ring-1 ring-line">
      <div className="overflow-hidden rounded-3xl bg-surface">
        <div className="bg-gradient-to-br from-[#0b1b3f] to-brand p-5 text-white">
          <p className="flex items-center gap-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-white/70 uppercase">
            <KeyRound className="size-3" /> {t.eyebrow}
          </p>
          <p className="mt-3 text-[12px] text-white/80">{t.hello}</p>
          <div className="mt-0.5 flex items-end justify-between gap-2">
            <p className="text-[20px] font-bold tracking-[-0.02em]">{t.car}</p>
            <Plate>AB-123-C</Plate>
          </div>
        </div>
        <ul className="divide-y divide-line px-4">
          {t.docs.map((d, i) => (
            <li key={d} className="flex animate-toast-in items-center gap-2.5 py-2.5 text-[12.5px] font-medium" style={delay(0.3 + i * 0.2)}>
              <span className="grid size-7 place-items-center rounded-lg bg-sunken text-muted">
                <FileText className="size-3.5" />
              </span>
              {d}
              <span className="ml-auto text-[11px] text-subtle">PDF</span>
            </li>
          ))}
        </ul>
        <div className="mx-4 mt-1 mb-3 flex items-center gap-2 rounded-xl bg-[#ecfdf3] px-3 py-2 text-[12px] font-medium text-[#067647]">
          <ShieldCheck className="size-3.5" /> {t.apk}
        </div>
        <div className="grid grid-cols-2 gap-2 px-4 pb-4">
          <span className="grid gap-1 rounded-xl bg-brand p-3 text-[11.5px] font-semibold text-white">
            <span className="flex gap-0.5 text-[#fbbf24]">
              {[0, 1, 2, 3, 4].map((n) => (
                <Star key={n} className="size-3 fill-current" />
              ))}
            </span>
            {t.review}
          </span>
          <span className="grid content-end rounded-xl p-3 text-[11.5px] font-semibold ring-1 ring-line">{t.tradeIn}</span>
        </div>
      </div>
    </div>
  );
}
