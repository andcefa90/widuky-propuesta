"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { img } from "@/lib/data";
import { useRange } from "../ui";

type Item = { src: string; tag: string; caption: string; w: string; h: string; align: string };

const ITEMS: Item[] = [
  { src: "community-3", tag: "Comunidad", caption: "Las que llegan solas y se van con amigas.", w: "w-[78vw] md:w-[38vw]", h: "h-[52vh] md:h-[62vh]", align: "self-end" },
  { src: "reformer-arch", tag: "Clases", caption: "Reformer al amanecer.", w: "w-[62vw] md:w-[24vw]", h: "h-[40vh] md:h-[46vh]", align: "self-start" },
  { src: "event-outdoor", tag: "Eventos", caption: "Sunset session al aire libre.", w: "w-[66vw] md:w-[26vw]", h: "h-[46vh] md:h-[58vh]", align: "self-center" },
  { src: "coaching", tag: "Instructores", caption: "Atención real, corrección precisa.", w: "w-[80vw] md:w-[34vw]", h: "h-[40vh] md:h-[44vh]", align: "self-end" },
  { src: "community-1", tag: "Wellness", caption: "Bienestar que se comparte.", w: "w-[64vw] md:w-[24vw]", h: "h-[48vh] md:h-[60vh]", align: "self-start" },
  { src: "activation", tag: "Activaciones", caption: "WIDUKY × marcas afines.", w: "w-[74vw] md:w-[30vw]", h: "h-[44vh] md:h-[52vh]", align: "self-center" },
  { src: "tower", tag: "Experiencias", caption: "Momentos que se vuelven ritual.", w: "w-[62vw] md:w-[22vw]", h: "h-[50vh] md:h-[60vh]", align: "self-end" },
];

/** Pantalla 09. Editorial gallery that travels sideways as you scroll down. */
export function Community() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(p, [0.08, 1], [0, -distance]);
  const titleX = useTransform(p, [0, 0.4], ["0%", "-30%"]);
  const titleOpacity = useRange(p, [0.12, 0.3], [1, 0.12]);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section id="comunidad" ref={ref} className="relative h-[420vh] bg-cream">
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <motion.div style={{ x: titleX, opacity: titleOpacity }} className="pointer-events-none absolute top-24 left-5 z-0 md:top-28 md:left-10 lg:left-20">
          <div className="eyebrow flex items-center gap-4 text-stone">
            <span className="text-ink">09</span>
            <span className="h-px w-10 bg-ink/20" />
            <span>Community</span>
          </div>
          <h2 className="mt-6 text-[clamp(2.6rem,7vw,7rem)] leading-[0.92] font-light tracking-[-0.01em] whitespace-nowrap uppercase">
            No es solo Pilates.
          </h2>
          <h2 className="display text-[clamp(2.8rem,7.6vw,7.6rem)] whitespace-nowrap text-clay italic">Es una comunidad.</h2>
        </motion.div>

        <motion.div ref={trackRef} style={{ x }} className="relative z-10 mt-auto mb-8 flex h-[72vh] w-max items-stretch gap-5 pr-[10vw] pl-[70vw] md:mb-10 md:gap-8 md:pl-[66vw]">
          {ITEMS.map((it, i) => (
            <Card key={it.src} it={it} i={i} p={p} />
          ))}
          <div className="flex w-[70vw] shrink-0 flex-col justify-center self-center md:w-[28vw]">
            <div className="flex flex-wrap gap-2">
              {["Eventos", "Wellness", "Activaciones", "Experiencias"].map((t) => (
                <span key={t} className="rounded-full border border-ink/20 px-4 py-2 text-[11px] tracking-[0.2em] uppercase">
                  {t}
                </span>
              ))}
            </div>
            <p className="display mt-8 text-[clamp(1.8rem,3vw,2.8rem)]">
              Una plataforma para que la comunidad WIDUKY se vea, se sienta y <em className="text-clay">crezca.</em>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Card({ it, i, p }: { it: Item; i: number; p: MotionValue<number> }) {
  // Each photo drifts inside its frame for a subtle parallax depth.
  const imgX = useTransform(p, [0, 1], ["6%", "-6%"]);
  return (
    <figure className={`group relative shrink-0 ${it.w} ${it.h} ${it.align}`} data-cursor="Ver">
      <div className="h-full w-full overflow-hidden rounded-[6px] bg-sand">
        <motion.img
          src={img(it.src)}
          alt={it.caption}
          loading="lazy"
          style={{ x: imgX, scale: 1.18 }}
          className="h-full w-full object-cover grayscale-[25%] transition-[filter] duration-1000 group-hover:grayscale-0"
        />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="eyebrow text-ink">
          <span className="text-stone">{String(i + 1).padStart(2, "0")} — </span>
          {it.tag}
        </span>
        <span className="hidden text-[12px] text-stone md:block">{it.caption}</span>
      </figcaption>
    </figure>
  );
}
