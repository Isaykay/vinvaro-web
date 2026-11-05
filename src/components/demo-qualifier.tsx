"use client";

import Link from "@/components/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ArrowLeft, CalendarDays, Check, ChevronLeft, ChevronRight, Clock, Lock, PenLine, Video, X } from "lucide-react";
import clsx from "clsx";
import { defineCopy, numberLocale, type Lang } from "@/lib/i18n";
import { useLang, useLocalize } from "@/components/lang-provider";
import { IconTile } from "@/components/icons";

type Option = { value: string; label: string; hint?: string; other?: boolean };
type ChoiceQuestion = { kind: "choice"; key: string; title: string; hint?: string; multi?: boolean; columns?: 2 | 3; options: Option[]; other?: { placeholder: string } };
type NumberQuestion = { kind: "number"; key: string; title: string; hint?: string; placeholder: string; unit: string; max: number };
type Question = ChoiceQuestion | NumberQuestion;

export const DEMO_SLOT_KEY = "vv_demo_slot";
const STORAGE_KEY = "vv_demo_progress_v1";
const SLOT_MINUTES = 30;
const DAY_START = 9 * 60;
const DAY_END = 17 * 60;

const copy = defineCopy({
  nl: {
    questions: [
      {
        kind: "choice",
        key: "business",
        title: "Wat voor autobedrijf heb je?",
        hint: "Zo laten we de onderdelen zien die voor jou het meest tellen.",
        options: [
          { value: "independent", label: "Merkonafhankelijke dealer", hint: "Inkoop en verkoop van occasions" },
          { value: "specialist", label: "Specialist", hint: "Premium, klassiek, EV of import" },
          { value: "multi", label: "Meerdere vestigingen", hint: "Eén werkwijze op elke locatie" },
          { value: "workshop", label: "Werkplaats met verkoop", hint: "Onderhoud, schade en verkoop" },
          { value: "consumer", label: "Ik zoek een auto", hint: "Ik ben particulier" },
          { value: "other", label: "Anders", other: true },
        ],
        other: { placeholder: "Wat voor bedrijf?" },
      },
      {
        kind: "choice",
        key: "team",
        title: "Met hoeveel mensen werken jullie?",
        hint: "Iedereen die met auto's of klanten werkt.",
        options: [
          { value: "1-2", label: "1–2 personen" },
          { value: "3-5", label: "3–5 personen" },
          { value: "6-15", label: "6–15 personen" },
          { value: "16-50", label: "16–50 personen" },
          { value: "50+", label: "Meer dan 50", hint: "Meerdere teams of vestigingen" },
        ],
      },
      { kind: "number", key: "stock", title: "Hoeveel auto's staan er gemiddeld in voorraad?", hint: "Een schatting is prima.", placeholder: "Bijv. 60", unit: "auto's", max: 100000 },
      {
        kind: "choice",
        key: "focus",
        title: "Waar wil je vooral mee beginnen?",
        hint: "Meerdere antwoorden mogelijk",
        multi: true,
        columns: 2,
        options: [
          { value: "voorraad", label: "Voorraad & dossier" },
          { value: "intake", label: "Intake & aflevering" },
          { value: "inbox", label: "Inbox (WhatsApp, e-mail)" },
          { value: "crm", label: "CRM & verkoop" },
          { value: "agenda", label: "Agenda & proefritten" },
          { value: "contracts", label: "Contracten & facturen" },
          { value: "publish", label: "Publiceren" },
          { value: "app", label: "Team-app" },
        ],
      },
      {
        kind: "choice",
        key: "current",
        title: "Wat gebruiken jullie nu?",
        hint: "Meerdere antwoorden mogelijk",
        multi: true,
        columns: 2,
        options: [
          { value: "excel", label: "Excel of Google Sheets" },
          { value: "paper", label: "Papier en mappen" },
          { value: "whatsapp", label: "WhatsApp op losse telefoons" },
          { value: "dms", label: "Een ander DMS", other: true },
        ],
        other: { placeholder: "Welk systeem?" },
      },
    ] as Question[],
    steps: ["Bedrijf", "Team", "Voorraad", "Focus", "Nu", "Moment", "Contact"],
    back: "Terug",
    stepOf: (step: number, total: number, name: string) => `Stap ${step} van ${total} · ${name}`,
    consumer: "VINVARO is software voor autobedrijven. Zoek je een auto? Neem dan contact op met de dealer zelf. Heb je toch een vraag aan ons,",
    consumerLink: "stuur ons een bericht",
    next: "Volgende",
    enterHint: "Druk op Enter om door te gaan",
    slotTitle: "Kies een moment voor de demo",
    slotHint: "30 minuten via een videogesprek. We bevestigen het moment per e-mail.",
    slotNone: "Geen tijden meer vandaag. Kies een andere dag.",
    slotOnline: "Online · 30 min",
    contactTitle: "Waar kunnen we je bereiken?",
    contactLead: "We sturen de uitnodiging en bereiden de demo voor op jouw bedrijf.",
    fields: {
      name: { label: "Naam", placeholder: "Voor- en achternaam" },
      company: { label: "Autobedrijf", placeholder: "Naam van je bedrijf" },
      email: { label: "Zakelijk e-mailadres", placeholder: "naam@autobedrijf.nl" },
      phone: { label: "Telefoon", placeholder: "06 12345678" },
    },
    chosen: "Gekozen moment",
    change: "Wijzigen",
    sending: "Versturen…",
    submit: "Plan mijn demo",
    error: "Er ging iets mis. Probeer het opnieuw of mail ons via info@vinvaro.com.",
    duration: "± 2 minuten",
    privacy: "Je gegevens blijven bij ons",
    close: "Sluiten",
  },
  en: {
    questions: [
      {
        kind: "choice",
        key: "business",
        title: "What kind of automotive business do you run?",
        hint: "So we can show you the parts that matter most to you.",
        options: [
          { value: "independent", label: "Independent dealer", hint: "Buying and selling used cars" },
          { value: "specialist", label: "Specialist", hint: "Premium, classic, EV or import" },
          { value: "multi", label: "Multiple sites", hint: "One way of working at every location" },
          { value: "workshop", label: "Workshop with sales", hint: "Servicing, body work and sales" },
          { value: "consumer", label: "I'm looking for a car", hint: "I'm a private buyer" },
          { value: "other", label: "Other", other: true },
        ],
        other: { placeholder: "What kind of business?" },
      },
      {
        kind: "choice",
        key: "team",
        title: "How many people work with you?",
        hint: "Everyone who works with cars or customers.",
        options: [
          { value: "1-2", label: "1–2 people" },
          { value: "3-5", label: "3–5 people" },
          { value: "6-15", label: "6–15 people" },
          { value: "16-50", label: "16–50 people" },
          { value: "50+", label: "More than 50", hint: "Several teams or sites" },
        ],
      },
      { kind: "number", key: "stock", title: "How many cars do you have in stock on average?", hint: "An estimate is fine.", placeholder: "E.g. 60", unit: "cars", max: 100000 },
      {
        kind: "choice",
        key: "focus",
        title: "What would you like to start with?",
        hint: "Select all that apply",
        multi: true,
        columns: 2,
        options: [
          { value: "voorraad", label: "Inventory & dossier" },
          { value: "intake", label: "Intake & delivery" },
          { value: "inbox", label: "Inbox (WhatsApp, email)" },
          { value: "crm", label: "CRM & sales" },
          { value: "agenda", label: "Calendar & test drives" },
          { value: "contracts", label: "Contracts & invoices" },
          { value: "publish", label: "Publishing" },
          { value: "app", label: "Staff app" },
        ],
      },
      {
        kind: "choice",
        key: "current",
        title: "What do you use today?",
        hint: "Select all that apply",
        multi: true,
        columns: 2,
        options: [
          { value: "excel", label: "Excel or Google Sheets" },
          { value: "paper", label: "Paper and folders" },
          { value: "whatsapp", label: "WhatsApp on separate phones" },
          { value: "dms", label: "Another DMS", other: true },
        ],
        other: { placeholder: "Which system?" },
      },
    ] as Question[],
    steps: ["Business", "Team", "Stock", "Focus", "Today", "Time", "Contact"],
    back: "Back",
    stepOf: (step: number, total: number, name: string) => `Step ${step} of ${total} · ${name}`,
    consumer: "VINVARO is software for automotive businesses. Looking for a car? Please contact the dealer directly. If you still have a question for us,",
    consumerLink: "send us a message",
    next: "Next",
    enterHint: "Press Enter to continue",
    slotTitle: "Pick a time for the demo",
    slotHint: "30 minutes over video call. We'll confirm the time by email.",
    slotNone: "No more times today. Pick another day.",
    slotOnline: "Online · 30 min",
    contactTitle: "How can we reach you?",
    contactLead: "We'll send the invitation and tailor the demo to your business.",
    fields: {
      name: { label: "Name", placeholder: "First and last name" },
      company: { label: "Company", placeholder: "Your company's name" },
      email: { label: "Work email", placeholder: "name@dealership.com" },
      phone: { label: "Phone", placeholder: "+31 6 12345678" },
    },
    chosen: "Chosen time",
    change: "Change",
    sending: "Sending…",
    submit: "Book my demo",
    error: "Something went wrong. Please try again or email us at info@vinvaro.com.",
    duration: "± 2 minutes",
    privacy: "Your data stays with us",
    close: "Close",
  },
});

