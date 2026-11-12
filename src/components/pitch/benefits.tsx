"use client";

import { motion } from "./animation";
import { useT, type T } from "./lang";
import { Slide } from "./slide";
import { Card, Check, Chip, Heading, Label, Logo, Stage, ease, make, useOnScreen } from "./ui";

function ArtOneSystem({ t, on }: { t: T; on: boolean }) {
  const bars = [
    { l: t("Losse systemen", "Scattered tools"), w: 100, c: "bg-line-strong", v: "6" },
    { l: "VINVARO", w: 17, c: "bg-brand", v: "1" },
  ];
  return (
    <div className="w-full space-y-3">
      <Label>{t("Systemen per auto", "Systems per car")}</Label>
      {bars.map((b, i) => (
        <div key={b.l}>
          <div className="mb-1 flex justify-between text-[11.5px]">
            <span className="font-medium text-ink-2">{b.l}</span>
            <span className="font-mono text-muted">{b.v}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-white ring-1 ring-line">
            <motion.div initial={{ width: 0 }} animate={on ? { width: `${b.w}%` } : {}} transition={{ duration: 1, delay: 0.5 + i * 0.2, ease }} className={`h-full rounded-full ${b.c}`} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ArtControl({ t, on }: { t: T; on: boolean }) {
  const checks = [t("RDW: APK en tellerstand", "RDW: MOT and odometer"), t("Btw-nummer (VIES)", "VAT number (VIES)"), t("KVK-gegevens", "KVK details"), t("Verplichte workflows", "Required workflows")];
  return (
    <Card className="w-full overflow-hidden">
      {checks.map((c, i) => (
        <motion.div
          key={c}
          initial={{ opacity: 0, x: 8 }}
          animate={on ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5 + i * 0.12, ease }}
          className="flex items-center gap-2 border-b border-line px-3 py-[7px] last:border-0"
        >
          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ok text-white">
            <Check className="h-2.5 w-2.5" />
          </span>
          <span className="text-[12px] text-ink">{c}</span>
        </motion.div>
      ))}
    </Card>
  );
}

function ArtScale({ t, on }: { t: T; on: boolean }) {
  return (
    <div className="w-full">
      <svg viewBox="0 0 200 92" className="w-full overflow-visible">
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1="0" x2="200" y1={10 + i * 24} y2={10 + i * 24} stroke="#e2e8f0" />
        ))}
        <motion.path
          d="M0 80 C40 74 70 58 100 46 S160 18 200 8"
          fill="none"
          stroke="#2563eb"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={{ duration: 1.4, delay: 0.5, ease }}
        />
        <motion.path
          d="M0 82 L200 82"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={on ? { pathLength: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.7 }}
        />
      </svg>
      <div className="mt-2 flex gap-4 text-[11.5px] whitespace-nowrap">
        <span className="flex items-center gap-1.5 text-ink-2">
          <span className="h-[3px] w-4 rounded-full bg-brand" />
          {t("Gebruikers", "Users")}
        </span>
        <span className="flex items-center gap-1.5 text-muted">
          <span className="h-[3px] w-4 rounded-full bg-subtle" />
          {t("€ 0 per gebruiker", "€0 per user")}
        </span>
      </div>
    </div>
  );
}

function ArtDelivery({ t, on }: { t: T; on: boolean }) {
  const rows = [
    { l: t("Workflows afgerond", "Workflows completed"), v: t("Klaar", "Done") },
    { l: t("Contract getekend", "Contract signed"), v: t("Klaar", "Done") },
    { l: t("Bevindingen", "Findings"), v: t("0 open", "0 open") },
  ];
  return (
    <Card className="w-full p-3">
      <div className="mb-1 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
          <Logo src={make("peugeot")} size={16} contain /> {t("Aflevering", "Delivery")}
        </span>
        <span className="font-mono text-[10.5px] text-subtle">308 SW</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.l} initial={{ opacity: 0 }} animate={on ? { opacity: 1 } : {}} transition={{ delay: 0.5 + i * 0.15 }} className="flex items-center justify-between border-t border-line py-[6px]">
          <span className="text-[11.5px] text-muted">{r.l}</span>
          <Chip tone="green">{r.v}</Chip>
        </motion.div>
      ))}
    </Card>
  );
}

export function BenefitsSlide({ companyName }: { companyName?: string }) {
  const t = useT();
  const [ref, on] = useOnScreen<HTMLDivElement>();

  const benefits = [
    {
      title: t("Eén werkplek in plaats van zes", "One workspace instead of six"),
      desc: t(
        "Voorraad, inbox, agenda, contracten, facturen en advertenties op hetzelfde voertuigdossier. Geen Excel, geen losse telefoons, geen overtypen.",
        "Stock, inbox, calendar, contracts, invoices and listings on the same vehicle dossier. No Excel, no separate phones, no retyping.",
      ),
      art: <ArtOneSystem t={t} on={on} />,
    },
    {
      title: t("Minder fouten, meer controle", "Fewer errors, more control"),
      desc: t(
        "Gegevens komen van de bron: RDW, KVK en VIES. Een fase gaat pas verder als de verplichte stappen af zijn, en het auditlog laat zien wie wat deed.",
        "Data comes from the source: RDW, KVK and VIES. A stage only moves on once the required steps are done, and the audit log shows who did what.",
      ),
      art: <ArtControl t={t} on={on} />,
    },
    {
      title: t("Schaalbaar zonder extra kosten per persoon", "Scale without paying per person"),
      desc: t(
        "Onbeperkt gebruikers en partners. Werkplaats, poetsers en transporteurs werken mee zonder licentie. Een extra vestiging is geen nieuw systeem.",
        "Unlimited users and partners. Workshop, valeters and transporters join without a licence. An extra branch is not a new system.",
      ),
      art: <ArtScale t={t} on={on} />,
    },
    {
      title: t("Blije klanten & een strakke aflevering", "Happy customers & a smooth delivery"),
      desc: t(
        "Snel antwoord op elke vraag, digitaal tekenen via een link en een afleverprotocol met handtekening. De klant ziet dat het klopt.",
        "A fast answer to every question, digital signing via a link and a delivery protocol with signature. The customer sees it's right.",
      ),
      art: <ArtDelivery t={t} on={on} />,
    },
  ];

  return (
    <Slide id="voordelen" variant="white">
      <div ref={ref}>
        <Heading on={on} center>
          {companyName ? (
            <>
              {t("Waarom autobedrijven zoals ", "Why dealerships like ")}
              <span className="text-brand">{companyName}</span>
              {t(" kiezen voor VINVARO", " choose VINVARO")}
            </>
          ) : (
            <>
              {t("Waarom autobedrijven ", "Why dealerships ")}
              <span className="text-brand">{t("kiezen voor VINVARO", "choose VINVARO")}</span>
            </>
          )}
        </Heading>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {benefits.map((b, i) => (
            <motion.div key={b.title} initial={{ opacity: 0, y: 24 }} animate={on ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}>
              <Card className="grid h-full overflow-hidden sm:grid-cols-[1fr_minmax(0,230px)]">
                <div className="flex flex-col justify-center p-6 md:p-7">
                  <h3 className="text-[19px] text-ink">{b.title}</h3>
                  <p className="mt-2.5 text-[14px] leading-[1.6] text-muted">{b.desc}</p>
                </div>
                <Stage className="flex items-center border-t border-line p-5 sm:border-t-0 sm:border-l">
                  <div className="flex h-full w-full items-center">{b.art}</div>
                </Stage>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
