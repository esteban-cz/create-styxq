import "@/app/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { ReactLenis } from "lenis/react"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import ToasterWithTheme from "@/components/ui/theme-toaster"

const font = Inter({ subsets: ["latin"] })

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL!),
    authors: [{ name: "Štěpán Tomečka", url: "https://www.estyxq.dev" }],
    title: {
      template: `%s | Next.js Starter`,
      default: `Next.js Starter`,
    },
    description: "Next.js + shadcn-ui",
    keywords: "next.js, starter",
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-title" content="Next.js Starter" />
      </head>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ReactLenis root>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <ToasterWithTheme />
            <Footer />
          </ReactLenis>
        </ThemeProvider>
      </body>
    </html>
  )
}
