"use client";

import { useEffect } from "react";

const COPY = {
  nl: { title: "Er ging iets mis", body: "Deze pagina kon niet worden geladen. Probeer het opnieuw of mail ons via info@vinvaro.com.", retry: "Opnieuw proberen" },
  en: { title: "Something went wrong", body: "This page could not be loaded. Try again or email us at info@vinvaro.com.", retry: "Try again" },
};

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  const c = typeof document !== "undefined" && document.documentElement.lang === "en" ? COPY.en : COPY.nl;
  return (
    <main className="grid min-h-[60dvh] place-items-center px-6 py-24 text-center">
      <div className="max-w-md">
        <h1 className="text-h2">{c.title}</h1>
        <p className="mt-3 text-[16px] text-muted">{c.body}</p>
        <button type="button" onClick={reset} className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-medium text-white">
          {c.retry}
        </button>
      </div>
    </main>
  );
}
