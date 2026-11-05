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
  const url = lead.type === "demo" ? process.env.DEMO_WEBHOOK_URL : (process.env.CONTACT_WEBHOOK_URL ?? process.env.DEMO_WEBHOOK_URL);
  if (!url) return null;
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type: lead.type, ...lead.payload }) });
  return res.ok;
}

/** Delivers a lead by email (Resend) and/or webhook. Returns false only when a configured destination failed. */
export async function deliverLead(lead: Lead) {
  const [mailed, forwarded] = await Promise.all([sendEmail(lead).catch(() => false), forward(lead).catch(() => false)]);
  if (mailed === null && forwarded === null) {
    console.info(`[${lead.type}] lead received without RESEND_API_KEY/LEADS_TO_EMAIL or a webhook configured`, lead.payload);
    return true;
  }
  return Boolean(mailed || forwarded);
}

export const text = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const validEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v);
