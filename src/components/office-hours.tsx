"use client";

import { useSyncExternalStore } from "react";
import clsx from "clsx";
import { site } from "@/content/nl";
import { defineCopy } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";

const copy = defineCopy({
  nl: { unknown: "Kantoortijden", open: "Nu bereikbaar", closed: "Gesloten", hours: site.hours.label },
  en: { unknown: "Office hours", open: "Available now", closed: "Closed", hours: `Mon–Fri ${site.hours.open}–${site.hours.close}` },
});

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

function amsterdamNow() {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function computeOpen() {
  const { day, minutes } = amsterdamNow();
  const { days, open, close } = site.hours;
  return days.includes(day) && minutes >= toMinutes(open) && minutes < toMinutes(close);
}

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 60_000);
  return () => clearInterval(id);
}

export function OfficeHours({ className, showHours = true }: { className?: string; showHours?: boolean }) {
  const open = useSyncExternalStore(subscribe, computeOpen, () => null);
  const t = copy[useLang()];

  return (
    <span className={clsx("inline-flex items-center gap-2 text-[13px]", className)}>
      <span
        className={clsx(
          "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[12px] font-medium ring-1",
          open === true ? "bg-ok-50 text-ok ring-ok/20" : "bg-sunken text-muted ring-line",
        )}
      >
        <span className="relative flex size-1.5">
          {open && <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60" />}
          <span className={clsx("relative inline-flex size-1.5 rounded-full", open ? "bg-ok" : "bg-subtle")} />
        </span>
        {open === null ? t.unknown : open ? t.open : t.closed}
      </span>
      {showHours && <span className="text-muted">{t.hours}</span>}
    </span>
  );
}
