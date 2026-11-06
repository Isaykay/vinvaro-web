"use client";

import type { ModuleVisualKey } from "@/lib/content";
import { moduleScreens } from "@/components/product/mobile";

/** Two app screens for a platform module, fanned over a soft stage. */
export function AppPhones({ visual }: { visual: ModuleVisualKey }) {
  const [Front, Back] = moduleScreens(visual);
  return (
    <div className="bg-stage relative flex h-[560px] items-end justify-center overflow-hidden rounded-[28px]">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[520px] -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
      <div className="absolute bottom-[-70px] left-1/2 hidden translate-x-[2%] rotate-[7deg] opacity-95 sm:block">
        <Back />
      </div>
      <div className="relative z-10 mb-[-50px] sm:-translate-x-[52%] sm:rotate-[-3deg]">
        <Front />
      </div>
    </div>
  );
}
