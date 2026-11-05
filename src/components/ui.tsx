"use client";

import Link from "@/components/link";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)} {...props} />;
}

type ButtonProps = {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "dark" | "light";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

export function Button({ href, variant = "primary", size = "md", arrow, className, children }: ButtonProps) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={clsx(
        "group inline-flex items-center justify-center gap-2 font-semibold tracking-[-0.01em] whitespace-nowrap transition-all duration-200",
        size === "md" ? "h-10 rounded-[10px] px-4 text-[14px]" : "h-12 rounded-xl px-7 text-[15px]",
        variant === "primary" && "bg-brand text-white shadow-lg shadow-brand/20 hover:bg-brand-600 hover:shadow-xl hover:shadow-brand/25",
        variant === "dark" && "bg-ink text-white shadow-lg shadow-ink/15 hover:bg-obsidian-3",
        variant === "light" && "bg-white text-ink shadow-lg shadow-black/20 hover:bg-white/90",
        variant === "secondary" && "bg-surface text-ink shadow-card ring-1 ring-line hover:bg-sunken",
        variant === "ghost" && "font-medium text-ink-2 hover:text-ink",
        className,
      )}
    >
      {children}
      {arrow && <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" strokeWidth={2.25} />}
    </Link>
  );
}

export function Eyebrow({ children, className, tone = "brand" }: { children: ReactNode; className?: string; tone?: "brand" | "ai" | "light" }) {
  return (
    <p
      className={clsx(
        "font-mono text-[11.5px] font-medium tracking-[0.12em] uppercase",
        tone === "brand" && "text-brand",
        tone === "ai" && "text-ask",
        tone === "light" && "text-brand-300",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={clsx("max-w-[720px]", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <Eyebrow className="mb-5" tone={tone === "dark" ? "light" : "brand"}>
          {eyebrow}
        </Eyebrow>
      )}
      <h2 className={clsx("text-h2 text-balance", tone === "dark" && "text-white")}>{title}</h2>
      {lead && (
        <p className={clsx("text-lead mt-5 text-pretty", tone === "dark" ? "text-white/65" : "text-muted", align === "center" && "mx-auto max-w-[600px]")}>
          {lead}
        </p>
      )}
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return <div className={clsx("rounded-2xl bg-surface shadow-card", className)} {...props} />;
}

const markPaths = (
  <>
    <path d="M39.95 68.95 H52.6 C56.5 68.95 58.72 70 60.55 73.88 L76.85 101 C78.15 103 80.1 104.3 82.63 105 C80.7 107.7 79.8 108.49 77.45 108.49 H68.6 C65.6 108.49 63.65 107.8 61.65 104.5 Z" />
    <path d="M73.83 89 L86.75 69 C89.35 65 91.6 63.45 95.5 63.45 H109.12 L88.18 96.95 C86.95 98.9 85.65 99.6 83.2 99.6 C80.5 99.6 79.05 98.6 77.55 96.1 Z" />
  </>
);

/** The V mark (Version 1 primary master). Never redraw it. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 153.57 100" fill="currentColor" className={className} aria-hidden>
      <g transform="scale(2.220248668) translate(-39.95 -63.45)">{markPaths}</g>
    </svg>
  );
}

/** Horizontal lockup: V mark plus the outlined wordmark. */
export function Wordmark({ className, title = "VINVARO" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 678.62 100" fill="currentColor" className={className} role="img" aria-label={title}>
      <g transform="scale(2.220248668) translate(-39.95 -63.45)">
        {markPaths}
        <path d="M127.58 78.4 H132.6 L141.4 95.7 L150.65 78.4 H155.85 L144.15 99.7 H139.2 Z" />
        <path d="M164.92 78.4 H169.55 V99.7 H164.92 Z" />
        <path d="M180.95 78.4 H186.6 L203.38 94.85 V78.4 H207.56 V99.65 H202.2 L185.45 83.9 V99.65 H180.95 Z" />
        <path d="M215.25 78.4 H220 L229.22 95.9 L238.75 78.4 H243.6 L232.1 99.7 H226.9 Z" />
        <path d="M247.15 99.65 L258 78.45 H264 L275.5 99.65 H270.7 L261 82 L252 99.65 Z" />
        <path
          fillRule="evenodd"
          d="M283.9 78.4 H301.7 C306.45 78.4 309.1 80.7 309.1 85.7 C309.1 89.9 306.6 92.05 302.98 92.65 L308.85 99.7 H303 L296.85 92.8 H288.4 V99.7 H283.9 Z M288.4 82.1 H301.7 C303.7 82.1 304.85 83 304.85 85.55 C304.85 87.65 303.65 88.8 301.65 88.8 H288.4 Z"
        />
        <path
          fillRule="evenodd"
          d="M327.4 78.24 H335.9 C342 78.24 345.6 81.4 345.6 87.1 V91.25 C345.6 97.02 342.4 99.9 336.1 99.9 H327.4 C320.9 99.9 317.65 96.6 317.65 90.5 V87.55 C317.65 81.72 321.2 78.24 327.4 78.24 Z M327.8 82.15 C324.1 82.15 322.2 84.3 322.2 87.95 V90.5 C322.2 94.35 324.1 96.1 327.85 96.1 H335.7 C339.65 96.1 341.25 94.35 341.25 90.65 V87.45 C341.25 83.8 339.25 82.15 335.65 82.15 Z"
        />
      </g>
    </svg>
  );
}
