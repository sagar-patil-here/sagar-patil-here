import type { Metadata } from "next";
import { Syne, Space_Grotesk, Damion } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const damion = Damion({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sagar Patil — Full Stack Developer & Designer",
  description:
    "Portfolio of Sagar Patil — Full Stack Web Developer & Designer specializing in React, Node.js, MERN Stack, Cyber Security, and premium web experiences. Based in Pune, India.",
  keywords: [
    "Sagar Patil",
    "Full Stack Developer",
    "Web Designer",
    "React Developer",
    "MERN Stack",
    "Portfolio",
    "Pune",
    "Freelancer",
  ],
  authors: [{ name: "Sagar Patil" }],
  openGraph: {
    title: "Sagar Patil — Full Stack Developer & Designer",
    description:
      "Engineering logic meets design aesthetics. Explore the work of Sagar Patil.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable} ${damion.variable}`}>
      <body>
        <div className="web-overlay" aria-hidden="true" />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
