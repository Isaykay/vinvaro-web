import clsx from "clsx";
import {
  BadgeCheck,
  BarChart3,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  Camera,
  Car,
  Check,
  ClipboardCheck,
  FileSearch,
  FileSignature,
  FileText,
  Gauge,
  Globe,
  History,
  Inbox,
  KeyRound,
  Layers,
  ListChecks,
  Lock,
  Mail,
  MessageCircle,
  Plug,
  Receipt,
  RefreshCw,
  Rocket,
  ScanLine,
  ScrollText,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tags,
  Timer,
  Upload,
  Users,
  Wallet,
  WifiOff,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Mark } from "@/components/brand-mark";

/** The VINVARO networks (Handelsplein, Marktplaats) carry the V mark instead of a generic icon. */
const network = /^(vinvaro )?(handelsplein|marktplaats|trade network|marketplace)$/i;

const rules: [RegExp, LucideIcon][] = [
  [/offline|bereik|signal|verbinding|connection/i, WifiOff],
  [/camera|foto|photo/i, Camera],
  [/\bai\b|intelligence|leest|lezen|\bread\b|document/i, ScanLine],
  [/bevinding|afwijking|finding|deviation|bewijs|evidence/i, FileSearch],
  [/label|score|lead/i, Tags],
  [/antwoord|reply|replies|concept|draft/i, Sparkles],
  [/whatsapp|chat|gesprek|conversation/i, MessageCircle],
  [/inbox|kanalen|channel/i, Inbox],
  [/gmail|outlook|mail/i, Mail],
  [/agenda|calendar|afspraak|appointment|proefrit|test drive|bezet|busy/i, CalendarDays],
  [/contract|onderteken|sign|handtekening|signature/i, FileSignature],
  [/factu|invoice|credit|btw|vat|marge|margin/i, Receipt],
  [/financ|betal|payment|kosten|cost/i, Wallet],
  [/export|boekhoud|bookkeep|accounting/i, BarChart3],
  [/publi|marktpla|marketplace|mobile\.de|autoscout|online/i, Rocket],
  [/website|feed|globe|internation/i, Globe],
  [/prijs|price|sync|gelijk|bijgewerkt|updated/i, RefreshCw],
  [/kenteken|registration|rdw|voertuig|vehicle|\bauto('s)?\b|\bcars?\b|voorraad|stock|inventory/i, Car],
  [/zoek|search/i, Search],
  [/import|upload|sleep|drop/i, Upload],
  [/template|versie|version|checklist/i, ListChecks],
  [/workflow|fase|stage|pipeline/i, Workflow],
  [/intake|inspectie|inspection|aflever|delivery|handover|protocol/i, ClipboardCheck],
  [/taak|taken|task|toewijz|assign|opvolg|follow/i, BadgeCheck],
  [/partner|link/i, Plug],
  [/melding|notification|push/i, Bell],
  [/rol|rechten|permission|role|team|vestiging|site/i, Users],
  [/kvk|bedrijf|company|chamber/i, Building2],
  [/audit|log|herleid|traceab|historie|history/i, ScrollText],
  [/sleutel|key/i, KeyRound],
  [/versleutel|encrypt|data|privacy|jouw|yours|organisatie|organisation/i, Lock],
  [/controle|check|verified|gecontroleerd|beveilig|secure|secur/i, ShieldCheck],
  [/app|ios|android|mobiel|mobile|telefoon|phone/i, Smartphone],
  [/snel|sneller|tijd|time|sooner|minuten|minutes/i, Timer],
  [/standaard|standard|werkwijze|one way/i, Layers],
  [/overzicht|overview|inzicht|insight/i, Gauge],
  [/beslis|decide|agent/i, Bot],
  [/geschiedenis|histor/i, History],
  [/tekst|text|pdf|file/i, FileText],
];

const ruleIndex = (text: string) => rules.findIndex(([re]) => re.test(text));
const icons: LucideIcon[] = [...rules.map(([, icon]) => icon), Sparkles];

export function iconFor(text: string): LucideIcon {
  const i = ruleIndex(text);
  return icons[i === -1 ? icons.length - 1 : i];
}

export function IconTile({
  icon,
  text,
  hint,
  size = "md",
  tone = "brand",
}: {
  icon?: LucideIcon;
  text?: string;
  hint?: string;
  size?: "sm" | "md" | "lg";
  tone?: "brand" | "ok" | "ai" | "neutral" | "dark";
}) {
  const primary = ruleIndex(text ?? "");
  const index = primary === -1 ? ruleIndex(hint ?? "") : primary;
  const Icon = icon ?? icons[index === -1 ? icons.length - 1 : index];
  return (
    <span
      className={clsx(
        "flex shrink-0 items-center justify-center ring-1",
        size === "sm" && "size-7 rounded-lg",
        size === "md" && "size-9 rounded-[10px]",
        size === "lg" && "size-11 rounded-xl",
        tone === "brand" && "bg-brand-50 text-brand ring-brand-100",
        tone === "ok" && "bg-ok-50 text-ok ring-ok/15",
        tone === "ai" && "bg-ask-50 text-ask ring-ask/15",
        tone === "neutral" && "bg-sunken text-ink-2 ring-line",
        tone === "dark" && "bg-white/[0.06] text-brand-300 ring-white/10",
      )}
    >
      {!icon && network.test(text?.trim() ?? "") ? (
        <Mark className={clsx("h-auto", size === "sm" ? "w-[17px]" : size === "md" ? "w-[21px]" : "w-6")} />
      ) : (
        <Icon className={clsx(size === "sm" ? "size-3.5" : size === "md" ? "size-[18px]" : "size-5")} strokeWidth={1.9} />
      )}
    </span>
  );
}

export function CheckItem({ children, tone = "brand", className }: { children: React.ReactNode; tone?: "brand" | "ok" | "dark"; className?: string }) {
  return (
    <li className={clsx("flex items-start gap-3 text-[14.5px] leading-[1.5]", className)}>
      <span
        className={clsx(
          "mt-[2px] flex size-[18px] shrink-0 items-center justify-center rounded-full",
          tone === "brand" && "bg-brand-50 text-brand",
          tone === "ok" && "bg-ok-50 text-ok",
          tone === "dark" && "bg-brand/20 text-brand-300",
        )}
      >
        <Check className="size-[11px]" strokeWidth={3} />
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}
