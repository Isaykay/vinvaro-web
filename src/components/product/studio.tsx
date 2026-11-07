"use client";

import clsx from "clsx";
import { Ban, Brush, Building2, Columns2, Crop, Layers, Redo2, SlidersHorizontal, Sparkles, Undo2, Wand2 } from "lucide-react";
import { useLang } from "@/components/lang-provider";
import { defineCopy } from "@/lib/i18n";
import { Car, delay } from "@/components/product/kit";

const copy = defineCopy({
  nl: {
    compare: "Vergelijk",
    cancel: "Annuleren",
    saveCopy: "Opslaan als kopie",
    save: "Opslaan",
    tabs: ["AI", "Wegpoetsen", "Aanpassen", "Bijsnijden"],
    before: "Origineel",
    after: "Studio",
    tools: [
      ["Achtergrond weg", "Knipt de auto vrij, op wit, grijs of transparant."],
      ["Studio-achtergrond", "Een lichte fotostudio met zachte schaduw."],
      ["Auto-retouche", "Belichting, kleur en kleine plekjes in één keer."],
      ["Kenteken afdekken", "Blanco plaat, je logo of een eigen afbeelding."],
    ],
    plate: ["Blanco", "Logo", "Eigen afbeelding"],
    prompt: "Beschrijf een bewerking",
    promptValue: "Haal de pion naast de auto weg",
    apply: "Toepassen",
    applied: "Studio-achtergrond toegepast",
    original: "Het origineel blijft bewaard onder Overige foto's.",
  },
  en: {
    compare: "Compare",
    cancel: "Cancel",
    saveCopy: "Save as copy",
    save: "Save",
    tabs: ["AI", "Spot clean", "Adjust", "Crop"],
    before: "Original",
    after: "Studio",
    tools: [
      ["Remove background", "Cuts out the car, on white, grey or transparent."],
      ["Studio background", "A light photo studio with a soft shadow."],
      ["Auto retouch", "Lighting, colour and small blemishes in one go."],
      ["Cover licence plate", "A blank plate, your logo or your own image."],
    ],
    plate: ["Blank", "Logo", "Own image"],
    prompt: "Describe an edit",
    promptValue: "Remove the cone next to the car",
    apply: "Apply",
    applied: "Studio background applied",
    original: "The original is kept under Other photos.",
  },
});

const toolIcons = [Layers, Building2, Wand2, Ban];
const tabIcons = [Sparkles, Brush, SlidersHorizontal, Crop];

