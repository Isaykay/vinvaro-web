import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const start = Math.round(delay * 60);
  return (
    <div
      className={clsx("reveal", className)}
      style={{ "--reveal-y": `${y}px`, "--reveal-start": `${start}%`, "--reveal-end": `${start + 35}%` } as CSSProperties}
    >
      {children}
    </div>
  );
}
