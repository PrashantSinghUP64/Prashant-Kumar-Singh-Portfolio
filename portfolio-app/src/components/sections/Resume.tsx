return (
  <section id="resume" className="py-28 relative overflow-hidden">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="card p-10 text-center"
        style={{
          background: "var(--card-bg)",
          borderRadius: "1.5rem",
          border: "1px solid var(--border)",
        }}
      >
        <h2
          className="text-4xl md:text-5xl font-black mb-4"
          style={{ color: "var(--fg)" }}
        >
          Resume
        </h2>

        <p
          className="text-lg mb-8"
          style={{ color: "var(--fg-muted)" }}
        >
          Download or view my latest resume.
        </p>

        <a
          href="https://drive.google.com/file/d/1xtMfWPlZTelnJhCVO5ftZqY6lyuoRY7P/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #10b981, #3b82f6)",
            color: "#fff",
          }}
        >
          📄 View Resume
        </a>
      </div>
    </div>
  </section>
);
