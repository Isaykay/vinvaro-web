"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLang } from "@/components/lang-provider";
import { switchLang, type Lang } from "@/lib/i18n";

export function FlagNL() {
  return (
    <svg viewBox="0 0 20 20" className="size-full" aria-hidden>
      <rect width="20" height="6.67" fill="#AE1C28" />
      <rect y="6.67" width="20" height="6.67" fill="#fff" />
      <rect y="13.33" width="20" height="6.67" fill="#21468B" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 60" className="size-full" aria-hidden>
      <rect width="60" height="60" fill="#012169" />
      <path d="M0 0 60 60M60 0 0 60" stroke="#fff" strokeWidth="12" />
      <path d="M0 0 60 60M60 0 0 60" stroke="#C8102E" strokeWidth="5" />
      <path d="M30 0v60M0 30h60" stroke="#fff" strokeWidth="18" />
      <path d="M30 0v60M0 30h60" stroke="#C8102E" strokeWidth="10" />
    </svg>
  );
}

const options: { lang: Lang; label: string; name: string; Flag: () => React.JSX.Element }[] = [
  { lang: "nl", label: "NL", name: "Nederlands", Flag: FlagNL },
  { lang: "en", label: "EN", name: "English", Flag: FlagGB },
];

export function LangSwitch({ className, dark }: { className?: string; dark?: boolean }) {
  const current = useLang();
  const pathname = usePathname();

  return (
    <div
      role="group"
      aria-label={current === "nl" ? "Taal" : "Language"}
      className={clsx("flex h-9 items-center rounded-full p-0.5 ring-1", dark ? "bg-white/10 ring-white/15" : "bg-sunken ring-line", className)}
    >
      {options.map(({ lang, label, name, Flag }) => {
        const active = lang === current;
        return (
          <NextLink
            key={lang}
            href={switchLang(pathname, lang)}
            hrefLang={lang}
            lang={lang}
            aria-current={active ? "true" : undefined}
            aria-label={name}
            className={clsx(
              "flex h-8 items-center gap-1.5 rounded-full pr-2.5 pl-1.5 text-[12.5px] font-semibold tracking-[-0.01em] transition-colors",
              active
                ? "bg-surface text-ink shadow-[0_1px_2px_rgb(0_0_0/0.08),0_0_0_1px_var(--color-line)]"
                : dark
                  ? "text-white/60 hover:text-white"
                  : "text-subtle hover:text-ink",
            )}
          >
            <span className="size-[18px] overflow-hidden rounded-full ring-1 ring-black/10">
              <Flag />
            </span>
            {label}
          </NextLink>
        );
      })}
    </div>
  );
}