/** Accepts "1.500", "1,500" and "60". */
function parseAmount(raw: string) {
  const cleaned = raw.trim().replace(/\s/g, "");
  if (!cleaned) return NaN;
  return Number(cleaned.replace(/[.,](?=\d{3}(\D|$))/g, "").replace(",", "."));
}

/** Wall-clock parts in Europe/Amsterdam, so the calendar matches our office hours wherever the visitor is. */
function amsterdamParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hour12: false, weekday: "short" }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { ymd: `${get("year")}-${get("month")}-${get("day")}`, weekday: get("weekday"), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** The next `count` working days (Mon–Fri) in Amsterdam, starting today. */
function workingDays(count: number) {
  const days: string[] = [];
  const cursor = new Date();
  while (days.length < count) {
    const { ymd, weekday } = amsterdamParts(cursor);
    if (weekday !== "Sat" && weekday !== "Sun" && !days.includes(ymd)) days.push(ymd);
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

/** Slot start times (minutes after midnight, Amsterdam) still bookable on `ymd`: at least two hours ahead. */
function slotsFor(ymd: string) {
  const now = amsterdamParts(new Date());
  const earliest = ymd === now.ymd ? now.minutes + 120 : 0;
  const out: number[] = [];
  for (let m = DAY_START; m + SLOT_MINUTES <= DAY_END; m += SLOT_MINUTES) if (m >= earliest && m !== 12 * 60 + 30) out.push(m);
  return out;
}

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

function formatDay(ymd: string, lang: Lang, style: "short" | "long") {
  const [y, mo, d] = ymd.split("-").map(Number);
  const date = new Date(Date.UTC(y, mo - 1, d, 12));
  return new Intl.DateTimeFormat(numberLocale[lang], style === "short" ? { weekday: "short", day: "numeric", timeZone: "UTC" } : { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(date);
}

export function formatSlot(slot: { date: string; time: string }, lang: Lang) {
  return `${formatDay(slot.date, lang, "long")} · ${slot.time}`;
}

const inputClass =
  "h-12 w-full rounded-xl bg-canvas px-4 text-[16px] ring-1 ring-line transition-shadow outline-none placeholder:text-subtle focus:bg-surface focus:ring-2 focus:ring-brand";
const primaryButton =
  "h-12 items-center justify-center gap-2 rounded-xl bg-brand px-7 text-[15px] font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-600 hover:shadow-xl hover:shadow-brand/25 disabled:opacity-40 disabled:shadow-none";

function SlotPicker({ value, onChange, lang }: { value: { date: string; time: string } | null; onChange: (slot: { date: string; time: string }) => void; lang: Lang }) {
  const t = copy[lang];
  const days = useMemo(() => workingDays(10), []);
  const [page, setPage] = useState(0);
  const [day, setDay] = useState(() => (value && days.includes(value.date) ? value.date : (days.find((d) => slotsFor(d).length > 0) ?? days[0])));
  const visible = days.slice(page * 5, page * 5 + 5);
  const slots = slotsFor(day);
  return (
    <div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setPage(0)}
          disabled={page === 0}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted ring-1 ring-line transition-colors hover:bg-sunken disabled:opacity-30"
          aria-label={t.back}
        >
          <ChevronLeft className="size-4" />
        </button>
        <div className="grid flex-1 grid-cols-5 gap-1.5">
          {visible.map((d) => {
            const active = d === day;
            const empty = slotsFor(d).length === 0;
            const [w, n] = formatDay(d, lang, "short").replace(".", "").split(" ");
            return (
              <button
                key={d}
                type="button"
                onClick={() => setDay(d)}
                className={clsx(
                  "flex flex-col items-center rounded-xl py-2 transition-all",
                  active ? "bg-brand text-white shadow-lg shadow-brand/20" : "bg-canvas ring-1 ring-line hover:ring-line-strong",
                  empty && !active && "opacity-40",
                )}
              >
                <span className={clsx("text-[11px] font-medium uppercase", active ? "text-white/80" : "text-muted")}>{w}</span>
                <span className="text-[17px] font-semibold tabular-nums">{n}</span>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-muted ring-1 ring-line transition-colors hover:bg-sunken disabled:opacity-30"
          aria-label={t.next}
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
      <p className="mt-5 mb-2.5 flex items-center gap-2 text-[13px] font-medium text-ink-2">
        <CalendarDays className="size-3.5 text-brand" /> {formatDay(day, lang, "long")}
        <span className="ml-auto flex items-center gap-1 text-[12px] font-normal text-muted">
          <Video className="size-3.5" /> {t.slotOnline}
        </span>
      </p>
      {slots.length === 0 ? (
        <p className="rounded-xl bg-sunken/70 p-4 text-[14px] text-muted">{t.slotNone}</p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((m) => {
            const time = hhmm(m);
            const active = value?.date === day && value.time === time;
            return (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ date: day, time })}
                className={clsx(
                  "h-10 rounded-xl text-[14px] font-medium tabular-nums transition-all",
                  active ? "bg-brand-50 text-brand ring-2 ring-brand" : "bg-canvas ring-1 ring-line hover:bg-surface hover:ring-brand/50",
                )}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function DemoQualifier() {
  const router = useRouter();
  const lang = useLang();
  const localize = useLocalize();
  const t = copy[lang];
  const { questions, steps } = t;
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [others, setOthers] = useState<Record<string, string>>({});
  const [numbers, setNumbers] = useState<Record<string, string>>({});
  const [slot, setSlot] = useState<{ date: string; time: string } | null>(null);
  const [contact, setContact] = useState({ name: "", company: "", email: "", phone: "" });
  const [state, setState] = useState<"idle" | "sending" | "error">("idle");
  const [expanded, setExpanded] = useState(false);
  const [placeholderHeight, setPlaceholderHeight] = useState<number>();
  const cardRef = useRef<HTMLDivElement>(null);
  const [restored, setRestored] = useState(false);

  const slotStep = questions.length;
  const contactStep = questions.length + 1;
  const total = questions.length + 2;

  // Restore progress after a refresh or a later visit; the chosen slot is not kept because it may have passed.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved && typeof saved === "object") {
        /* eslint-disable react-hooks/set-state-in-effect -- one-time restore from localStorage after hydration */
        if (saved.answers) setAnswers(saved.answers);
        if (saved.others) setOthers(saved.others);
        if (saved.numbers) setNumbers(saved.numbers);
        if (saved.contact) setContact(saved.contact);
        if (Number.isInteger(saved.step)) setStep(Math.min(Math.max(saved.step, 0), slotStep));
      }
    } catch {}
    setRestored(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [slotStep]);

  useEffect(() => {
    if (!restored) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers, others, numbers, contact }));
    } catch {}
  }, [restored, step, answers, others, numbers, contact]);

  function expand() {
    if (expanded) return;
    setPlaceholderHeight(cardRef.current?.offsetHeight);
    setExpanded(true);
  }

  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setExpanded(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  const q = step < questions.length ? questions[step] : undefined;
  const selected = q?.kind === "choice" ? (answers[q.key] ?? []) : [];
  const consumer = answers.business?.[0] === "consumer";
  const otherSelected = q?.kind === "choice" && selected.some((v) => q.options.find((o) => o.value === v)?.other);

  const goNext = () => setStep((s) => s + 1);

  function valid(question: Question | undefined) {
    if (!question) return true;
    if (question.kind === "number") {
      const n = parseAmount(numbers[question.key] ?? "");
      return Number.isInteger(n) && n > 0 && n <= question.max;
    }
    const sel = answers[question.key] ?? [];
    if (sel.length === 0) return false;
    if (sel.some((v) => question.options.find((o) => o.value === v)?.other)) return Boolean(others[question.key]?.trim());
    return true;
  }

  function choose(option: Option) {
    if (!q || q.kind !== "choice") return;
    expand();
    if (q.multi) {
      setAnswers((a) => {
        const cur = a[q.key] ?? [];
        return { ...a, [q.key]: cur.includes(option.value) ? cur.filter((o) => o !== option.value) : [...cur, option.value] };
      });
      return;
    }
    setAnswers((a) => ({ ...a, [q.key]: [option.value] }));
    if (option.other || option.value === "consumer") return;
    setTimeout(goNext, 160);
  }

  function summary() {
    const out: Record<string, string | number | string[]> = {};
    for (const question of questions) {
      if (question.kind === "number") {
        out[question.key] = parseAmount(numbers[question.key] ?? "");
        continue;
      }
      const sel = answers[question.key] ?? [];
      const labels = sel.map((v) => {
        const opt = question.options.find((o) => o.value === v);
        return opt?.other ? `${opt.label}: ${others[question.key] ?? ""}` : (opt?.label ?? v);
      });
      out[question.key] = question.multi ? labels : (labels[0] ?? "");
    }
    return out;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return setStep(slotStep);
    setState("sending");
    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...contact, slot, answers: summary(), lang, page: window.location.pathname, referrer: document.referrer }),
      });
      if (!res.ok) throw new Error();
      try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.setItem(DEMO_SLOT_KEY, JSON.stringify({ ...slot, name: contact.name.split(" ")[0], email: contact.email }));
      } catch {}
      router.push(localize("/bedankt"));
    } catch {
      setState("error");
    }
  }

  const mobileAction: { label: string; disabled: boolean; form?: string; onClick?: () => void } | null =
    q?.kind === "number"
      ? { label: t.next, disabled: !valid(q), form: "demo-step-form" }
      : q?.kind === "choice" && (q.multi || otherSelected)
        ? { label: t.next, disabled: !valid(q), onClick: goNext }
        : step === slotStep
          ? { label: t.next, disabled: !slot, onClick: goNext }
          : step === contactStep
            ? { label: state === "sending" ? t.sending : t.submit, disabled: state === "sending", form: "demo-contact-form" }
            : null;

  const progress = steps.map((s, i) => <span key={s} className={clsx("h-1 flex-1 rounded-full transition-colors duration-300", i <= step ? "bg-brand" : "bg-sunken")} />);
  const inner = clsx(expanded && "mx-auto w-full max-w-[760px]");
  const wide = clsx(expanded && "mx-auto w-full max-w-[1136px]");

  const card = (
    <motion.div
      ref={cardRef}
      layoutId="demo-card"
      transition={{ layout: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } }}
      style={{ borderRadius: expanded ? 0 : 22 }}
      className={clsx("flex flex-col overflow-hidden bg-surface", expanded ? "fixed inset-x-0 top-0 bottom-0 z-[60] sm:top-16 sm:z-40" : "relative shadow-float ring-1 ring-ink/5")}
    >
      <div className={clsx("border-b border-line px-6 pt-5 pb-4 sm:px-8", expanded && "pt-6")}>
        <div className={wide}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="flex items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-ink disabled:invisible"
            >
              <ArrowLeft className="size-3.5" /> {t.back}
            </button>
            <span className="flex items-center gap-4">
              <span className="font-mono text-[12px] text-subtle">{t.stepOf(step + 1, total, steps[step])}</span>
              {expanded && (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[13px] font-medium text-muted ring-1 ring-line transition-colors hover:bg-sunken hover:text-ink"
                >
                  <X className="size-3.5" /> {t.close}
                </button>
              )}
            </span>
          </div>
          <div className="mt-3 flex gap-1">{progress}</div>
        </div>
      </div>

      <div className={clsx(expanded && "flex flex-1 flex-col overflow-y-auto")}>
        <div className={clsx(inner, expanded && "my-auto")}>
          <div className={clsx("min-h-[380px] px-6 py-7 sm:px-8", expanded && "min-h-0 sm:py-12")}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={consumer && step === 0 ? "consumer" : step} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                {q?.kind === "number" && (
                  <form
                    id="demo-step-form"
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (valid(q)) goNext();
                    }}
                  >
                    <h2 className="text-h3">{q.title}</h2>
                    {q.hint && <p className="mt-1.5 text-[14px] text-muted">{q.hint}</p>}
                    <label className="relative mt-6 block max-w-[420px]">
                      <span className="sr-only">{q.title}</span>
                      <input
                        autoFocus
                        inputMode="numeric"
                        placeholder={q.placeholder}
                        value={numbers[q.key] ?? ""}
                        enterKeyHint="next"
                        onFocus={expand}
                        onChange={(e) => setNumbers((n) => ({ ...n, [q.key]: e.target.value.replace(/[^\d.,\s]/g, "") }))}
                        className={clsx(inputClass, "pr-24 text-[18px] font-medium tabular-nums")}
                      />
                      <span className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[13px] text-subtle">{q.unit}</span>
                    </label>
                    <div className="mt-6 hidden items-center gap-4 sm:flex">
                      <button type="submit" disabled={!valid(q)} className={clsx(primaryButton, "inline-flex")}>
                        {t.next} <ChevronRight className="size-4" strokeWidth={2.25} />
                      </button>
                      <span className="text-[12.5px] text-subtle">{t.enterHint}</span>
                    </div>
                  </form>
                )}

                {q?.kind === "choice" && (
                  <>
                    <h2 className="text-h3">{q.title}</h2>
                    {q.hint && <p className="mt-1.5 text-[14px] text-muted">{q.hint}</p>}
                    <div className={clsx("mt-6 grid gap-2.5", q.options.length > 2 && "sm:grid-cols-2")}>
                      {q.options.map((o) => {
                        const active = selected.includes(o.value);
                        return (
                          <button
                            key={o.value}
                            onClick={() => choose(o)}
                            aria-pressed={active}
                            className={clsx(
                              "relative flex min-h-[56px] items-center gap-3 rounded-xl px-3.5 py-2.5 text-left text-[14.5px] transition-all",
                              active ? "bg-brand-50 text-ink ring-2 ring-brand" : "bg-canvas ring-1 ring-line hover:bg-surface hover:ring-line-strong",
                            )}
                          >
                            {o.other ? (
                              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sunken text-ink-2 ring-1 ring-line">
                                <PenLine className="size-4" />
                              </span>
                            ) : (
                              <IconTile text={o.label} hint={o.hint} size="md" tone={active ? "brand" : "neutral"} />
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block leading-snug font-medium">{o.label}</span>
                              {o.hint && <span className="mt-0.5 block text-[12.5px] text-muted">{o.hint}</span>}
                            </span>
                            <span
                              className={clsx(
                                "flex size-5 shrink-0 items-center justify-center ring-1 transition-colors",
                                q.multi ? "rounded-md" : "rounded-full",
                                active ? "bg-brand text-white ring-brand" : "ring-line-strong",
                              )}
                            >
                              {active && <Check className="size-3" strokeWidth={3} />}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {otherSelected && q.other && (
                      <form
                        className="relative mt-4 max-w-[420px]"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (valid(q)) goNext();
                        }}
                      >
                        <input autoFocus placeholder={q.other.placeholder} value={others[q.key] ?? ""} onChange={(e) => setOthers((o) => ({ ...o, [q.key]: e.target.value }))} className={inputClass} />
                      </form>
                    )}

                    {q.key === "business" && consumer && (
                      <div className="mt-5 rounded-xl bg-sunken/70 p-4 text-[14px] leading-relaxed text-ink-2">
                        {t.consumer}{" "}
                        <Link href="/contact" className="font-medium text-brand underline underline-offset-4">
                          {t.consumerLink}
                        </Link>
                        .
                      </div>
                    )}

                    {(q.multi || otherSelected) && (
                      <div className="mt-6">
                        <button type="button" onClick={goNext} disabled={!valid(q)} className={clsx(primaryButton, "hidden sm:inline-flex")}>
                          {t.next} <ChevronRight className="size-4" strokeWidth={2.25} />
                        </button>
                      </div>
                    )}
                  </>
                )}

                {step === slotStep && (
                  <>
                    <h2 className="text-h3">{t.slotTitle}</h2>
                    <p className="mt-1.5 mb-6 text-[14px] text-muted">{t.slotHint}</p>
                    <SlotPicker
                      lang={lang}
                      value={slot}
                      onChange={(s) => {
                        expand();
                        setSlot(s);
                      }}
                    />
                    <div className="mt-6">
                      <button type="button" onClick={goNext} disabled={!slot} className={clsx(primaryButton, "hidden sm:inline-flex")}>
                        {t.next} <ChevronRight className="size-4" strokeWidth={2.25} />
                      </button>
                    </div>
                  </>
                )}

                {step === contactStep && (
                  <form id="demo-contact-form" onSubmit={submit}>
                    <h2 className="text-h3">{t.contactTitle}</h2>
                    <p className="mt-1.5 text-[14px] text-muted">{t.contactLead}</p>
                    {slot && (
                      <div className="mt-5 flex items-center gap-3 rounded-xl bg-brand-50 px-4 py-3 ring-1 ring-brand/20">
                        <CalendarDays className="size-4 text-brand" />
                        <span className="text-[13px] text-muted">{t.chosen}</span>
                        <span className="text-[14px] font-semibold text-ink first-letter:uppercase">{formatSlot(slot, lang)}</span>
                        <button type="button" onClick={() => setStep(slotStep)} className="ml-auto text-[13px] font-medium text-brand underline-offset-4 hover:underline">
                          {t.change}
                        </button>
                      </div>
                    )}
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {(
                        [
                          ["name", "text", "name"],
                          ["company", "text", "organization"],
                          ["email", "email", "email"],
                          ["phone", "tel", "tel"],
                        ] as const
                      ).map(([k, type, autoComplete]) => (
                        <label key={k} className="block">
                          <span className="mb-1.5 block text-[13px] font-medium text-ink-2">{t.fields[k].label}</span>
                          <input
                            type={type}
                            required
                            autoComplete={autoComplete}
                            placeholder={t.fields[k].placeholder}
                            value={contact[k]}
                            onChange={(e) => setContact((c) => ({ ...c, [k]: e.target.value }))}
                            className="h-11 w-full rounded-xl bg-canvas px-3.5 text-[16px] ring-1 ring-line transition-shadow outline-none placeholder:text-subtle focus:bg-surface focus:ring-2 focus:ring-brand sm:text-[15px]"
                          />
                        </label>
                      ))}
                    </div>
                    <button type="submit" disabled={state === "sending"} className={clsx(primaryButton, "mt-6 hidden sm:inline-flex")}>
                      {state === "sending" ? t.sending : t.submit} <ChevronRight className="size-4" strokeWidth={2.25} />
                    </button>
                    {state === "error" && <p className="mt-4 text-[14px] text-warn">{t.error}</p>}
                  </form>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className={clsx("border-t border-line bg-canvas px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-8 sm:py-4", !mobileAction && "hidden sm:block")}>
        {mobileAction && (
          <button
            type={mobileAction.form ? "submit" : "button"}
            form={mobileAction.form}
            onClick={mobileAction.onClick}
            disabled={mobileAction.disabled}
            className={clsx(primaryButton, "flex w-full sm:hidden")}
          >
            {mobileAction.label} <ChevronRight className="size-4" strokeWidth={2.25} />
          </button>
        )}
        <div className={clsx(wide, "hidden flex-wrap items-center justify-end gap-3 sm:flex")}>
          <span className="flex items-center gap-4 text-[12.5px] text-muted">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" /> {t.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="size-3.5" /> {t.privacy}
            </span>
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div style={expanded ? { height: placeholderHeight } : undefined}>
      <LayoutGroup>{expanded ? createPortal(card, document.body) : card}</LayoutGroup>
    </div>
  );
}
