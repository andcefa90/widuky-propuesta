"use client";

import { motion } from "motion/react";
import { BadgeCheck, CalendarCheck, Layers, LineChart, Sparkles, Users } from "lucide-react";
import { DemoTag, EASE, Reveal, SectionLabel, SplitWords } from "../ui";

const STEPS = [
  { k: "Atraer", d: "Nuevos clientes." },
  { k: "Convertir", d: "Visitas en reservas." },
  { k: "Fidelizar", d: "Clientes que regresan." },
  { k: "Crecer", d: "Una comunidad propia." },
];

const MODULES = [
  { icon: CalendarCheck, k: "Reservas", d: "Agenda siempre llena, sin mensajes de ida y vuelta." },
  { icon: BadgeCheck, k: "Membresías", d: "Ingresos recurrentes y predecibles." },
  { icon: Users, k: "Clientes", d: "Cada miembro con su historia y preferencias." },
  { icon: Layers, k: "Clases", d: "Horarios, cupos e instructoras en un solo lugar." },
  { icon: Sparkles, k: "Eventos", d: "Nuevas líneas de ingreso fuera del horario regular." },
  { icon: LineChart, k: "Analítica", d: "Decisiones basadas en datos, no en intuición." },
];

const BARS = [38, 46, 42, 58, 64, 61, 72, 80, 77, 88, 94, 100];

/** Pantalla 11. The narrative turns to business value: a funnel, then the engine behind it. */
export function Business() {
  return (
    <section id="negocio" data-dark className="relative overflow-hidden bg-ink px-5 py-28 text-bone md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel index="11" light>
          The business
        </SectionLabel>
        <SplitWords as="h2" text="No se trata solo de una página." className="display mt-8 max-w-[14ch] text-[clamp(2.8rem,7vw,6.6rem)]" />

        {/* Funnel */}
        <div className="mt-20 grid gap-px overflow-hidden rounded-[26px] border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.15 }}
              className="group relative flex min-h-[260px] flex-col justify-between bg-ink p-7 transition-colors duration-700 hover:bg-ink-soft md:min-h-[340px] md:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="eyebrow text-bone/40">0{i + 1}</span>
                {i < STEPS.length - 1 && <span className="text-bone/30 transition-transform duration-700 group-hover:translate-x-2">→</span>}
              </div>
              <div>
                <h3 className="text-[clamp(2rem,3.4vw,3.2rem)] leading-none font-light tracking-[0.06em] uppercase">{s.k}</h3>
                <p className="display mt-3 text-2xl text-clay italic">{s.d}</p>
              </div>
              <motion.span
                className="absolute bottom-0 left-0 h-[2px] bg-clay"
                initial={{ width: 0 }}
                whileInView={{ width: `${(i + 1) * 25}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, ease: EASE, delay: 0.4 + i * 0.15 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Engine */}
        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="display text-[clamp(1.8rem,3.2vw,2.8rem)] text-bone/90">
                La tecnología detrás de la experiencia puede convertirse en una <em className="text-clay">herramienta para hacer crecer el estudio.</em>
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-12 rounded-[22px] border border-bone/10 bg-bone/[0.04] p-6 md:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="eyebrow text-bone/50">Reservas online · 12 semanas</p>
                  <p className="mt-3 text-4xl font-extralight">Tendencia</p>
                </div>
                <DemoTag light>Ilustrativo</DemoTag>
              </div>
              <div className="mt-8 flex h-32 items-end gap-1.5">
                {BARS.map((b, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 origin-bottom rounded-t-[3px] bg-gradient-to-t from-bone/15 to-bone/60"
                    style={{ height: `${b}%` }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.05 }}
                  />
                ))}
              </div>
            </Reveal>
          </div>

          <div className="grid gap-px overflow-hidden rounded-[22px] border border-bone/10 bg-bone/10 sm:grid-cols-2 lg:col-span-7">
            {MODULES.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 1, delay: i * 0.08 }}
                className="group bg-ink p-7 transition-colors duration-700 hover:bg-ink-soft md:p-8"
              >
                <m.icon className="size-5 text-clay transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:scale-110" strokeWidth={1.3} />
                <h4 className="mt-10 text-[15px] font-medium tracking-[0.22em] uppercase">{m.k}</h4>
                <p className="mt-2 text-[13px] leading-relaxed text-bone/55">{m.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
