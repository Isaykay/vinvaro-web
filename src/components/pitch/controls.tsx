"use client";

import { useCallback, useEffect } from "react";
import { useT } from "./lang";

/** Steps to the next or previous full-screen slide; space and the arrow keys do the same. */
export function useSlideNavigation() {
  const navigate = useCallback((direction: 1 | -1) => {
    const sections = [...document.querySelectorAll<HTMLElement>("section.slide-section")];
    const threshold = window.innerHeight * 0.3;
    const target = direction === 1 ? sections.find((el) => el.getBoundingClientRect().top > threshold) : sections.findLast((el) => el.getBoundingClientRect().top < -threshold);
    target?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space" || e.code === "ArrowDown") {
        e.preventDefault();
        navigate(1);
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return navigate;
}

export function SlideControls({ navigate }: { navigate: (direction: 1 | -1) => void }) {
  const t = useT();
  return (
    <div className="fixed right-6 bottom-6 z-50 hidden flex-col items-center gap-1.5 md:flex">
      {([-1, 1] as const).map((direction) => (
        <button
          key={direction}
          onClick={() => navigate(direction)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/90 text-muted shadow-md backdrop-blur-sm transition-all hover:border-brand/30 hover:text-brand hover:shadow-lg"
          aria-label={direction === -1 ? t("Vorige slide", "Previous slide") : t("Volgende slide", "Next slide")}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d={direction === -1 ? "M3 9l4-4 4 4" : "M3 5l4 4 4-4"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      ))}
      <span className="mt-0.5 rounded-md bg-black/5 px-1.5 py-0.5 text-[9px] font-medium text-muted/60 backdrop-blur-sm">{t("spatie ↓", "space ↓")}</span>
    </div>
  );
}
