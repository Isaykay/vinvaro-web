import Image from "next/image";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { Globe } from "lucide-react";
import { Mark } from "@/components/ui";
import { ChannelLogo, type ChannelKind } from "@/components/channel-logo";

/** Side-profile car illustration (front faces right). Wheels can spin; the body can be tinted. */
export function Car({
  className,
  tone = "light",
  spin,
  body,
  style,
}: {
  className?: string;
  tone?: "light" | "dark" | "brand";
  spin?: boolean;
  body?: string;
  style?: CSSProperties;
}) {
  const stroke = tone === "dark" ? "rgb(255 255 255 / 0.35)" : "#0b0f14";
  const fill = body ?? (tone === "dark" ? "#1e293b" : tone === "brand" ? "#2563eb" : "#ffffff");
  const glass = tone === "dark" ? "#0b0f14" : tone === "brand" ? "#dbeafe" : "#e2e8f0";
  const id = `car-${tone}`;
  return (
    <svg viewBox="0 0 400 150" className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={fill} stopOpacity={tone === "light" ? 1 : 0.95} />
          <stop offset="1" stopColor={fill} stopOpacity={tone === "light" ? 0.88 : 1} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={glass} />
          <stop offset="1" stopColor={tone === "dark" ? "#141b24" : "#cbd5e1"} />
        </linearGradient>
      </defs>
      <ellipse cx="200" cy="140" rx="180" ry="6" fill="#0b0f14" opacity={tone === "dark" ? 0.5 : 0.08} />
      <path
        d="M18 104 C18 92 26 86 40 84 L92 78 C108 62 128 50 160 46 L236 44 C262 44 284 54 306 72 L360 80 C376 82 384 90 384 102 L384 110 C384 115 380 118 375 118 L350 118 A28 28 0 0 0 294 118 L126 118 A28 28 0 0 0 70 118 L26 118 C21 118 18 115 18 110 Z"
        fill={`url(#${id}-body)`}
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M108 78 C122 64 138 55 162 53 L200 52 L200 78 Z" fill={`url(#${id}-glass)`} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M208 52 L236 52 C256 52 274 60 292 76 L292 78 L208 78 Z" fill={`url(#${id}-glass)`} stroke={stroke} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M128 112 L294 112" stroke={stroke} strokeWidth="1" opacity="0.35" />
      <path d="M204 52 L204 116 M132 80 L132 112 M282 80 L282 112" stroke={stroke} strokeWidth="1" opacity="0.4" />
      <rect x="170" y="88" width="16" height="3.5" rx="1.75" fill={stroke} opacity="0.5" />
      <rect x="244" y="88" width="16" height="3.5" rx="1.75" fill={stroke} opacity="0.5" />
      <path d="M354 86 L378 90 L378 95 L358 93 Z" fill={tone === "dark" ? "#93c5fd" : "#fde68a"} stroke={stroke} strokeWidth="1" />
      <path d="M21 90 L38 88 L38 95 L21 97 Z" fill="#ef4444" opacity="0.85" stroke={stroke} strokeWidth="1" />
      <Wheel cx={98} spin={spin} tone={tone} />
      <Wheel cx={322} spin={spin} tone={tone} />
    </svg>
  );
}

function Wheel({ cx, spin, tone }: { cx: number; spin?: boolean; tone: "light" | "dark" | "brand" }) {
  return (
    <g>
      <circle cx={cx} cy="118" r="24" fill="#0b0f14" />
      <g className={clsx(spin && "animate-spin-slow")} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        <circle cx={cx} cy="118" r="15" fill={tone === "dark" ? "#475569" : "#cbd5e1"} />
        {[0, 72, 144, 216, 288].map((a) => (
          <rect key={a} x={cx - 1.5} y={104} width="3" height="14" rx="1.5" fill={tone === "dark" ? "#94a3b8" : "#64748b"} transform={`rotate(${a} ${cx} 118)`} />
        ))}
        <circle cx={cx} cy="118" r="4" fill="#0b0f14" />
      </g>
    </g>
  );
}

const plateSizes = {
  xs: { height: 17, font: 10.5, band: 9, code: 5, star: 5, pad: 4 },
  sm: { height: 22, font: 12.5, band: 12, code: 6.5, star: 7, pad: 6 },
  md: { height: 30, font: 17, band: 16, code: 8.5, star: 9.5, pad: 8 },
};

function EuStars({ size }: { size: number }) {
  const r = size / 2 - 0.6;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={(size / 2 + Math.sin(a) * r).toFixed(2)} cy={(size / 2 - Math.cos(a) * r).toFixed(2)} r={(size / 16 + 0.25).toFixed(2)} fill="#FFCC00" />;
      })}
    </svg>
  );
}

