"use client";

import { motion } from "framer-motion";
import { FileText, ExternalLink } from "lucide-react";
import { sectionHeader, textReveal, viewport, scaleIn } from "@/lib/animations";

export default function Resume() {
  const resumeUrl = "https://drive.google.com/file/d/18Y1BVVOQ-FC3aoKRRIA8TckN9kVCe87X/preview";
  const viewUrl = "https://drive.google.com/file/d/18Y1BVVOQ-FC3aoKRRIA8TckN9kVCe87X/view?usp=sharing";

  return (
    <section id="resume" className="py-28 relative overflow-hidden">
      {/* Background Glow */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>
            📄 Resume
          </motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            My <span className="gradient-text" style={{ background: "linear-gradient(135deg, #10b981, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Curriculum Vitae</span>
          </motion.h2>
          <motion.p variants={textReveal} className="text-lg" style={{ color: "var(--fg-muted)", maxWidth: "600px", margin: "0 auto" }}>
            View my professional qualifications and experience.
          </motion.p>
        </motion.div>

        {/* Content */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="card p-4 md:p-8 flex flex-col gap-6"
          style={{ background: "var(--card-bg)", borderRadius: "1.5rem", border: "1px solid var(--border)", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)" }}
        >
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(16, 185, 129, 0.1)", color: "#10b981" }}>
                <FileText size={24} />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-bold text-xl" style={{ color: "var(--fg)" }}>Prashant_Kumar_Singh_CV.pdf</h3>
                <p className="text-sm font-medium mt-1" style={{ color: "var(--fg-muted)" }}>Interactive preview</p>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline flex-1 sm:flex-none justify-center gap-2"
              >
                <ExternalLink size={16} /> Open in New Tab
              </a>
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="relative w-full bg-black/5 dark:bg-white/5 rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)", height: "70vh", minHeight: "500px", maxHeight: "800px" }}>
            <iframe
              src={resumeUrl}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay"
              title="Resume PDF Viewer"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
