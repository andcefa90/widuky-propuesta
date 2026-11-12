"use client";

import { AnimatePresence } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Chrome } from "@/components/chrome";
import { DemoProvider, SmoothScroll, useLenis } from "@/components/providers";
import { Cursor } from "@/components/ui";
import { Activations } from "@/components/sections/activations";
import { Booking } from "@/components/sections/booking";
import { Business } from "@/components/sections/business";
import { Closing } from "@/components/sections/closing";
import { Community } from "@/components/sections/community";
import { Experience } from "@/components/sections/experience";
import { Finder } from "@/components/sections/finder";
import { Flow } from "@/components/sections/flow";
import { Future } from "@/components/sections/future";
import { Idea } from "@/components/sections/idea";
import { Intro } from "@/components/sections/intro";
import { Journey } from "@/components/sections/journey";
import { Memberships } from "@/components/sections/memberships";

function Presentation() {
  const [entered, setEntered] = useState(false);
  const lenis = useLenis();

  // Hold the page still behind the intro; release it once the visitor steps in.
  useEffect(() => {
    if (entered) {
      lenis?.start();
      document.documentElement.style.overflow = "";
    } else {
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true });
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [entered, lenis]);

  const restart = useCallback(() => setEntered(false), []);

  return (
    <>
      <AnimatePresence>{!entered && <Intro onEnter={() => setEntered(true)} />}</AnimatePresence>
      <Chrome visible={entered} />
      <main>
        <Idea />
        <Experience />
        <Finder />
        <Booking />
        <Memberships />
        <Journey />
        <Flow />
        <Community />
        <Activations />
        <Business />
        <Future />
        <Closing onRestart={restart} />
      </main>
      <Cursor />
      <div className="grain" aria-hidden />
    </>
  );
}

export default function Page() {
  return (
    <SmoothScroll>
      <DemoProvider>
        <Presentation />
      </DemoProvider>
    </SmoothScroll>
  );
}
