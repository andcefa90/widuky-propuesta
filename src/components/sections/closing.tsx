"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE, MagneticButton } from "../ui";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(12px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, margin: "-15% 0px" },
  transition: { duration: 1.6, ease: EASE, delay },
});

/** Cierre. A clean frame where the message arrives slowly, line by line. */
export function Closing({ onRestart }: { onRestart: () => void }) {
  const [talk, setTalk] = useState(false);

  return (
    <section id="cierre" className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-bone px-6 py-32 text-center">
      <motion.h2 {...fade(0)} className="text-[clamp(3.4rem,13vw,11rem)] leading-none font-extralight tracking-[0.2em]">
        WIDUKY
      </motion.h2>
      <motion.p {...fade(0.6)} className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] text-clay italic">
        Move different.
      </motion.p>
      <motion.p {...fade(1.2)} className="mt-14 max-w-md text-[15px] leading-relaxed text-stone">
        Esta es solo una visión de lo que podríamos construir juntos.
      </motion.p>

      <motion.span {...fade(1.6)} className="mt-16 block h-16 w-px bg-ink/20" />

      <motion.p {...fade(1.9)} className="mt-16 text-[clamp(1.1rem,2.2vw,1.6rem)] font-light tracking-[0.16em] uppercase">
        No creamos solo páginas web.
      </motion.p>
      <motion.p {...fade(2.3)} className="display mt-4 max-w-3xl text-[clamp(1.8rem,3.6vw,3.2rem)]">
        Creamos experiencias digitales que conectan marcas con personas.
      </motion.p>

      <motion.div {...fade(2.8)} className="mt-14">
        <MagneticButton size="lg" onClick={() => setTalk(true)} cursor="Hablemos">
          Conversemos
        </MagneticButton>
      </motion.div>

      <AnimatePresence>
        {talk && (
          <motion.div
            data-dark
            className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-ink px-6 text-center text-bone"
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="eyebrow text-bone/50">
              Gracias por tu tiempo
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.9, duration: 1.2, ease: EASE }}
              className="display mt-6 max-w-3xl text-[clamp(2.4rem,6vw,5.4rem)]"
            >
              Construyamos el futuro digital de <span className="text-clay italic">WIDUKY</span>.
            </motion.h3>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.9, ease: EASE }} className="mt-12 flex flex-wrap justify-center gap-3">
              <MagneticButton
                variant="light"
                onClick={() => {
                  setTalk(false);
                  onRestart();
                }}
                icon={false}
              >
                Volver al inicio
              </MagneticButton>
              <MagneticButton variant="outline-light" onClick={() => setTalk(false)} icon={false}>
                Cerrar
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.2em] whitespace-nowrap text-stone/70 uppercase">
        Propuesta conceptual · Datos e imágenes ilustrativos
      </p>
    </section>
  );
}
