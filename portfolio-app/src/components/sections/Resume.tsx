"use client";

export default function Resume() {
  return (
    <section id="resume" className="py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <a
          href="https://drive.google.com/file/d/1xtMfWPlZTelnJhCVO5ftZqY6lyuoRY7P/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-4 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
          }}
        >
          📄 View Resume
        </a>
      </div>
    </section>
  );
}