/** Dutch number plate, drawn like the LicensePlate component in the web app (EU band with stars). */
export function Plate({ children, className, size = "sm" }: { children: ReactNode; className?: string; size?: keyof typeof plateSizes }) {
  const s = plateSizes[size];
  return (
    <span
      className={clsx("inline-flex shrink-0 items-stretch overflow-hidden align-middle shadow-[inset_0_0_0_1px_rgba(0,0,0,0.08)]", className)}
      style={{ height: s.height, borderRadius: Math.max(3, s.height / 9), background: "#F5C400", border: "1.5px solid #1F2937" }}
    >
      <span className="flex flex-col items-center justify-center gap-px font-semibold text-white" style={{ width: s.band, background: "#003399", fontSize: s.code }}>
        <EuStars size={s.star} />
        <span className="leading-none">NL</span>
      </span>
      <span
        className="flex flex-1 items-center justify-center font-bold whitespace-nowrap text-[#111]"
        style={{ fontSize: s.font, paddingInline: s.pad, letterSpacing: "0.04em", fontFamily: "'DIN Condensed', 'Arial Narrow', 'Roboto Condensed', ui-sans-serif, sans-serif", fontStretch: "condensed" }}
      >
        {children}
      </span>
    </span>
  );
}

/** Integration logo tile (favicons from /public/logos, like the app's integration settings). */
export function LogoTile({ slug, className, size = 28 }: { slug: string; className?: string; size?: number }) {
  if (slug === "vinvaro") {
    return (
      <span className={clsx("grid shrink-0 place-items-center overflow-hidden rounded-[9px] border border-line bg-ink text-white", className ?? "size-10")}>
        <Mark className="h-auto" width={size} />
      </span>
    );
  }
  return (
    <span className={clsx("grid shrink-0 place-items-center overflow-hidden rounded-[9px] border border-line bg-white", className ?? "size-10")}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/logos/${slug}.png`} alt="" width={size} height={size} decoding="async" className="rounded-[4px] object-contain" style={{ width: size, height: size }} />
    </span>
  );
}

export function BrandLogo({ make, className }: { make: string; className?: string }) {
  return (
    <span className={clsx("relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface ring-1 ring-line", className ?? "size-8")}>
      <Image src={`/brands/${make}.png`} alt="" width={64} height={43} className="h-auto w-[78%] object-contain" />
    </span>
  );
}

/** Logo for an integration: SVG mark for inbox channels, favicon file otherwise, globe for the website feed. */
export function IntegrationLogo({
  slug,
  channel,
  className,
  size = 22,
}: {
  slug?: string;
  channel?: ChannelKind;
  className?: string;
  size?: number;
}) {
  const shape = clsx("grid shrink-0 place-items-center overflow-hidden rounded-[10px] border", className ?? "size-10");
  const box = clsx(shape, "border-line bg-white");
  if (channel) {
    return (
      <span className={box}>
        <ChannelLogo kind={channel} size={size} />
      </span>
    );
  }
  if (slug === "vinvaro") {
    return (
      <span className={clsx(shape, "border-ink bg-ink text-white")}>
        <Mark className="h-auto" width={size} />
      </span>
    );
  }
  if (!slug || slug === "site") {
    return (
      <span className={clsx(shape, "border-line bg-brand-50 text-brand")}>
        <Globe style={{ width: size * 0.85, height: size * 0.85 }} strokeWidth={1.8} />
      </span>
    );
  }
  return (
    <span className={box}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/logos/${slug}.png`} alt="" width={size} height={size} decoding="async" className="rounded-[4px] object-contain" style={{ width: size, height: size }} />
    </span>
  );
}

/** App window with VINVARO chrome. */
export function AppWindow({ children, className, title = "app.vinvaro.com" }: { children: ReactNode; className?: string; title?: string }) {
  return (
    <div className={clsx("overflow-hidden rounded-2xl bg-surface shadow-float ring-1 ring-ink/5", className)}>
      <div className="flex h-9 items-center gap-2 border-b border-line bg-canvas px-3.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-md bg-surface px-3 py-0.5 font-mono text-[10.5px] text-subtle ring-1 ring-line">
          <Mark className="h-2 w-auto text-ink" />
          {title}
        </span>
        <span className="w-[42px]" />
      </div>
      {children}
    </div>
  );
}

/** iPhone-style frame for the staff app. */
export function Phone({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <div className={clsx("relative rounded-[42px] bg-ink p-[9px] shadow-float ring-1 ring-white/10", className)}>
      <div className={clsx("relative h-full overflow-hidden rounded-[34px]", dark ? "bg-obsidian" : "bg-canvas")}>
        <div className="absolute top-2 left-1/2 z-20 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}

export function Pill({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "brand" | "ok" | "warn" | "ai" | "danger"; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex h-[20px] items-center gap-1 rounded-full px-2 text-[10.5px] font-medium whitespace-nowrap",
        tone === "neutral" && "bg-sunken text-ink-2",
        tone === "brand" && "bg-brand-50 text-brand",
        tone === "ok" && "bg-ok-50 text-ok",
        tone === "warn" && "bg-warn-50 text-warn",
        tone === "ai" && "bg-ask-50 text-ask",
        tone === "danger" && "bg-danger-50 text-danger",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Dot({ className }: { className?: string }) {
  return <span className={clsx("size-1.5 shrink-0 rounded-full", className)} />;
}

/** Inline style helper for staggered CSS animations. */
export const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });
