import "server-only";

type Lead = { type: "demo" | "contact"; subject: string; replyTo: string; lines: [string, string][]; payload: Record<string, unknown> };

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function sendEmail(lead: Lead) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_TO_EMAIL;
  if (!key || !to) return null;
  const from = process.env.RESEND_FROM ?? "VINVARO <noreply@vinvaro.com>";
  const html = `<table cellpadding="6" style="font-family:Inter,Arial,sans-serif;font-size:14px">${lead.lines
    .map(([k, v]) => `<tr><td style="color:#64748b;vertical-align:top">${escape(k)}</td><td style="white-space:pre-wrap">${escape(v)}</td></tr>`)
    .join("")}</table>`;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: to.split(",").map((s) => s.trim()), reply_to: lead.replyTo, subject: lead.subject, html }),
  });
  return res.ok;
}

async function forward(lead: Lead) {
  const url = lead.type === "demo" ? process.env.DEMO_WEBHOOK_URL : process.env.CONTACT_WEBHOOK_URL;
  if (!url) return null;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: lead.type, ...lead.payload }) });
  return res.ok;
}

/**
 * Delivers a lead by email (Resend) and/or webhook. Without any destination a
 * production lead would be lost, so that counts as a failure there; locally
 * the lead is only logged.
 */
export async function deliverLead(lead: Lead) {
  const [mailed, forwarded] = await Promise.all([sendEmail(lead).catch(() => false), forward(lead).catch(() => false)]);
  if (mailed === null && forwarded === null) {
    if (process.env.NODE_ENV === "production") {
      console.error(`[${lead.type}] lead rejected: set RESEND_API_KEY and LEADS_TO_EMAIL or a webhook URL`);
      return false;
    }
    console.info(`[${lead.type}] lead received without a destination configured`, lead.payload);
    return true;
  }
  return Boolean(mailed || forwarded);
}

const hits = new Map<string, number[]>();

/**
 * Cheap bot filter for the public forms: a hidden "website" field that people
 * never fill in, and at most 5 submissions per IP per 10 minutes (per server
 * instance, which is enough to stop simple floods).
 */
export function spamCheck(request: Request, body: Record<string, unknown> | null): "ok" | "bot" | "limited" {
  if (typeof body?.website === "string" && body.website.trim()) return "bot";
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 5) return "limited";
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return "ok";
}

export const text = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const validEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
