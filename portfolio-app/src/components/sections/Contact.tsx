"use client";

import { motion } from "framer-motion";
import { personalInfo, socialLinks } from "@/lib/data";
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import {
  slideLeft, slideRight, sectionHeader, textReveal, tapScale, viewport,
} from "@/lib/animations";
import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── EmailJS credentials (loaded from .env.local) ───────────────────
const EMAILJS_SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const EMAILJS_PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;
// ────────────────────────────────────────────────────────────────────

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

const errorStyle: React.CSSProperties = {
  fontSize: "0.72rem", color: "#f87171", marginTop: "5px",
  display: "flex", alignItems: "center", gap: "4px",
};

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState<FormData>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus]   = useState<"idle" | "success" | "error">("idle");

  // ── Validation ────────────────────────────────────────────────────
  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim())                       errs.name    = "Name is required.";
    if (!formData.email.trim())                      errs.email   = "Email is required.";
    else if (!validateEmail(formData.email))         errs.email   = "Please enter a valid email address.";
    if (!formData.subject.trim())                    errs.subject = "Subject is required.";
    if (!formData.message.trim())                    errs.message = "Message is required.";
    return errs;
  }

  // ── Change handler ────────────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear inline error as user corrects the field
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  // ── Submit handler ────────────────────────────────────────────────
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  formData.name,
          from_email: formData.email,
          subject:    formData.subject,
          message:    formData.message,
          to_email:   "ps7027804@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setErrors({});
      // Auto-dismiss success banner after 6 s
      setTimeout(() => setStatus("idle"), 6000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    } finally {
      setLoading(false);
    }
  }

  // ── Focus / blur helpers ──────────────────────────────────────────
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "rgba(124,58,237,0.5)";
    e.target.style.boxShadow   = "0 0 0 3px rgba(124,58,237,0.08)";
  };
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = "var(--border)";
    e.target.style.boxShadow   = "none";
  };

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
            {contactItems.map((item) => (
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

            {/* ── Status banners ────────────────────────────────── */}
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm font-medium"
                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
              >
                <CheckCircle size={16} className="flex-shrink-0" />
                Message sent successfully! I'll get back to you soon. 🎉
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 rounded-xl px-4 py-3 mb-6 text-sm font-medium"
                style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
              >
                <AlertCircle size={16} className="flex-shrink-0" />
                Something went wrong. Please try again or email me directly.
              </motion.div>
            )}

            <form ref={formRef} className="space-y-5" onSubmit={handleSubmit} noValidate>
              {/* Name + Email row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <label htmlFor="name" style={labelStyle}>Your Name</label>
                    <input
                      type="text" id="name" name="name" required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ ...inputStyle, borderColor: errors.name ? "rgba(239,68,68,0.5)" : undefined }}
                      onFocus={onFocus} onBlur={onBlur}
                    />
                  </motion.div>
                  {errors.name && (
                    <p style={errorStyle}><AlertCircle size={11} />{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <motion.div whileFocus={{ scale: 1.01 }}>
                    <label htmlFor="email" style={labelStyle}>Your Email</label>
                    <input
                      type="email" id="email" name="email" required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ ...inputStyle, borderColor: errors.email ? "rgba(239,68,68,0.5)" : undefined }}
                      onFocus={onFocus} onBlur={onBlur}
                    />
                  </motion.div>
                  {errors.email && (
                    <p style={errorStyle}><AlertCircle size={11} />{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" style={labelStyle}>Subject</label>
                <input
                  type="text" id="subject" name="subject" required
                  placeholder="Project Inquiry / Hiring / Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  style={{ ...inputStyle, borderColor: errors.subject ? "rgba(239,68,68,0.5)" : undefined }}
                  onFocus={onFocus} onBlur={onBlur}
                />
                {errors.subject && (
                  <p style={errorStyle}><AlertCircle size={11} />{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea
                  id="message" name="message" rows={5} required
                  placeholder={`Hi Prashant, I'd love to discuss...`}
                  value={formData.message}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: "none", borderColor: errors.message ? "rgba(239,68,68,0.5)" : undefined }}
                  onFocus={onFocus} onBlur={onBlur}
                />
                {errors.message && (
                  <p style={errorStyle}><AlertCircle size={11} />{errors.message}</p>
                )}
              </div>

              {/* Submit button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{
                  width: "100%", justifyContent: "center",
                  padding: "14px 28px", fontSize: "1rem",
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                whileHover={loading ? {} : { scale: 1.03, y: -2 }}
                whileTap={loading ? {} : tapScale}
                transition={{ duration: 0.2 }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
