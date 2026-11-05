import { Button, Container } from "@/components/ui";
import { defineCopy } from "@/lib/i18n";
import { getLang } from "@/lib/i18n-server";
import { Car } from "@/components/product/kit";

const copy = defineCopy({
  nl: { title: "Deze pagina is van de weg geraakt.", body: "De pagina bestaat niet (meer). Ga terug naar de homepage of bekijk het platform.", home: "Naar de homepage", platform: "Bekijk het platform" },
  en: { title: "This page went off the road.", body: "The page doesn't exist (anymore). Go back to the homepage or explore the platform.", home: "Go to the homepage", platform: "Explore the platform" },
});

export default async function NotFound() {
  const t = copy[await getLang()];
  return (
    <section className="bg-grid mask-fade-b pt-28 pb-32 sm:pt-32">
      <Container className="text-center">
        <Car className="mx-auto w-full max-w-[280px] rotate-[-4deg] opacity-90" />
        <p className="mt-6 font-mono text-[13px] tracking-[0.12em] text-brand">404</p>
        <h1 className="text-h1 mx-auto mt-4 max-w-[720px] text-balance">{t.title}</h1>
        <p className="text-lead mx-auto mt-5 max-w-[560px] text-muted">{t.body}</p>
        <div className="mt-9 flex justify-center gap-2">
          <Button href="/" size="lg" arrow>
            {t.home}
          </Button>
          <Button href="/platform" size="lg" variant="secondary">
            {t.platform}
          </Button>
        </div>
      </Container>
    </section>
  );
}