/** The vehicle photo editor: a lot photo wiped into a studio shot, with the AI tool panel. */
export function PhotoStudio() {
  const t = copy[useLang()];
  return (
    <div className="overflow-hidden rounded-2xl bg-obsidian text-white shadow-float ring-1 ring-white/10">
      <div className="flex items-center justify-end gap-2 border-b border-white/10 px-4 py-2.5 text-[11px]">
        <span className="flex items-center gap-1 rounded-lg bg-white/[0.05] px-2 py-1.5 text-white/55 ring-1 ring-white/10">
          <Undo2 className="size-3" />
          <Redo2 className="size-3" />
          <span className="ml-1 flex items-center gap-1">
            <Columns2 className="size-3" /> {t.compare}
          </span>
        </span>
        <span className="hidden px-2 text-white/70 sm:inline">{t.cancel}</span>
        <span className="hidden rounded-lg px-2.5 py-1.5 text-white/70 ring-1 ring-white/15 sm:inline">{t.saveCopy}</span>
        <span className="rounded-lg bg-brand px-3 py-1.5 font-semibold">{t.save}</span>
      </div>

      <div className="grid md:grid-cols-[1fr_250px]">
        <div className="relative p-4">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
            {/* Original: the car on the lot */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#3b4252] via-[#2b3240] to-[#1d222b]">
              <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#4b5260] to-[#3a404c]" />
              <div className="absolute bottom-[34%] left-[6%] h-[18%] w-[22%] rounded-t-lg bg-[#525a68] opacity-70" />
              <div className="absolute right-[5%] bottom-[34%] h-[24%] w-[18%] rounded-t-lg bg-[#5b6372] opacity-60" />
              <div className="absolute bottom-[14%] left-[10%] h-0 w-0 border-x-[9px] border-b-[22px] border-x-transparent border-b-orange-400/90" />
              <Car tone="dark" body="#4d5b3f" className="absolute bottom-[8%] left-1/2 w-[78%] -translate-x-1/2" />
            </div>
            {/* Result: the same car in a studio */}
            <div className="absolute inset-0" style={{ animation: "studio-wipe 7s ease-in-out infinite" }}>
              <div className="absolute inset-0 bg-gradient-to-b from-[#e7eaee] via-[#d9dde3] to-[#c3c8cf]">
                <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-[#d1d5db] to-[#eef0f3]" />
                <div className="absolute bottom-[7%] left-1/2 h-[7%] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-md" />
                <Car body="#55643f" className="absolute bottom-[8%] left-1/2 w-[78%] -translate-x-1/2" />
              </div>
            </div>
            <span className="absolute inset-y-0 w-px bg-white/90 shadow-[0_0_0_1px_rgb(0_0_0/0.15)]" style={{ animation: "studio-line 7s ease-in-out infinite" }}>
              <span className="absolute top-1/2 left-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[9px] font-bold text-obsidian shadow">⇆</span>
            </span>
            <span className="absolute top-2.5 left-2.5 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium backdrop-blur">{t.before}</span>
            <span className="absolute top-2.5 right-2.5 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-medium text-obsidian backdrop-blur">{t.after}</span>
          </div>
          <p className="mt-3 inline-flex animate-toast-in items-center gap-1.5 rounded-lg bg-ok/15 px-2.5 py-1.5 text-[10.5px] font-medium text-[#86efac]" style={delay(1.2)}>
            <Sparkles className="size-3" /> {t.applied}
          </p>
        </div>

        <div className="border-t border-white/10 p-3 md:border-t-0 md:border-l">
          <div className="grid grid-cols-4 gap-1">
            {t.tabs.map((tab, i) => {
              const Icon = tabIcons[i];
              return (
                <span key={tab} className={clsx("flex flex-col items-center gap-1 rounded-lg py-1.5 text-[9.5px]", i === 0 ? "bg-white/10 text-white" : "text-white/50")}>
                  <Icon className="size-3.5" /> {tab}
                </span>
              );
            })}
          </div>
          <div className="mt-3 space-y-1.5">
            {t.tools.map(([title, body], i) => {
              const Icon = toolIcons[i];
              return (
                <div key={title} className={clsx("flex gap-2.5 rounded-lg p-2.5 ring-1", i === 1 ? "bg-brand/15 ring-brand/50" : "bg-white/[0.04] ring-white/10")}>
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-white/10">
                    <Icon className="size-3" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold">{title}</span>
                    <span className="block text-[9.5px] leading-snug text-white/55">{body}</span>
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 grid grid-cols-3 gap-1 rounded-lg bg-white/[0.04] p-1 ring-1 ring-white/10">
            {t.plate.map((p, i) => (
              <span key={p} className={clsx("rounded-md py-1 text-center text-[9.5px]", i === 0 ? "bg-white/15 font-medium" : "text-white/55")}>
                {p}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[10px] text-white/60">{t.prompt}</p>
          <div className="mt-1 rounded-lg bg-white/[0.04] px-2.5 py-2 text-[10px] text-white/75 ring-1 ring-white/10">{t.promptValue}</div>
          <span className="mt-2 block rounded-lg bg-white/15 py-1.5 text-center text-[10.5px] font-semibold">{t.apply}</span>
          <p className="mt-2 text-[9px] leading-snug text-white/40">{t.original}</p>
        </div>
      </div>
      <style>{`@keyframes studio-wipe{0%,12%{clip-path:inset(0 0 0 78%)}45%,62%{clip-path:inset(0 0 0 22%)}92%,100%{clip-path:inset(0 0 0 78%)}}@keyframes studio-line{0%,12%{left:78%}45%,62%{left:22%}92%,100%{left:78%}}`}</style>
    </div>
  );
}
