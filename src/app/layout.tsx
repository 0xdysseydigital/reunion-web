import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Reunion Cocktails + Provisions — Hershey, PA",
  description:
    "A social dining experience in Hershey, Pennsylvania. Handcrafted cocktails, inspired dishes, and a space designed for connection.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-brand-bg text-brand-cream">
        {children}
      </body>
    </html>
  );
}
