"use client";

/*
 * Replicas of the VINVARO web client's UI components (vinvaro-web-client/src/components/ui, dashboard, pipeline, workspace),
 * with the same sizes, radii and token colours, so the marketing illustrations look exactly like the product.
 */

import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "@/components/app-icons";
import { Wordmark, Mark } from "@/components/ui";
import { Plate } from "@/components/product/kit";

export type BadgeTone = "success" | "info" | "warning" | "danger" | "ai" | "neutral";

const badgeTones: Record<BadgeTone, string> = {
  success: "bg-ok-50 text-ok",
  info: "bg-brand-50 text-brand-600",
  warning: "bg-warn-50 text-[#92400e]",
  danger: "bg-danger-50 text-danger",
  ai: "bg-ask-50 text-ask",
  neutral: "bg-sunken text-[#475569]",
};
const toneDot: Record<BadgeTone, string> = {
  success: "bg-ok",
  info: "bg-brand",
  warning: "bg-[#92400e]",
  danger: "bg-danger",
  ai: "bg-ask",
  neutral: "bg-muted",
};

const d = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function AppBadge({ tone = "neutral", dot, children, small }: { tone?: BadgeTone; dot?: boolean; children: ReactNode; small?: boolean }) {
  return (
    <span className={clsx("inline-flex items-center gap-1.5 rounded-[6px] leading-none font-medium whitespace-nowrap", small ? "h-[18px] px-1.5 text-[9.5px]" : "h-[22px] px-2 text-[11.5px]", badgeTones[tone])}>
      {dot && <span className={clsx("size-1.5 shrink-0 rounded-full", toneDot[tone])} />}
      {children}
    </span>
  );
}

