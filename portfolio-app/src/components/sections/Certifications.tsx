"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import { Award } from "lucide-react";
import {
  staggerContainer, scaleIn, sectionHeader, textReveal, viewport,
} from "@/lib/animations";

const certColors = [
  { from: "#7c3aed", to: "#6366f1" },
  { from: "#3b82f6", to: "#06b6d4" },
  { from: "#ec4899", to: "#f43f5e" },
  { from: "#f59e0b", to: "#ef4444" },
  { from: "#10b981", to: "#06b6d4" },
  { from: "#6366f1", to: "#3b82f6" },
];

const issuerColors: Record<string, { bg: string; color: string; border: string }> = {
  "Oracle University":    { bg: "rgba(239,68,68,0.1)",   color: "#f87171", border: "rgba(239,68,68,0.25)" },
  "IBM SkillsBuild":      { bg: "rgba(59,130,246,0.1)",  color: "#60a5fa", border: "rgba(59,130,246,0.25)" },
  "Mastercard × Forage":  { bg: "rgba(245,158,11,0.1)",  color: "#fbbf24", border: "rgba(245,158,11,0.25)" },
  "Amazon AWS × Forage":  { bg: "rgba(251,146,60,0.1)",  color: "#fb923c", border: "rgba(251,146,60,0.25)" },
  "Microsoft × LinkedIn": { bg: "rgba(59,130,246,0.1)",  color: "#60a5fa", border: "rgba(59,130,246,0.25)" },
  "IBM":                  { bg: "rgba(59,130,246,0.1)",  color: "#60a5fa", border: "rgba(59,130,246,0.25)" },
};
const defaultIssuer = { bg: "rgba(124,58,237,0.1)", color: "#a78bfa", border: "rgba(124,58,237,0.25)" };

export default function Certifications() {
  return (
    <section id="certifications" className="py-28 section-alt relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 15, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(245,158,11,0.06)", filter: "blur(100px)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>🏆 Certifications</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            My <span className="gradient-text">Certifications</span>
          </motion.h2>
          <motion.p variants={textReveal} style={{ color: "var(--fg-muted)" }}>Continuously learning from the world's top tech companies.</motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {certifications.map((cert, idx) => {
            const c = certColors[idx % certColors.length];
            const ic = issuerColors[cert.issuer] || defaultIssuer;
            return (
              <motion.div
                key={idx}
                variants={scaleIn}
                whileHover={{ y: -6, boxShadow: `0 20px 50px ${c.from}33` }}
                transition={{ duration: 0.25 }}
                className="card p-5 flex flex-col gap-4 group"
              >
                {/* Icon + date */}
                <div className="flex justify-between items-start">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})`, boxShadow: `0 4px 14px ${c.from}55` }}
                  >
                    <Award size={18} color="white" />
                  </motion.div>
                  <span className="text-xs font-medium mono" style={{ color: "var(--fg-muted)" }}>{cert.date}</span>
                </div>

                <h3 className="font-bold text-sm leading-snug flex-1" style={{ color: "var(--fg)" }}>{cert.name}</h3>

                <div>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: ic.bg, color: ic.color, border: `1px solid ${ic.border}` }}
                  >
                    {cert.issuer}
                  </motion.span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
