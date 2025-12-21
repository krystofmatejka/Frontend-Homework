import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageSwitch } from "./language-switch";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Manage your groceries with ease.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className}>
      <body>
        <LanguageSwitch />
        {children}
      </body>
    </html>
  );
}
