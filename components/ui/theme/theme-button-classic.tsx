"use client"

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export default function ThemeButton() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const currentTheme = theme === "system" ? resolvedTheme : theme

  const toggleTheme = () => {
    if (currentTheme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <AnimatePresence mode="wait">
        {currentTheme === "dark" ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}