/** BrandLogo: the make's original logo on a white tile. */
export function AppBrandLogo({ make, size = 28 }: { make: string; size?: number }) {
  const radius = Math.max(6, Math.round(size * 0.24));
  const inner = Math.round(size * 0.8);
  return (
    <span className="grid shrink-0 place-items-center overflow-hidden border border-black/[0.07] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.06)]" style={{ width: size, height: size, borderRadius: radius }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/brands/${make}.png`} alt="" className="object-contain" style={{ width: inner, height: inner }} />
    </span>
  );
}

export function AppCard({ title, actions, children, className, flush }: { title?: string; actions?: ReactNode; children: ReactNode; className?: string; flush?: boolean }) {
  return (
    <section className={clsx("overflow-hidden rounded-[12px] border border-line bg-surface shadow-[0_1px_2px_0_rgb(15_23_42/0.04),0_1px_3px_0_rgb(15_23_42/0.03)]", !flush && "p-4", className)}>
      {title && (
        <div className={clsx("mb-3 flex items-center justify-between gap-3", flush && "px-4 pt-3.5")}>
          <h3 className="text-[13px] leading-6 font-semibold tracking-[-0.01em]">{title}</h3>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

export function AppMetricCard({ label, value, caption, icon, delay = 0 }: { label: string; value: string; caption: string; icon: IconName; delay?: number }) {
  return (
    <div className="animate-row-in rounded-[12px] border border-line bg-surface p-3.5" style={d(delay)}>
      <div className="flex items-center justify-between text-[11px] text-muted">
        <span className="truncate">{label}</span>
        <Icon name={icon} size={14} />
      </div>
      <p className="mt-1.5 mb-0.5 text-[26px] leading-[1.3] tracking-[-0.04em] tabular-nums">{value}</p>
      <small className="block truncate text-[9.5px] text-muted">{caption}</small>
    </div>
  );
}

export function DeltaPill({ pct, good = true, delay = 300 }: { pct: string; good?: boolean; delay?: number }) {
  return (
    <span className={clsx("inline-flex h-5 shrink-0 animate-row-in items-center gap-1 rounded-full px-1.5 text-[10.5px] font-semibold tabular-nums", good ? "bg-ok-50 text-ok" : "bg-danger-50 text-danger")} style={d(delay)}>
      <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden>
        <path d="M6 2.5v7M2.75 5.75 6 2.5l3.25 3.25" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {pct}
    </span>
  );
}

/** TrendBars: monthly bars with last year as a ghost bar behind; the latest month is highlighted. */
export function TrendBars({ values, previous, className }: { values: number[]; previous: number[]; className?: string }) {
  const max = Math.max(...values, ...previous);
  return (
    <div className={clsx("flex h-10 items-end gap-[3px]", className)}>
      {values.map((v, i) => (
        <div key={i} className="relative flex h-full flex-1 items-end">
          <span className="absolute inset-x-0 bottom-0 origin-bottom rounded-t-[3px] bg-muted/15" style={{ height: `${(previous[i] / max) * 100}%`, animation: "bar-grow 700ms cubic-bezier(.2,0,0,1) both", ...d(i * 35) }} />
          <span
            className={clsx("relative w-full origin-bottom rounded-t-[3px] bg-brand", i < values.length - 1 && "opacity-45")}
            style={{ height: `${(v / max) * 100}%`, animation: "bar-grow 700ms cubic-bezier(.2,0,0,1) both", ...d(120 + i * 35) }}
          />
        </div>
      ))}
    </div>
  );
}

export function SegmentBar({ segments }: { segments: { label: string; value: number; className: string }[] }) {
  const total = segments.reduce((n, s) => n + s.value, 0);
  return (
    <div>
      <div className="flex h-2 overflow-hidden rounded-full bg-sunken">
        <div className="flex w-full origin-left gap-0.5" style={{ animation: "bar-fill 900ms cubic-bezier(.2,0,0,1) both", ...d(120) }}>
          {segments.map((s) => (
            <span key={s.label} className={clsx("h-full first:rounded-l-full last:rounded-r-full", s.className)} style={{ width: `${(s.value / total) * 100}%` }} />
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex animate-row-in flex-wrap gap-x-2.5 gap-y-1 text-[9.5px] text-muted" style={d(500)}>
        {segments.map((s) => (
          <span key={s.label} className="inline-flex items-center gap-1">
            <span className={clsx("size-1.5 rounded-[2px]", s.className)} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FinanceCard({ label, ytd, value, hint, delta, children, delay = 0 }: { label: string; ytd?: string; value: string; hint: string; delta?: string; children: ReactNode; delay?: number }) {
  return (
    <div className="flex min-w-0 animate-row-in flex-col rounded-[12px] border border-line bg-surface p-3.5" style={d(delay)}>
      <span className="flex items-center justify-between gap-2 text-[11px] text-muted">
        <span className="truncate">{label}</span>
        {ytd && <small className="shrink-0 text-[9.5px]">{ytd}</small>}
      </span>
      <div className="mt-1 flex min-w-0 items-center gap-2">
        <p className="truncate text-[20px] leading-tight font-semibold tracking-[-0.02em] tabular-nums">{value}</p>
        {delta && <DeltaPill pct={delta} delay={delay + 300} />}
      </div>
      <small className="mt-0.5 block truncate text-[9.5px] text-muted">{hint}</small>
      <div className="mt-auto pt-3">{children}</div>
    </div>
  );
}

/** VehicleCell: logo, name with plate, specs line. */
export function VehicleCell({ make, name, plate, specs, size = 30 }: { make: string; name: string; plate: string; specs: string; size?: number }) {
  return (
    <span className="flex min-w-0 items-center gap-2.5">
      <AppBrandLogo make={make} size={size} />
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2">
          <b className="truncate text-[11.5px] font-semibold">{name}</b>
          <Plate size="xs">{plate}</Plate>
        </span>
        <span className="mt-0.5 block truncate text-[10px] text-muted tabular-nums">{specs}</span>
      </span>
    </span>
  );
}

export type PipelineCardData = {
  make: string;
  title: string;
  price: string;
  specs: string;
  plate: string;
  status: string;
  tone: BadgeTone;
  missing?: string;
  days: number;
  stock: string;
  tasks?: number;
  testDrives?: number;
  done: number;
  total: number;
};

/** The pipeline board's VehicleCard. */
export function PipelineCard({ card, delay = 0, highlight }: { card: PipelineCardData; delay?: number; highlight?: boolean }) {
  const aging = card.days > 60 ? "text-danger" : card.days > 30 ? "text-[#92400e]" : "text-muted";
  return (
    <li
      className={clsx(
        "list-none animate-row-in rounded-[8px] border bg-surface p-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.05)]",
        highlight ? "border-brand shadow-[0_8px_24px_-10px_rgba(37,99,235,0.45)]" : "border-line",
      )}
      style={d(delay)}
    >
      <div className="flex items-start gap-2.5">
        <AppBrandLogo make={card.make} size={30} />
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[11.5px] leading-4 font-semibold">{card.title}</p>
            <p className="shrink-0 text-[11px] font-semibold tabular-nums">{card.price}</p>
          </div>
          <p className="mt-0.5 truncate text-[10px] text-muted">{card.specs}</p>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <Plate size="xs">{card.plate}</Plate>
        <span className="ml-auto">
          <AppBadge tone={card.tone} dot small>
            {card.status}
          </AppBadge>
        </span>
      </div>
      {card.missing && (
        <p className="mt-2 flex items-start gap-1 rounded-[6px] bg-warn-50 px-1.5 py-1 text-[9.5px] leading-[1.35] text-[#92400e]">
          <Icon name="warning" size={10} className="mt-px shrink-0" />
          <span className="truncate">{card.missing}</span>
        </p>
      )}
      <div className="mt-2 flex items-center gap-2.5 border-t border-line pt-2 text-[9.5px]">
        <span className={clsx("inline-flex items-center gap-0.5 font-medium", aging)}>
          <Icon name="clock" size={10} />
          {card.days} d
        </span>
        <span className="text-muted tabular-nums">#{card.stock}</span>
        {card.tasks ? (
          <span className="inline-flex items-center gap-0.5 text-[#475569]">
            <Icon name="check" size={10} />
            {card.tasks}
          </span>
        ) : null}
        {card.testDrives ? (
          <span className="inline-flex items-center gap-0.5 rounded-full bg-brand-50 px-1 text-[9px] font-medium text-brand-600">
            <Icon name="calendar" size={9} />
            {card.testDrives}
          </span>
        ) : null}
        <span className="ml-auto inline-flex items-center gap-1 text-muted">
          <span className="h-1 w-8 overflow-hidden rounded-full bg-line">
            <span className="block h-full origin-left rounded-full bg-brand" style={{ width: `${Math.round((card.done / card.total) * 100)}%`, animation: "bar-fill 900ms cubic-bezier(.2,0,0,1) both", ...d(delay + 250) }} />
          </span>
          <span className="tabular-nums">
            {card.done}/{card.total}
          </span>
        </span>
      </div>
    </li>
  );
}

export function StageColumn({ name, tone, count, value, avg, requires, children, width = 210 }: { name: string; tone: BadgeTone; count: number; value: string; avg: string; requires?: string; children: ReactNode; width?: number }) {
  return (
    <div className="flex shrink-0 flex-col rounded-[12px] border border-line bg-sunken/70" style={{ width }}>
      <header className="px-2.5 pt-2.5 pb-2">
        <div className="flex items-center gap-1.5">
          <span className={clsx("size-2 shrink-0 rounded-full", toneDot[tone])} />
          <h4 className="min-w-0 flex-1 truncate text-[11.5px] font-semibold">{name}</h4>
          <span className="grid h-4 min-w-4 place-items-center rounded-full bg-surface px-1 text-[9.5px] font-semibold text-[#475569] ring-1 ring-line">{count}</span>
        </div>
        <p className="mt-1 flex items-center gap-1.5 pl-3.5 text-[9.5px] text-muted tabular-nums">
          {value}
          <span className="size-0.5 rounded-full bg-muted" />
          {avg}
        </p>
        {requires && (
          <p className="mt-1.5 flex h-[20px] items-center gap-1 rounded-[6px] bg-surface px-1.5 text-[9px] text-[#475569] ring-1 ring-line">
            <Icon name="shield" size={10} className="shrink-0 text-muted" />
            <span className="truncate">{requires}</span>
          </p>
        )}
      </header>
      <ol className="flex flex-col gap-1.5 px-1.5 pb-1.5">{children}</ol>
    </div>
  );
}

/* ---------- Workspace shell (sidebar + topbar) ---------- */

export type NavGroup = { label?: string; items: [IconName, string, number?][] };

export function AppSidebar({ groups, active, org, role, import: importLabels }: { groups: NavGroup[]; active: string; org: string; role: string; import: [string, string] }) {
  return (
    <aside className="hidden w-[204px] shrink-0 flex-col border-r border-line bg-surface md:flex">
      <div className="flex h-12 items-center justify-between border-b border-line px-3.5">
        <Wordmark className="h-[11px] w-auto text-ink" />
        <Icon name="sidebar" size={14} className="text-muted" />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-2.5 py-3.5">
        <div className="flex items-center gap-2 rounded-[8px] border border-line bg-surface p-1.5 shadow-[0_1px_2px_0_rgb(15_23_42/0.05)]">
          <span className="grid size-7 place-items-center rounded-[7px] bg-ink text-[9.5px] font-semibold text-white">{org.split(" ").filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join("")}</span>
          <span className="min-w-0 flex-1 leading-[1.35]">
            <span className="block truncate text-[10.5px] font-semibold">{org}</span>
            <span className="block truncate text-[9.5px] text-muted">{role}</span>
          </span>
          <Icon name="chevronDown" size={12} className="text-muted" />
        </div>
        <nav className="grid gap-3.5">
          {groups.map((g, gi) => (
            <div key={gi} className="grid gap-px">
              {g.label && <p className="mb-1 px-2 text-[8.5px] font-semibold tracking-[0.12em] text-muted uppercase">{g.label}</p>}
              {g.items.map(([icon, label, badge]) => (
                <span
                  key={label}
                  className={clsx("flex h-7 items-center gap-2 rounded-[8px] px-2 text-[11px]", label === active ? "bg-brand-50 font-semibold text-brand-600" : "text-[#475569]")}
                >
                  <Icon name={icon} size={15} />
                  <span className="min-w-0 flex-1 truncate">{label}</span>
                  {badge ? <span className="grid h-4 min-w-4 place-items-center rounded-full bg-brand px-1 text-[9px] font-semibold text-white">{badge}</span> : null}
                </span>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-line p-2.5">
        <div className="flex items-center gap-2 rounded-[8px] border border-dashed border-line-strong px-2 py-2 text-[#475569]">
          <span className="grid size-6 place-items-center rounded-[7px] bg-sunken text-muted">
            <Icon name="upload" size={12} />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[10px] font-medium text-ink">{importLabels[0]}</span>
            <span className="block truncate text-[8.5px] text-muted">{importLabels[1]}</span>
          </span>
        </div>
      </div>
    </aside>
  );
}

export function AppTopbar({ search, initials }: { search: string; initials: string }) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-line bg-surface/85 px-4 backdrop-blur">
      <span className="md:hidden">
        <Wordmark className="h-[10px] w-auto" />
      </span>
      <span className="ml-auto flex h-8 w-full max-w-[280px] items-center gap-2 rounded-[8px] border border-[#cbd5e1] bg-surface px-2.5 text-[10.5px] text-muted shadow-[0_1px_2px_0_rgb(15_23_42/0.05)] md:ml-0">
        <Icon name="search" size={13} />
        <span className="truncate">{search}</span>
        <kbd className="ml-auto rounded-[4px] border border-line bg-sunken px-1 font-sans text-[9px] text-muted">⌘K</kbd>
      </span>
      <span className="ml-auto hidden size-7 place-items-center rounded-full bg-brand-50 text-[10px] font-semibold text-brand-600 md:grid">{initials}</span>
    </header>
  );
}

/** Browser window around an app screen. */
export function BrowserFrame({ children, url = "app.vinvaro.com", className }: { children: ReactNode; url?: string; className?: string }) {
  return (
    <div className={clsx("overflow-hidden rounded-[14px] border border-line bg-surface shadow-[0_40px_90px_-40px_rgb(11_15_20/0.45),0_0_0_1px_rgb(11_15_20/0.03)]", className)}>
      <div className="flex h-8 items-center gap-2 border-b border-line bg-[#f6f8fb] px-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex h-5 min-w-[200px] items-center justify-center gap-1.5 rounded-[6px] border border-line bg-surface px-3 text-[10px] text-muted">
          <Mark className="h-2 w-auto text-ink" />
          {url}
        </span>
        <span className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return (
    <header className="mb-3.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
      <div className="min-w-0">
        <h2 className="text-[17px] leading-tight font-normal tracking-[-0.01em]">{title}</h2>
        <p className="mt-0.5 text-[10.5px] text-[#475569]">{subtitle}</p>
      </div>
      {actions && <div className="flex items-center gap-1.5">{actions}</div>}
    </header>
  );
}

export function AppButton({ primary, icon, children }: { primary?: boolean; icon?: IconName; children: ReactNode }) {
  return (
    <span
      className={clsx(
        "inline-flex h-7 items-center gap-1.5 rounded-[8px] border px-2.5 text-[10.5px] font-medium whitespace-nowrap shadow-[0_1px_2px_0_rgb(15_23_42/0.05)]",
        primary ? "border-transparent bg-brand text-white" : "border-[#cbd5e1] bg-surface text-ink",
      )}
    >
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}
