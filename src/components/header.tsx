"use client";

import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowRight, ArrowUpRight, Check, ChevronDown, Menu, ScanLine, X } from "lucide-react";
import clsx from "clsx";
import type { Content, NavFeatured, NavLink } from "@/lib/content";
import { defineCopy, parsePath } from "@/lib/i18n";
import { useLang } from "@/components/lang-provider";
import { LangSwitch } from "@/components/lang-switch";
import { Button, Wordmark } from "@/components/ui";
import { IconTile } from "@/components/icons";
import { Car } from "@/components/product/kit";
import { StoreBadges } from "@/components/store-badges";

const copy = defineCopy({
  nl: { home: "VINVARO home", mainNav: "Hoofdmenu", login: "Inloggen", demo: "Plan een demo", openMenu: "Menu openen", closeMenu: "Menu sluiten", appTitle: "VINVARO-app voor iOS en Android", appBody: "Vastleggen op de werkvloer, ook offline" },
  en: { home: "VINVARO home", mainNav: "Main navigation", login: "Log in", demo: "Book a demo", openMenu: "Open menu", closeMenu: "Close menu", appTitle: "VINVARO app for iOS and Android", appBody: "Capture on the shop floor, even offline" },
});

export function Logo({ inverted, onNavigate }: { inverted?: boolean; onNavigate?: () => void }) {
  const t = copy[useLang()];
  const onHome = parsePath(usePathname()).path === "/";
  return (
    <Link
      href="/"
      onClick={(e) => {
        onNavigate?.();
        if (onHome) {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={clsx("flex items-center transition-colors duration-300", inverted ? "text-white" : "text-ink")}
      aria-label={t.home}
    >
      <Wordmark className="h-[17px] w-auto" />
    </Link>
  );
}

type IntelligenceFeatured = Extract<NavFeatured, { kind: "intelligence" }>;

/** Intelligence gets its own dark card: a car under a scan beam, with the findings it produced. */
function IntelligenceCard({ featured }: { featured: IntelligenceFeatured }) {
  return (
    <Link href={featured.href} className="group flex w-[330px] shrink-0 flex-col overflow-hidden rounded-xl bg-obsidian ring-1 ring-ink transition-shadow hover:shadow-float">
      <span className="relative flex h-[140px] items-end justify-center overflow-hidden px-6 pb-3">
        <span className="bg-grid-dark mask-fade-radial pointer-events-none absolute inset-0" />
        <span className="pointer-events-none absolute -top-10 left-1/2 h-32 w-64 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
        <Car tone="dark" className="relative w-[240px] transition-transform duration-500 group-hover:scale-[1.03]" />
        <span className="pointer-events-none absolute inset-y-0 left-0 w-10 animate-scan bg-gradient-to-r from-transparent via-ask-400/40 to-transparent" style={{ "--scan-distance": "300px" } as React.CSSProperties} />
        <span className="absolute top-[62%] left-[38%] flex size-5 items-center justify-center">
          <span className="absolute inset-0 animate-ring rounded-full border-2 border-warn" />
          <span className="size-2 rounded-full bg-warn ring-2 ring-obsidian" />
        </span>
        <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/15 backdrop-blur">
          <ScanLine className="size-3 text-ask-400" />
          {featured.badge}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-ask-400 uppercase">{featured.label}</span>
        <span className="mt-1.5 text-[19px] leading-tight font-semibold tracking-[-0.03em] text-white">{featured.title}</span>
        <span className="mt-2 text-[13px] leading-relaxed text-white/60">{featured.body}</span>
        <span className="mt-4 space-y-1.5 border-t border-white/10 pt-4">
          {featured.findings.map(([label, zone]) => (
            <span key={label} className="flex items-center gap-2 rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[12px] ring-1 ring-white/10">
              <AlertTriangle className="size-3.5 shrink-0 text-warn" />
              <span className="font-medium text-white">{label}</span>
              <span className="ml-auto text-white/45">{zone}</span>
            </span>
          ))}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[13.5px] font-semibold text-brand-300">
          {featured.cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}

function FeaturedCard({ featured }: { featured: NavFeatured }) {
  if (featured.kind === "intelligence") return <IntelligenceCard featured={featured} />;
  if (featured.kind !== "switch") return null;
  return (
    <Link href={featured.href} className="group flex w-[330px] shrink-0 flex-col overflow-hidden rounded-xl bg-canvas ring-1 ring-line">
      <div className="bg-stage p-4">
        <div className="rounded-xl bg-surface p-3 shadow-card">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold">{featured.card}</p>
            <span className="rounded-full bg-brand-50 px-1.5 font-mono text-[9.5px] text-brand">{featured.step}</span>
          </div>
          <ul className="mt-2.5 space-y-1.5 text-[10.5px]">
            <li className="flex items-center gap-2 text-ink-2">
              <span className="flex size-3.5 items-center justify-center rounded-full bg-brand text-white">
                <Check className="size-2.5" strokeWidth={3} />
              </span>
              {featured.steps[0]}
            </li>
            <li className="flex items-center gap-2 font-medium text-ink">
              <span className="size-3.5 animate-soft-pulse rounded-full border-[3px] border-brand bg-surface" />
              {featured.steps[1]}
            </li>
            <li className="flex items-center gap-2 text-subtle">
              <span className="size-3.5 rounded-full border border-line-strong" />
              {featured.steps[2]}
            </li>
          </ul>
          <div className="mt-2.5 h-1 overflow-hidden rounded-full bg-sunken">
            <span className="block h-full w-2/3 rounded-full bg-brand" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-[14px] font-semibold tracking-[-0.015em]">{featured.title}</p>
        <p className="mt-1 text-[13px] leading-relaxed text-muted">{featured.body}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-medium text-brand">
          {featured.cta} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

function NavBadge({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-gradient-to-r from-brand to-ask-400 px-1.5 py-px font-mono text-[9.5px] font-semibold tracking-[0.06em] text-white uppercase">{children}</span>;
}

function MenuLink({ link }: { link: NavLink }) {
  const external = link.href.startsWith("http");
  return (
    <Link
      href={link.href}
      {...(external ? { target: "_blank", rel: "noopener" } : {})}
      className="group/link flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-sunken"
    >
      <IconTile text={link.label} hint={link.description ?? ""} size="sm" />
      <span className="min-w-0">
        <span className="flex items-center gap-1 text-[14px] font-medium tracking-[-0.01em] text-ink">
          {link.label}
          {external && <ArrowUpRight className="size-3 text-subtle transition-colors group-hover/link:text-ink" />}
        </span>
        {link.description && <span className="mt-0.5 block text-[13px] leading-snug text-muted">{link.description}</span>}
      </span>
    </Link>
  );
}

export function Header({ nav, appUrl }: { nav: Content["nav"]; appUrl: string }) {
  const lang = useLang();
  const t = copy[lang];
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const internalPath = parsePath(pathname).path;
  const [lastPath, setLastPath] = useState(pathname);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navFromMenu = useRef(false);

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    openTimer.current = closeTimer.current = null;
  }, []);

  /** Hover intent: open after a short pause (so brushing past a sibling doesn't swap panels). */
  const hoverOpen = (label: string) => {
    clearTimers();
    if (open === label) return;
    openTimer.current = setTimeout(() => setOpen(label), open ? 90 : 50);
  };
  /** Leaving the header or the panel: close after a grace period (diagonal movement toward the panel). */
  const hoverClose = () => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(null), 180);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-megamenu]") || target?.closest("[data-navbar]")) return;
      setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => clearTimers, [clearTimers]);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(null);
    setMobile(false);
    setSection(null);
  }

  useEffect(() => {
    if (!navFromMenu.current) return;
    navFromMenu.current = false;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  /** Close the mobile menu on tap instead of waiting for the next page to render. */
  const onMobileNavClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest("a");
    if (!a || a.target === "_blank") return;
    const sameUrl = new URL(a.href).pathname === window.location.pathname;
    navFromMenu.current = !sameUrl;
    setMobile(false);
    setSection(null);
    if (sameUrl) window.scrollTo({ top: 0, behavior: "instant" });
  };

  useEffect(() => {
    if (!mobile) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobile]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openItem = nav.find((n) => n.label === open);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,backdrop-filter] duration-300",
        mobile ? "bg-canvas shadow-[0_1px_0_var(--color-line)]" : scrolled || open ? "bg-canvas/85 shadow-[0_1px_0_var(--color-line)] backdrop-blur-xl" : "bg-transparent",
      )}
      onMouseLeave={hoverClose}
      onMouseEnter={cancelClose}
    >
      {/* Dropdown panels only mount on hover; these links keep every menu target in the server HTML for crawlers. */}
      <div hidden>
        <Link href="/platform">Platform</Link>
        {nav
          .flatMap((item) => item.groups ?? [])
          .flatMap((g) => g.links)
          .filter((l) => !l.href.startsWith("http"))
          .map((l) => (
            <Link key={`${l.href}-${l.label}`} href={l.href}>
              {l.label}
            </Link>
          ))}
      </div>
      <div data-navbar className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-8 px-5 sm:px-8">
        <Logo
          onNavigate={() => {
            setOpen(null);
            setMobile(false);
            setSection(null);
          }}
        />

        <nav className="hidden items-center gap-1 xl:flex" aria-label={t.mainNav}>
          {nav.map((item) =>
            item.groups ? (
              <button
                key={item.label}
                onMouseEnter={() => hoverOpen(item.label)}
                onMouseLeave={() => {
                  if (openTimer.current) clearTimeout(openTimer.current);
                  openTimer.current = null;
                }}
                onFocus={() => {
                  clearTimers();
                  setOpen(item.label);
                }}
                onClick={() => {
                  clearTimers();
                  setOpen(open === item.label ? null : item.label);
                }}
                aria-expanded={open === item.label}
                className={clsx(
                  "flex h-9 items-center gap-1 rounded-full px-3.5 text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors",
                  open === item.label ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                <ChevronDown className={clsx("size-3.5 transition-transform", open === item.label && "rotate-180")} />
              </button>
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                onMouseEnter={() => {
                  clearTimers();
                  closeTimer.current = setTimeout(() => setOpen(null), 120);
                }}
                className={clsx(
                  "flex h-9 items-center gap-1.5 rounded-full px-3.5 text-[14px] font-medium tracking-[-0.01em] whitespace-nowrap transition-colors",
                  internalPath.startsWith(item.href!) ? "text-ink" : "text-muted hover:text-ink",
                )}
              >
                {item.label}
                {item.badge && <NavBadge>{item.badge}</NavBadge>}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <LangSwitch />
          <Button href={appUrl} variant="ghost">
            {t.login}
          </Button>
          <Button href="/demo" arrow>
            {t.demo}
          </Button>
        </div>

        <button
          className="flex size-9 items-center justify-center rounded-full text-ink xl:hidden"
          onClick={() => {
            setSection(mobile ? null : (nav.find((n) => n.groups)?.label ?? null));
            setMobile(!mobile);
          }}
          aria-label={mobile ? t.closeMenu : t.openMenu}
        >
          {mobile ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {openItem?.groups && (
          <motion.div
            key={openItem.label}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="pointer-events-none absolute inset-x-0 top-[60px] hidden pt-1 xl:block"
          >
            <div className="mx-auto max-w-[1320px] px-8">
              {/* Only the card itself is interactive, so hovering or clicking beside it counts as "outside". */}
              <div data-megamenu onMouseEnter={cancelClose} className="pointer-events-auto mx-auto flex w-full max-w-[1256px] gap-2 rounded-2xl bg-surface p-2 shadow-float">
                <div className="flex flex-1 flex-col">
                  <div className={clsx("grid gap-2", openItem.groups.length > 1 ? "grid-cols-2" : "grid-cols-1")}>
                    {openItem.groups.map((group) => (
                      <div key={group.title} className="p-2">
                        <p className="px-3 pt-1 pb-2 font-mono text-[11px] tracking-[0.1em] text-subtle uppercase">{group.title}</p>
                        {group.links.map((l) => (
                          <MenuLink key={`${l.href}-${l.label}`} link={l} />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mx-2 mt-auto mb-2 flex items-center justify-between gap-4 rounded-xl bg-sunken px-4 py-3">
                    <Link href="/platform/team-app" className="group/app flex min-w-0 items-center gap-3">
                      <IconTile text="app" size="sm" />
                      <span className="min-w-0">
                        <span className="flex items-center gap-1 text-[14px] font-medium tracking-[-0.01em] text-ink">
                          {t.appTitle}
                          <ArrowRight className="size-3.5 text-subtle transition-transform group-hover/app:translate-x-0.5 group-hover/app:text-ink" />
                        </span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-muted">{t.appBody}</span>
                      </span>
                    </Link>
                    <StoreBadges lang={lang} size="sm" className="flex-nowrap" />
                  </div>
                </div>
                {openItem.featured && <FeaturedCard featured={openItem.featured} />}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-x-0 top-full flex h-[calc(100dvh-100%)] touch-manipulation flex-col bg-canvas xl:hidden"
            onClick={onMobileNavClick}
          >
            <nav className="flex-1 overflow-y-auto overscroll-contain px-5" aria-label={t.mainNav}>
              {nav.map((item) =>
                item.groups ? (
                  <div key={item.label} className="border-b border-line">
                    <button
                      onClick={() => setSection(section === item.label ? null : item.label)}
                      aria-expanded={section === item.label}
                      className="flex h-14 w-full items-center justify-between text-[17px] font-medium tracking-[-0.01em] text-ink"
                    >
                      {item.label}
                      <ChevronDown className={clsx("size-4 text-subtle transition-transform", section === item.label && "rotate-180")} />
                    </button>
                    <AnimatePresence initial={false}>
                      {section === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="space-y-4 pb-5">
                            {item.groups.map((group) => (
                              <div key={group.title}>
                                <p className="mb-1 font-mono text-[11px] tracking-[0.1em] text-subtle uppercase">{group.title}</p>
                                {group.links.map((l) => (
                                  <Link
                                    key={`${l.href}-${l.label}`}
                                    href={l.href}
                                    className="-mx-2 flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] font-medium text-ink active:bg-sunken"
                                  >
                                    <IconTile text={l.label} hint={l.description ?? ""} size="sm" />
                                    {l.label}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={item.label} href={item.href!} className="flex h-14 items-center gap-2 border-b border-line text-[17px] font-medium tracking-[-0.01em] text-ink">
                    {item.label}
                    {item.badge && <NavBadge>{item.badge}</NavBadge>}
                  </Link>
                ),
              )}
              <div className="py-6">
                <p className="mb-3 font-mono text-[11px] tracking-[0.1em] text-subtle uppercase">{t.appTitle}</p>
                <StoreBadges lang={lang} />
              </div>
            </nav>
            <div className="space-y-3 border-t border-line px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between">
                <LangSwitch />
                <Button href={appUrl} variant="ghost">
                  {t.login}
                </Button>
              </div>
              <Button href="/demo" arrow size="lg" className="w-full">
                {t.demo}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
