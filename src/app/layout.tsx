import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sonam Wangdi Sherpa | Software Engineer",
  description: "Portfolio of Sonam Wangdi Sherpa, a software engineer with extensive experience in fullstack development, based in Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} antialiased`} suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300 overflow-x-hidden">
        <main className="flex w-full flex-grow flex-col items-stretch">
          {children}
        </main>
      </body>
    </html>
  );
}
