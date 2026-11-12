"use client";

import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ClassSlot } from "@/lib/data";

/* ---------- Smooth scroll ---------- */

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const instance = new Lenis({ duration: 1.15, smoothWheel: true, touchMultiplier: 1.2 });
    setLenis(instance);
    let raf = 0;
    const loop = (t: number) => {
      instance.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      instance.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useScrollTo() {
  const lenis = useLenis();
  return useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (lenis) lenis.scrollTo(el, { duration: 1.6 });
      else el.scrollIntoView({ behavior: "smooth" });
    },
    [lenis],
  );
}

/* ---------- Estado compartido de la demo (reservas + membresía) ---------- */

export type Booking = ClassSlot & { day: string };

type DemoState = {
  bookings: Booking[];
  addBooking: (b: Booking) => void;
  planId: string;
  setPlanId: (id: string) => void;
};

const DemoContext = createContext<DemoState | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [planId, setPlanId] = useState("w8");
  const addBooking = useCallback(
    (b: Booking) => setBookings((prev) => (prev.some((p) => p.key === b.key) ? prev : [b, ...prev])),
    [],
  );
  const value = useMemo(() => ({ bookings, addBooking, planId, setPlanId }), [bookings, addBooking, planId]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used inside DemoProvider");
  return ctx;
}
