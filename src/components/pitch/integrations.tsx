"use client";

import type { ReactNode } from "react";
import { Globe } from "lucide-react";
import { Mark } from "@/components/brand-mark";
import { useLang } from "@/components/lang-provider";
import { IntegrationLogo } from "@/components/product/kit";
import { getContent } from "@/lib/content";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Card, Check, Chip, Heading, Label, Lead, Logo, ease, logo, useOnScreen } from "./ui";

type Column = { name: string; icon: ReactNode; status: "live" | "beta"; key: "mobilede" | "as24" | "autotrack" | "site" | "market" };

export function IntegrationsSlide() {
  const t = useT();
  const { integrations } = getContent(useLang());
  const [ref, on] = useOnScreen<HTMLDivElement>();

  const columns: Column[] = [
    { name: "mobile.de", icon: <Logo src={logo("mobilede")} size={30} />, status: "live", key: "mobilede" },
    { name: "AutoScout24", icon: <Logo src={logo("autoscout24")} size={30} />, status: "beta", key: "as24" },
    { name: "AutoTrack", icon: <Logo src={logo("autotrack")} size={30} />, status: "beta", key: "autotrack" },
    {
      name: t("Je website", "Your website"),
      icon: (
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-brand-50 text-brand ring-1 ring-brand-100">
          <Globe className="h-4 w-4" strokeWidth={1.8} />
        </span>
      ),
      status: "live",
      key: "site",
    },
    {
      name: t("VINVARO Marktplaats", "VINVARO Marketplace"),
      icon: (
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-ink text-white">
          <Mark width={18} />
        </span>
      ),
      status: "live",
      key: "market",
    },
  ];

  const all = columns.map((c) => c.key);
  const rows: { name: string; on: Column["key"][] }[] = [
    { name: t("Publiceren vanuit het dossier", "Publish from the dossier"), on: all },
    { name: t("Prijs en status automatisch bijgewerkt", "Price and status updated automatically"), on: all },
    { name: t("Verkocht = overal offline", "Sold = offline everywhere"), on: all },
    { name: t("Per auto aan of uit, ook in bulk", "On or off per car, in bulk too"), on: all },
    { name: t("Alleen openbare gegevens", "Public data only"), on: all },
    { name: t("Aanvragen worden een deal", "Inquiries become a deal"), on: ["site", "market"] },
    { name: t("Reviews bij je auto's", "Reviews with your cars"), on: ["site", "market"] },
    { name: t("Gratis, zonder kosten per lead", "Free, no cost per lead"), on: ["market"] },
  ];

  const connected = integrations.filter((i) => i.status === "live" && i.category !== integrations[0].category && i.slug !== "site");
  const planned = integrations.filter((i) => i.status === "planned");

  return (
    <Slide id="koppelingen" variant="subtle">
      <div ref={ref}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <Heading on={on}>
            {t("Naadloze ", "Seamless ")}
            <span className="text-brand">{t("integraties", "integrations")}</span>
          </Heading>
          <Lead on={on} className="max-w-sm lg:mt-0 lg:pb-1.5 lg:text-right">
            {t(
              "Online op mobile.de, AutoScout24 en je eigen website, met RDW, KVK, VIES, je mailbox en je agenda eronder.",
              "Online on mobile.de, AutoScout24 and your own website, with RDW, KVK, VIES, your mailbox and calendar underneath.",
            )}
          </Lead>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2, ease }} className="mt-10">
          <Card className="overflow-hidden shadow-float">
            <table className="w-full table-fixed text-left">
              <thead>
                <tr className="border-b border-line bg-canvas">
                  <th className="w-[30%] px-5 py-4 align-bottom">
                    <Label>{t("Publiceren", "Publishing")}</Label>
                  </th>
                  {columns.map((c) => (
                    <th key={c.key} className="px-2 py-4 text-center font-normal">
                      <div className="flex flex-col items-center gap-2">
                        {c.icon}
                        <span className="text-[13px] font-semibold tracking-[-0.01em] text-ink">{c.name}</span>
                        <Chip tone={c.status === "live" ? "green" : "brand"}>{c.status === "live" ? "Live" : t("Bèta", "Beta")}</Chip>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <motion.tr key={r.name} initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 0.35 + i * 0.03 }} className="border-b border-line last:border-0">
                    <td className="px-5 py-2.5 text-[14px] text-ink">{r.name}</td>
                    {columns.map((c) => (
                      <td key={c.key} className="py-2.5 text-center">
                        {r.on.includes(c.key) ? (
                          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ok-50 text-ok ring-1 ring-ok/20">
                            <Check className="h-3 w-3" />
                          </span>
                        ) : (
                          <span className="text-[14px] text-line-strong">—</span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.5, ease }} className="mt-4 flex flex-wrap items-center gap-2.5">
          <Label className="mr-1">{t("Ook gekoppeld", "Also connected")}</Label>
          {connected.map((i) => (
            <span key={i.name} className="flex items-center gap-2 rounded-full bg-white py-1 pr-3 pl-1 shadow-card">
              <IntegrationLogo slug={i.slug} channel={i.channel} className="size-6 rounded-full border-0" size={14} />
              <span className="text-[12.5px] font-medium text-ink-2">{i.name}</span>
            </span>
          ))}
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.6, ease }} className="mt-3 flex flex-wrap items-center gap-2.5">
          <Label className="mr-1">{t("Op de roadmap", "On the roadmap")}</Label>
          {planned.map((i) => (
            <span key={i.name} className="flex items-center gap-2 rounded-full bg-white py-1 pr-1.5 pl-1 shadow-card">
              <IntegrationLogo slug={i.slug} channel={i.channel} className="size-6 rounded-full border-0 opacity-80 grayscale-[40%]" size={14} />
              <span className="text-[12.5px] font-medium text-ink-2">{i.name}</span>
              <Chip tone="neutral" dot={false}>
                {t("Gepland", "Planned")}
              </Chip>
            </span>
          ))}
        </motion.div>
      </div>
    </Slide>
  );
}
