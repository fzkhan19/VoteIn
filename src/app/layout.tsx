import type {Metadata} from "next";

import {Inter} from "next/font/google";

import Providers from "@/components/Providers";
import {SocketProvider} from "@/components/SocketProvider";
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
      <body className={cn("text-bodyFont bg-background font-sans antialiased", inter.className)}>
        <main className="">
          <Providers>
            <SocketProvider>
              <Navbar />
              {children}
            </SocketProvider>
          </Providers>
        </main>
      </body>
    </html>
  );
}
