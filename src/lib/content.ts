import * as nl from "@/content/nl";
import * as en from "@/content/en";
import type { Lang } from "@/lib/i18n";

type Shared = "site" | "nav" | "platform" | "segments" | "integrations" | "integrationCategories" | "securityControls" | "faq" | "pricing";
export type Content = { [K in Shared]: K extends "integrationCategories" ? readonly string[] : (typeof nl)[K] };

const contents: Record<Lang, Content> = { nl, en };

export const getContent = (lang: Lang) => contents[lang];

export type * from "@/content/nl";
