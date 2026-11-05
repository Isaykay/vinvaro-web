"use client";

import { createContext, useCallback, useContext } from "react";
import { defaultLang, localize, type Lang } from "@/lib/i18n";

const LangContext = createContext<Lang>(defaultLang);

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext value={lang}>{children}</LangContext>;
}

export const useLang = () => useContext(LangContext);

export function useLocalize() {
  const lang = useLang();
  return useCallback((href: string) => localize(lang, href), [lang]);
}
