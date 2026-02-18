import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "@/theme/ThemeRegistry";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "2Creative.net — The Ultimate Creative Aggregator",
  description:
    "Your command center for creative jobs, templates, AI tools, deals, and inspiration — all in one dashboard.",
  keywords: [
    "creative jobs",
    "design templates",
    "AI tools",
    "freelance",
    "developer resources",
    "web design",
  ],
  openGraph: {
    title: "2Creative.net — The Ultimate Creative Aggregator",
    description:
      "Your command center for creative jobs, templates, AI tools, deals, and inspiration.",
    siteName: "2Creative.net",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
