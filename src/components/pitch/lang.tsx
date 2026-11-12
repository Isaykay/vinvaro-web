"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { LangProvider, useLang } from "@/components/lang-provider";
import type { Lang } from "@/lib/i18n";

const SetLangContext = createContext<(lang: Lang) => void>(() => {});

/** Client-side language switch for the pitch; the product illustrations read it through the site's LangProvider. */
export function PitchLangProvider({ children, initial = "nl" }: { children: ReactNode; initial?: Lang }) {
  const [lang, setLang] = useState<Lang>(initial);
  return (
    <SetLangContext value={setLang}>
      <LangProvider lang={lang}>{children}</LangProvider>
    </SetLangContext>
  );
}

export const useSetLang = () => useContext(SetLangContext);

/** Inline translation: `t("Welkom", "Welcome")`. */
export function useT() {
  const lang = useLang();
  return useCallback((nl: string, en: string) => (lang === "en" ? en : nl), [lang]);
}

export type T = ReturnType<typeof useT>;
