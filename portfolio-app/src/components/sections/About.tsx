"use client";

import { motion } from "framer-motion";
import { personalInfo, currentFocus, statistics } from "@/lib/data";
import { Code2, Target, Zap, ArrowRight } from "lucide-react";
import {
  slideLeft, slideRight, slideUp, scaleIn,
  staggerContainer, sectionHeader, textReveal, tapScale, viewport,
} from "@/lib/animations";

const capabilities = [
  { icon: <Code2 size={22} />, title: "Full Stack Development",  desc: "End-to-end web apps with React, Next.js, Node.js & modern databases.", accent: "#3b82f6", bg: "rgba(59,130,246,0.08)",   border: "rgba(59,130,246,0.18)" },
  { icon: <Target size={22} />,title: "AI / ML Integration",     desc: "LLMs, LangChain, Groq, Gemini — building agentic AI products.",       accent: "#a78bfa", bg: "rgba(124,58,237,0.08)", border: "rgba(124,58,237,0.18)" },
  { icon: <Zap size={22} />,   title: "Video Editing & Content", desc: "Premium video production — 60+ videos, 7K+ YouTube subscribers.",    accent: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.18)" },
];

const statConfig = [
  { grad: "linear-gradient(135deg,#7c3aed,#6366f1)" },
  { grad: "linear-gradient(135deg,#3b82f6,#06b6d4)" },
  { grad: "linear-gradient(135deg,#ec4899,#f43f5e)" },
  { grad: "linear-gradient(135deg,#f59e0b,#ef4444)" },
];

export default function About() {
  return (
    <section id="about" className="py-28 section-alt relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 20, 0], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.07)", filter: "blur(100px)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>👨‍💻 About</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            Who <span className="gradient-text">Am I?</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="space-y-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                variants={slideLeft}
                whileHover={{ x: 6, borderColor: cap.accent + "55" }}
                transition={{ duration: 0.25 }}
                className="card p-5 flex items-start gap-4"
                style={{ borderColor: cap.border }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: cap.bg, color: cap.accent, border: `1px solid ${cap.border}` }}
                >
                  {cap.icon}
                </motion.div>
                <div>
                  <h4 className="font-bold mb-1" style={{ color: "var(--fg)" }}>{cap.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>{cap.desc}</p>
                </div>
              </motion.div>
            ))}

            {/* Stats grid */}
            <motion.div variants={staggerContainer} className="grid grid-cols-2 gap-4 mt-6">
              {statistics.map((stat, i) => {
                const resolvedStat = stat.label === "YouTube Subscribers" ? { ...stat, value: "7K+" } : stat;
                return (
                  <motion.div
                    key={resolvedStat.label}
                    variants={scaleIn}
                    whileHover={{ scale: 1.04, y: -3 }}
                    transition={{ duration: 0.2 }}
                    className="card p-4 text-center"
                  >
                    <p className="text-3xl font-black" style={{ background: statConfig[i]?.grad, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                      {resolvedStat.value}
                    </p>
                    <p className="text-xs mt-1 font-medium uppercase tracking-wider" style={{ color: "var(--fg-muted)" }}>{resolvedStat.label}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={viewport}>
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-5 leading-snug" style={{ color: "var(--fg)" }}>
              A passionate engineer building the{" "}
              <span className="gradient-text">future of tech & education.</span>
            </h3>
            <p className="leading-relaxed mb-8" style={{ color: "var(--fg-muted)" }}>
              {personalInfo.bio} I study at{" "}
              <strong style={{ color: "var(--fg)" }}>Maharana Pratap Group of Institutions, AKTU</strong>{" "}
              (B.Tech CSE, 2023–2027) and actively build AI-powered solutions to solve real-world problems for students and learners.
            </p>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="card p-5 mb-8"
            >
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2" style={{ color: "var(--fg)" }}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
                Currently Focused On
              </h4>
              <ul className="space-y-3">
                {currentFocus.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={viewport}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-3 text-sm" style={{ color: "var(--fg-muted)" }}
                  >
                    <ArrowRight size={14} style={{ color: "var(--accent)", flexShrink: 0 }} />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={tapScale}
              transition={{ duration: 0.2 }}
            >
              Let's Work Together <ArrowRight size={16} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
