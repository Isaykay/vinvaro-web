import Image from "next/image";
import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { Mark } from "@/components/ui";

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

/** Dutch-style yellow number plate with the blue EU strip. */
export function Plate({ children, className, size = "sm" }: { children: ReactNode; className?: string; size?: "sm" | "md" }) {
  return (
    <span
      className={clsx(
        "inline-flex shrink-0 items-stretch overflow-hidden rounded-[4px] bg-[#f7c600] font-mono font-bold tracking-[0.04em] text-ink ring-1 ring-ink/20",
        size === "sm" ? "h-[18px] text-[10.5px]" : "h-6 text-[13px]",
        className,
      )}
    >
      <span className={clsx("flex flex-col items-center justify-end bg-[#1d4ed8] text-white", size === "sm" ? "w-2.5 pb-px text-[5px]" : "w-3.5 pb-0.5 text-[6.5px]")}>NL</span>
      <span className={clsx("flex items-center", size === "sm" ? "px-1.5" : "px-2")}>{children}</span>
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
