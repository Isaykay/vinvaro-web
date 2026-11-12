"use client";

import type { ReactNode } from "react";
import { Mark } from "@/components/brand-mark";
import { ChannelLogo } from "@/components/channel-logo";
import { Plate } from "@/components/product/kit";
import { motion } from "./animation";
import { useT, type T } from "./lang";
import { Slide } from "./slide";
import { Card, Heading, Logo, Sparkles, Stage, ease, logo, useOnScreen } from "./ui";

const Pill = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span className={`flex items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-1.5 text-[11.5px] font-medium whitespace-nowrap text-ink-2 shadow-card ${className}`}>{children}</span>
);

const Img = ({ src }: { src: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={src} alt="" className="h-3.5 w-3.5 shrink-0 rounded-[3px] object-contain" />
);

function Glyph({ d }: { d: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 shrink-0 text-brand">
      {d}
    </svg>
  );
}

function FileBadge({ kind, color }: { kind: string; color: string }) {
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] font-mono text-[7px] font-bold text-white" style={{ backgroundColor: color }}>
      {kind}
    </span>
  );
}

function ArtImport({ t, on }: { t: T; on: boolean }) {
  const sources: [string, ReactNode][] = [
    [t("Voorraad.xlsx", "Stock.xlsx"), <FileBadge key="x" kind="XLS" color="#1d6f42" />],
    [t("Relaties.csv", "Contacts.csv"), <FileBadge key="c" kind="CSV" color="#475569" />],
    ["RDW Open Data", <Logo key="r" src={logo("rdw")} size={20} />],
    ["KVK", <Logo key="k" src={logo("kvk")} size={20} />],
  ];
  return (
    <div className="relative flex w-full items-center gap-3">
      <div className="flex-1 space-y-2">
        {sources.map(([n, icon], i) => (
          <motion.div key={n as string} initial={{ opacity: 0, x: -8 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 + i * 0.1, ease }}>
            <Pill className="h-9 w-full pr-3 pl-2 text-[13px]">
              {icon}
              <span className="flex-1">{n}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-ok" />
            </Pill>
          </motion.div>
        ))}
      </div>
      <svg viewBox="0 0 40 168" className="h-[168px] w-10 shrink-0 text-brand/40" fill="none">
        {[18, 62, 106, 150].map((y) => (
          <path key={y} d={`M0 ${y} C 22 ${y}, 18 84, 40 84`} stroke="currentColor" strokeWidth="1.3" strokeDasharray="3 3" />
        ))}
      </svg>
      <motion.span
        initial={{ scale: 0.8, opacity: 0 }}
        animate={on ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.9, ease }}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-ink text-white shadow-float"
      >
        <Mark width={34} />
      </motion.span>
    </div>
  );
}

