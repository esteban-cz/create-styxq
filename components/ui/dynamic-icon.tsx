"use client"

import dynamic from "next/dynamic"
import { Shield } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { ComponentPropsWithoutRef } from "react"

interface DynamicIconProps {
  name: string
  className?: string
}

export default function DynamicIcon({ name, className }: DynamicIconProps) {
  const Icon = dynamic<ComponentPropsWithoutRef<LucideIcon>>(
    () =>
      import("lucide-react").then((mod) => {
        const icon = (mod as any)[name]
        if (!icon) {
          throw new Error(`Icon "${name}" does not exist in lucide-react`)
        }
        return icon
      }),
    {
      ssr: false,
      loading: () => (
        <Shield className={`${className ?? ""} animate-pulse opacity-50`} />
      ),
    },
  )

  return <Icon className={className} />
}
