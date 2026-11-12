"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_COOKIE, accessToken, samePassword } from "./access";

export type UnlockState = { error: "wrong" | "unconfigured" | null };

export async function unlockInvestorPitch(_: UnlockState, formData: FormData): Promise<UnlockState> {
  const password = process.env.INVESTOR_PITCH_PASSWORD;
  if (!password) return { error: "unconfigured" };
  const attempt = String(formData.get("password") ?? "");
  if (!samePassword(attempt, password)) {
    // Slows down guessing.
    await new Promise((resolve) => setTimeout(resolve, 800));
    return { error: "wrong" };
  }
  (await cookies()).set(ACCESS_COOKIE, accessToken(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/pitch/investors",
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/pitch/investors");
}
