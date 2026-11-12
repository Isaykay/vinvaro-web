"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Wordmark } from "@/components/brand-mark";
import { useLang } from "@/components/lang-provider";
import { motion, useAnimations } from "./animation";
import { useSetLang, useT } from "./lang";

function AnimationToggle({ compact = false }: { compact?: boolean }) {
  const { enabled, toggle } = useAnimations();
  const t = useT();
  const label = enabled ? t("Animaties uitschakelen", "Turn animations off") : t("Animaties inschakelen", "Turn animations on");
  return (
    <button
      onClick={toggle}
      aria-pressed={enabled}
      title={label}
      aria-label={label}
      className={`flex ${compact ? "h-6 w-6" : "h-7 w-7"} shrink-0 items-center justify-center rounded-full border border-line bg-white/90 shadow-sm backdrop-blur-sm transition-colors ${enabled ? "text-brand" : "text-muted hover:text-ink"}`}
    >
      <svg width={compact ? 13 : 14} height={compact ? 13 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" />
        <path d="M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />
        {!enabled && <line x1="3.5" y1="20.5" x2="20.5" y2="3.5" />}
      </svg>
    </button>
  );
}

function LanguageSwitch({ compact = false }: { compact?: boolean }) {
  const lang = useLang();
  const setLang = useSetLang();
  return (
    <button
      type="button"
      onClick={() => setLang(lang === "nl" ? "en" : "nl")}
      aria-label={lang === "nl" ? "Schakel naar Engels" : "Switch to Dutch"}
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-white/90 font-semibold whitespace-nowrap text-muted shadow-sm backdrop-blur-sm transition-colors hover:border-line-strong hover:bg-canvas hover:text-ink ${compact ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs"}`}
    >
      {lang === "nl" ? "🇳🇱 NL" : "🇬🇧 EN"}
    </button>
  );
}

export function PitchNavigation({ slides }: { slides: { id: string; label: string }[] }) {
  const t = useT();
  const [active, setActive] = useState(slides[0].id);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ids = slides.map((s) => s.id);
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const line = window.scrollY + window.innerHeight / 3;
      for (let i = ids.length - 1; i >= 0; i--) {
        const section = document.getElementById(ids[i]);
        if (section && section.offsetTop <= line) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slides]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? "pitch-glass shadow-lg shadow-brand/5" : "bg-transparent"}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 py-3">
          <button onClick={() => scrollTo(slides[0].id)} className="flex shrink-0 items-center text-ink" aria-label="VINVARO">
            <Wordmark className="h-[17px] w-auto" />
          </button>

          <div className="hidden items-center gap-1 xl:flex">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => scrollTo(slide.id)}
                className={`relative rounded-full px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors ${active === slide.id ? "text-brand" : "text-muted hover:text-ink"}`}
              >
                {active === slide.id && (
                  <motion.span layoutId="pitch-nav-pill" className="absolute inset-0 rounded-full bg-brand-50" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
                <span className="relative z-10">{slide.label}</span>
              </button>
            ))}
            <div className="ml-2 flex items-center gap-1.5">
              <AnimationToggle />
              <LanguageSwitch />
            </div>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <AnimationToggle compact />
            <LanguageSwitch compact />
            <button onClick={() => setOpen(!open)} className="flex h-8 w-8 flex-col items-center justify-center gap-1" aria-label="Menu">
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="pitch-glass fixed inset-x-0 top-14 z-40 border-b border-line p-4 xl:hidden"
          >
            <div className="flex flex-col gap-1">
              {slides.map((slide) => (
                <button
                  key={slide.id}
                  onClick={() => scrollTo(slide.id)}
                  className={`rounded-lg px-4 py-2 text-left text-sm font-medium transition-colors ${active === slide.id ? "bg-brand-50 text-brand" : "text-muted hover:text-ink"}`}
                >
                  {slide.label}
                </button>
              ))}
              <a href="https://vinvaro.com/demo" className="mt-2 block rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-semibold text-white">
                {t("Plan een demo", "Book a demo")}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
