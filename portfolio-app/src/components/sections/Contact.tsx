"use client";

import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import {
  slideLeft, slideRight, sectionHeader, textReveal, tapScale, viewport,
} from "@/lib/animations";

const contactItems = [
  { icon: <Mail size={18} />,   label: "Email",    value: personalInfo.email,    href: `mailto:${personalInfo.email}`, accent: "#a78bfa", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.2)" },
  { icon: <Phone size={18} />,  label: "Phone",    value: personalInfo.phone,    href: `tel:${personalInfo.phone}`,     accent: "#60a5fa", bg: "rgba(59,130,246,0.1)",  border: "rgba(59,130,246,0.2)"  },
  { icon: <MapPin size={18} />, label: "Location", value: personalInfo.location, href: "#",                              accent: "#f9a8d4", bg: "rgba(236,72,153,0.1)",  border: "rgba(236,72,153,0.2)"  },
];

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "12px",
  border: "1px solid var(--border)", background: "rgba(124,58,237,0.04)",
  color: "var(--fg)", fontSize: "0.875rem", outline: "none",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease", fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.72rem", fontWeight: 700,
  letterSpacing: "0.08em", textTransform: "uppercase" as const,
  marginBottom: "8px", color: "var(--fg-muted)",
};

export default function Contact() {
  return (
    <section id="contact" className="py-28 relative overflow-hidden">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[600px] h-64 rounded-full pointer-events-none"
        style={{ background: "rgba(124,58,237,0.08)", filter: "blur(120px)" }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          variants={sectionHeader} initial="hidden" whileInView="visible" viewport={viewport}
          className="text-center mb-20"
        >
          <motion.span variants={textReveal} className="section-tag" style={{ display: "inline-block" }}>📬 Contact</motion.span>
          <motion.h2 variants={textReveal} className="text-4xl md:text-5xl font-black mb-4" style={{ color: "var(--fg)" }}>
            Let's <span className="gradient-text">Connect</span>
          </motion.h2>
          <motion.p variants={textReveal} className="max-w-lg mx-auto" style={{ color: "var(--fg-muted)" }}>
            Open for full-time roles, internships, and freelance projects. Let's build something great!
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left */}
          <motion.div
            variants={slideLeft} initial="hidden" whileInView="visible" viewport={viewport}
            className="lg:col-span-2 space-y-5"
          >
            {contactItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                className="card p-5 flex items-center gap-4 group block"
                style={{ textDecoration: "none" }}
                whileHover={{ x: 6, borderColor: item.accent + "55" }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ duration: 0.2 }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.bg, color: item.accent, border: `1px solid ${item.border}` }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="text-xs font-medium mb-0.5" style={{ color: "var(--fg-muted)" }}>{item.label}</p>
                  <p className="text-sm font-semibold truncate max-w-[220px]" style={{ color: "var(--fg)" }}>{item.value}</p>
                </div>
              </motion.a>
            ))}

            <motion.div
              whileHover={{ y: -3 }} transition={{ duration: 0.2 }}
              className="card p-5"
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--fg)" }}>Find me online</p>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url} target="_blank" rel="noopener noreferrer"
                    className="badge"
                    whileHover={{ scale: 1.1, y: -2 }} whileTap={tapScale}
                    transition={{ duration: 0.15 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={slideRight} initial="hidden" whileInView="visible" viewport={viewport}
            transition={{ delay: 0.15 }}
            className="lg:col-span-3 card p-8"
          >
            <h3 className="text-2xl font-extrabold mb-7" style={{ color: "var(--fg)" }}>Send a Message</h3>
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name    = (form.elements.namedItem("name")    as HTMLInputElement).value;
                const email   = (form.elements.namedItem("email")   as HTMLInputElement).value;
                const subject = (form.elements.namedItem("subject") as HTMLInputElement).value;
                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { id: "name",  type: "text",  label: "Your Name",  placeholder: "John Doe" },
                  { id: "email", type: "email", label: "Your Email", placeholder: "john@example.com" },
                ].map((field) => (
                  <motion.div key={field.id} whileFocus={{ scale: 1.01 }}>
                    <label htmlFor={field.id} style={labelStyle}>{field.label}</label>
                    <input
                      type={field.type} id={field.id} name={field.id} required
                      placeholder={field.placeholder} style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                      onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                    />
                  </motion.div>
                ))}
              </div>

              <div>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <input
                  type="text" id="subject" name="subject" required
                  placeholder="Project Inquiry / Hiring / Collaboration"
                  style={inputStyle}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message" name="message" rows={5} required
                  placeholder={`Hi Prashant, I'd love to discuss...`}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.08)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                />
              </div>

              <motion.button
                type="submit" className="btn-primary"
                style={{ width: "100%", justifyContent: "center", padding: "14px 28px", fontSize: "1rem" }}
                whileHover={{ scale: 1.03, y: -2 }} whileTap={tapScale}
                transition={{ duration: 0.2 }}
              >
                <Send size={16} /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
