import { defaultLang, hasLang } from "@/lib/i18n";
import { deliverLead, text, validEmail } from "@/lib/leads";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = text(body?.name);
  const company = text(body?.company);
  const email = text(body?.email);
  const phone = text(body?.phone, 50);
  const slot = body?.slot as { date?: unknown; time?: unknown } | undefined;
  const date = text(slot?.date, 10);
  const time = text(slot?.time, 5);
  if (!name || !company || !validEmail(email) || !/^\d{4}-\d{2}-\d{2}$/.test(date) || !/^\d{2}:\d{2}$/.test(time)) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const lang = typeof body?.lang === "string" && hasLang(body.lang) ? body.lang : defaultLang;
  const answers = (body?.answers && typeof body.answers === "object" ? body.answers : {}) as Record<string, unknown>;
  const list = (v: unknown) => (Array.isArray(v) ? v.map((x) => text(x)).filter(Boolean).join(", ") : text(String(v ?? "")));

  const lines: [string, string][] = [
    ["Moment", `${date} ${time} (Europe/Amsterdam)`],
    ["Naam", name],
    ["Bedrijf", company],
    ["E-mail", email],
    ["Telefoon", phone],
    ["Type bedrijf", list(answers.business)],
    ["Team", list(answers.team)],
    ["Voorraad", list(answers.stock)],
    ["Focus", list(answers.focus)],
    ["Huidig", list(answers.current)],
    ["Taal", lang.toUpperCase()],
    ["Pagina", text(body?.page, 300)],
    ["Referrer", text(body?.referrer, 300)],
  ].filter(([, v]) => v) as [string, string][];

  const ok = await deliverLead({
    type: "demo",
    subject: `Demo-aanvraag: ${company} · ${date} ${time}`,
    replyTo: email,
    lines,
    payload: { name, company, email, phone, slot: { date, time, timeZone: "Europe/Amsterdam" }, answers, lang, submittedAt: new Date().toISOString() },
  });
  return ok ? Response.json({ ok: true }) : Response.json({ ok: false }, { status: 502 });
}
