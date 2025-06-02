import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ToasterWithTheme from "@/components/ui/theme-toaster";
import RegisterSW from "@/components/PWA/register-sw";
import CookieConsent from "@/components/ui/cookies-consent";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    authors: [{ name: "Štěpán Tomečka", url: "" }],
    title: "Create StyxQ",
    description: "Next.js 15 App Router + TailwindCSS + ShadcnUI + PWA Support",
    keywords: ["next", "nextjs", "tailwind", "shadcn", "pwa"],
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactLenis root>
            <Navbar />
            <RegisterSW />
            <main className="min-h-screen">{children}</main>
            <CookieConsent essential />
            <ToasterWithTheme />
            <Footer />
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  );
}
