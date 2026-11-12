"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check } from "lucide-react";
import { useState } from "react";
import { FREQUENCIES, PLANS } from "@/lib/data";
import { useDemo } from "../providers";
import { Counter, DemoTag, EASE, MagneticButton, Reveal, SectionLabel, SplitWords } from "../ui";

/** Pantalla 06. Frequency → recommended plan, with the full plan lineup below. */
export function Memberships() {
  const [freqId, setFreqId] = useState("2");
  const [chosen, setChosen] = useState(false);
  const { setPlanId } = useDemo();
  const freq = FREQUENCIES.find((f) => f.id === freqId)!;
  const plan = PLANS.find((p) => p.id === freq.plan)!;
  const perClass = freq.classes > 0 ? plan.price / freq.classes : null;

  const choose = (id: string) => {
    setFreqId(id);
    setChosen(false);
  };

  return (
    <section id="membresias" className="relative bg-cream px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center">
          <div className="flex justify-center">
            <SectionLabel index="06">Membership</SectionLabel>
          </div>
          <SplitWords as="h2" text="Encuentra tu ritmo." className="display mt-8 text-[clamp(2.8rem,7vw,6.4rem)]" />
          <Reveal delay={0.15} className="mt-4 text-[clamp(1.1rem,2vw,1.4rem)] text-stone">
            ¿Cuánto quieres moverte?
          </Reveal>
        </div>

        {/* Frequency selector */}
        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <div className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full border border-ink/10 bg-bone/70 p-1.5 backdrop-blur">
            {FREQUENCIES.map((f) => (
              <button
                key={f.id}
                onClick={() => choose(f.id)}
                className="relative shrink-0 rounded-full px-4 py-3 text-[10px] font-medium tracking-[0.18em] whitespace-nowrap uppercase md:px-6 md:text-[11px]"
              >
                {freqId === f.id && (
                  <motion.span layoutId="freq-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                )}
                <span className={`relative transition-colors duration-300 ${freqId === f.id ? "text-bone" : "text-ink/60 hover:text-ink"}`}>{f.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Recommendation */}
        <div className="mx-auto mt-10 max-w-3xl">
          <div className="relative overflow-hidden rounded-[28px] bg-ink px-7 py-10 text-bone md:px-14 md:py-14" data-dark>
            <div className="pointer-events-none absolute -top-24 -right-24 size-72 rounded-full bg-clay/25 blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={freqId}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: EASE }}
                className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-end"
              >
                <div>
                  <span className="eyebrow text-clay">Tu mejor opción</span>
                  <h3 className="mt-4 text-[clamp(2.4rem,5vw,4rem)] leading-none font-light tracking-[0.06em] uppercase">{plan.name}</h3>
                  <p className="mt-3 text-[12px] tracking-[0.22em] text-bone/60 uppercase">{plan.detail}</p>
                  <p className="display mt-6 max-w-sm text-xl text-bone/80 italic">{freq.note}</p>
                </div>
                <div className="md:text-right">
                  <div className="flex items-baseline gap-2 md:justify-end">
                    <Counter value={plan.price} prefix="$" duration={1} className="text-[clamp(3.2rem,7vw,5rem)] leading-none font-light tabular-nums" />
                    <span className="text-sm text-bone/60">{plan.unit}</span>
                  </div>
                  <p className="mt-2 text-[12px] text-bone/50">
                    {perClass ? `≈ $${perClass.toFixed(perClass < 10 ? 2 : 0)} por clase` : "Clases sin límite"}
                  </p>
                  <div className="mt-7">
                    <MagneticButton
                      variant="light"
                      onClick={() => {
                        setPlanId(plan.id);
                        setChosen(true);
                      }}
                      cursor="Elegir"
                    >
                      {chosen ? "¡Membresía elegida!" : "Conocer membresía"}
                    </MagneticButton>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Plans */}
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((p, i) => {
            const match = p.id === plan.id;
            return (
              <Reveal key={p.id} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`relative flex h-full flex-col rounded-[22px] border p-7 transition-colors duration-700 ${
                    match ? "border-ink bg-bone" : "border-ink/10 bg-bone/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-stone">0{i + 1}</span>
                    {p.badge && <span className="rounded-full bg-sand px-3 py-1 text-[9px] tracking-[0.2em] uppercase">{p.badge}</span>}
                  </div>
                  <h4 className="mt-10 text-2xl font-light tracking-[0.08em] uppercase">{p.name}</h4>
                  <p className="mt-1 text-[12px] text-stone">{p.detail}</p>
                  <p className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-light">${p.price}</span>
                    <span className="text-[12px] text-stone">{p.unit}</span>
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-ink/10 pt-6 text-[13px] text-ink/80">
                    {p.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-clay" strokeWidth={1.8} /> {perk}
                      </li>
                    ))}
                  </ul>
                  <motion.span
                    className="absolute top-0 left-7 h-[3px] rounded-b-full bg-clay"
                    animate={{ width: match ? 40 : 0 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  />
                </motion.div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-6 flex justify-center">
          <DemoTag>Precios ilustrativos</DemoTag>
        </div>
      </div>
    </section>
  );
}
