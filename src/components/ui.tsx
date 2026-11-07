"use client";

import Link from "@/components/link";
import { Mark, Wordmark } from "@/components/brand-mark";

export { Mark, Wordmark };
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

