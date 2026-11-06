import { Container, Eyebrow } from "@/components/ui";

export type LegalSection = { title: string; body: (string | string[])[] };

/** Long-form legal text: numbered sections, paragraphs and bullet lists. */
export function LegalPage({ eyebrow, title, updated, intro, sections }: { eyebrow: string; title: string; updated: string; intro: string; sections: LegalSection[] }) {
  return (
    <section className="relative overflow-hidden pt-28 pb-24 sm:pt-36">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60" />
      <Container className="relative max-w-[820px]">
        <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
        <h1 className="text-h1">{title}</h1>
        <p className="mt-3 text-[14px] text-muted">{updated}</p>
        <p className="mt-6 text-[17px] leading-relaxed text-ink/80">{intro}</p>
        <nav aria-label={title} className="mt-10 rounded-[18px] border border-line bg-surface p-5">
          <ol className="grid gap-1.5 text-[14.5px] sm:grid-cols-2">
            {sections.map((s, i) => (
              <li key={s.title}>
                <a href={`#s${i + 1}`} className="text-muted hover:text-ink">
                  {i + 1}. {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mt-12 grid gap-10">
          {sections.map((s, i) => (
            <section key={s.title} id={`s${i + 1}`} className="scroll-mt-28">
              <h2 className="text-h3">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-3 grid gap-3 text-[15.5px] leading-relaxed text-ink/80">
                {s.body.map((part, j) =>
                  Array.isArray(part) ? (
                    <ul key={j} className="grid list-disc gap-1.5 pl-5 marker:text-muted">
                      {part.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={j}>{part}</p>
                  ),
                )}
              </div>
            </section>
          ))}
        </div>
      </Container>
    </section>
  );
}
