import type { ReactNode, SVGProps } from "react";

/* Functional icons from Brand Kit v1.1 (06_UI_Icons): 24px grid, 1.8 stroke, round caps. */
const paths = {
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  vehicle: <path d="M4 10l2-6h12l2 6M3 10h18v8H3zM7 18v3M17 18v3M3 13h3M18 13h3" />,
  check: <path d="M5 12l4 4L19 6" />,
  warning: <path d="M12 3L2 21h20zM12 9v5M12 17v1" />,
  workflow: (
    <>
      <rect x="3" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="16" width="7" height="5" rx="1" />
      <path d="M6.5 8v10.5H14M10 5.5h7.5V16" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M16 16l5 5" />
    </>
  ),
  plus: <path d="M12 4v16M4 12h16" />,
  minus: <path d="M4 12h16" />,
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 6l-6 6 6 6" />,
  chevronRight: <path d="M9 6l6 6-6 6" />,
  arrowRight: <path d="M4 12h16M14 6l6 6-6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" />
    </>
  ),
  moon: <path d="M20.5 14.5A8.5 8.5 0 019.5 3.5a8.5 8.5 0 1011 11z" />,
  key: (
    <>
      <circle cx="8" cy="8" r="5" />
      <path d="M12 12l9 9M16 16l3-3M18 18l3-3" />
    </>
  ),
  camera: (
    <>
      <path d="M3 7h5l2-3h4l2 3h5v13H3z" />
      <circle cx="12" cy="13" r="4" />
    </>
  ),
  document: <path d="M5 3h9l5 5v13H5zM14 3v5h5M8 12h8M8 16h6" />,
  intake: <path d="M4 14v6h16v-6M12 3v12M7 10l5 5 5-5" />,
  outtake: <path d="M4 14v6h16v-6M12 16V3M7 8l5-5 5 5" />,
  scan: <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5M7 12h10" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v6l4 2" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v6M12 7v1" />
    </>
  ),
  shield: <path d="M12 2l8 4v6c0 5-8 10-8 10S4 17 4 12V6zM8 12l3 3 5-6" />,
  logout: <path d="M10 4H5v16h5M14 8l4 4-4 4M18 12H9" />,
  pipeline: (
    <>
      <rect x="3" y="4" width="5" height="16" rx="1.5" />
      <rect x="10" y="4" width="5" height="11" rx="1.5" />
      <rect x="17" y="4" width="4" height="7" rx="1.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20c.6-3.6 3.2-5.5 6.5-5.5s5.9 1.9 6.5 5.5M16 4.8a3.5 3.5 0 010 6.4M18 14.8c2 .7 3.2 2.4 3.5 5.2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c.8-4.2 3.9-6.5 8-6.5s7.2 2.3 8 6.5" />
    </>
  ),
  handshake: <path d="M2 11l4-4 4 2 3-2 3 1 6 3M2 11l5 5M22 11l-4 4M7 16l2 2 2-1 2 2 2-1 3-3M10 9l-2 3 2 1 3-3" />,
  contract: <path d="M6 3h8l4 4v14H6zM14 3v4h4M9 11h6M9 14h6M9 18c1-1.5 2-1.5 2.5 0s1.5 1 3-.5" />,
  euro: (
    <>
      <path d="M17 6.5A7 7 0 107 17.5 7 7 0 0017 17.5" />
      <path d="M4 10h9M4 14h9" />
    </>
  ),
  upload: <path d="M4 15v5h16v-5M12 4v12M7 9l5-5 5 5" />,
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </>
  ),
  building: <path d="M4 21V5l8-3v19M12 8h8v13M2 21h20M7 8h2M7 12h2M7 16h2M15 12h2M15 16h2" />,
  mapPin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  plug: <path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 01-12 0zM12 17v5" />,
  layers: <path d="M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5" />,
  history: <path d="M3 12a9 9 0 103-6.7M3 4v4h4M12 7v5l3 2" />,
  pencil: <path d="M4 20l1-5L16 4l4 4L9 19zM14 6l4 4" />,
  trash: <path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  command: <path d="M9 9V6a3 3 0 10-3 3h12a3 3 0 10-3-3v12a3 3 0 103-3H6a3 3 0 103 3z" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  "chevron-left": <path d="M15 18l-6-6 6-6" />,
  "chevron-right": <path d="M9 18l6-6-6-6" />,
  "chevron-down": <path d="M6 9l6 6 6-6" />,
  "chevron-up": <path d="M18 15l-6-6-6 6" />,
  download: <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />,
  rotate: <path d="M20 11a8 8 0 10-2.34 5.66M20 4v7h-7" />,
  sort: <path d="M8 4v16M4 8l4-4 4 4M16 20V4M12 16l4 4 4-4" />,
  "sort-asc": <path d="M12 19V5M6 11l6-6 6 6" />,
  "sort-desc": <path d="M12 5v14M6 13l6 6 6-6" />,
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v6H4V6h6" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7a2 2 0 002 2h3" />
    </>
  ),
  link: <path d="M10 14a4.5 4.5 0 006.4 0l3-3a4.5 4.5 0 00-6.4-6.4l-1 1M14 10a4.5 4.5 0 00-6.4 0l-3 3a4.5 4.5 0 006.4 6.4l1-1" />,
  sidebar: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M9 4v16" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 6.5 6.5l1.5-2 4 1.5V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  bell: <path d="M6 9a6 6 0 1 1 12 0c0 6.5 2.5 8 2.5 8h-17S6 15.5 6 9zM10.2 20.5a2 2 0 0 0 3.6 0" />,
  chat: <path d="M4 19.5l1.3-3.9A8 8 0 1 1 8.4 18.7L4 19.5z" />,
  board: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 4v16" />
    </>
  ),
  more: <path d="M5 12h.01M12 12h.01M19 12h.01" strokeWidth={3} />,
  grip: <path d="M9 6h.01M15 6h.01M9 12h.01M15 12h.01M9 18h.01M15 18h.01" strokeWidth={2.6} />,
  arrowLeft: <path d="M19 12H5M11 6l-6 6 6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  arrowDownLeft: <path d="M17 7L7 17M16 17H7V8" />,
  sparkles: <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />,
  wrench: <path d="M14.7 6.3a4 4 0 015 5l-2.2-.6-1.6 1.6.6 2.2a4 4 0 01-5-5L3 18v3h3l8.5-8.5" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  tag: <path d="M3 12V4h8l10 10-8 8zM7.5 8.5h.01" />,
  droplet: <path d="M12 3s6 6.5 6 11a6 6 0 01-12 0c0-4.5 6-11 6-11z" />,
  flag: <path d="M5 21V4M5 4h11l-2 4 2 4H5" />,
  pin: <path d="M9 3h6l-1 6 4 4H6l4-4zM12 13v8" />,
  list: <path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01" />,
  filter: <path d="M3 5h18l-7 8.5V19l-4 2v-7.5z" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  gauge: <path d="M4.5 18a9 9 0 1115 0M12 13l4-4M12 13a.5.5 0 100 .01" />,
  archive: <path d="M3 4h18v4H3zM5 8v12h14V8M10 12h4" />,
  unarchive: <path d="M3 4h18v4H3zM5 8v12h14V8M12 18v-6M9.5 14.5L12 12l2.5 2.5" />,
  mailOpen: <path d="M3 10l9-6 9 6v10H3zM3 10l9 6 9-6" />,
  mailUnread: <path d="M14 5H3v14h18v-7M3 7l9 6 4-2.7M19 8.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />,
  bolt: <path d="M13 2L4 14h7l-1 8 9-12h-7z" />,
  ban: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM5.6 5.6l12.8 12.8" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 20, ...props }: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
