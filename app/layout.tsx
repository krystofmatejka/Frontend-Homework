import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { LanguageSwitch } from "./language-switch";
import { ThemeSwitch } from "./theme-switch";
import { cookies } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shopping List",
  description: "Manage your groceries with ease.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('preferred-theme')?.value || 'light';
  
  return (
    <html lang="en" className={geistSans.className} data-theme={theme}>
      <body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <LanguageSwitch />
          <ThemeSwitch />
        </div>
        {children}
      </body>
    </html>
  );
}
