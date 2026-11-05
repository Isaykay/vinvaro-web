import { defaultLang, hasLang } from "@/lib/i18n";
import { deliverLead, text, validEmail } from "@/lib/leads";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const name = text(body?.name);
  const email = text(body?.email);
  const message = text(body?.message, 5000);
  if (!name || !message || !validEmail(email)) return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  const company = text(body?.company);
  const subject = text(body?.subject, 100);
  const lang = typeof body?.lang === "string" && hasLang(body.lang) ? body.lang : defaultLang;

  const ok = await deliverLead({
    type: "contact",
    subject: `Contact: ${subject || "bericht"} · ${company || name}`,
    replyTo: email,
    lines: (
      [
        ["Naam", name],
        ["E-mail", email],
        ["Bedrijf", company],
        ["Onderwerp", subject],
        ["Bericht", message],
        ["Taal", lang.toUpperCase()],
        ["Pagina", text(body?.page, 300)],
      ] as [string, string][]
    ).filter(([, v]) => v),
    payload: { name, email, company, subject, message, lang, submittedAt: new Date().toISOString() },
  });
  return ok ? Response.json({ ok: true }) : Response.json({ ok: false }, { status: 502 });
}
