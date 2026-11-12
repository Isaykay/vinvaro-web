"use client";

import { useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { motion } from "./animation";

export const ease = [0.22, 1, 0.36, 1] as const;

/** Favicon-style integration logo from /public/logos. */
export const logo = (slug: string) => `/logos/${slug}.png`;
/** Car make logo from /public/brands. */
export const make = (slug: string) => `/brands/${slug}.png`;

/** Fade-up entrance driven by an in-view flag. */
export const reveal = (on: boolean, delay = 0, y = 16) => ({
  initial: { opacity: 0, y },
  animate: on ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.6, delay, ease },
});

export function useOnScreen<T extends Element>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const on = useInView(ref, { once: true, margin: "-80px" });
  return [ref, on];
}

export function Heading({ on, children, center, className = "" }: { on: boolean; children: ReactNode; center?: boolean; className?: string }) {
  return (
    <motion.h2 {...reveal(on)} className={`max-w-3xl text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] text-ink ${center ? "mx-auto text-center" : ""} ${className}`}>
      {children}
    </motion.h2>
  );
}

export function Lead({ on, children, center, className = "" }: { on: boolean; children: ReactNode; center?: boolean; className?: string }) {
  return (
    <motion.p
      {...reveal(on, 0.08)}
      className={`mt-5 max-w-[600px] text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55] tracking-[-0.011em] text-pretty text-muted ${center ? "mx-auto text-center" : ""} ${className}`}
    >
      {children}
    </motion.p>
  );
}

export type Tone = "green" | "brand" | "purple" | "red" | "orange" | "neutral";
const tones: Record<Tone, [string, string]> = {
  green: ["bg-ok-50 text-ok ring-ok/20", "bg-ok"],
  brand: ["bg-brand-50 text-brand ring-brand-100", "bg-brand"],
  purple: ["bg-ask-50 text-ask ring-ask/20", "bg-ask"],
  red: ["bg-danger-50 text-danger ring-danger/20", "bg-danger"],
  orange: ["bg-warn-50 text-warn ring-warn/25", "bg-warn"],
  neutral: ["bg-sunken text-ink-2 ring-line", "bg-subtle"],
};

export function Chip({ tone, children, dot = true, small, className = "" }: { tone: Tone; children: ReactNode; dot?: boolean; small?: boolean; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-medium whitespace-nowrap ring-1 ${small ? "gap-1 px-1.5 py-[2px] text-[10.5px]" : "gap-1.5 px-2 py-[3px] text-[11.5px]"} ${tones[tone][0]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${tones[tone][1]}`} />}
      {children}
    </span>
  );
}

export function Logo({ src, size = 20, className = "", contain }: { src: string; size?: number; className?: string; contain?: boolean }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden bg-white ring-1 ring-line ${className}`}
      style={{ width: size, height: size, borderRadius: Math.max(4, size / 4) }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={contain ? "h-[78%] w-[78%] object-contain" : "h-full w-full object-contain"} />
    </span>
  );
}

export const Code = ({ children, wrong }: { children: ReactNode; wrong?: boolean }) => (
  <span
    className={`rounded-[5px] bg-white px-1.5 py-0.5 font-mono text-[11.5px] font-medium whitespace-nowrap ring-1 ${wrong ? "text-danger line-through decoration-danger/50 ring-danger/25" : "text-ink ring-line"}`}
  >
    {children}
  </span>
);

export const Label = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[10.5px] font-medium tracking-[0.08em] text-subtle uppercase ${className}`}>{children}</p>
);

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[18px] bg-white shadow-card ${className}`}>{children}</div>;
}

/** Off-white dotted stage that holds an illustration. */
export function Stage({ children, className = "", dots = 14 }: { children: ReactNode; className?: string; dots?: number }) {
  return (
    <div className={`relative bg-canvas ${className}`}>
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{ backgroundImage: "radial-gradient(rgb(11 15 20 / 0.07) 1px, transparent 1px)", backgroundSize: `${dots}px ${dots}px` }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

/** Renders a fixed-width product illustration and scales it down to the available width. */
export function Fit({ width, children, className = "" }: { width: number; children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ scale: 1, height: 0 });
  useEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return;
      const scale = Math.min(1, outer.current.clientWidth / width);
      setBox({ scale, height: inner.current.offsetHeight * scale });
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (outer.current) observer.observe(outer.current);
    if (inner.current) observer.observe(inner.current);
    return () => observer.disconnect();
  }, [width]);
  return (
    <div ref={outer} className={`relative w-full ${className}`} style={{ height: box.height || undefined }}>
      <div ref={inner} className="absolute top-0 left-0 origin-top-left" style={{ width, transform: `scale(${box.scale})` }}>
        {children}
      </div>
    </div>
  );
}

export function Check({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function Cross({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className={className}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function Sparkles({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round" className={className}>
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
  );
}

export function Arrow({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Round check badge used in lists and tables. */
export function Tick({ tone = "brand", size = 18 }: { tone?: "brand" | "ok"; size?: number }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full ring-1 ${tone === "ok" ? "bg-ok-50 text-ok ring-ok/20" : "bg-brand-50 text-brand ring-brand-100"}`}
      style={{ width: size, height: size }}
    >
      <Check className="h-2.5 w-2.5" />
    </span>
  );
}
