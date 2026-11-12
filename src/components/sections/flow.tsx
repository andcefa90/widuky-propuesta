"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { EASE, useRange } from "../ui";

const STAGES = [
  { k: "Discover", es: "Descubrir", d: "Descubre la experiencia WIDUKY.", more: "Contenido editorial, fotografía y una marca que se siente desde el primer scroll." },
  { k: "Choose", es: "Elegir", d: "Encuentra la clase adecuada para ti.", more: "Recomendaciones guiadas según intención, nivel y horario." },
  { k: "Book", es: "Reservar", d: "Reserva en segundos.", more: "Tres toques, sin llamadas ni mensajes. Disponible 24/7." },
  { k: "Move", es: "Moverse", d: "Vive la experiencia.", more: "Recordatorios, check-in fluido y una llegada sin fricción al estudio." },
  { k: "Track", es: "Seguir", d: "Conoce tu progreso.", more: "Clases, constancia y logros que motivan a seguir." },
  { k: "Repeat", es: "Repetir", d: "Construye tu rutina.", more: "Membresías, recompensas y comunidad que hacen volver." },
];

/** Pantalla 08. The ecosystem as a single line that draws itself; each stage lights up as you pass it. */
export function Flow() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [scrollActive, setScrollActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const line = useRange(p, [0.04, 0.82], [0, 1]);
  const loopOpacity = useRange(p, [0.82, 0.92], [0, 1]);
  const bgX = useTransform(p, [0, 1], ["8%", "-18%"]);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(STAGES.length - 1, Math.max(0, Math.floor(((v - 0.04) / 0.8) * STAGES.length)));
    setScrollActive(i);
  });

  const active = hover ?? scrollActive;
  const stage = STAGES[active];

  return (
    <section id="flow" ref={ref} className="relative h-[460vh] bg-bone">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden px-5 pt-24 pb-10 md:px-10 md:pt-28 lg:px-20">
        {/* Giant background word */}
        <motion.span
          aria-hidden
          style={{ x: bgX }}
          className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 text-[38vw] leading-none font-light tracking-[-0.04em] whitespace-nowrap text-transparent select-none [-webkit-text-stroke:1px_rgba(29,27,24,0.06)]"
        >
          FLOW
        </motion.span>

        <div className="relative flex items-start justify-between gap-6">
          <div>
            <div className="eyebrow flex items-center gap-4 text-stone">
              <span className="text-ink">08</span>
              <span className="h-px w-10 bg-ink/20" />
              <span>El ecosistema</span>
            </div>
            <h2 className="mt-6 text-[clamp(2.8rem,8vw,8rem)] leading-[0.9] font-light tracking-[0.04em]">
              WIDUKY <span className="display text-clay italic">Flow</span>
            </h2>
          </div>
          <p className="hidden max-w-xs pt-12 text-[14px] leading-relaxed text-stone md:block">
            Seis momentos, una sola experiencia continua. Cada etapa alimenta la siguiente — y la última vuelve a empezar.
          </p>
        </div>

        {/* Track */}
        <div className="relative mt-8 flex flex-1 flex-col justify-center md:mt-0">
          {/* Desktop: horizontal */}
          <div className="relative hidden md:block">
            <svg className="absolute top-[22px] left-0 h-[2px] w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 2">
              <line x1="0" y1="1" x2="100" y2="1" stroke="rgba(29,27,24,0.1)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
              <motion.line x1="0" y1="1" x2="100" y2="1" stroke="#1d1b18" strokeWidth="2" vectorEffect="non-scaling-stroke" style={{ pathLength: line }} />
            </svg>
            <div className="relative grid grid-cols-6">
              {STAGES.map((s, i) => (
                <Node key={s.k} i={i} s={s} reached={i <= scrollActive} active={i === active} onHover={setHover} />
              ))}
            </div>
            <motion.svg style={{ opacity: loopOpacity }} className="pointer-events-none absolute top-[46px] left-[8.33%] h-20 w-[83.3%]" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M100 0 C 100 18, 0 18, 0 0" fill="none" stroke="#a5826a" strokeWidth="1.2" strokeDasharray="4 5" vectorEffect="non-scaling-stroke" />
            </motion.svg>
            <motion.span style={{ opacity: loopOpacity }} className="eyebrow absolute top-[118px] left-1/2 -translate-x-1/2 text-clay">
              ↺ Y vuelve a empezar
            </motion.span>
          </div>

          {/* Mobile: vertical */}
          <div className="relative md:hidden">
            <div className="absolute top-2 bottom-2 left-[19px] w-px bg-ink/10" />
            <motion.div style={{ scaleY: line }} className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-ink" />
            <div className="flex flex-col gap-4">
              {STAGES.map((s, i) => (
                <button key={s.k} onClick={() => setHover(i === hover ? null : i)} className="relative flex items-center gap-5 text-left">
                  <Dot reached={i <= scrollActive} active={i === active} />
                  <span className={`text-lg tracking-[0.18em] uppercase transition-colors duration-500 ${i === active ? "text-ink" : "text-ink/35"}`}>{s.k}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active stage detail */}
        <div className="relative grid min-h-[150px] items-end gap-4 md:grid-cols-12 md:min-h-[190px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="md:col-span-8"
              initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <span className="eyebrow text-clay">
                0{active + 1} · {stage.es}
              </span>
              <p className="display mt-3 text-[clamp(2rem,4.6vw,4.4rem)]">{stage.d}</p>
              <p className="mt-3 max-w-lg text-[14px] leading-relaxed text-stone">{stage.more}</p>
            </motion.div>
          </AnimatePresence>
          <span className="hidden text-right text-[clamp(5rem,12vw,11rem)] leading-[0.8] font-extralight text-ink/[0.08] tabular-nums md:col-span-4 md:block">
            0{active + 1}
          </span>
        </div>
      </div>
    </section>
  );
}

function Dot({ reached, active }: { reached: boolean; active: boolean }) {
  return (
    <span className="relative grid size-10 shrink-0 place-items-center rounded-full border border-ink/15 bg-bone">
      <motion.span className="absolute inset-0 rounded-full bg-ink" initial={false} animate={{ scale: reached ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} />
      {active && (
        <motion.span
          className="absolute -inset-2 rounded-full border border-clay"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0.9, 0], scale: [1, 1.5] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className={`relative size-1.5 rounded-full transition-colors duration-500 ${reached ? "bg-bone" : "bg-ink/30"}`} />
    </span>
  );
}

function Node({
  i,
  s,
  reached,
  active,
  onHover,
}: {
  i: number;
  s: (typeof STAGES)[number];
  reached: boolean;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  return (
    <button
      onPointerEnter={() => onHover(i)}
      onPointerLeave={() => onHover(null)}
      data-cursor="hover"
      className="group relative flex flex-col items-center gap-5 text-center"
    >
      <motion.div animate={{ scale: active ? 1.12 : 1 }} transition={{ duration: 0.5, ease: EASE }}>
        <Dot reached={reached} active={active} />
      </motion.div>
      <div>
        <span className="eyebrow text-stone">0{i + 1}</span>
        <p
          className={`mt-2 text-[clamp(0.95rem,1.6vw,1.35rem)] tracking-[0.2em] uppercase transition-colors duration-500 ${
            active ? "text-ink" : reached ? "text-ink/60" : "text-ink/25"
          }`}
        >
          {s.k}
        </p>
        {/* Hover tooltip */}
        <span className="pointer-events-none absolute top-full left-1/2 mt-3 w-44 -translate-x-1/2 translate-y-2 rounded-xl bg-ink px-4 py-3 text-[12px] leading-snug text-bone opacity-0 transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-y-0 group-hover:opacity-100">
          {s.d}
        </span>
      </div>
    </button>
  );
}
