"use client"

import { HeroSection } from "@/components/sections/hero-section"
import { motion } from "motion/react"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="from-primary via-background to-background flex min-h-screen flex-col bg-gradient-to-br"
    >
      <HeroSection />
    </motion.div>
  )
}
