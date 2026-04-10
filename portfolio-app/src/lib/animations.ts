import { Variants } from "framer-motion";

// ── Easing curves ──────────────────────────────────────────────
export const ease = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  spring: { type: "spring", stiffness: 260, damping: 20 },
  inOut: [0.43, 0.13, 0.23, 0.96],
  out: [0.22, 1, 0.36, 1],
} as const;

// ── Base fade ──────────────────────────────────────────────────
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: ease.smooth } },
};

// ── Slide from bottom ──────────────────────────────────────────
export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
};

// ── Slide from left ────────────────────────────────────────────
export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.out } },
};

// ── Slide from right ───────────────────────────────────────────
export const slideRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: ease.out } },
};

// ── Scale pop ─────────────────────────────────────────────────
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease.out } },
};

// ── Stagger container ─────────────────────────────────────────
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ── Stagger fast container ────────────────────────────────────
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

// ── Card hover ────────────────────────────────────────────────
export const cardHover = {
  rest: { scale: 1, y: 0 },
  hover: { scale: 1.02, y: -4, transition: { duration: 0.25, ease: ease.smooth } },
};

// ── Button tap ────────────────────────────────────────────────
export const tapScale = { scale: 0.96 };

// ── Text reveal ───────────────────────────────────────────────
export const textReveal: Variants = {
  hidden: { opacity: 0, y: 20, skewY: 2 },
  visible: {
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: 0.55, ease: ease.out },
  },
};

// ── Hero entrance ─────────────────────────────────────────────
export const heroText: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, ease: ease.out },
  },
};

export const heroImage: Variants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.9, ease: ease.out, delay: 0.2 },
  },
};

// ── Badge bounce ─────────────────────────────────────────────
export const badgePop: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1, scale: 1,
    transition: { delay: 0.4 + i * 0.12, type: "spring", stiffness: 300, damping: 18 },
  }),
};

// ── Skill bar fill ────────────────────────────────────────────
export const barFill = (pct: number): Variants => ({
  hidden: { width: 0 },
  visible: {
    width: `${pct}%`,
    transition: { duration: 1.1, ease: ease.inOut },
  },
});

// ── Section header ────────────────────────────────────────────
export const sectionHeader: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

// ── Viewport settings ─────────────────────────────────────────
export const viewport = { once: true, margin: "-80px" };
