"use client"

import { Tilt } from "@/components/ui/tilt"
import { useIsMobile } from "@/hooks/useMobile"

interface ResponsiveTiltProps {
  rotationFactor: number
  children: React.ReactNode
  className?: string
}

export default function ResponsiveTilt({
  rotationFactor,
  children,
  className,
}: ResponsiveTiltProps) {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <Tilt rotationFactor={rotationFactor} className={className} isReverse>
        {children}
      </Tilt>
    )
  }
  return <>{children}</>
}
