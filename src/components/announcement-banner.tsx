"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { defineCopy } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";

// Outage / announcement banner edited in the Vinvaro CRM (shown when "website" is ticked there).
const CRM_URL = (process.env.NEXT_PUBLIC_CRM_URL || "https://crm.vinvaro.com").replace(/\/+$/, "");

type Announcement = {
  enabled: boolean;
  tone?: "info" | "warning" | "critical";
  title?: string;
  message?: string;
  link_url?: string | null;
  link_label?: string | null;
};

const copy = defineCopy({
  nl: { critical: "Storing", warning: "Let op", info: "Mededeling", more: "Meer info" },
  en: { critical: "Outage", warning: "Heads up", info: "Notice", more: "More info" },
});

const TONES = {
  info: "bg-brand-50 text-brand-600 ring-brand-100",
  warning: "bg-warn-50 text-warn ring-warn/20",
  critical: "bg-danger-50 text-danger ring-danger/20",
} as const;

export function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const t = copy[useLang()];

  useEffect(() => {
    let alive = true;
    fetch(`${CRM_URL}/api/support/announcement?surface=website`, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: Announcement | null) => {
        if (alive && data?.enabled && data.title?.trim()) setAnnouncement(data);
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, []);

  if (!announcement) return null;
  const tone = announcement.tone && TONES[announcement.tone] ? announcement.tone : "warning";

  return (
    <div role={tone === "critical" ? "alert" : "status"} className={clsx("ring-1 ring-inset", TONES[tone])}>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-1 px-5 py-2.5 text-[13px] sm:px-6">
        <span className="rounded-full border border-current px-2 py-px text-[10.5px] font-bold uppercase tracking-wider">{t[tone]}</span>
        <span className="font-semibold text-ink">{announcement.title}</span>
        {announcement.message?.trim() && <span className="min-w-0 flex-1 text-ink-2">{announcement.message}</span>}
        {announcement.link_url && (
          <a
            href={announcement.link_url}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto shrink-0 rounded-md border border-current px-2.5 py-0.5 text-[12px] font-semibold"
          >
            {announcement.link_label?.trim() || t.more}
          </a>
        )}
      </div>
    </div>
  );
}
