const CANONICAL_HOST = "vinvaro.com";
const ALIASES = new Set(["vinvaro.nl", "www.vinvaro.nl", "www.vinvaro.com"]);

/** Permanent destination when a request arrives on a non-canonical public host. */
export function canonicalHostRedirect(host: string, current: URL): URL | null {
  const name = host.split(":")[0].toLowerCase();
  if (!ALIASES.has(name)) return null;
  const next = new URL(current.href);
  next.protocol = "https:";
  next.hostname = CANONICAL_HOST;
  next.port = "";
  return next;
}
