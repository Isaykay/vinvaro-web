"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { motion } from "./animation";

export function Slide({
  id,
  children,
  className = "",
  variant = "white",
}: {
  id: string;
  children: ReactNode;
  className?: string;
  variant?: "white" | "subtle";
}) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section id={id} ref={ref} className={`${variant === "white" ? "bg-white" : "pitch-grid bg-canvas"} slide-section relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={on ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:py-24"
      >
        {children}
      </motion.div>
    </section>
  );
}
