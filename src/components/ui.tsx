"use client";

import { animate, motion, useInView, useMotionValue, useSpring, useTransform, type HTMLMotionProps, type MotionValue } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Maps a scroll progress range to a number. Uses the function form of useTransform on purpose:
 * range-form transforms on opacity/filter get offloaded to ScrollTimeline, which can stall after
 * programmatic scroll jumps (nav clicks). The function form always updates on the main thread.
 */
export function useRange(p: MotionValue<number>, [a, b]: [number, number], [from, to]: [number, number]) {
  return useTransform(p, (v) => {
    const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
    return from + (to - from) * t;
  });
}

export function useBlur(p: MotionValue<number>, range: [number, number], px: number) {
  const v = useRange(p, range, [px, 0]);
  return useTransform(v, (n) => `blur(${n.toFixed(2)}px)`);
}

/* ---------- Reveal: fade + rise + blur on enter ---------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  ...rest
}: { children: React.ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<"div">, "children">) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* ---------- SplitWords: masked word-by-word rise ---------- */

export function SplitWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            initial={{ y: "110%", rotate: 4 }}
            whileInView={{ y: "0%", rotate: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 1.1, ease: EASE, delay: delay + i * stagger }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* ---------- Counter: number ticks up when visible ---------- */

export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  decimals = 0,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const from = useRef(0);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(from.current, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`;
      },
    });
    from.current = value;
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------- Section label: "03 — La idea" ---------- */

export function SectionLabel({ index, children, light }: { index: string; children: React.ReactNode; light?: boolean }) {
  return (
    <Reveal className={`eyebrow flex items-center gap-4 ${light ? "text-bone/60" : "text-stone"}`}>
      <span className={light ? "text-bone" : "text-ink"}>{index}</span>
      <span className={`h-px w-10 ${light ? "bg-bone/30" : "bg-ink/20"}`} />
      <span>{children}</span>
    </Reveal>
  );
}

/* ---------- Magnetic button ---------- */

type MagneticProps = {
  children: React.ReactNode;
  variant?: "dark" | "light" | "outline" | "outline-light";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
  onClick?: () => void;
  cursor?: string;
  disabled?: boolean;
};

export function MagneticButton({
  children,
  variant = "dark",
  size = "md",
  icon = true,
  className = "",
  onClick,
  cursor,
  disabled,
}: MagneticProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.3);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.4);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const styles = {
    dark: "bg-ink text-bone hover:bg-ink-soft",
    light: "bg-bone text-ink hover:bg-white",
    outline: "border border-ink/25 text-ink hover:border-ink",
    "outline-light": "border border-bone/40 text-bone hover:border-bone",
  }[variant];
  const sizes = size === "lg" ? "h-14 px-8 text-[12px]" : "h-12 px-6 text-[11px]";

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      disabled={disabled}
      data-cursor={cursor ?? "hover"}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={`group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium tracking-[0.22em] uppercase transition-colors duration-500 disabled:opacity-40 ${styles} ${sizes} ${className}`}
    >
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative grid size-4 place-items-center overflow-hidden">
          <ArrowUpRight className="size-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-4 group-hover:-translate-y-4" strokeWidth={1.5} />
          <ArrowUpRight className="absolute size-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1.5} />
        </span>
      )}
    </motion.button>
  );
}

/* ---------- Custom cursor (fine pointers only) ---------- */

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<"default" | "hover" | "label">("default");
  const [label, setLabel] = useState("");
  const [onDark, setOnDark] = useState(false);
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const rx = useSpring(mx, { stiffness: 350, damping: 32, mass: 0.5 });
  const ry = useSpring(my, { stiffness: 350, damping: 32, mass: 0.5 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    let last = { x: -100, y: -100 };
    const update = (t: HTMLElement | null) => {
      const el = t?.closest<HTMLElement>("[data-cursor], a, button");
      const dark = !!t?.closest("[data-dark]");
      setOnDark(dark);
      if (!el) {
        setState("default");
        return;
      }
      const c = el.dataset.cursor;
      if (c && c !== "hover") {
        setState("label");
        setLabel(c);
      } else setState("hover");
    };
    const move = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      mx.set(e.clientX);
      my.set(e.clientY);
      update(e.target as HTMLElement | null);
    };
    // Content slides under a still pointer while scrolling; re-evaluate what is beneath it.
    const scroll = () => update(document.elementFromPoint(last.x, last.y) as HTMLElement | null);
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [mx, my]);

  if (!enabled) return null;
  const size = state === "label" ? 84 : state === "hover" ? 52 : 10;
  const color = onDark ? "#f7f3ed" : "#1d1b18";

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100]"
      style={{ x: rx, y: ry }}
    >
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
        animate={{
          width: size,
          height: size,
          backgroundColor: state === "label" ? color : state === "hover" ? "rgba(0,0,0,0)" : color,
          borderColor: state === "hover" ? color : "rgba(0,0,0,0)",
        }}
        style={{ borderWidth: 1, borderStyle: "solid" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {state === "label" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-medium tracking-[0.2em] uppercase"
            style={{ color: onDark ? "#1d1b18" : "#f7f3ed" }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Image with slow hover zoom ---------- */

export function Photo({ src, alt, className = "", imgClassName = "" }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  return (
    <div className={`overflow-hidden bg-sand ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover transition-transform duration-[1.6s] ease-[var(--ease-expo)] ${imgClassName}`}
      />
    </div>
  );
}

/* ---------- Demo badge ---------- */

export function DemoTag({ children = "Demo · datos ficticios", light }: { children?: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-medium tracking-[0.2em] uppercase ${
        light ? "bg-bone/10 text-bone/70" : "bg-ink/5 text-stone"
      }`}
    >
      <span className="size-1.5 animate-pulse rounded-full bg-clay" />
      {children}
    </span>
  );
}
