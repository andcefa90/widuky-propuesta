"use client";

import { motion, useScroll, type MotionValue } from "motion/react";
import { useRef } from "react";
import { useBlur, useRange } from "../ui";

const LINE_1 = "El movimiento no empieza en el estudio.".split(" ");
const LINE_2 = "Empieza desde el primer click.".split(" ");
const KEYWORDS = ["Discover", "Book", "Move", "Repeat"];

function Word({ p, range, children, serif }: { p: MotionValue<number>; range: [number, number]; children: string; serif?: boolean }) {
  const opacity = useRange(p, range, [0.1, 1]);
  const blur = useBlur(p, range, 6);
  const y = useRange(p, range, [serif ? 18 : 0, 0]);
  return (
    <motion.span style={{ opacity, filter: blur, y }} className="mr-[0.22em] inline-block">
      {children}
    </motion.span>
  );
}

function Keyword({ p, i, children }: { p: MotionValue<number>; i: number; children: string }) {
  const start = 0.62 + i * 0.07;
  const opacity = useRange(p, [start, start + 0.06], [0, 1]);
  const y = useRange(p, [start, start + 0.06], [40, 0]);
  const blur = useBlur(p, [start, start + 0.06], 10);
  return (
    <motion.div style={{ opacity, y, filter: blur }} className="flex items-baseline gap-3">
      <span className="eyebrow text-stone">0{i + 1}</span>
      <span className="text-[clamp(1.3rem,2.3vw,2.4rem)] font-light tracking-[0.06em] uppercase">{children}</span>
    </motion.div>
  );
}

/** Pantalla 02. A pinned stage where the manifesto writes itself as you scroll. */
export function Idea() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const paraOpacity = useRange(p, [0.5, 0.6], [0, 1]);
  const paraY = useRange(p, [0.5, 0.6], [30, 0]);
  const lineScale = useRange(p, [0.58, 0.95], [0, 1]);

  const n1 = LINE_1.length;
  const n2 = LINE_2.length;

  return (
    <section id="idea" ref={ref} className="relative h-[420vh] bg-bone">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden px-5 md:px-10 lg:px-20">
        <div className="eyebrow mb-8 flex items-center gap-4 text-stone md:mb-12">
          <span className="text-ink">02</span>
          <span className="h-px w-10 bg-ink/20" />
          <span>La idea</span>
        </div>

        <h2 className="max-w-[16ch] text-[clamp(2.1rem,7.2vw,7.6rem)] leading-[0.95] font-normal tracking-[-0.035em] uppercase">
          {LINE_1.map((w, i) => (
            <Word key={i} p={p} range={[0.02 + (i / n1) * 0.26, 0.06 + (i / n1) * 0.26]}>
              {w}
            </Word>
          ))}
        </h2>
        <h2 className="display mt-3 text-[clamp(2.2rem,7vw,7.4rem)] text-clay italic md:mt-5">
          {LINE_2.map((w, i) => (
            <Word key={i} p={p} serif range={[0.32 + (i / n2) * 0.16, 0.37 + (i / n2) * 0.16]}>
              {w}
            </Word>
          ))}
        </h2>

        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <motion.p style={{ opacity: paraOpacity, y: paraY }} className="max-w-md text-[15px] leading-relaxed text-stone md:col-span-5 md:text-base">
            La oportunidad es crear una experiencia digital que haga que descubrir WIDUKY, elegir una clase, reservar y
            volver sea tan sencillo como disfrutar una sesión.
          </motion.p>
          <div className="relative md:col-span-7">
            <motion.span style={{ scaleX: lineScale }} className="absolute -top-4 left-0 block h-px w-full origin-left bg-ink/15" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:flex md:flex-wrap md:justify-between">
              {KEYWORDS.map((k, i) => (
                <Keyword key={k} p={p} i={i}>
                  {k}
                </Keyword>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
