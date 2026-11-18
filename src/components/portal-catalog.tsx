"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { Search, X } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { PORTAL_GROUPS, PORTALS, type PortalGroup } from "@/content/portals";
import { defineCopy } from "@/lib/i18n";

const copy = defineCopy({
  nl: {
    title: (n: number) => `${n} sites om op te publiceren`,
    lead: "Per auto kies je op welke sites hij komt. Voor betaalde portalen heb je een eigen abonnement bij dat portal nodig.",
    search: "Zoek een site",
    empty: "Geen site gevonden.",
    close: "Sluiten",
    groups: {
      portal: "Autoportalen",
      international: "Internationaal",
      social: "Social en advertenties",
      lease: "Lease",
      trade: "Handel en inkoop",
      brand: "Merken",
      other: "Overig",
    } as Record<PortalGroup, string>,
  },
  en: {
    title: (n: number) => `${n} sites to publish to`,
    lead: "You choose per car which sites it goes on. Paid portals need your own subscription with that portal.",
    search: "Search a site",
    empty: "No site found.",
    close: "Close",
    groups: {
      portal: "Car portals",
      international: "International",
      social: "Social and ads",
      lease: "Lease",
      trade: "Trade and purchasing",
      brand: "Brands",
      other: "Other",
    } as Record<PortalGroup, string>,
  },
});

/** Wraps a trigger; clicking it opens every site dealers can publish to, grouped and searchable. */
export function PortalCatalog({ children, className }: { children: ReactNode; className?: string }) {
  const t = copy[useLang()];
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    const hits = q ? PORTALS.filter((p) => p.name.toLowerCase().includes(q)) : PORTALS;
    return PORTAL_GROUPS.map((g) => ({ group: g, items: hits.filter((p) => p.group === g) })).filter((g) => g.items.length > 0);
  }, [query]);

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className={clsx("cursor-pointer text-left", className)}>
        {children}
      </button>
      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        className="m-auto max-h-[min(88vh,860px)] w-[min(920px,calc(100vw-24px))] overflow-hidden rounded-[20px] border border-line bg-surface p-0 text-ink shadow-float backdrop:bg-ink/40 backdrop:backdrop-blur-[2px]"
      >
        <div className="flex max-h-[min(88vh,860px)] flex-col">
          <div className="flex items-start gap-4 border-b border-line px-6 py-5">
            <div className="min-w-0 flex-1">
              <p className="text-[19px] font-semibold tracking-[-0.02em]">{t.title(PORTALS.length)}</p>
              <p className="mt-1 text-[13.5px] text-muted">{t.lead}</p>
            </div>
            <button type="button" onClick={() => dialog.current?.close()} aria-label={t.close} className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-sunken hover:text-ink">
              <X className="size-4" />
            </button>
          </div>
          <div className="overflow-y-auto px-6 py-5">
            <label className="relative mb-5 block">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.search}
                className="h-10 w-full rounded-xl border border-line bg-canvas pr-3 pl-9 text-[14px] outline-none focus:border-brand"
              />
            </label>
            {groups.length === 0 && <p className="text-[14px] text-muted">{t.empty}</p>}
            <div className="space-y-6">
              {groups.map(({ group, items }) => (
                <section key={group}>
                  <p className="mb-2.5 text-[11.5px] font-semibold tracking-[0.12em] text-muted uppercase">
                    {t.groups[group]} <span className="font-normal tabular-nums">· {items.length}</span>
                  </p>
                  <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {items.map((p) => (
                      <li key={p.site} className="flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-canvas px-2.5 py-2">
                        <span className="grid h-8 w-12 shrink-0 place-items-center overflow-hidden rounded-md border border-line bg-white px-1">
                          {p.logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={p.logo} alt="" loading="lazy" decoding="async" className="max-h-6 w-auto max-w-full object-contain" />
                          )}
                        </span>
                        <span className="truncate text-[13px]">{p.name}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
