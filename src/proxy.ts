import { NextResponse, type NextRequest } from "next/server";
import { toDutchPath, toEnglishPath } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;

  if (pathname === "/nl" || pathname.startsWith("/nl/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const rest = pathname.slice(3) || "/";
    const english = toEnglishPath(rest);
    if (english !== rest) {
      url.pathname = `/en${english}`;
      return NextResponse.redirect(url, 308);
    }
    url.pathname = `/en${toDutchPath(rest)}`;
    return NextResponse.rewrite(url);
  }

  url.pathname = `/nl${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/((?!api|og|_next|apple-icon|icon|favicon|.*\\..*).*)"],
};
