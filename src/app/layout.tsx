import type { Metadata } from "next";
import { Space_Mono, Workbench } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

const workbench = Workbench({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-workbench",
});

export const metadata: Metadata = {
  title: "homie.eth1c.com",
  description: "Minimal, privacy-first personal homepage.",
  metadataBase: new URL("https://homie.eth1c.com"),
  openGraph: {
    title: "homie.eth1c.com",
    description: "Minimal, privacy-first personal homepage.",
    url: "https://homie.eth1c.com",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fafafa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${spaceMono.variable} ${workbench.variable}`}>
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}

