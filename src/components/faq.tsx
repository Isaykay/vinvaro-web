"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import clsx from "clsx";

/** Answers stay in the HTML when collapsed so crawlers and answer engines can read them. */
export function FAQ({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button className="flex w-full items-center justify-between gap-6 py-5 text-left" onClick={() => setOpen(expanded ? null : i)} aria-expanded={expanded}>
                <span className="text-[16px] font-medium tracking-[-0.015em]">{item.q}</span>
                <Plus className={clsx("size-4 shrink-0 text-muted transition-transform duration-300", expanded && "rotate-45")} />
              </button>
            </h3>
            <div className={clsx("grid transition-[grid-template-rows,opacity] duration-300 ease-out", expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
              <div className="overflow-hidden" inert={!expanded}>
                <p className="max-w-[680px] pb-6 text-[15px] leading-relaxed text-muted">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
