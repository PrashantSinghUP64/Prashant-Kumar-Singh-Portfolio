"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useEffect, useState } from "react";
import {
  heroText, heroImage, scaleIn, staggerContainer,
  slideUp, fadeIn, tapScale, viewport,
} from "@/lib/animations";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 21c0 1 1 2 2 2s2-1 2-2v-1" />
  </svg>
);

const typingRoles = [
  "Full Stack Developer",
  "Full Stack Developer",
  "YouTube Creator",
  "Open Source Contributor",
];

function TypingEffect() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = typingRoles[roleIdx];
    const speed = isDeleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(current.slice(0, displayed.length + 1));
        if (displayed.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayed(current.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setRoleIdx((prev) => (prev + 1) % typingRoles.length);
        }
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, isDeleting, roleIdx]);

  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <span className="gradient-text" style={{ fontWeight: 700 }}>{displayed}</span>
      <span style={{
        display: "inline-block", width: "2px", height: "1em", marginLeft: "4px",
        background: "var(--accent)", borderRadius: "2px",
        animation: "blink 1s step-start infinite", verticalAlign: "text-bottom",
      }} />
    </span>
  );
}

const stats = [
  { label: "Projects Built", value: "6+", from: "#7c3aed", to: "#6366f1" },
  { label: "YouTube Subs",   value: "7K+", from: "#3b82f6", to: "#06b6d4" },
  { label: "Certifications", value: "8",   from: "#ec4899", to: "#f43f5e" },
  { label: "Views",          value: "6M+", from: "#f59e0b", to: "#ef4444" },
];



export default function Hero() {
  return (
    <section id="home" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", paddingTop: "80px", paddingBottom: "48px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient glows */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.14, 0.22, 0.14] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "33%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "600px", background: "radial-gradient(ellipse, rgba(124,58,237,0.14) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }}
      />
      <div style={{ position: "absolute", top: "66%", right: "25%", width: "400px", height: "400px", background: "radial-gradient(ellipse, rgba(59,130,246,0.10) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ position: "relative", zIndex: 10, width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", minHeight: "100vh", flexWrap: "wrap", paddingTop: "60px" }}>

          {/* ── LEFT TEXT ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ width: "100%", flex: "1 1 55%", minWidth: "320px", maxWidth: "640px" }}
            className="hero-text text-center lg:text-left mx-auto lg:mx-0"
          >
            {/* Badge */}
            <motion.div variants={slideUp} style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "8px 18px", borderRadius: "999px", fontSize: "0.875rem",
              fontWeight: 600, marginBottom: "28px", background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.28)", color: "#4ade80",
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", display: "inline-block", animation: "pulse 2s infinite" }} />
              Available for Internships & Freelance
            </motion.div>

            {/* Name */}
            <motion.h1 variants={heroText} style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: "16px" }}>
              <span style={{ display: "block", color: "var(--fg)" }}>Hi, I'm</span>
              <span className="gradient-text glow-text" style={{ display: "block", marginTop: "4px" }}>
                Prashant Kumar Singh
              </span>
            </motion.h1>

            {/* Typing */}
            <motion.div variants={slideUp}
              style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", fontWeight: 600, color: "var(--fg-muted)", marginBottom: "28px", height: "40px", display: "flex", alignItems: "center", gap: "8px" }}
              className="justify-center lg:justify-start"
            >
              <TypingEffect />
            </motion.div>

            {/* Bio */}
            <motion.p variants={fadeIn} style={{ fontSize: "0.975rem", color: "var(--fg-muted)", lineHeight: 1.8, marginBottom: "36px", maxWidth: "520px" }} className="mx-auto lg:mx-0">
              {personalInfo.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={slideUp} className="hero-cta" style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "36px" }}>
              {[
                { href: "#projects", label: "View My Work", primary: true, icon: <ArrowRight size={16} /> },
                { href: `mailto:${personalInfo.email}`, label: "Contact Me", primary: false, icon: <Mail size={16} /> },
              ].map((btn) => (
                <motion.a
                  key={btn.label}
                  href={btn.href}
                  className={btn.primary ? "btn-primary" : "btn-outline"}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={tapScale}
                  transition={{ duration: 0.2 }}
                >
                  {btn.primary ? <><btn.icon.type {...btn.icon.props} />{btn.label}</> : <>{btn.icon}{btn.label}</>}
                </motion.a>
              ))}
              <motion.a
                href="https://github.com/PrashantSinghUP64"
                target="_blank" rel="noopener noreferrer"
                className="btn-outline"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={tapScale}
                transition={{ duration: 0.2 }}
              >
                <GithubIcon /> GitHub
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div variants={staggerContainer} style={{ display: "flex", flexWrap: "wrap", gap: "28px" }} className="hero-cta">
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={scaleIn} className="text-center lg:text-left">
                  <p style={{ fontSize: "1.6rem", fontWeight: 900, background: `linear-gradient(135deg, ${stat.from}, ${stat.to})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1, marginBottom: "4px" }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "var(--fg-muted)", fontWeight: 500, letterSpacing: "0.04em" }}>{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── RIGHT: AVATAR ── */}
          <motion.div
            variants={heroImage}
            initial="hidden"
            animate="visible"
            style={{ display: "flex", justifyContent: "center", alignItems: "center", flex: "1 1 45%", position: "relative", minWidth: "320px" }}
          >
            <div style={{ position: "relative", width: "400px", height: "400px", maxWidth: "100%" }}>
              {/* Spinning ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", inset: 0, borderRadius: "50%", padding: "3px", background: "conic-gradient(from 0deg, #7c3aed, #6366f1, #3b82f6, #06b6d4, #7c3aed)" }}
              />

              {/* Avatar */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                style={{ position: "absolute", inset: "5px", borderRadius: "50%", overflow: "hidden", background: "#0e0e1a", border: "2px solid rgba(255,255,255,0.06)" }}
              >
                <img
                  src="https://res.cloudinary.com/dfctkn881/image/upload/f_auto,q_auto/Screenshot2025-09-2118483_dqdwat"
                  alt="Prashant Kumar Singh"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", display: "block" }}
                />
              </motion.div>


            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}
        >
          <span style={{ fontSize: "0.65rem", color: "var(--fg-muted)", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>Scroll</span>
          <div style={{ width: "20px", height: "32px", borderRadius: "999px", border: "2px solid var(--border)", display: "flex", justifyContent: "center", paddingTop: "6px" }}>
            <motion.div
              animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--accent)" }}
            />
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes pulse{ 0%,100%{opacity:1}50%{opacity:0.5} } @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
    </section>
  );
}
