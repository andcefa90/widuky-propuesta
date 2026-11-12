"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Menu } from "lucide-react";
import { useRef } from "react";
import { img } from "@/lib/data";
import { EASE, Reveal, SectionLabel, SplitWords } from "../ui";

const CHIPS = [
  { label: "Reformer", pos: "left-[4%] top-[14%]", depth: 18, dur: 6 },
  { label: "Mat", pos: "right-[6%] top-[8%]", depth: 28, dur: 7.5 },
  { label: "Private", pos: "left-[10%] bottom-[12%]", depth: 24, dur: 6.8 },
  { label: "Community", pos: "right-[4%] bottom-[22%]", depth: 14, dur: 8 },
];

/** Pantalla 03. A conceptual homepage presented inside a browser frame that settles into place on scroll. */
export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  // Mouse parallax for floating chips
  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !frameRef.current) return;
    const r = frameRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="experiencia" ref={ref} className="relative bg-bone px-4 pt-10 pb-32 md:px-10 md:pb-48">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 grid gap-8 px-1 md:mb-20 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <SectionLabel index="03">La nueva experiencia WIDUKY</SectionLabel>
            <SplitWords
              as="h2"
              text="El nuevo punto de entrada digital de WIDUKY."
              className="display mt-8 text-[clamp(2.6rem,6vw,5.8rem)]"
            />
          </div>
          <Reveal delay={0.2} className="text-[15px] leading-relaxed text-stone md:col-span-4 md:col-start-9">
            Así podría sentirse WIDUKY desde el primer segundo: editorial, cálido y con un solo objetivo claro — que reservar
            sea irresistible.
          </Reveal>
        </div>

        <div style={{ perspective: 1600 }}>
          <motion.div
            ref={frameRef}
            onPointerMove={onMove}
            style={{ rotateX, scale, y, transformOrigin: "50% 0%" }}
            className="overflow-hidden rounded-[18px] border border-ink/10 bg-[#fbf9f5] shadow-[0_60px_120px_-40px_rgba(29,27,24,0.35)] md:rounded-[24px]"
          >
            {/* Browser bar */}
            <div className="flex items-center gap-3 border-b border-ink/8 bg-cream/60 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-ink/15" />
                <span className="size-2.5 rounded-full bg-ink/15" />
                <span className="size-2.5 rounded-full bg-ink/15" />
              </div>
              <div className="mx-auto rounded-full bg-bone px-4 py-1 text-[11px] tracking-wide text-stone">widuky.com</div>
              <span className="w-10" />
            </div>

            {/* Mock nav */}
            <div className="flex items-center justify-between px-5 py-5 md:px-10">
              <span className="text-[12px] font-medium tracking-[0.4em]">WIDUKY</span>
              <div className="hidden gap-8 text-[11px] tracking-[0.2em] text-stone uppercase md:flex">
                <span>Clases</span>
                <span>Membresías</span>
                <span>Comunidad</span>
                <span>Eventos</span>
              </div>
              <span className="hidden rounded-full bg-ink px-4 py-2 text-[10px] tracking-[0.2em] text-bone uppercase md:inline">Reservar</span>
              <Menu className="size-5 md:hidden" strokeWidth={1.3} />
            </div>

            {/* Mock hero */}
            <div className="grid gap-8 px-5 pt-4 pb-10 md:grid-cols-12 md:gap-6 md:px-10 md:pb-14">
              <div className="flex flex-col justify-center md:col-span-5">
                <span className="eyebrow text-stone">Pilates Studio · Los Angeles</span>
                <h3 className="display mt-5 text-[clamp(2.6rem,5.4vw,5.2rem)]">
                  Mueve tu cuerpo.
                  <br />
                  <span className="text-clay italic">Cambia tu energía.</span>
                </h3>
                <p className="mt-5 max-w-sm text-[14px] leading-relaxed text-stone">
                  Reformer, mat y sesiones privadas en un espacio diseñado para que te sientas bien desde que llegas.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button data-cursor="Reservar" className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[10px] font-medium tracking-[0.2em] text-bone uppercase">
                    Reservar una clase
                    <ArrowRight className="size-3.5 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
                  </button>
                  <button className="inline-flex h-11 items-center rounded-full border border-ink/20 px-5 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors hover:border-ink">
                    Conocer WIDUKY
                  </button>
                </div>
              </div>

              <div className="relative h-[380px] md:col-span-7 md:h-[520px]">
                <div className="group absolute inset-y-0 right-0 left-[14%] overflow-hidden rounded-2xl" data-cursor="Ver">
                  <img src={img("reformer-plank")} alt="Clase de reformer" className="h-full w-full object-cover transition-transform duration-[1.8s] ease-[var(--ease-expo)] group-hover:scale-[1.06]" />
                </div>
                <div className="group absolute bottom-[8%] left-0 h-[46%] w-[34%] overflow-hidden rounded-xl border-[5px] border-[#fbf9f5] shadow-xl" data-cursor="Ver">
                  <img src={img("reformer-leg")} alt="Detalle de movimiento en reformer" className="h-full w-full object-cover transition-transform duration-[1.8s] ease-[var(--ease-expo)] group-hover:scale-110" />
                </div>
                {CHIPS.map((c) => (
                  <Chip key={c.label} {...c} mx={mx} my={my} />
                ))}
              </div>
            </div>

            {/* Marquee band */}
            <div className="overflow-hidden border-t border-ink/8 py-4">
              <motion.div
                className="flex w-max gap-10 text-[11px] tracking-[0.35em] whitespace-nowrap text-stone uppercase"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              >
                {Array.from({ length: 2 }).map((_, k) => (
                  <div key={k} className="flex gap-10">
                    {["Reformer", "Mat", "Private", "Community", "Wellness", "Events", "Los Angeles"].map((t) => (
                      <span key={t} className="flex items-center gap-10">
                        {t} <span className="size-1 rounded-full bg-taupe" />
                      </span>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        <Reveal className="mx-auto mt-16 max-w-2xl text-center md:mt-24">
          <p className="display text-[clamp(1.8rem,3.4vw,3rem)]">
            Una experiencia digital diseñada para convertir <em className="text-clay">curiosidad en acción.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Chip({
  label,
  pos,
  depth,
  dur,
  mx,
  my,
}: {
  label: string;
  pos: string;
  depth: number;
  dur: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, (v) => v * depth * -1.4);
  const y = useTransform(my, (v) => v * depth * -1.4);
  return (
    <motion.div style={{ x, y }} className={`absolute ${pos} z-10`}>
      <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: dur, repeat: Infinity, ease: "easeInOut" }, default: { duration: 0.9, ease: EASE } }}
        className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-bone/75 px-4 py-2 text-[10px] font-medium tracking-[0.25em] uppercase shadow-[0_10px_30px_-10px_rgba(29,27,24,0.3)] backdrop-blur-md"
      >
        <span className="size-1.5 rounded-full bg-clay" />
        {label}
      </motion.span>
    </motion.div>
  );
}
