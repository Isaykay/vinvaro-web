"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import {
  DEMO_SLOT_KEY,
  GA_MEASUREMENT_ID,
  GOOGLE_ADS_ID,
  GTM_ID,
  LINKEDIN_PARTNER_ID,
  META_PIXEL_ID,
  classifyLink,
  track,
  trackLead,
  trackPageView,
} from "@/lib/analytics";

/** GTM + GA4 + optional Meta / LinkedIn / Google Ads base tags. */
export function AnalyticsTags() {
  const gaLoaderId = GOOGLE_ADS_ID || GA_MEASUREMENT_ID;
  return (
    <>
      <Script id="analytics-init" strategy="beforeInteractive">{`
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false, anonymize_ip: true });
        ${GOOGLE_ADS_ID ? `gtag('config', '${GOOGLE_ADS_ID}');` : ""}
      `}</Script>
      <Script src={`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`} strategy="afterInteractive" />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaLoaderId}`} strategy="afterInteractive" />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</Script>
      ) : null}
      {LINKEDIN_PARTNER_ID ? (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          _linkedin_partner_id = "${LINKEDIN_PARTNER_ID}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
          var b=document.createElement("script");b.type="text/javascript";b.async=true;
          b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b,s);})(window.lintrk);
        `}</Script>
      ) : null}
    </>
  );
}

const SCROLL_MARKS = [25, 50, 75, 90, 100] as const;

/** SPA page views, scroll depth, and delegated click tracking. */
export function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const scrollDone = useRef(new Set<number>());
  const lastPath = useRef("");

  useEffect(() => {
    const qs = searchParams?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    if (path === lastPath.current) return;
    lastPath.current = path;
    scrollDone.current.clear();
    trackPageView(path);
  }, [pathname, searchParams]);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / max) * 100));
      for (const mark of SCROLL_MARKS) {
        if (pct >= mark && !scrollDone.current.has(mark)) {
          scrollDone.current.add(mark);
          track("scroll_depth", { percent: mark, page_path: pathname });
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const tracked = target.closest<HTMLElement>("[data-track]");
      if (tracked?.dataset.track) {
        track(tracked.dataset.track, {
          label: tracked.dataset.trackLabel,
          location: tracked.dataset.trackLocation,
          value: tracked.dataset.trackValue,
        });
      }
      const anchor = target.closest("a");
      if (!anchor?.href) return;
      if (anchor.dataset.track) return;
      const kind = classifyLink(anchor.href);
      if (kind.type === "cta") {
        track("cta_click", { label: kind.label, link_url: kind.path, link_text: (anchor.textContent || "").trim().slice(0, 80) });
      } else if (kind.type === "outbound" || kind.type === "mailto" || kind.type === "tel") {
        track("outbound_click", { label: kind.label, link_url: anchor.href, link_text: (anchor.textContent || "").trim().slice(0, 80) });
      } else {
        track("nav_click", { label: kind.label, link_url: kind.path, link_text: (anchor.textContent || "").trim().slice(0, 80) });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

/** Fire multi-platform lead once on the demo thank-you page after a real booking. */
export function DemoLeadBeacon() {
  useEffect(() => {
    let booked = false;
    try {
      booked = Boolean(sessionStorage.getItem(DEMO_SLOT_KEY));
    } catch {}
    if (!booked) return;
    trackLead("demo", { method: "demo_form", page_path: window.location.pathname });
  }, []);
  return null;
}
