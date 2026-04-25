import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientNavigation from "@/components/ClientNavigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "QUICK RESPONSE BACK.",
  description: "A Swiss Typography-inspired word generator and response tool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white dark:bg-slate-900 text-black dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <ClientNavigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
