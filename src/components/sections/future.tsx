"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { EASE, Reveal, SectionLabel } from "../ui";

const NODES = [
  { k: "Website", d: "El nuevo punto de entrada digital." },
  { k: "Booking", d: "Reservas simples, 24/7." },
  { k: "Membership", d: "Planes, pagos y renovaciones." },
  { k: "Client Portal", d: "Una experiencia personal para cada miembro." },
  { k: "Community", d: "Contenido, eventos y pertenencia." },
  { k: "Events", d: "Activaciones y experiencias especiales." },
  { k: "Analytics", d: "Visión clara del crecimiento del estudio." },
];

/** Pantalla 12. The ecosystem as an orbit around the brand — framed explicitly as what could be built. */
export function Future() {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <section id="futuro" className="relative overflow-hidden bg-bone px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel index="12">El futuro</SectionLabel>
          </div>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-[clamp(2.4rem,6vw,5.6rem)] leading-[0.95] font-light tracking-[0.02em] uppercase">
              Lo que podríamos
              <br />
              <span className="display text-clay normal-case italic">construir.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-stone">
            Una visión, no un inventario: un ecosistema donde cada pieza se conecta con WIDUKY en el centro.
          </Reveal>
        </div>

        {/* Orbit (md+) */}
        <div className="relative mx-auto mt-20 hidden aspect-square w-full max-w-[min(720px,78svh)] md:block">
          {[1, 0.72, 0.44].map((s, i) => (
            <motion.div
              key={s}
              className="absolute inset-0 m-auto rounded-full border border-ink/10"
              style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: EASE, delay: i * 0.15 }}
            />
          ))}

          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          >
            {/* Spokes */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              {NODES.map((_, i) => {
                const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
                return (
                  <motion.line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={50 + Math.cos(a) * 50}
                    y2={50 + Math.sin(a) * 50}
                    stroke={hover === i ? "#a5826a" : "rgba(29,27,24,0.12)"}
                    strokeWidth={0.15}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: EASE, delay: 0.6 + i * 0.08 }}
                  />
                );
              })}
            </svg>

            {NODES.map((n, i) => {
              const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <div
                  key={n.k}
                  className="absolute"
                  style={{ left: `${50 + Math.cos(a) * 50}%`, top: `${50 + Math.sin(a) * 50}%` }}
                >
                  {/* Counter-rotate so labels stay upright */}
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 120, repeat: Infinity, ease: "linear" }}>
                    <motion.button
                      onPointerEnter={() => setHover(i)}
                      onPointerLeave={() => setHover(null)}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: EASE, delay: 1 + i * 0.1 }}
                      className={`-translate-x-1/2 -translate-y-1/2 rounded-full border px-5 py-3 text-[11px] font-medium tracking-[0.22em] whitespace-nowrap uppercase shadow-[0_12px_30px_-14px_rgba(29,27,24,0.35)] transition-colors duration-500 ${
                        hover === i ? "border-ink bg-ink text-bone" : "border-ink/10 bg-[#fbf9f5] text-ink"
                      }`}
                      data-cursor="hover"
                    >
                      {n.k}
                    </motion.button>
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Core */}
          <div className="absolute inset-0 m-auto flex size-[30%] flex-col items-center justify-center rounded-full bg-ink text-center text-bone shadow-[0_40px_80px_-30px_rgba(29,27,24,0.6)]" data-dark>
            <motion.span
              className="absolute inset-0 rounded-full border border-clay/60"
              animate={{ scale: [1, 1.35], opacity: [0.7, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="text-[clamp(1rem,2vw,1.6rem)] font-light tracking-[0.36em]">WIDUKY</span>
            <motion.span key={hover ?? -1} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 max-w-[80%] text-[11px] leading-snug text-bone/60">
              {hover !== null ? NODES[hover].d : "Move different."}
            </motion.span>
          </div>
        </div>

        {/* Stack (mobile) */}
        <div className="mt-14 flex flex-col items-center gap-2 md:hidden">
          <div className="mb-4 grid size-28 place-items-center rounded-full bg-ink text-[13px] tracking-[0.36em] text-bone">WIDUKY</div>
          {NODES.map((n, i) => (
            <Reveal key={n.k} delay={i * 0.06} y={14} className="flex w-full flex-col items-center">
              <span className="text-lg text-clay">+</span>
              <div className="w-full rounded-2xl border border-ink/10 bg-[#fbf9f5] px-5 py-4 text-center">
                <p className="text-[13px] font-medium tracking-[0.22em] uppercase">{n.k}</p>
                <p className="mt-1 text-[12px] text-stone">{n.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
