"use client"

import { motion } from "motion/react"
import { Rocket } from "lucide-react"

interface LoadingScreenProps {
  text?: string
}

export default function LoadingScreen({
  text = "Loading...",
}: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="from-gradient-from via-gradient-via to-gradient-to flex min-h-screen items-center justify-center bg-gradient-to-br"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="bg-primary/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
        >
          <Rocket className="text-primary h-8 w-8" />
        </motion.div>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-muted-foreground"
        >
          {text}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
