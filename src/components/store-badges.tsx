import clsx from "clsx";
import type { Lang } from "@/lib/i18n";

export const APP_STORE_URL = "https://apps.apple.com/nl/app/vinvaro/id6831670117";
export const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.vinvaro.app";

const alt = {
  nl: { appStore: "Download in de App Store", googlePlay: "Ontdek het op Google Play" },
  en: { appStore: "Download on the App Store", googlePlay: "Get it on Google Play" },
};

/** Official App Store and Google Play badges, rendered at the same height. */
export function StoreBadges({ lang, size = "md", className }: { lang: Lang; size?: "sm" | "md"; className?: string }) {
  const h = size === "sm" ? 34 : 40;
  const badges = [
    { href: APP_STORE_URL, src: `/badges/app-store-${lang}.svg`, alt: alt[lang].appStore, ratio: 119.66407 / 40 },
    { href: GOOGLE_PLAY_URL, src: `/badges/google-play-${lang}.png`, alt: alt[lang].googlePlay, ratio: lang === "nl" ? 646 / 192 : 564 / 168 },
  ];
  return (
    <div className={clsx("flex flex-wrap items-center gap-2.5", className)}>
      {badges.map((b) => (
        <a key={b.href} href={b.href} aria-label={b.alt} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-[7px] transition-opacity hover:opacity-85">
          <img src={b.src} alt={b.alt} width={Math.round(h * b.ratio)} height={h} decoding="async" style={{ height: h, width: "auto" }} />
        </a>
      ))}
    </div>
  );
}
