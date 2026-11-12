import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ACCESS_COOKIE = "vinvaro_investor";

/** Cookie value for the current password; changing INVESTOR_PITCH_PASSWORD signs everyone out. */
export function accessToken(password: string) {
  return createHmac("sha256", password).update("vinvaro-investor-pitch").digest("hex");
}

export function samePassword(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

/** Without INVESTOR_PITCH_PASSWORD the deck stays locked for everyone. */
export async function hasInvestorAccess() {
  const password = process.env.INVESTOR_PITCH_PASSWORD;
  if (!password) return false;
  const cookie = (await cookies()).get(ACCESS_COOKIE)?.value;
  return Boolean(cookie) && samePassword(cookie!, accessToken(password));
}
