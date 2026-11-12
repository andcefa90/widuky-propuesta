// Datos ficticios para la demo. Nada de esto se conecta a sistemas reales.

export const SECTIONS = [
  { id: "idea", label: "La idea" },
  { id: "experiencia", label: "La experiencia" },
  { id: "encuentra", label: "Find your flow" },
  { id: "reservar", label: "Booking" },
  { id: "membresias", label: "Membership" },
  { id: "journey", label: "Tu journey" },
  { id: "flow", label: "WIDUKY Flow" },
  { id: "comunidad", label: "Comunidad" },
  { id: "activaciones", label: "Activaciones" },
  { id: "negocio", label: "El negocio" },
  { id: "futuro", label: "El futuro" },
  { id: "cierre", label: "Cierre" },
] as const;

export const img = (name: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/${name}.jpg`;

export type Goal = {
  id: string;
  label: string;
  className: string;
  duration: string;
  intensity: string;
  intensityLevel: number;
  why: string;
  image: string;
};

export const GOALS: Goal[] = [
  {
    id: "empezar",
    label: "Quiero empezar",
    className: "Reformer — Foundations",
    duration: "45 MIN",
    intensity: "Intensidad suave",
    intensityLevel: 1,
    why: "Aprende los fundamentos del reformer a tu ritmo, con grupos pequeños y atención personalizada.",
    image: "reformer-kneel",
  },
  {
    id: "fuerza",
    label: "Quiero ganar fuerza",
    className: "Reformer — All Levels",
    duration: "50 MIN",
    intensity: "Intensidad media",
    intensityLevel: 2,
    why: "Resistencia controlada y trabajo de core para construir fuerza real, sin impacto.",
    image: "reformer-plank",
  },
  {
    id: "movilidad",
    label: "Quiero mejorar mi movilidad",
    className: "Mat & Mobility",
    duration: "50 MIN",
    intensity: "Intensidad baja",
    intensityLevel: 1,
    why: "Movimientos conscientes que liberan caderas, columna y hombros. Ideal para el día a día.",
    image: "mat-class",
  },
  {
    id: "desafiarme",
    label: "Quiero desafiarme",
    className: "Power Reformer",
    duration: "45 MIN",
    intensity: "Intensidad alta",
    intensityLevel: 3,
    why: "Ritmo elevado, transiciones fluidas y un reto que se siente desde el primer minuto.",
    image: "reformer-arch",
  },
  {
    id: "relajarme",
    label: "Quiero relajarme",
    className: "Slow Flow & Stretch",
    duration: "60 MIN",
    intensity: "Intensidad suave",
    intensityLevel: 1,
    why: "Respiración, estiramiento profundo y una pausa intencional para reconectar contigo.",
    image: "stretch",
  },
];

export const DAYS = [
  { short: "LUN", n: 12 },
  { short: "MAR", n: 13 },
  { short: "MIÉ", n: 14 },
  { short: "JUE", n: 15 },
  { short: "VIE", n: 16 },
];

const TIMES = ["06:00 AM", "07:00 AM", "08:30 AM", "10:00 AM", "06:00 PM"];
const CLASS_TYPES = [
  { name: "Reformer Flow", duration: "50 MIN", level: "Todos los niveles" },
  { name: "Reformer Sculpt", duration: "50 MIN", level: "Intermedio" },
  { name: "Mat & Mobility", duration: "45 MIN", level: "Todos los niveles" },
  { name: "Power Reformer", duration: "45 MIN", level: "Avanzado" },
  { name: "Slow Flow", duration: "60 MIN", level: "Principiante" },
];
const INSTRUCTORS = ["Sofía R.", "Valentina M.", "Camila T.", "Isabella G.", "Maya K."];
const SPOTS = [5, 2, 7, 0, 3, 4, 1];

export type ClassSlot = {
  key: string;
  time: string;
  name: string;
  duration: string;
  level: string;
  instructor: string;
  spots: number;
};

export function scheduleFor(day: number): ClassSlot[] {
  return TIMES.map((time, i) => {
    const t = CLASS_TYPES[(i + day) % CLASS_TYPES.length];
    return {
      key: `${day}-${i}`,
      time,
      ...t,
      instructor: INSTRUCTORS[(i * 2 + day) % INSTRUCTORS.length],
      spots: day === 0 && i === 0 ? 5 : SPOTS[(i * 3 + day * 2) % SPOTS.length],
    };
  });
}

export type Plan = {
  id: string;
  name: string;
  price: number;
  unit: string;
  detail: string;
  perks: string[];
  badge?: string;
};

export const PLANS: Plan[] = [
  {
    id: "dropin",
    name: "Drop-in",
    price: 38,
    unit: "/ clase",
    detail: "1 clase · sin compromiso",
    perks: ["Reserva cuando quieras", "Acceso a todas las clases", "Ideal para visitar"],
  },
  {
    id: "starter",
    name: "Starter",
    price: 99,
    unit: "/ 30 días",
    detail: "3 clases · tu primera vez",
    perks: ["Clase de bienvenida", "Guía de fundamentos", "Precio exclusivo nuevo cliente"],
    badge: "Primera vez",
  },
  {
    id: "w8",
    name: "WIDUKY 8",
    price: 259,
    unit: "/ mes",
    detail: "8 clases al mes",
    perks: ["2 clases por semana", "Reserva prioritaria", "1 invitado al mes"],
    badge: "Más elegido",
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 329,
    unit: "/ mes",
    detail: "Clases ilimitadas",
    perks: ["Sin límites", "Acceso anticipado a eventos", "Toalla y agua incluidas"],
  },
];

export const FREQUENCIES = [
  { id: "1", label: "1 clase", plan: "dropin", classes: 1, note: "¿Primera vez en WIDUKY? Empieza con STARTER y conoce el método." },
  { id: "2", label: "2 clases / semana", plan: "w8", classes: 8, note: "El ritmo ideal para construir constancia sin presión." },
  { id: "3", label: "3 clases / semana", plan: "unlimited", classes: 12, note: "Desde 3 clases por semana, UNLIMITED es la opción más inteligente." },
  { id: "4", label: "4+ clases / semana", plan: "unlimited", classes: 16, note: "Para quienes hacen del movimiento parte de su identidad." },
  { id: "inf", label: "Ilimitado", plan: "unlimited", classes: 0, note: "Todo WIDUKY, sin límites. Tu estudio, tu ritmo." },
];
