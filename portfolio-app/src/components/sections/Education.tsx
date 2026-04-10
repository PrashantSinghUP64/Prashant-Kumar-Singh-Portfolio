"use client";

import { motion } from "framer-motion";
import { educationList } from "@/lib/data";
import { GraduationCap, Calendar } from "lucide-react";
import {
  staggerContainer, scaleIn, sectionHeader, textReveal, tapScale, viewport,
} from "@/lib/animations";

const eduColors = [
  { from: "#7c3aed", to: "#6366f1" },
  { from: "#3b82f6", to: "#06b6d4" },
  { from: "#ec4899", to: "#f43f5e" },
];

export default function Education() {
  return (
    <section id="education" className="py-28 relative overflow-hidden">
      <motion.div
        animate={{ y: [0, 20, 0], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 -translate-x-1/2 w-96 h-64 rounded-full pointer-events-none"
        style={{ background: "rgba(59,130,246,0.07)", filter: "blur(100px)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>🎓 Education</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            Academic <span className="gradient-text">Background</span>
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {educationList.map((edu, idx) => {
            const c = eduColors[idx % eduColors.length];
            return (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -6, boxShadow: `0 20px 50px ${c.from}33` }}
                transition={{ duration: 0.3 }}
                className="card p-6 flex flex-col gap-5"
              >
                {/* Accent bar */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  viewport={viewport}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="h-1 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${c.from}, ${c.to})` }}
                />

                {/* Icon + degree */}
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.2 }}
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})`, boxShadow: `0 4px 16px ${c.from}55` }}
                  >
                    <GraduationCap size={22} color="white" />
                  </motion.div>
                  <div className="flex flex-col pt-1">
                    <h3 className="font-extrabold leading-tight text-lg" style={{ color: "var(--fg)" }}>{edu.degree}</h3>
                    <p className="text-sm font-bold mt-1" style={{ color: c.from }}>{edu.institution}</p>
                  </div>
                </div>

                <p className="text-xs font-semibold leading-relaxed" style={{ color: "var(--fg-muted)" }}>{edu.location}</p>

                {/* Duration */}
                <div className="flex flex-wrap gap-3 text-xs font-semibold mt-auto" style={{ color: "var(--fg-muted)" }}>
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/5 dark:bg-white/5">
                    <Calendar size={13} color={c.from} />
                    {edu.duration}
                  </span>
                </div>

                {/* Detail chips */}
                {edu.details && edu.details.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t mt-1" style={{ borderColor: "var(--border)" }}>
                    {edu.details.map((d) => (
                      <motion.span key={d} whileHover={{ scale: 1.08 }} className="tag-chip text-[0.7rem] px-2 py-1">{d}</motion.span>
                    ))}
                  </div>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
