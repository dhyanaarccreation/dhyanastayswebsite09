import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// Font loading via next/font is part of the documented stack (DHN-35), but the
// brand typeface hasn't been chosen yet. Swap this default system-font stack
// for `next/font/google` or `next/font/local` once the client confirms one —
// self-hosting Google Fonts at build time requires outbound network access,
// so a self-hosted local font file is the more portable choice for CI.

export const metadata: Metadata = {
  title: "Dhyana Stays — Experience Beyond Stay",
  description:
    "Curated stays, curated experiences, and an AI-personalised trip — discover, understand and trust the Dhyana Stays journey before opening the app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full font-sans antialiased">
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
