"use client";

import { motion } from "framer-motion";
import { projectsList } from "@/lib/data";
import { ExternalLink } from "lucide-react";
import {
  staggerContainer, scaleIn, slideUp, sectionHeader,
  textReveal, cardHover, tapScale, viewport,
} from "@/lib/animations";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 21c0 1 1 2 2 2s2-1 2-2v-1" />
  </svg>
);

const cardAccents = [
  { grad: "linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)", glow: "rgba(124,58,237,0.3)" },
  { grad: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)", glow: "rgba(59,130,246,0.3)" },
  { grad: "linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)", glow: "rgba(236,72,153,0.3)" },
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 relative overflow-hidden">
      <motion.div
        animate={{ x: [0, 30, 0], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "rgba(59,130,246,0.06)", filter: "blur(120px)" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>🚀 Portfolio</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p variants={textReveal} className="max-w-xl mx-auto" style={{ color: "var(--fg-muted)" }}>
            Real-world applications built to solve genuine problems — from AI mock interviews to YouTube intelligence platforms.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsList.map((project, idx) => {
            const accent = cardAccents[idx % cardAccents.length];
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8, boxShadow: `0 24px 60px ${accent.glow}` }}
                className="card flex flex-col overflow-hidden group"
              >
                {/* Banner */}
                <div className="h-44 relative overflow-hidden flex items-center justify-center" style={{ background: accent.grad }}>
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                    style={{ backgroundImage: `radial-gradient(circle at 30% 50%, rgba(255,255,255,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)` }}
                  />
                  <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }} />
                  <div className="absolute -top-4 -left-4 w-20 h-20 rounded-full" style={{ background: "rgba(255,255,255,0.05)" }} />
                  <div className="relative z-10 text-center px-6">
                    <h3 className="text-3xl font-black text-white tracking-tight mb-2">{project.title}</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.2)", color: "white" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Live Project
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--fg-muted)" }}>{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.slice(0, 5).map((tag) => (
                      <motion.span key={tag} whileHover={{ scale: 1.08 }} className="tag-chip">{tag}</motion.span>
                    ))}
                    {project.tags.length > 5 && <span className="tag-chip">+{project.tags.length - 5}</span>}
                  </div>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                    <motion.a
                      href={project.link} target="_blank" rel="noopener noreferrer"
                      className="btn-primary flex-1 justify-center"
                      style={{ padding: "9px 16px", fontSize: "0.82rem" }}
                      whileHover={{ scale: 1.04 }} whileTap={tapScale}
                    >
                      <ExternalLink size={13} /> Live Demo
                    </motion.a>
                    <motion.a
                      href={project.github} target="_blank" rel="noopener noreferrer"
                      className="btn-outline flex-1 justify-center"
                      style={{ padding: "9px 16px", fontSize: "0.82rem" }}
                      whileHover={{ scale: 1.04 }} whileTap={tapScale}
                    >
                      <GithubIcon /> Source
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={slideUp} initial="hidden" whileInView="visible" viewport={viewport}
          transition={{ delay: 0.4 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/PrashantSinghUP64" target="_blank" rel="noopener noreferrer"
            className="btn-outline inline-flex"
            whileHover={{ scale: 1.05, y: -3 }} whileTap={tapScale}
          >
            <GithubIcon /> View All Projects on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
