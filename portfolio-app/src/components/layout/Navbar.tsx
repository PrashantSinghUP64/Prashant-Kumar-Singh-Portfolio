"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Sparkles } from "lucide-react";

const navLinks = [
  { name: "Home",       href: "#home" },
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Projects",   href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Resume",     href: "#resume" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted]             = React.useState(false);
  const [isMenuOpen, setIsMenuOpen]       = React.useState(false);
  const [scrolled, setScrolled]           = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

  React.useEffect(() => {
    setMounted(true);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        transition: "all 0.3s ease",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        background: scrolled ? "var(--card-bg)" : "transparent",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: "64px" }}>

          {/* Logo */}
          <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <span className="gradient-text" style={{ fontSize: "1.25rem", fontWeight: 900, letterSpacing: "-0.02em" }}>Prashant Kumar Singh</span>
          </a>

          {/* Desktop Nav — hidden on mobile via JS-driven visibility */}
          <DesktopNav navLinks={navLinks} activeSection={activeSection} />

          {/* Desktop Right */}
          <DesktopRight mounted={mounted} theme={theme} toggleTheme={toggleTheme} />

          {/* Mobile Right */}
          <MobileRight
            mounted={mounted}
            theme={theme}
            toggleTheme={toggleTheme}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div
          style={{
            background: "var(--card-bg)",
            backdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--border)",
            animation: "slideDown 0.2s ease-out forwards",
            transformOrigin: "top",
          }}
        >
          <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: "4px" }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--fg)",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.08)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--fg)"; }}
              >
                {link.name}
              </a>
            ))}
            <div style={{ paddingTop: "8px", paddingBottom: "4px" }}>
              <a href="#contact" className="btn-primary" onClick={() => setIsMenuOpen(false)} style={{ width: "100%", justifyContent: "center" }}>
                <Sparkles size={14} /> Hire Me
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

/* ── Sub-components use useWindowWidth to conditionally render ── */
function useWindowWidth() {
  const [width, setWidth] = React.useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  React.useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return width;
}

function DesktopNav({ navLinks, activeSection }: { navLinks: { name: string; href: string }[]; activeSection: string }) {
  const width = useWindowWidth();
  if (width < 768) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
      {navLinks.map((link) => {
        const isActive = activeSection === link.href.replace("#", "");
        return (
          <a
            key={link.name}
            href={link.href}
            style={{
              position: "relative",
              padding: "8px 16px",
              borderRadius: "999px",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
              color: isActive ? "var(--accent)" : "var(--fg-muted)",
              transition: "color 0.2s",
            }}
          >
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "999px",
                  background: "rgba(124,58,237,0.1)",
                  transition: "all 0.3s ease",
                }}
              />
            )}
            <span style={{ position: "relative", zIndex: 1 }}>{link.name}</span>
          </a>
        );
      })}
    </div>
  );
}

function DesktopRight({ mounted, theme, toggleTheme }: { mounted: boolean; theme: string | undefined; toggleTheme: () => void }) {
  const width = useWindowWidth();
  if (width < 768) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      {mounted && (
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{
            padding: "8px",
            borderRadius: "999px",
            border: "none",
            background: "transparent",
            color: "var(--fg-muted)",
            cursor: "pointer",
            transition: "all 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.1)"; (e.currentTarget as HTMLElement).style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      )}
      <a href="#contact" className="btn-primary" style={{ padding: "8px 20px", fontSize: "0.875rem", gap: "6px" }}>
        <Sparkles size={14} />
        Hire Me
      </a>
    </div>
  );
}

function MobileRight({ mounted, theme, toggleTheme, isMenuOpen, setIsMenuOpen }: {
  mounted: boolean; theme: string | undefined; toggleTheme: () => void;
  isMenuOpen: boolean; setIsMenuOpen: (v: boolean) => void;
}) {
  const width = useWindowWidth();
  if (width >= 768) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      {mounted && (
        <button
          onClick={toggleTheme}
          style={{ padding: "8px", borderRadius: "999px", border: "none", background: "transparent", color: "var(--fg-muted)", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      )}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ padding: "8px", borderRadius: "8px", border: "none", background: "transparent", color: "var(--fg)", cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </div>
  );
}
