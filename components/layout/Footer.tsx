"use client"

import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "motion/react"

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
  return (
    <footer className="overflow-hidden border-t">
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 0.8, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="text-center">
            <Button
              onClick={scrollToTop}
              size="icon"
              variant="ghost"
              className="rounded-full"
            >
              <ArrowUp />
            </Button>
            <div className="text-muted-foreground mt-6 text-sm">
              © {new Date().getFullYear()} Next.js Starter.{" "}
              <div className="sm:inline">All rights reserved.</div>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
