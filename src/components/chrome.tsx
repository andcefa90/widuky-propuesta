"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { SECTIONS } from "@/lib/data";
import { useScrollTo } from "./providers";
import { EASE } from "./ui";

/** Top bar, scroll progress and the side index. Visible once the visitor has entered. */
export function Chrome({ visible }: { visible: boolean }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [active, setActive] = useState(0);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = els.indexOf(e.target as HTMLElement);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Blend-difference keeps the chrome legible over cream, ink and photography alike.
  const tone = "text-bone mix-blend-difference";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.6 }}
        >
          <header
            className={`pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 md:px-10 md:py-7 ${tone}`}
          >
            <button
              onClick={() => scrollTo("idea")}
              className="pointer-events-auto text-[13px] font-medium tracking-[0.42em]"
              aria-label="Ir al inicio"
            >
              WIDUKY
            </button>
            <span className="eyebrow hidden opacity-60 md:block">Propuesta conceptual · Experiencia digital</span>
            <span className="eyebrow tabular-nums">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={active}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="inline-block"
                >
                  {String(active + 2).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="opacity-40"> / 13</span>
            </span>
          </header>

          <motion.div
            className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-bone/80 mix-blend-difference"
            style={{ scaleX: progress }}
          />

          <nav className="fixed top-1/2 right-6 z-50 hidden -translate-y-1/2 flex-col gap-3 mix-blend-difference lg:flex" aria-label="Secciones">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className="group flex items-center justify-end gap-3 text-bone"
                aria-label={s.label}
              >
                <span className="eyebrow translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-70">
                  {s.label}
                </span>
                <span
                  className={`block h-px transition-all duration-700 ease-[var(--ease-expo)] ${
                    i === active ? "w-8 bg-current" : "w-3 bg-current opacity-30 group-hover:opacity-70"
                  }`}
                />
              </button>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
