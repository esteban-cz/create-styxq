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
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth/verifyToken";
import { AuthProvider } from "@/components/providers/auth-provider";

const font = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    authors: [{ name: "Štěpán Tomečka", url: "" }],
    title: {
      template: "%s | StyxQ",
      default: "Create StyxQ",
    },
    description: "Next.js 15 App Router + TailwindCSS + ShadcnUI + PWA Support",
    keywords: ["next", "nextjs", "tailwind", "shadcn", "pwa"],
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  let decodedToken = null;
  if (token) {
    try {
      decodedToken = await verifyToken(token);
    } catch (error) {
      console.log("Error decoding token:", error);
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <AuthProvider decodedToken={decodedToken?.payload}>
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
        </AuthProvider>
      </body>
    </html>
  );
}
