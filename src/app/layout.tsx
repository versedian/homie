import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-background text-foreground">{children}</body>
    </html>
  );
}
