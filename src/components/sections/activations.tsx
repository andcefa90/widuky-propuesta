"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { img } from "@/lib/data";
import { EASE, Reveal, SectionLabel, SplitWords } from "../ui";

const ITEMS = [
  { t: "Private Events", es: "Eventos privados", d: "Cumpleaños, bridal showers y celebraciones con una clase diseñada a medida.", src: "studio-arch" },
  { t: "Brand Activations", es: "Activaciones de marca", d: "Colaboraciones con marcas de moda, belleza y bienestar que comparten el mismo público.", src: "activation" },
  { t: "Corporate Wellness", es: "Bienestar corporativo", d: "Programas para equipos que buscan energía, foco y cultura — en el estudio o en la oficina.", src: "corporate" },
  { t: "Community Events", es: "Eventos de comunidad", d: "Encuentros, talleres y rituales que convierten clientes en comunidad.", src: "community-2" },
  { t: "Pop-up Classes", es: "Clases pop-up", d: "WIDUKY fuera de sus paredes: playas, rooftops y espacios icónicos de Los Angeles.", src: "popup" },
  { t: "Private Sessions", es: "Sesiones privadas", d: "Atención uno a uno con instructoras senior, reservable en un toque.", src: "private" },
];

/** Pantalla 10. Index-style list; on desktop a photo follows the cursor, on touch each row carries its own image. */
export function Activations() {
  const [hover, setHover] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.6 });
  const y = useSpring(useMotionValue(0), { stiffness: 150, damping: 20, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    if (!listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="activaciones" className="relative bg-bone px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <SectionLabel index="10">Activations</SectionLabel>
            <SplitWords as="h2" text="WIDUKY goes beyond the studio." className="display mt-8 text-[clamp(2.6rem,6.4vw,6rem)]" />
          </div>
          <Reveal delay={0.15} className="text-[15px] leading-relaxed text-stone md:col-span-4">
            Una plataforma para activar nuevas experiencias y oportunidades — y para comercializarlas con la misma elegancia
            que una clase.
          </Reveal>
        </div>

        <div ref={listRef} onPointerMove={onMove} onPointerLeave={() => setHover(null)} className="relative mt-16 border-t border-ink/12 md:mt-24">
          {/* Floating preview (fine pointers) */}
          <motion.div style={{ x, y }} className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block">
            <AnimatePresence>
              {hover !== null && (
                <motion.div
                  key={hover}
                  className="h-[300px] w-[240px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl shadow-2xl"
                  initial={{ opacity: 0, scale: 0.7, rotate: -4, clipPath: "inset(50% 0% 50% 0%)" }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <img src={img(ITEMS[hover].src)} alt="" className="h-full w-full object-cover" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.05} y={20}>
              <div
                onPointerEnter={(e) => e.pointerType === "mouse" && setHover(i)}
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-b border-ink/12 py-7 md:grid-cols-12 md:py-9"
                data-cursor="Explorar"
              >
                <span className="eyebrow text-stone md:col-span-1">0{i + 1}</span>
                <div className="md:col-span-6">
                  <h3
                    className={`text-[clamp(1.5rem,3.6vw,3.2rem)] leading-none font-light tracking-[0.02em] uppercase transition-all duration-700 ease-[var(--ease-expo)] ${
                      hover === null || hover === i ? "text-ink" : "text-ink/25"
                    } md:group-hover:translate-x-4`}
                  >
                    {it.t}
                  </h3>
                  <p className="display mt-2 text-lg text-clay italic md:hidden">{it.es}</p>
                </div>
                <ArrowUpRight
                  className="size-6 text-ink/40 transition-all duration-500 group-hover:rotate-45 group-hover:text-ink md:order-last md:col-span-1 md:justify-self-end"
                  strokeWidth={1.2}
                />
                <div className="col-span-3 mt-4 md:col-span-4 md:mt-0">
                  <p className="display hidden text-xl text-clay italic md:block">{it.es}</p>
                  <p className="mt-1 max-w-sm text-[14px] leading-relaxed text-stone">{it.d}</p>
                </div>
                <div className="col-span-3 mt-5 aspect-[16/10] overflow-hidden rounded-xl md:hidden">
                  <img src={img(it.src)} alt={it.t} loading="lazy" className="h-full w-full object-cover" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
