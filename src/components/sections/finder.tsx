"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { GOALS, img } from "@/lib/data";
import { useScrollTo } from "../providers";
import { DemoTag, EASE, MagneticButton, Reveal, SectionLabel, SplitWords } from "../ui";

/** Pantalla 04. A guided choice that turns intention into a class recommendation. */
export function Finder() {
  const [goalId, setGoalId] = useState<string | null>(null);
  const goal = GOALS.find((g) => g.id === goalId);
  const scrollTo = useScrollTo();

  return (
    <section id="encuentra" className="relative bg-cream px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionLabel index="04">Find your flow</SectionLabel>
          <SplitWords as="h2" text="¿Qué estás buscando hoy?" className="display mt-8 text-[clamp(2.6rem,6vw,5.6rem)]" />
          <Reveal delay={0.15} className="mt-6 max-w-md text-[15px] leading-relaxed text-stone">
            Un recorrido diseñado para convertir visitantes en clientes: cada persona encuentra su clase ideal en un toque.
          </Reveal>

          <ul className="mt-12 border-t border-ink/12">
            {GOALS.map((g, i) => {
              const active = g.id === goalId;
              return (
                <Reveal key={g.id} delay={0.05 * i} y={16}>
                  <li className="border-b border-ink/12">
                    <button
                      onClick={() => setGoalId(g.id)}
                      data-cursor="Elegir"
                      className="group flex w-full items-center gap-5 py-5 text-left md:py-6"
                    >
                      <span className={`eyebrow w-6 transition-colors ${active ? "text-clay" : "text-stone"}`}>0{i + 1}</span>
                      <span
                        className={`flex-1 text-[clamp(1.05rem,2vw,1.5rem)] tracking-[0.06em] uppercase transition-all duration-500 ease-[var(--ease-expo)] ${
                          active ? "translate-x-2 text-ink" : "text-ink/55 group-hover:translate-x-2 group-hover:text-ink"
                        }`}
                      >
                        {g.label}
                      </span>
                      <span className={`relative grid size-7 place-items-center rounded-full border transition-colors duration-500 ${active ? "border-ink bg-ink" : "border-ink/20"}`}>
                        <motion.span animate={{ scale: active ? 1 : 0 }} className="size-2 rounded-full bg-bone" transition={{ duration: 0.4, ease: EASE }} />
                      </span>
                    </button>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-5 lg:col-start-8">
          <div className="lg:sticky lg:top-28">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[22px] bg-sand">
              <AnimatePresence mode="popLayout" initial={false}>
                {goal ? (
                  <motion.div
                    key={goal.id}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.08, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(12px)" }}
                    transition={{ duration: 1, ease: EASE }}
                  >
                    <img src={img(goal.image)} alt={goal.className} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 text-bone md:p-9" data-dark>
                      <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: EASE }} className="eyebrow text-bone/70">
                        Te recomendamos
                      </motion.span>
                      <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.9, ease: EASE }} className="display mt-3 text-[clamp(2rem,3.6vw,3.2rem)]">
                        {goal.className}
                      </motion.h3>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }} className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] tracking-[0.22em] uppercase">
                        <span>{goal.duration}</span>
                        <span className="flex items-center gap-2">
                          {[1, 2, 3].map((n) => (
                            <span key={n} className={`h-1 w-5 rounded-full ${n <= goal.intensityLevel ? "bg-bone" : "bg-bone/25"}`} />
                          ))}
                          <span className="ml-1">{goal.intensity}</span>
                        </span>
                      </motion.div>
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }} className="mt-4 max-w-sm text-[14px] leading-relaxed text-bone/75">
                        {goal.why}
                      </motion.p>
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8, ease: EASE }} className="mt-7">
                        <MagneticButton variant="light" onClick={() => scrollTo("reservar")} cursor="Ver">
                          Ver clases
                        </MagneticButton>
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center"
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="size-24 rounded-full border border-ink/20"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <p className="display mt-8 text-3xl">Elige una intención.</p>
                    <p className="mt-3 max-w-xs text-sm text-stone">WIDUKY te sugiere la clase ideal para tu momento.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 flex justify-end">
              <DemoTag>Recomendación ilustrativa</DemoTag>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
