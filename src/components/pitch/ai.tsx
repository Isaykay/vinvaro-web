"use client";

import type { ReactNode } from "react";
import { Mark } from "@/components/brand-mark";
import { ChannelLogo } from "@/components/channel-logo";
import { Plate } from "@/components/product/kit";
import { motion } from "./animation";
import { useT } from "./lang";
import { Slide } from "./slide";
import { Card, Chip, Heading, Label, Lead, Logo, Sparkles, Stage, ease, make, useOnScreen } from "./ui";

function ContextCard({ label, children, on, delay, side }: { label: string; children: ReactNode; on: boolean; delay: number; side: "l" | "r" }) {
  return (
    <motion.div initial={{ opacity: 0, x: side === "l" ? -16 : 16 }} animate={on ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay, ease }}>
      <Card className="p-3.5">
        <Label className="mb-2">{label}</Label>
        {children}
      </Card>
    </motion.div>
  );
}

/** The V mark in an orbit: the AI layer at the centre of the dossier. */
export function MarkOrbit({ size = 220 }: { size?: number }) {
  return (
    <div className="relative mx-auto flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full border border-dashed border-brand/25" />
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
        <span className="absolute top-[14%] left-[14%] h-2 w-2 rounded-full bg-brand shadow-[0_0_0_4px_rgb(37_99_235/0.15)]" />
        <span className="absolute right-[10%] bottom-[22%] h-1.5 w-1.5 rounded-full bg-ask-400 shadow-[0_0_0_4px_rgb(139_92_246/0.15)]" />
      </motion.div>
      <div className="absolute rounded-full bg-white shadow-card" style={{ inset: size * 0.11 }} />
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="relative flex items-center justify-center rounded-[28%] bg-ink text-white shadow-float"
        style={{ width: size * 0.42, height: size * 0.42 }}
      >
        <div className="absolute inset-0 rounded-[28%] bg-[radial-gradient(60%_60%_at_80%_0%,rgb(37_99_235/0.55),transparent_70%)]" />
        <Mark width={size * 0.24} className="relative" />
        <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-ask text-white ring-2 ring-white">
          <Sparkles className="h-3 w-3" />
        </span>
      </motion.div>
    </div>
  );
}

