"use client";

import { motion } from "framer-motion";
import { skillsCategories } from "@/lib/data";
import {
  slideUp, scaleIn, staggerContainer, sectionHeader, textReveal,
  barFill, viewport,
} from "@/lib/animations";

const categoryIcons: Record<string, string> = {
  "Programming Languages": "⌨️",
  "Web Development": "🌐",
  "AI & Machine Learning": "🤖",
  "Databases & DevOps": "🗄️",
};

const categoryColors: Record<string, { from: string; to: string; glow: string }> = {
  "Programming Languages": { from: "#7c3aed", to: "#6366f1", glow: "rgba(124,58,237,0.35)" },
  "Web Development":       { from: "#3b82f6", to: "#06b6d4", glow: "rgba(59,130,246,0.35)" },
  "AI & Machine Learning": { from: "#ec4899", to: "#9333ea", glow: "rgba(236,72,153,0.35)" },
  "Databases & DevOps":    { from: "#f59e0b", to: "#ef4444", glow: "rgba(245,158,11,0.35)" },
};

const extraTech = [
  "MySQL", "Prisma", "Drizzle ORM", "REST APIs", "JWT Auth",
  "GitHub Actions", "Postman", "VS Code", "Figma",
  "DSA", "OOP", "Computer Networks",
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: "80px 0 60px", position: "relative", overflow: "hidden" }}>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-[80px]"
          style={{ background: "rgba(124,58,237,0.06)" }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.1, 0.06] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full blur-[80px]"
          style={{ background: "rgba(59,130,246,0.06)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>🛠️ Skills</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            My <span className="gradient-text">Tech Stack</span>
          </motion.h2>
          <motion.p variants={textReveal} className="max-w-lg mx-auto" style={{ color: "var(--fg-muted)" }}>
            Transforming ideas into reality with a versatile, modern toolkit.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {skillsCategories.map((category) => {
            const colors = categoryColors[category.title] || categoryColors["Programming Languages"];
            const icon = categoryIcons[category.title] || "💡";

            return (
              <motion.div
                key={category.title}
                variants={scaleIn}
                whileHover={{ y: -4, boxShadow: `0 20px 60px ${colors.glow}` }}
                transition={{ duration: 0.3 }}
                className="card p-7"
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-7">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 8 }}
                    transition={{ duration: 0.2 }}
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-lg shadow-lg flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`,
                      boxShadow: `0 4px 16px ${colors.glow}`,
                    }}
                  >
                    {icon}
                  </motion.div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--fg)" }}>{category.title}</h3>
                </div>

                {/* Skill bars */}
                <div className="space-y-5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-semibold" style={{ color: "var(--fg)" }}>{skill.name}</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={viewport}
                          transition={{ delay: skillIdx * 0.08 + 0.3 }}
                          className="text-xs font-bold mono"
                          style={{ background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                        >
                          {skill.proficiency}%
                        </motion.span>
                      </div>
                      <div className="skill-bar-track overflow-hidden" style={{ borderRadius: "99px" }}>
                        <motion.div
                          variants={barFill(skill.proficiency)}
                          initial="hidden"
                          whileInView="visible"
                          viewport={viewport}
                          transition={{ delay: skillIdx * 0.08 }}
                          style={{
                            height: "100%", borderRadius: "99px",
                            background: `linear-gradient(90deg, ${colors.from}, ${colors.to})`,
                            boxShadow: `0 0 8px ${colors.glow}`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Extra tech badges */}
        <motion.div
          variants={slideUp} initial="hidden" whileInView="visible" viewport={viewport}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-xs uppercase tracking-widest font-semibold mb-6" style={{ color: "var(--fg-muted)" }}>
            Also familiar with
          </p>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport} className="flex flex-wrap justify-center gap-3">
            {extraTech.map((tech, i) => (
              <motion.span
                key={tech}
                variants={scaleIn}
                custom={i}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ duration: 0.2 }}
                className="badge"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
