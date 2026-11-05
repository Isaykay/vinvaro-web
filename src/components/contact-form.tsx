"use client";

import { useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { getContent } from "@/lib/content";
import { defineCopy } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";

const copy = defineCopy({
  nl: {
    subjects: ["Algemene vraag", "Overstappen naar VINVARO", "Integratie of partnerschap", "Support", "Pers"],
    doneTitle: "Bericht ontvangen",
    doneBody: (email: string) => `We reageren binnen één werkdag via ${email}.`,
    title: "Stuur ons een bericht",
    lead: "Voor vragen die geen demo zijn. We reageren binnen één werkdag.",
    name: "Naam",
    email: "E-mailadres",
    company: "Autobedrijf",
    optional: "Optioneel",
    subject: "Onderwerp",
    message: "Bericht",
    sending: "Versturen…",
    submit: "Verstuur bericht",
    error: (email: string) => `Er ging iets mis. Mail ons direct via ${email}.`,
  },
  en: {
    subjects: ["General question", "Switching to VINVARO", "Integration or partnership", "Support", "Press"],
    doneTitle: "Message received",
    doneBody: (email: string) => `We'll reply within one working day at ${email}.`,
    title: "Send us a message",
    lead: "For questions other than demos. We reply within one working day.",
    name: "Name",
    email: "Email address",
    company: "Company",
    optional: "Optional",
    subject: "Subject",
    message: "Message",
    sending: "Sending…",
    submit: "Send message",
    error: (email: string) => `Something went wrong. Email us directly at ${email}.`,
  },
});

export function ContactForm() {
  const lang = useLang();
  const t = copy[lang];
  const { site } = getContent(lang);
  const [form, setForm] = useState({ name: "", email: "", company: "", subject: t.subjects[0], message: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang, page: window.location.pathname, referrer: document.referrer }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-[22px] bg-surface p-10 text-center shadow-card">
        <span className="flex size-12 items-center justify-center rounded-full bg-ok-50">
          <Check className="size-5 text-ok" strokeWidth={2.5} />
        </span>
        <p className="text-h3 mt-5">{t.doneTitle}</p>
        <p className="mt-2 max-w-[360px] text-[15px] text-muted">{t.doneBody(form.email)}</p>
      </div>
    );
  }

  const input =
    "h-11 w-full rounded-xl bg-canvas px-3.5 text-[16px] ring-1 sm:text-[15px] ring-line transition-shadow outline-none placeholder:text-subtle focus:bg-surface focus:ring-2 focus:ring-brand";

  return (
    <form onSubmit={submit} className="rounded-[22px] bg-surface p-6 shadow-card sm:p-8">
      <p className="text-[17px] font-semibold tracking-[-0.02em]">{t.title}</p>
      <p className="mt-1 text-[14px] text-muted">{t.lead}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{t.name}</span>
          <input required autoComplete="name" className={input} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{t.email}</span>
          <input required type="email" autoComplete="email" className={input} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{t.company}</span>
          <input autoComplete="organization" className={input} placeholder={t.optional} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{t.subject}</span>
          <select className={input} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}>
            {t.subjects.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{t.message}</span>
          <textarea required rows={5} className={`${input} h-auto py-3`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </label>
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-brand px-7 text-[15px] font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-600 hover:shadow-xl hover:shadow-brand/25 disabled:opacity-60"
      >
        {state === "sending" ? t.sending : t.submit} <ChevronRight className="size-4" strokeWidth={2.25} />
      </button>
      {state === "error" && <p className="mt-4 text-[14px] text-warn">{t.error(site.email)}</p>}
    </form>
  );
}
