"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { Mark } from "@/components/brand-mark";
import { Car } from "@/components/product/kit";
import { motion } from "./animation";
import { useT } from "./lang";

export function ContactSlide({ companyName, firstName }: { companyName?: string; firstName?: string }) {
  const t = useT();
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="slide-section bg-obsidian-glow relative overflow-hidden">
      <div className="bg-grid-dark mask-fade-radial pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-white/5"
          animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <Mark className="absolute -right-16 -bottom-24 h-[380px] w-auto text-white/[0.03]" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.05]" viewBox="0 0 800 600">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.circle
              key={i}
              cx={400}
              cy={300}
              r={80 + i * 60}
              fill="none"
              stroke="white"
              strokeWidth="0.5"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={on ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 1 }}
            />
          ))}
        </svg>
      </div>

      <div ref={ref} className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-7xl flex-col items-center justify-center px-6 py-20 md:py-24">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-white/90 uppercase backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {t("30 dagen gratis proberen", "30-day free trial")}
          </span>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: 0.1 }} className="mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm">
            <Mark width={36} />
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={on ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 max-w-3xl text-center text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] text-white"
        >
          {firstName ? (
            <>
              {firstName}
              {t(", zullen we VINVARO inrichten voor", ", shall we set up VINVARO for")}{" "}
              <span className="bg-gradient-to-r from-white via-brand-300 to-white bg-clip-text text-transparent">{companyName || t("jouw autobedrijf", "your dealership")}</span>?
            </>
          ) : (
            <>
              {t("Zie VINVARO werken met", "See VINVARO work with")}{" "}
              <span className="bg-gradient-to-r from-white via-brand-300 to-white bg-clip-text text-transparent">{companyName ? t(`de voorraad van ${companyName}`, `${companyName}'s stock`) : t("jouw voorraad", "your stock")}</span>
            </>
          )}
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="mx-auto mb-10 max-w-xl text-center text-lg text-white/65">
          {t(
            "We importeren je voorraad en relaties, zetten je workflows klaar en koppelen je kanalen. Je team werkt binnen een paar dagen in één werkplek.",
            "We import your stock and contacts, set up your workflows and connect your channels. Your team works in one workspace within a few days.",
          )}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-col items-center gap-3 sm:flex-row">
          <motion.a
            href="https://vinvaro.com/demo"
            animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0.2)", "0 0 0 12px rgba(255,255,255,0)", "0 0 0 0 rgba(255,255,255,0)"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-xl transition-all hover:shadow-2xl"
          >
            {t("Plan de overstap", "Plan the switch")}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
          <a
            href="https://vinvaro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
          >
            vinvaro.com
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <path d="M4 10L10 4m0 0H5m5 0v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 1 }} className="mt-12 flex flex-col items-center gap-3">
          <div className="flex items-center gap-4 text-white/50">
            {[t("Hulp bij de overstap", "Help with switching"), t("Onbeperkt gebruikers", "Unlimited users"), t("Live binnen een paar dagen", "Live within a few days")].map((x, i) => (
              <span key={x} className={`items-center gap-1.5 text-sm font-medium ${i === 2 ? "hidden sm:flex" : "flex"}`}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1" y="1" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {x}
              </span>
            ))}
          </div>
          <p className="text-xs text-white/30">{t("VINVARO: het besturingssysteem voor autobedrijven", "VINVARO: the operating system for dealerships")}</p>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[110px] overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute bottom-1 w-[220px]" style={{ animation: "pitch-drive 9s cubic-bezier(0.45,0,0.55,1) infinite" }}>
          <Car tone="dark" spin className="w-full" />
        </div>
      </div>
    </section>
  );
}
