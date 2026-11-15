/** Marketing analytics: GA4 + dataLayer (GTM) + optional Meta / LinkedIn / Google Ads pixels. */

/** sessionStorage key set after a successful demo booking; thank-you page uses it for lead firing. */
export const DEMO_SLOT_KEY = "vv_demo_slot";

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "GTM-NWSKQ88T";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-ETETEE4QB8";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";
export const GOOGLE_ADS_DEMO_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_DEMO_LABEL || "";
export const LINKEDIN_PARTNER_ID = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID || "";
export const LINKEDIN_DEMO_CONVERSION_ID = process.env.NEXT_PUBLIC_LINKEDIN_DEMO_CONVERSION_ID || "";

export type AnalyticsValue = string | number | boolean | null | undefined;
export type AnalyticsParams = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    lintrk?: ((...args: unknown[]) => void) & { q?: unknown[] };
  }
}

const PII = /^(email|e-?mail|phone|tel|name|first_?name|last_?name|full_?name|address|company_email)$/i;

/** Drop empty values and anything that looks like PII before sending to ad/analytics vendors. */
export function sanitizeParams(params?: AnalyticsParams): Record<string, string | number | boolean> {
  if (!params) return {};
  const out: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value == null || value === "") continue;
    if (PII.test(key)) continue;
    out[key] = value;
  }
  return out;
}

function pushDataLayer(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

/** Push a named event to GTM dataLayer and GA4 via gtag. */
export function track(event: string, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  const clean = sanitizeParams(params);
  pushDataLayer({ event, ...clean });
  window.gtag?.("event", event, clean);
}

export function trackPageView(path: string, title?: string) {
  if (typeof window === "undefined") return;
  const page_path = path;
  const page_title = title || document.title;
  const page_location = window.location.href;
  pushDataLayer({ event: "page_view", page_path, page_title, page_location });
  window.gtag?.("event", "page_view", { page_path, page_title, page_location });
  window.gtag?.("config", GA_MEASUREMENT_ID, { page_path, page_title });
}

function once(key: string) {
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, "1");
    return true;
  } catch {
    return true;
  }
}

type LeadKind = "demo" | "contact";

/** Fire a lead / conversion across GA4, Google Ads, Meta and LinkedIn (and GTM). */
export function trackLead(kind: LeadKind, params?: AnalyticsParams) {
  if (typeof window === "undefined") return;
  if (!once(`vv_lead_${kind}`)) return;

  const clean = sanitizeParams({
    lead_type: kind,
    currency: "EUR",
    value: 0,
    ...params,
  });

  // GTM-friendly custom event + GA4 recommended event
  pushDataLayer({ event: "generate_lead", ...clean });
  pushDataLayer({ event: kind === "demo" ? "schedule_demo" : "contact_submit", ...clean });
  window.gtag?.("event", "generate_lead", clean);
  if (kind === "demo") window.gtag?.("event", "schedule_demo", clean);

  if (GOOGLE_ADS_ID && GOOGLE_ADS_DEMO_LABEL && kind === "demo") {
    window.gtag?.("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_DEMO_LABEL}`,
      ...clean,
    });
  }

  try {
    window.fbq?.("track", "Lead", {
      content_name: kind === "demo" ? "schedule_demo" : "contact",
      content_category: kind,
      ...clean,
    });
  } catch {}

  if (LINKEDIN_DEMO_CONVERSION_ID && kind === "demo") {
    try {
      window.lintrk?.("track", { conversion_id: Number(LINKEDIN_DEMO_CONVERSION_ID) || LINKEDIN_DEMO_CONVERSION_ID });
    } catch {}
  }
}

export function classifyLink(href: string, host = typeof window !== "undefined" ? window.location.host : "vinvaro.com") {
  if (href.startsWith("mailto:")) return { type: "mailto" as const, label: "email" };
  if (href.startsWith("tel:")) return { type: "tel" as const, label: "phone" };
  try {
    const url = new URL(href, `https://${host}`);
    const path = url.pathname.replace(/^\/(nl|en)(?=\/|$)/, "") || "/";
    if (url.host !== host && !url.host.endsWith(".vinvaro.com") && url.protocol.startsWith("http")) {
      if (/apps\.apple\.com/.test(url.host)) return { type: "outbound" as const, label: "app_store", path };
      if (/play\.google\.com/.test(url.host)) return { type: "outbound" as const, label: "google_play", path };
      if (/linkedin\.com/.test(url.host)) return { type: "outbound" as const, label: "linkedin", path };
      if (/app\.vinvaro\.com/.test(url.host)) {
        if (path.includes("signup")) return { type: "cta" as const, label: "signup", path };
        return { type: "cta" as const, label: "login", path };
      }
      return { type: "outbound" as const, label: url.host, path };
    }
    if (path.startsWith("/demo")) return { type: "cta" as const, label: "demo", path };
    if (path.startsWith("/contact")) return { type: "cta" as const, label: "contact", path };
    if (path.startsWith("/prijzen") || path.startsWith("/pricing")) return { type: "cta" as const, label: "pricing", path };
    if (path.startsWith("/bedankt")) return { type: "nav" as const, label: "thanks", path };
    return { type: "nav" as const, label: path, path };
  } catch {
    return { type: "nav" as const, label: href, path: href };
  }
}