function ArtChannels({ t, on }: { t: T; on: boolean }) {
  const groups: { label: string; items: [string, ReactNode][] }[] = [
    {
      label: t("Berichten", "Messages"),
      items: [
        ["WhatsApp", <ChannelLogo key="w" kind="whatsapp" size={14} />],
        ["Gmail", <ChannelLogo key="g" kind="gmail" size={14} />],
        ["Outlook", <ChannelLogo key="o" kind="outlook" size={14} />],
        [t("Eigen mail", "Own mail"), <ChannelLogo key="i" kind="imap" size={14} />],
      ],
    },
    {
      label: t("Agenda", "Calendar"),
      items: [
        ["Google", <Img key="gc" src={logo("gcal")} />],
        ["Outlook", <Img key="oc" src={logo("outlook")} />],
      ],
    },
    {
      label: t("Online", "Online"),
      items: [
        ["mobile.de", <Img key="m" src={logo("mobilede")} />],
        ["AutoScout24", <Img key="a" src={logo("autoscout24")} />],
        ["AutoTrack", <Img key="at" src={logo("autotrack")} />],
        [
          t("Website", "Website"),
          <Glyph
            key="s"
            d={
              <>
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z" />
              </>
            }
          />,
        ],
      ],
    },
    {
      label: t("Netwerk", "Network"),
      items: [
        [
          "Handelsplein",
          <span key="h" className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-ink text-white">
            <Mark width={9} />
          </span>,
        ],
        [
          "Marktplaats",
          <span key="mp" className="flex h-3.5 w-3.5 items-center justify-center rounded-[3px] bg-ink text-white">
            <Mark width={9} />
          </span>,
        ],
      ],
    },
    {
      label: t("Team", "Team"),
      items: [
        [
          t("Web-app", "Web app"),
          <Glyph
            key="wa"
            d={
              <>
                <rect x="3" y="4" width="18" height="13" rx="2" />
                <path d="M8 21h8M12 17v4" />
              </>
            }
          />,
        ],
        [
          "iOS & Android",
          <Glyph
            key="app"
            d={
              <>
                <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
                <path d="M11 18.5h2" />
              </>
            }
          />,
        ],
      ],
    },
  ];
  let n = 0;
  return (
    <div className="w-full space-y-2.5">
      {groups.map((g) => (
        <div key={g.label} className="grid grid-cols-[62px_1fr] items-center gap-2">
          <span className="font-mono text-[9.5px] tracking-[0.08em] text-subtle uppercase">{g.label}</span>
          <div className="flex flex-wrap gap-1.5">
            {g.items.map(([label, icon]) => (
              <motion.span key={label as string} initial={{ opacity: 0, scale: 0.9 }} animate={on ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.35 + n++ * 0.04, ease }}>
                <Pill>
                  {icon}
                  {label}
                </Pill>
              </motion.span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ArtRead({ t, on }: { t: T; on: boolean }) {
  const fields: [string, ReactNode][] = [
    [t("Kenteken", "Plate"), <Plate key="p" size="xs">R-512-FX</Plate>],
    [t("Merk", "Make"), <span key="m">Volkswagen</span>],
    [t("Inkoop", "Purchase"), <span key="i" className="font-mono">€ 18.250</span>],
    [t("Regeling", "Scheme"), <span key="b" className="font-mono">{t("Marge", "Margin")}</span>],
  ];
  return (
    <div className="flex w-full items-center gap-3">
      <motion.div initial={{ opacity: 0, y: 8 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.35, ease }} className="relative w-[104px] shrink-0 rounded-xl bg-white p-3 shadow-float">
        <div className="flex items-center justify-between">
          <FileBadge kind="PDF" color="#b91c1c" />
          <span className="font-mono text-[7px] text-subtle">{t("INKOOP", "PURCHASE")}</span>
        </div>
        <div className="mt-2 space-y-1">
          {[90, 70, 80, 55, 75, 65, 85].map((w, i) => (
            <div key={i} className="h-1 rounded bg-sunken" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-2 flex justify-between border-t border-line pt-1.5">
          <div className="h-1 w-6 rounded bg-sunken" />
          <span className="rounded bg-brand-50 px-0.5 font-mono text-[7px] text-brand ring-1 ring-brand/30">18.250</span>
        </div>
        <motion.span
          className="absolute inset-x-1.5 top-2 h-[2px] rounded-full bg-brand shadow-[0_0_10px_2px_rgba(37,99,235,0.5)]"
          animate={on ? { y: [0, 128, 0], opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2.4, delay: 0.6, repeat: Infinity, repeatDelay: 1.2 }}
        />
      </motion.div>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-[0_4px_14px_-4px_rgba(37,99,235,0.7)]">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      <div className="min-w-0 flex-1 space-y-2">
        {fields.map(([l, v], i) => (
          <motion.div key={l} initial={{ opacity: 0, x: 8 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.7 + i * 0.12, ease }}>
            <Pill className="h-8 w-full justify-between overflow-hidden pr-3 pl-3 text-[12px]">
              <span className="shrink-0 text-[11px] font-normal text-muted">{l}</span>
              <span className="min-w-0 truncate text-ink">{v}</span>
            </Pill>
          </motion.div>
        ))}
        <motion.p initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 1.3 }} className="pl-1 font-mono text-[10px] text-ok">
          ✓ {t("Voorgesteld · jij bevestigt", "Suggested · you confirm")}
        </motion.p>
      </div>
    </div>
  );
}

export function HowSlide() {
  const [ref, on] = useOnScreen<HTMLDivElement>();
  const t = useT();

  const steps = [
    {
      title: t("Importeer je voorraad", "Import your stock"),
      desc: t(
        "Voorraad en relaties uit Excel of csv. VINVARO herkent de kolommen en vult aan met de RDW. Bij de overstap helpen we met de eerste import.",
        "Stock and contacts from Excel or csv. VINVARO recognises the columns and fills in the rest from the RDW. We help with the first import when you switch.",
      ),
      art: <ArtImport t={t} on={on} />,
    },
    {
      title: t("Koppel je kanalen", "Connect your channels"),
      desc: t(
        "WhatsApp, je mailbox en agenda koppel je zelf in een paar minuten. Daarna mobile.de, AutoScout24 en je eigen website.",
        "Connect WhatsApp, your mailbox and calendar yourself in a few minutes. Then mobile.de, AutoScout24 and your own website.",
      ),
      art: <ArtChannels t={t} on={on} />,
    },
    {
      title: t("AI leest mee", "AI reads along"),
      desc: t(
        "Sleep een inkoopfactuur of kentekenbewijs in VINVARO, of scan hem met de app. De gegevens worden voorgesteld, jij controleert en slaat op.",
        "Drop a purchase invoice or registration document into VINVARO, or scan it with the app. The data is suggested, you check and save.",
      ),
      art: <ArtRead t={t} on={on} />,
    },
  ];

  return (
    <Slide id="hoe" variant="subtle">
      <div ref={ref}>
        <Heading on={on} center>
          {t("In 3 stappen ", "Up and running in ")}
          <span className="text-brand">{t("operationeel", "3 steps")}</span>
        </Heading>

        <div className="relative mt-12 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 24 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease }}>
              <Card className="flex h-full flex-col overflow-hidden">
                <Stage className="flex h-[262px] items-center border-b border-line px-6">
                  <div className="flex h-full w-full items-center">
                    <div className="w-full">{s.art}</div>
                  </div>
                </Stage>
                <div className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand font-mono text-[12px] font-medium text-white">{i + 1}</span>
                    <h3 className="text-[18px] text-ink">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.55] text-muted">{s.desc}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
