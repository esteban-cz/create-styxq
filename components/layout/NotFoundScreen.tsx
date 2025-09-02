"use client"

import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"
import { motion } from "motion/react"

export default function NotFoundScreen() {
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
        <motion.h1
          className="text-destructive text-7xl font-extrabold"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-muted-foreground text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <Link href="/">
          <Button variant="outline" className="group">
            <Home className="mr-2 h-5 w-5 transition-transform group-hover:scale-125" />
            Go Home
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  )
}
