"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarDays, Check, Heart, Sparkles } from "lucide-react";
import { useState } from "react";
import { PLANS } from "@/lib/data";
import { useDemo } from "../providers";
import { Counter, DemoTag, EASE, Reveal, SectionLabel, SplitWords } from "../ui";

const TABS = ["Mis clases", "Mis reservas", "Mis favoritos", "Mi membresía"] as const;

const HISTORY = [
  { date: "VIE 09", name: "Reformer Flow", who: "Sofía R." },
  { date: "MIÉ 07", name: "Mat & Mobility", who: "Camila T." },
  { date: "LUN 05", name: "Reformer Sculpt", who: "Valentina M." },
  { date: "JUE 01", name: "Slow Flow", who: "Maya K." },
];

const FAVORITES = [
  { name: "Reformer Flow", meta: "Clase · 50 min" },
  { name: "Sofía R.", meta: "Instructora" },
  { name: "Sábados 08:30 AM", meta: "Horario favorito" },
];

const WEEKS = [
  [1, 0, 1, 0, 1, 0, 0],
  [1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 0, 0],
];

/** Pantalla 07. Member area concept on a dark stage — a change of light that signals "this is yours". */
export function Journey() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Mis clases");
  const { bookings, planId } = useDemo();
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[2];

  return (
    <section id="journey" data-dark className="relative overflow-hidden bg-ink px-5 py-28 text-bone md:px-10 md:py-40">
      <div className="pointer-events-none absolute top-1/3 -left-40 size-[520px] rounded-full bg-clay/15 blur-[120px]" />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="07" light>
              Your WIDUKY journey
            </SectionLabel>
            <SplitWords as="h2" text="Tu progreso. Tu journey." className="display mt-8 text-[clamp(2.8rem,6.5vw,6rem)]" />
          </div>
          <Reveal delay={0.15} className="text-[15px] leading-relaxed text-bone/60 md:col-span-4 md:col-start-9">
            Una experiencia personalizada para cada miembro: su historia, sus logros y su próxima clase, siempre a un toque.
          </Reveal>
        </div>

        <Reveal y={60} className="mt-16 md:mt-20">
          <div className="grid gap-4 lg:grid-cols-12">
            {/* Profile + goal */}
            <div className="min-w-0 rounded-[26px] border border-bone/10 bg-bone/[0.04] p-7 backdrop-blur md:p-9 lg:col-span-5">
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-full bg-sand text-xl text-ink">A</div>
                <div>
                  <p className="eyebrow text-bone/50">Hola de nuevo</p>
                  <p className="mt-1 text-2xl font-light tracking-[0.14em]">ANDREA</p>
                </div>
                <span className="ml-auto hidden sm:block">
                  <DemoTag light>Perfil ficticio</DemoTag>
                </span>
              </div>

              <div className="mt-10">
                <div className="flex items-baseline justify-between">
                  <span className="eyebrow text-bone/50">Próximo objetivo</span>
                  <span className="text-sm text-bone/60">
                    <span className="text-bone">12</span> / 20 clases
                  </span>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-bone/10">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-taupe to-clay"
                    initial={{ width: 0 }}
                    whileInView={{ width: "60%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, ease: EASE, delay: 0.4 }}
                  />
                </div>
                <p className="display mt-5 text-2xl text-bone/85 italic">8 clases más para tu primer hito de 20.</p>
              </div>

              <div className="mt-10">
                <span className="eyebrow text-bone/50">Constancia · últimas 4 semanas</span>
                <div className="mt-4 flex flex-col gap-1.5">
                  {WEEKS.map((w, wi) => (
                    <div key={wi} className="flex gap-1.5">
                      {w.map((v, di) => (
                        <motion.span
                          key={di}
                          initial={{ opacity: 0, scale: 0.4 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.6 + (wi * 7 + di) * 0.02, duration: 0.4 }}
                          className={`h-5 flex-1 rounded-md ${v ? "bg-clay/80" : "bg-bone/[0.07]"}`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats + tabs */}
            <div className="flex min-w-0 flex-col gap-4 lg:col-span-7">
              <div className="grid grid-cols-3 gap-2 md:gap-4">
                {[
                  { v: 12, l: "Clases completadas" },
                  { v: 4, l: "Semanas de constancia" },
                  { v: 8, l: "Horas de movimiento" },
                ].map((s) => (
                  <div key={s.l} className="min-w-0 rounded-[22px] border border-bone/10 bg-bone/[0.04] p-4 md:p-7">
                    <Counter value={s.v} className="text-[clamp(2.4rem,5vw,4.2rem)] leading-none font-extralight tabular-nums" />
                    <p className="mt-3 text-[9px] leading-snug tracking-[0.08em] break-words text-bone/55 uppercase md:text-[11px] md:tracking-[0.18em]">{s.l}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-1 flex-col rounded-[26px] border border-bone/10 bg-bone/[0.04] p-3 md:p-4">
                <div className="no-scrollbar flex gap-1 overflow-x-auto">
                  {TABS.map((t) => (
                    <button key={t} onClick={() => setTab(t)} className="relative shrink-0 rounded-full px-4 py-2.5 text-[10px] tracking-[0.2em] uppercase md:text-[11px]">
                      {tab === t && <motion.span layoutId="journey-tab" className="absolute inset-0 rounded-full bg-bone" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
                      <span className={`relative ${tab === t ? "text-ink" : "text-bone/60"}`}>{t}</span>
                    </button>
                  ))}
                </div>
                <div className="relative min-h-[260px] px-2 pt-4 md:px-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tab}
                      initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: EASE }}
                    >
                      {tab === "Mis clases" && (
                        <ul className="divide-y divide-bone/10">
                          {HISTORY.map((h) => (
                            <li key={h.date} className="flex items-center gap-4 py-4">
                              <span className="w-14 text-[11px] tracking-[0.15em] text-bone/50">{h.date}</span>
                              <span className="flex-1 text-[14px] tracking-[0.08em] uppercase">{h.name}</span>
                              <span className="hidden text-[12px] text-bone/50 sm:block">{h.who}</span>
                              <Check className="size-4 text-clay" strokeWidth={1.6} />
                            </li>
                          ))}
                        </ul>
                      )}
                      {tab === "Mis reservas" && (
                        <ul className="divide-y divide-bone/10">
                          {[...bookings, { key: "seed", day: "LUN 19", time: "07:00 AM", name: "Reformer Flow", instructor: "Sofía R." }].map((b) => (
                            <li key={b.key} className="flex items-center gap-4 py-4">
                              <CalendarDays className="size-4 text-bone/50" strokeWidth={1.4} />
                              <span className="w-36 shrink-0 text-[11px] tracking-[0.15em] whitespace-nowrap text-bone/60">
                                {b.day} · {b.time}
                              </span>
                              <span className="flex-1 text-[14px] tracking-[0.08em] uppercase">{b.name}</span>
                              <span className="hidden text-[12px] text-bone/50 sm:block">{b.instructor}</span>
                            </li>
                          ))}
                          {bookings.length === 0 && (
                            <li className="pt-5 text-[12px] text-bone/40">Tip: reserva una clase en la sección 05 y aparecerá aquí.</li>
                          )}
                        </ul>
                      )}
                      {tab === "Mis favoritos" && (
                        <ul className="grid gap-3 py-2 sm:grid-cols-3">
                          {FAVORITES.map((f) => (
                            <li key={f.name} className="rounded-2xl border border-bone/10 p-5">
                              <Heart className="size-4 fill-clay text-clay" strokeWidth={1.4} />
                              <p className="mt-6 text-[14px] tracking-[0.06em] uppercase">{f.name}</p>
                              <p className="mt-1 text-[12px] text-bone/50">{f.meta}</p>
                            </li>
                          ))}
                        </ul>
                      )}
                      {tab === "Mi membresía" && (
                        <div className="flex flex-col gap-6 py-3 sm:flex-row sm:items-center">
                          <div className="flex-1">
                            <span className="eyebrow text-clay">Membresía activa</span>
                            <p className="mt-3 text-4xl font-light tracking-[0.08em] uppercase">{plan.name}</p>
                            <p className="mt-2 text-[13px] text-bone/55">{plan.detail} · se renueva el 1 del próximo mes</p>
                          </div>
                          <div className="rounded-2xl border border-bone/10 p-5 sm:w-56">
                            <Sparkles className="size-4 text-clay" strokeWidth={1.4} />
                            <p className="mt-4 text-[12px] leading-relaxed text-bone/70">Beneficio desbloqueado: trae a una amiga a tu próxima clase.</p>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-20 text-center">
          <p className="display text-[clamp(1.8rem,3.6vw,3.2rem)] text-bone/90">
            Una experiencia que no termina <em className="text-clay">cuando termina la clase.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
