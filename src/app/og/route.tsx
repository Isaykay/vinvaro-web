import { ImageResponse } from "next/og";
import { Mark, Wordmark } from "@/components/brand-mark";
import { getContent } from "@/lib/content";
import { hasLang } from "@/lib/i18n";

const clip = (value: string | null, max: number) => (value ?? "").trim().slice(0, max);

/** Share image per page (1200×630): the page's own title in the visitor's language, in the house style. */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const langParam = searchParams.get("lang") ?? "nl";
  const lang = hasLang(langParam) ? langParam : "nl";
  const { site } = getContent(lang);
  const title = clip(searchParams.get("title"), 110) || site.category;
  const kicker = clip(searchParams.get("kicker"), 40);
  const size = title.length > 70 ? 54 : title.length > 42 ? 64 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 64px",
          color: "#fff",
          background: "radial-gradient(circle at 85% 40%, #13254a 0%, #0b1220 55%, #070b14 100%)",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", right: -60, top: 150, display: "flex", opacity: 0.08 }}>
          <Mark fill="#ffffff" width={560} height={365} />
        </div>
        <Wordmark fill="#ffffff" width={250} height={37} />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
          {kicker && (
            <div style={{ display: "flex", fontSize: 24, letterSpacing: 4, textTransform: "uppercase", color: "#7aa2ff", marginBottom: 20 }}>{kicker}</div>
          )}
          <div style={{ display: "flex", fontSize: size, lineHeight: 1.08, fontWeight: 700, letterSpacing: -1.5 }}>{title}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 26, color: "#a5b0c4", marginBottom: 26 }}>{site.tagline}</div>
          <div style={{ display: "flex", height: 1, background: "rgba(255,255,255,0.15)", marginBottom: 22 }} />
          <div style={{ display: "flex", fontSize: 20, letterSpacing: 4, color: "#a5b0c4" }}>VINVARO.COM</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" } },
  );
}
