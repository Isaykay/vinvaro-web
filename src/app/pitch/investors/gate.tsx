"use client";

import { useActionState } from "react";
import { Lock } from "lucide-react";
import { Wordmark } from "@/components/brand-mark";
import { unlockInvestorPitch, type UnlockState } from "./actions";

export function PasswordGate() {
  const [state, action, pending] = useActionState<UnlockState, FormData>(unlockInvestorPitch, { error: null });
  return (
    <main className="pitch-grid relative flex min-h-dvh items-center justify-center bg-canvas px-6">
      <div className="pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand/[0.08] blur-3xl" />
      <form action={action} className="relative w-full max-w-[400px] rounded-[22px] bg-white p-8 shadow-float">
        <Wordmark className="h-[17px] w-auto text-ink" />
        <span className="mt-8 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-4 text-[24px] leading-tight font-semibold tracking-[-0.03em] text-ink">Investeerderspresentatie</h1>
        <p className="mt-2 text-[14.5px] leading-[1.55] text-muted">Vertrouwelijk. Vul het wachtwoord in dat je van ons hebt gekregen.</p>
        <label htmlFor="password" className="sr-only">
          Wachtwoord
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Wachtwoord"
          className="mt-6 h-12 w-full rounded-xl border border-line bg-canvas px-4 text-[15px] text-ink outline-none focus:border-brand focus:ring-4 focus:ring-brand/15"
        />
        {state.error && (
          <p className="mt-2.5 text-[13px] text-danger" role="alert">
            {state.error === "wrong" ? "Dat wachtwoord klopt niet." : "De presentatie is nog niet ingesteld."}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-brand text-[15px] font-medium text-white shadow-[0_8px_20px_-10px_rgb(37_99_235/0.8)] transition-colors hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Controleren…" : "Openen"}
        </button>
      </form>
    </main>
  );
}
