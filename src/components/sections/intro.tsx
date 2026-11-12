"use client";

import { motion } from "motion/react";
import { img } from "@/lib/data";
import { EASE, MagneticButton } from "../ui";

const LETTERS = "WIDUKY".split("");

/**
 * Pantalla 01. Fullscreen overlay. On exit the whole frame lifts like a curtain
 * while the photograph pushes in, so the visitor "enters" rather than changes slide.
 */
export function Intro({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.section
      key="intro"
      data-dark
      className="fixed inset-0 z-[70] overflow-hidden bg-bone"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
    >
      {/* Photograph: fades in from a clean frame, then breathes */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 1, scale: 1.04 }}
        exit={{ scale: 1.3, filter: "blur(6px)" }}
        transition={{ duration: 3.2, ease: EASE }}
      >
        <motion.img
          src={img("hero")}
          alt="Mujer entrenando Pilates Reformer en un estudio cálido"
          className="h-full w-full object-cover object-[80%_50%] md:object-[60%_50%]"
          animate={{ scale: [1, 1.07, 1], x: ["0%", "-1.5%", "0%"] }}
          transition={{ duration: 26, ease: "easeInOut", repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/10 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(29,27,24,0.45)_100%)]" />
      </motion.div>

      {/* Corner meta */}
      <motion.div
        className="eyebrow absolute top-6 left-5 hidden text-bone/80 sm:block md:top-8 md:left-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{ delay: 3.6, duration: 1.2 }}
      >
        Propuesta conceptual
      </motion.div>
      <motion.div
        className="eyebrow absolute inset-x-0 top-6 text-center text-bone/80 sm:inset-x-auto sm:right-5 sm:text-right md:top-8 md:right-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.4 } }}
        transition={{ delay: 3.6, duration: 1.2 }}
      >
        Los Angeles, California
      </motion.div>

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-bone">
        <motion.h1
          className="flex text-[clamp(3.6rem,15vw,13rem)] leading-none font-light tracking-[0.18em]"
          exit={{ y: -60, opacity: 0, filter: "blur(14px)" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-label="WIDUKY"
        >
          {LETTERS.map((l, i) => (
            <motion.span
              key={i}
              aria-hidden
              initial={{ opacity: 0, y: 40, filter: "blur(18px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.6, ease: EASE, delay: 1.1 + i * 0.09 }}
            >
              {l}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="eyebrow mt-6 text-bone/85 md:mt-8"
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.32em" }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)", transition: { duration: 0.7 } }}
          transition={{ duration: 1.8, ease: EASE, delay: 2.1 }}
        >
          Pilates · Movement · Wellness
        </motion.p>

        <motion.p
          className="display mt-10 max-w-xl text-[clamp(1.6rem,3.4vw,2.6rem)] text-bone italic"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -30, filter: "blur(8px)", transition: { duration: 0.7 } }}
          transition={{ duration: 1.4, ease: EASE, delay: 2.9 }}
        >
          Una nueva experiencia digital para WIDUKY.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
          transition={{ duration: 1.2, ease: EASE, delay: 3.6 }}
        >
          <MagneticButton variant="light" size="lg" onClick={onEnter} cursor="Entrar">
            Explorar propuesta
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-bone/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.3 } }}
        transition={{ delay: 4.4, duration: 1.2 }}
      >
        <span className="eyebrow">Move different</span>
        <motion.span
          className="block h-10 w-px origin-top bg-bone/50"
          animate={{ scaleY: [0, 1, 0], originY: [0, 0, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.section>
  );
}
