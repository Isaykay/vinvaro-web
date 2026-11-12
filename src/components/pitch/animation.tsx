"use client";

import { createContext, createElement, useCallback, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { MotionConfig, motion as baseMotion } from "motion/react";

type AnimationState = { enabled: boolean; toggle: () => void };

const AnimationContext = createContext<AnimationState>({ enabled: true, toggle: () => {} });

const STORAGE_KEY = "vinvaro-pitch-animations";
const EVENT = "vinvaro-pitch-animations";

const subscribe = (onChange: () => void) => {
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
};
const readEnabled = () => window.localStorage.getItem(STORAGE_KEY) !== "off";

/**
 * Lets the presenter switch every animation in the pitch off, remembered per browser. Flipping the switch
 * remounts the deck so looping illustrations restart cleanly; CSS keyframes freeze through `.animations-off` on <html>.
 */
export function AnimationProvider({ children }: { children: ReactNode }) {
  const enabled = useSyncExternalStore(subscribe, readEnabled, () => true);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("animations-off", !enabled);
    return () => root.classList.remove("animations-off");
  }, [enabled]);

  const toggle = useCallback(() => {
    window.localStorage.setItem(STORAGE_KEY, readEnabled() ? "off" : "on");
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return (
    <AnimationContext value={{ enabled, toggle }}>
      <MotionConfig reducedMotion={enabled ? "never" : "always"}>
        <div key={String(enabled)} style={{ display: "contents" }}>
          {children}
        </div>
      </MotionConfig>
    </AnimationContext>
  );
}

export const useAnimations = () => useContext(AnimationContext);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyProps = Record<string, any>;
const STATIC = { duration: 0, delay: 0, repeat: 0 };
const cache = new Map<string, unknown>();

function staticAware(tag: string) {
  if (cache.has(tag)) return cache.get(tag);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Base = (baseMotion as any)[tag];
  function PitchMotion(props: AnyProps) {
    const { enabled } = useAnimations();
    return createElement(Base, enabled ? props : { ...props, transition: STATIC });
  }
  PitchMotion.displayName = `motion.${tag}`;
  cache.set(tag, PitchMotion);
  return PitchMotion;
}

/** `motion` from motion/react that snaps to its end state, without loops, when animations are off. */
export const motion = new Proxy(baseMotion, {
  get: (target, prop) => (typeof prop === "string" ? staticAware(prop) : Reflect.get(target, prop)),
}) as typeof baseMotion;
