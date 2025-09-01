"use client"

import { motion, AnimatePresence } from "motion/react"
import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <AnimatePresence>
      <motion.div
        key="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-background flex min-h-screen items-center justify-center"
      >
        <div className="flex flex-col items-center">
          <Loader2 className="text-primary h-16 w-16 animate-spin" />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
