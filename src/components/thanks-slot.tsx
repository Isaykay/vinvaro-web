"use client";

import { useSyncExternalStore } from "react";
import { CalendarDays, Check, Clock, Video } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { DEMO_SLOT_KEY, formatSlot } from "@/components/demo-qualifier";
import { Mark } from "@/components/ui";

type Stored = { date: string; time: string; name?: string; email?: string };

const copy = defineCopy({
  nl: { title: "VINVARO demo", requested: "Aangevraagd", when: "Moment", duration: "Duur", where: "Waar", minutes: "30 minuten", online: "Videogesprek", hello: (n: string) => `Tot snel, ${n}!`, sent: (e: string) => `De bevestiging gaat naar ${e}.`, fallback: "We bevestigen het moment per e-mail." },
  en: { title: "VINVARO demo", requested: "Requested", when: "Time", duration: "Duration", where: "Where", minutes: "30 minutes", online: "Video call", hello: (n: string) => `See you soon, ${n}!`, sent: (e: string) => `The confirmation goes to ${e}.`, fallback: "We'll confirm the time by email." },
});

const read = () => {
  try {
    return sessionStorage.getItem(DEMO_SLOT_KEY);
  } catch {
    return null;
  }
};

export function ThanksSlot() {
  const lang = useLang();
  const t = copy[lang];
  const raw = useSyncExternalStore(
    () => () => {},
    read,
    () => null,
  );
  let slot: Stored | null = null;
  try {
    slot = raw ? (JSON.parse(raw) as Stored) : null;
  } catch {}

  return (
    <div className="relative mx-auto w-full max-w-[380px] rotate-[1.5deg] animate-toast-in">
      <div className="overflow-hidden rounded-[22px] bg-surface shadow-float ring-1 ring-ink/5">
        <div className="bg-obsidian-glow relative px-6 pt-6 pb-8 text-white">
          <div className="bg-grid-dark pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative flex items-center justify-between">
            <Mark className="h-4 w-auto" />
            <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold ring-1 ring-white/15">
              <Check className="size-3 text-ok" strokeWidth={3} /> {t.requested}
            </span>
          </div>
          <p className="relative mt-6 text-[22px] font-semibold tracking-[-0.03em]">{t.title}</p>
          {slot?.name && <p className="relative mt-1 text-[14px] text-white/60">{t.hello(slot.name)}</p>}
        </div>
        <div className="relative border-t-2 border-dashed border-line">
          <span className="absolute -top-3 -left-3 size-6 rounded-full bg-canvas" />
          <span className="absolute -top-3 -right-3 size-6 rounded-full bg-canvas" />
        </div>
        <dl className="space-y-3.5 p-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="size-4 text-brand" />
            <dt className="w-16 text-[12.5px] text-muted">{t.when}</dt>
            <dd className="text-[14px] font-semibold first-letter:uppercase">{slot ? formatSlot(slot, lang) : "—"}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="size-4 text-brand" />
            <dt className="w-16 text-[12.5px] text-muted">{t.duration}</dt>
            <dd className="text-[14px] font-semibold">{t.minutes}</dd>
          </div>
          <div className="flex items-center gap-3">
            <Video className="size-4 text-brand" />
            <dt className="w-16 text-[12.5px] text-muted">{t.where}</dt>
            <dd className="text-[14px] font-semibold">{t.online}</dd>
          </div>
          <p className="border-t border-line pt-3.5 text-[12.5px] text-muted">{slot?.email ? t.sent(slot.email) : t.fallback}</p>
        </dl>
      </div>
    </div>
  );
}
