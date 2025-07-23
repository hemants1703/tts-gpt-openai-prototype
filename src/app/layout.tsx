import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FileVolumeIcon } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TTS GPT",
  description: "Text to Speech with OpenAI's API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground flex flex-col`}
      >
        <header className="w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
          <div className="max-w-screen-md mx-auto flex items-center justify-between py-4 px-4">
            <div className="flex items-center gap-2">
              <FileVolumeIcon className="size-10 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-md p-2" />
              <span className="font-bold text-xl tracking-tight">TTS GPT</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">
              by{" "}
              <Link
                href="https://hemantsharma.tech"
                target="_blank"
                className="hover:underline"
              >
                Hemant Sharma
              </Link>
            </span>
          </div>
        </header>
        <main className="flex-1 flex flex-col items-center justify-start w-full bg-background/95">
          {children}
        </main>
        <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} TTS GPT. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
