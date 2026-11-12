"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarPlus, Clock, User } from "lucide-react";
import { useMemo, useState } from "react";
import { DAYS, img, scheduleFor, type ClassSlot } from "@/lib/data";
import { useDemo } from "../providers";
import { DemoTag, EASE, MagneticButton, Reveal, SectionLabel, SplitWords } from "../ui";

/** Pantalla 05. A visual-only booking flow: pick a day, pick a class, reserve. */
export function Booking() {
  const [day, setDay] = useState(0);
  const [confirmed, setConfirmed] = useState<ClassSlot | null>(null);
  const { bookings, addBooking } = useDemo();
  const slots = useMemo(() => scheduleFor(day), [day]);
  const booked = (key: string) => bookings.some((b) => b.key === key);

  const reserve = (slot: ClassSlot) => {
    addBooking({ ...slot, day: `${DAYS[day].short} ${DAYS[day].n}` });
    setConfirmed(slot);
  };

  return (
    <section id="reservar" className="relative overflow-hidden bg-bone px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionLabel index="05">Booking</SectionLabel>
          <SplitWords as="h2" text="Tu clase. Tu momento." className="display mt-8 text-[clamp(2.8rem,6vw,5.6rem)]" />
          <Reveal delay={0.15} className="mt-6 max-w-sm text-[15px] leading-relaxed text-stone">
            Una experiencia de reserva simple y fluida. Tres toques, cero fricción — tan natural en el celular como en el
            escritorio.
          </Reveal>
          <Reveal delay={0.25} className="mt-10 hidden overflow-hidden rounded-2xl lg:block">
            <img src={img("reformer-side")} alt="Clase de reformer" className="aspect-[4/5] w-full object-cover" loading="lazy" />
          </Reveal>
        </div>

        <Reveal className="min-w-0 lg:col-span-7 lg:col-start-6" y={50}>
          <div className="relative overflow-hidden rounded-[26px] border border-ink/8 bg-[#fbf9f5] shadow-[0_40px_100px_-40px_rgba(29,27,24,0.3)]">
            <div className="flex items-center justify-between gap-3 border-b border-ink/8 px-5 py-5 md:px-8">
              <div>
                <p className="eyebrow text-stone">Esta semana · Los Angeles</p>
                <p className="mt-1 text-lg">Reservar una clase</p>
              </div>
              <DemoTag />
            </div>

            {/* Day strip */}
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pt-6 md:px-8">
              {DAYS.map((d, i) => (
                <button
                  key={d.n}
                  onClick={() => setDay(i)}
                  className="relative flex min-w-[52px] flex-1 flex-col items-center gap-1 rounded-2xl py-3.5 transition-colors"
                  data-cursor="hover"
                >
                  {day === i && (
                    <motion.span layoutId="day-pill" className="absolute inset-0 rounded-2xl bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                  )}
                  <span className={`relative text-[10px] tracking-[0.25em] transition-colors ${day === i ? "text-bone/70" : "text-stone"}`}>{d.short}</span>
                  <span className={`relative text-2xl font-light tabular-nums transition-colors ${day === i ? "text-bone" : "text-ink"}`}>{d.n}</span>
                </button>
              ))}
            </div>

            {/* Slots */}
            <div className="px-3 pt-4 pb-4 md:px-5 md:pb-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul key={day} initial="hidden" animate="show" exit="exit" className="flex flex-col">
                  {slots.map((s, i) => {
                    const isBooked = booked(s.key);
                    const spots = isBooked ? Math.max(0, s.spots - 1) : s.spots;
                    const full = s.spots === 0;
                    return (
                      <motion.li
                        key={s.key}
                        variants={{
                          hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
                          show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { delay: i * 0.06, duration: 0.6, ease: EASE } },
                          exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
                        }}
                        className="group flex flex-col gap-4 rounded-2xl px-3 py-5 transition-colors hover:bg-cream/70 sm:flex-row sm:items-center md:px-4"
                      >
                        <div className="flex items-center gap-4 sm:w-[120px] sm:flex-col sm:items-start sm:gap-1">
                          <span className="text-lg tabular-nums">{s.time}</span>
                          <span className="flex items-center gap-1.5 text-[11px] text-stone">
                            <Clock className="size-3" strokeWidth={1.5} /> {s.duration}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-[15px] font-medium tracking-[0.08em] uppercase">{s.name}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-stone">
                            <span className="flex items-center gap-1.5">
                              <User className="size-3" strokeWidth={1.5} />
                              {s.instructor}
                            </span>
                            <span>{s.level}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-5 sm:justify-end">
                          <div className="text-right">
                            <div className="flex justify-end gap-[3px]">
                              {Array.from({ length: 8 }).map((_, k) => (
                                <span key={k} className={`h-3 w-[3px] rounded-full ${k < spots ? "bg-clay" : "bg-ink/10"}`} />
                              ))}
                            </div>
                            <p className={`mt-1.5 text-[10px] tracking-[0.18em] uppercase ${full ? "text-stone" : "text-ink"}`}>
                              {full ? "Lista de espera" : `${spots} ${spots === 1 ? "cupo disponible" : "cupos disponibles"}`}
                            </p>
                          </div>
                          <button
                            disabled={full || isBooked}
                            onClick={() => reserve(s)}
                            data-cursor="Reservar"
                            className={`h-10 min-w-[112px] rounded-full px-5 text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-500 ${
                              isBooked
                                ? "bg-clay/15 text-clay"
                                : full
                                  ? "border border-ink/10 text-stone"
                                  : "bg-ink text-bone hover:scale-[1.04] hover:bg-ink-soft active:scale-95"
                            }`}
                          >
                            {isBooked ? "Reservada" : full ? "Avisarme" : "Reservar"}
                          </button>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Confirmation */}
            <AnimatePresence>
              {confirmed && (
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-ink px-8 text-center text-bone"
                  data-dark
                  initial={{ clipPath: "circle(0% at 50% 60%)" }}
                  animate={{ clipPath: "circle(140% at 50% 60%)" }}
                  exit={{ opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                  <svg viewBox="0 0 80 80" className="size-20">
                    <motion.circle cx="40" cy="40" r="38" fill="none" stroke="currentColor" strokeOpacity={0.3} strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 1, ease: EASE }} />
                    <motion.path d="M26 41 L36 51 L55 31" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.9, duration: 0.7, ease: EASE }} />
                  </svg>
                  <motion.h3 initial={{ opacity: 0, y: 20, filter: "blur(8px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ delay: 0.8, duration: 0.9, ease: EASE }} className="mt-8 text-[clamp(1.8rem,4vw,3rem)] font-light tracking-[0.12em] uppercase">
                    ¡Clase reservada!
                  </motion.h3>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="display mt-4 text-2xl text-bone/80 italic">
                    {confirmed.name} · {DAYS[day].short} {DAYS[day].n} · {confirmed.time}
                  </motion.p>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-2 text-sm text-bone/60">
                    Con {confirmed.instructor} · Te esperamos 10 minutos antes.
                  </motion.p>
                  <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 0.8, ease: EASE }} className="mt-10 flex flex-wrap justify-center gap-3">
                    <span className="inline-flex h-12 items-center gap-2 rounded-full border border-bone/25 px-5 text-[11px] tracking-[0.2em] text-bone/80 uppercase">
                      <CalendarPlus className="size-4" strokeWidth={1.4} /> Añadida a tu calendario
                    </span>
                    <MagneticButton variant="light" icon={false} onClick={() => setConfirmed(null)}>
                      Listo
                    </MagneticButton>
                  </motion.div>
                  <p className="mt-8 text-[11px] text-bone/40">Reserva de demostración — no se ha realizado ninguna reserva real.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
