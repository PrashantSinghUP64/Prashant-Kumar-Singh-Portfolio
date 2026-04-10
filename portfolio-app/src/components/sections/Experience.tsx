"use client";

import { motion } from "framer-motion";
import { experienceList } from "@/lib/data";
import { Briefcase, Calendar } from "lucide-react";
import {
  slideLeft, slideRight, staggerContainer, sectionHeader,
  textReveal, scaleIn, tapScale, viewport,
} from "@/lib/animations";

const dotColors = [
  { from: "#7c3aed", to: "#3b82f6" },
  { from: "#3b82f6", to: "#06b6d4" },
];

export default function Experience() {
  return (
    <section id="experience" className="py-28 section-alt relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 bottom-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.06)", filter: "blur(100px)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>💼 Experience</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            Work <span className="gradient-text">Experience</span>
          </motion.h2>
          <motion.p variants={textReveal} style={{ color: "var(--fg-muted)" }}>Real-world experience across development and content creation.</motion.p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewport}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-6 top-0 bottom-0 w-px hidden sm:block"
            style={{ background: "linear-gradient(180deg, #7c3aed 0%, #3b82f6 60%, transparent 100%)", opacity: 0.4 }}
          />

          <div className="space-y-10">
            {experienceList.map((exp, idx) => {
              const dot = dotColors[idx % dotColors.length];
              const variant = idx % 2 === 0 ? slideLeft : slideRight;
              const bulletPoints = exp.description.split(". ")
                .map((b) => b.trim()).filter((b) => b.length > 0)
                .map((b) => b.endsWith(".") ? b : b + ".");

              return (
                <motion.div
                  key={idx}
                  variants={variant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  transition={{ delay: idx * 0.12 }}
                  className="sm:pl-20 relative"
                >
                  {/* Dot icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={viewport}
                    transition={{ delay: idx * 0.12 + 0.2, type: "spring", stiffness: 300 }}
                    className="hidden sm:flex absolute left-0 top-6 w-12 h-12 rounded-full items-center justify-center z-10"
                    style={{ background: `linear-gradient(135deg, ${dot.from}, ${dot.to})`, boxShadow: `0 4px 20px ${dot.from}55` }}
                  >
                    <Briefcase size={18} color="white" />
                  </motion.div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -4, boxShadow: `0 16px 40px ${dot.from}22` }}
                    transition={{ duration: 0.25 }}
                    className="card p-7"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
                      <div>
                        <h3 className="text-xl font-extrabold" style={{ color: "var(--fg)" }}>{exp.role}</h3>
                        <p className="font-semibold mt-0.5" style={{ color: "var(--accent)" }}>{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-full flex-shrink-0"
                        style={{ color: "var(--fg-muted)", background: "rgba(124,58,237,0.06)", border: "1px solid var(--border)" }}>
                        <Calendar size={13} /> {exp.duration}
                      </div>
                    </div>

                    <ul className="list-none space-y-2 mb-6" style={{ color: "var(--fg-muted)" }}>
                      {bulletPoints.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={viewport}
                          transition={{ delay: 0.15 + i * 0.06 }}
                          className="flex items-start gap-2 text-sm leading-relaxed"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot.to }} />
                          {point}
                        </motion.li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2 border-t" style={{ borderColor: "var(--border)" }}>
                      {exp.skills.map((skill) => (
                        <motion.span key={skill} whileHover={{ scale: 1.1, y: -1 }} className="badge">{skill}</motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
