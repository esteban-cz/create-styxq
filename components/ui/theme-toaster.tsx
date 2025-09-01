"use client"
import { Toaster } from "sonner"
import { useTheme } from "next-themes"

export default function ToasterWithTheme() {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = theme === "system" ? resolvedTheme : theme
  return (
    <Toaster
      theme={currentTheme === "dark" ? "dark" : "light"}
      richColors
      className="z-[9999]"
      position="top-center"
    />
  )
}
