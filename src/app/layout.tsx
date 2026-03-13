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
  title: "2Creative.net — Premium Creative Resources, One Platform",
  description:
    "Find the best templates, UI kits, 3D models, presets, code, and fonts — curated from top marketplaces like ThemeForest, Webflow, Framer & TemplateMonster.",
  keywords: [
    "web templates",
    "UI kits",
    "3D models",
    "design assets",
    "creative fonts",
    "WordPress themes",
    "Webflow templates",
    "Framer templates",
  ],
  openGraph: {
    title: "2Creative.net — Premium Creative Resources, One Platform",
    description:
      "Templates, UI kits, 3D models, presets, code, and fonts — curated from the world's top creative marketplaces.",
    siteName: "2Creative.net",
    type: "website",
  },
  icons: {
    icon: "/images/2c-favicon.png",
    apple: "/images/2c-favicon.png",
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
