"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

export default function NotFoundScreen() {
  const digits = ["4", "0", "4"]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="from-gradient-from via-gradient-via to-gradient-to flex min-h-screen items-center justify-center bg-gradient-to-br p-4 text-center"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="rounded-x space-y-8"
      >
        <motion.h1 className="text-destructive flex justify-center gap-2 text-7xl font-extrabold">
          {digits.map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                delay: i * 0.333,
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          The page you are looking for does not exist.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            size="lg"
            className="group bg-primary text-background hover:bg-primary/90 hover:shadow-primary/25 transform rounded-full px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            asChild
          >
            <Link href="/">
              Go home
              <Home className="ml-2 h-5 w-5 transform transition-transform duration-300 group-hover:scale-110" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
