"use client"

import Link from "next/link"
import { motion } from "motion/react"
import ThemeButton from "@/components/ui/theme/theme-button-animated"

export default function Navbar() {
  return (
    <nav className="bg-background/80 fixed z-50 w-full border-b backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href="/" className="text-xl font-bold">
              Next.js Starter
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2"
          >
            <ThemeButton />
          </motion.div>
        </div>
      </div>
    </nav>
  )
}
