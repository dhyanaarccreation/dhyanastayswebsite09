import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

// Playfair Display (display serif) + Inter (sans) approximate the pairing seen
// in the client's UI Reference PDF — not a confirmed brand typeface. Swap for
// `next/font/local` once the client supplies real font files (DHN-35).
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Dhyana Stays — Experience Beyond Stay",
  description:
    "Curated stays, curated experiences, and an AI-personalised trip — discover, understand and trust the Dhyana Stays journey before opening the app.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`h-full font-sans antialiased ${inter.variable} ${playfairDisplay.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