export function AiSlide() {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();

  const features = [
    {
      title: t("Context uit je voorraad", "Context from your stock"),
      desc: t(
        "Kent je open voorraad met vraagprijs en status. Koppelt een gesprek aan de juiste auto, alleen uit je eigen lijst.",
        "Knows your open stock with asking price and status. Links a conversation to the right car, only from your own list.",
      ),
    },
    {
      title: t("Leest het hele gesprek", "Reads the whole conversation"),
      desc: t(
        "Intentie, labels, urgentie en een leadscore van 0 tot 100, met de redenen erbij en een korte samenvatting.",
        "Intent, labels, urgency and a lead score from 0 to 100, with the reasons and a short summary.",
      ),
    },
    {
      title: t("Stuur met een instructie", "Steer with an instruction"),
      desc: t(
        "Typ 'proefrit voorstellen' of 'vriendelijk afwijzen' en de AI schrijft een nieuw concept, in de taal van de klant.",
        "Type 'suggest a test drive' or 'decline politely' and the AI writes a new draft, in the customer's language.",
      ),
    },
    {
      title: t("Bewijs, geen aannames", "Evidence, not assumptions"),
      desc: t(
        "Verzint nooit prijzen of beschikbaarheid. AI-voorstellen blijven gescheiden van wat je team bevestigt.",
        "Never invents prices or availability. AI suggestions stay separate from what your team confirms.",
      ),
    },
  ];

  return (
    <Slide id="ai" variant="white">
      <div ref={ref}>
        <Heading on={on} center>
          {t("Hoe VINVARO ", "How VINVARO ")}
          <span className="text-brand">{t("meedenkt", "thinks along")}</span>
        </Heading>
        <Lead on={on} center>
          {t(
            "Context uit je voorraad, uit het gesprek en van je vaste partners. De AI stelt voor, je team beslist.",
            "Context from your stock, from the conversation and from your regular partners. The AI suggests, your team decides.",
          )}
        </Lead>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2, ease }} className="mt-10">
          <Card className="overflow-hidden shadow-float">
            <Stage className="px-6 py-8 md:px-10">
              <div className="grid items-center gap-6 md:grid-cols-[1fr_220px_1fr]">
                <div className="space-y-4">
                  <ContextCard label={t("Voorraad", "Stock")} on={on} delay={0.4} side="l">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {["volvo", "volkswagen", "kia", "bmw", "peugeot"].map((m) => (
                          <Logo key={m} src={make(m)} size={20} contain />
                        ))}
                      </div>
                      <span className="ml-auto flex items-center gap-1.5 font-mono text-[11px] text-ok">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ok" />
                        </span>
                        Live
                      </span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-2 gap-x-3">
                      {[
                        [t("Auto's in voorraad", "Cars in stock"), "48"],
                        [t("Met vraagprijs", "With asking price"), "45"],
                        [t("Gereserveerd", "Reserved"), "3"],
                        [t("Relaties", "Contacts"), "1.312"],
                      ].map(([l, v]) => (
                        <div key={l} className="flex items-center justify-between border-t border-line py-1.5">
                          <span className="text-[11.5px] text-muted">{l}</span>
                          <span className="font-mono text-[11.5px] text-ink">{v}</span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-1 font-mono text-[10.5px] text-subtle">{t("Laatste 12 berichten per gesprek", "Last 12 messages per conversation")}</p>
                  </ContextCard>
                  <ContextCard label={t("Context · gesprek & partners", "Context · conversation & partners")} on={on} delay={0.55} side="l">
                    {[
                      {
                        scope: t("Gesprek · WhatsApp", "Conversation · WhatsApp"),
                        text: t("'Is de XC40 nog beschikbaar? Kan ik zaterdag een proefrit maken?'", "'Is the XC40 still available? Could I take a test drive on Saturday?'"),
                        who: ["MJ", "#047857"],
                      },
                      {
                        scope: t("Partner · poetsbedrijf", "Partner · valeting"),
                        text: t("Glans & Co herkend als vaste partner, geen lead", "Glans & Co recognised as a regular partner, not a lead"),
                        who: ["GC", "#2563eb"],
                      },
                    ].map((e, i) => (
                      <div key={e.scope} className={`flex items-start gap-2.5 ${i ? "mt-2 border-t border-line pt-2" : ""}`}>
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full font-mono text-[8.5px] font-semibold text-white" style={{ backgroundColor: e.who[1] }}>
                          {e.who[0]}
                        </span>
                        <div className="min-w-0">
                          <div className="font-mono text-[9.5px] tracking-[0.06em] text-subtle uppercase">{e.scope}</div>
                          <p className="mt-0.5 text-[12.5px] leading-[1.45] text-ink">{e.text}</p>
                        </div>
                      </div>
                    ))}
                  </ContextCard>
                </div>

                <MarkOrbit />

                <div className="space-y-4">
                  <ContextCard label={t("Gesprek gelabeld", "Conversation labelled")} on={on} delay={0.7} side="r">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Chip tone="brand">{t("Proefrit", "Test drive")}</Chip>
                      <Chip tone="green">{t("Nieuwe lead", "New lead")}</Chip>
                      <Chip tone="orange">{t("Urgent", "Urgent")}</Chip>
                      <span className="ml-auto flex items-center gap-1 font-mono text-[12px] font-semibold text-ask">
                        <Sparkles className="h-3 w-3" /> 86
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-[11.5px] text-muted">
                      <Logo src={make("volvo")} size={16} contain /> XC40 Recharge <span className="text-subtle">→</span> <Plate size="xs">P-771-RD</Plate>
                    </p>
                  </ContextCard>
                  <ContextCard label={t("Antwoordvoorstel · WhatsApp", "Reply suggestion · WhatsApp")} on={on} delay={0.85} side="r">
                    <div className="flex items-start gap-2">
                      <ChannelLogo kind="whatsapp" size={16} className="mt-0.5 shrink-0" />
                      <p className="text-[12px] leading-snug text-ink-2">
                        {t(
                          "Hoi Mark, de XC40 Recharge staat nog voor je klaar. Zaterdag om 10:00 of 11:30 kan een proefrit. Welke tijd past jou?",
                          "Hi Mark, the XC40 Recharge is still available. A test drive on Saturday at 10:00 or 11:30 works. Which time suits you?",
                        )}
                      </p>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-[11.5px] text-muted">
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-ask" />
                      {t("Gebruikt: voorraad en gesprek, geen verzonnen prijzen", "Used: stock and conversation, no invented prices")}
                    </p>
                  </ContextCard>
                </div>
              </div>
            </Stage>
            <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0 }}
                  animate={on ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 + i * 0.08 }}
                  className="border-line p-5 not-first:border-t sm:not-first:border-t-0 sm:even:border-l sm:[&:nth-child(n+3)]:border-t lg:not-first:border-l lg:[&:nth-child(n+3)]:border-t-0"
                >
                  <h3 className="text-[15px] text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-muted">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Slide>
  );
}
