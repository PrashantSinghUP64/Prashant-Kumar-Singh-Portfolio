"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data";

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4" />
    <path d="M9 21c0 1 1 2 2 2s2-1 2-2v-1" />
  </svg>
);

const footerLinks = [
  { name: "About",      href: "#about" },
  { name: "Projects",   href: "#projects" },
  { name: "Skills",     href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact",    href: "#contact" },
];

const socialItems = [
  { name: "GitHub",   href: "https://github.com/PrashantSinghUP64",                    icon: <GithubIcon /> },
  { name: "LinkedIn", href: "https://linkedin.com/in/prashant-kumar-singh-51b225230",  icon: <span style={{ fontSize: "11px", fontWeight: 800 }}>in</span> },
  { name: "YouTube",  href: "https://www.youtube.com/@technicalknowledgehindi1949",        icon: <span style={{ fontSize: "11px" }}>▶</span> },
  { name: "X",        href: "https://x.com/prashant_UP_64",                             icon: <span style={{ fontSize: "11px", fontWeight: 900 }}>𝕏</span> },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ position: "relative", borderTop: "1px solid var(--border)", padding: "48px 0 32px", overflow: "hidden" }}>
      {/* Top gradient line */}
      <div style={{
        position: "absolute", left: "50%", top: 0, transform: "translateX(-50%)",
        width: "60%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.6), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        {/* Main row */}
        <div className="footer-grid">
          {/* Brand — left */}
          <div>
            <a href="#home" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
              <span className="gradient-text" style={{ fontSize: "1.25rem", fontWeight: 900 }}>Prashant Kumar Singh</span>
            </a>
            <p style={{ fontSize: "0.78rem", color: "var(--fg-muted)", marginTop: "6px", maxWidth: "220px", lineHeight: 1.6 }}>
              Full Stack Developer building the next generation of web products.
            </p>
          </div>

          {/* Nav links — center */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "20px" }}>
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{ fontSize: "0.82rem", color: "var(--fg-muted)", textDecoration: "none", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--accent)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--fg-muted)")}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials — right */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "flex-end" }}>
            {socialItems.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.name}
                style={{
                  width: "34px", height: "34px", borderRadius: "999px",
                  border: "1px solid var(--border)", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "var(--fg-muted)", textDecoration: "none", transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--accent)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: "32px", paddingTop: "24px", borderTop: "1px solid var(--border)",
          display: "flex", flexDirection: "row", flexWrap: "wrap",
          alignItems: "center", justifyContent: "space-between", gap: "8px",
          fontSize: "0.75rem", color: "var(--fg-muted)",
        }}>
          <p>© {year} {personalInfo.name}. All rights reserved.</p>
          <p>
            Built By{" "}
            <span style={{ color: "rgba(167,139,250,0.9)" }}>Next.js 16</span> &middot;{" "}
            <span style={{ color: "rgba(96,165,250,0.9)" }}>TypeScript</span> &middot;{" "}
            <span style={{ color: "rgba(34,211,238,0.9)" }}>Tailwind CSS</span> &middot;{" "}
            <span style={{ color: "rgba(249,168,212,0.9)" }}>Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
