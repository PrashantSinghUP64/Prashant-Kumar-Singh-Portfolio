import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Prashant Kumar Singh — Full Stack Developer",
  description:
    "Portfolio of Prashant Kumar Singh — Full Stack Developer & Video Editor. Building InterviewIQ, VidCognify, PlacementOS and more.",
  keywords:
    "Prashant Kumar Singh, AI ML developer, Full Stack Developer, Next.js, React, LangChain, portfolio, India",
  authors: [{ name: "Prashant Kumar Singh" }],
  openGraph: {
    title: "Prashant Kumar Singh — Full Stack Developer",
    description:
      "Full Stack Developer building real-world solutions.",
    type: "website",
  },
};

// Anti-flash script: runs before React hydration to apply dark class immediately
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (!theme) { theme = 'dark'; }
    document.documentElement.classList.add(theme);
  } catch(e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          <Navbar />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
