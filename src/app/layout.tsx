import type {Metadata} from "next";

import {Inter} from "next/font/google";

import Providers from "@/components/Providers";
import {Navbar} from "@/components/layout/navbar";
import {cn} from "@/lib/utils";
import "./globals.css";
const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Vote-In",
  description:
    "Vote-In is a decentralized voting platform that allows you to vote on any proposal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={cn("min-h-screen bg-background", inter.className)}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
