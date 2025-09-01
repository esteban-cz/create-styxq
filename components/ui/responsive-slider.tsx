"use client"

import { InfiniteSlider } from "@/components/ui/infinite-slider"
import { useIsMobile } from "@/hooks/useMobile"

interface ResponsiveSliderProps {
  gap: number
  speedOnHover?: number
  speed?: number
  children: React.ReactNode
  className?: string
}

export default function ResponsiveSlider({
  gap,
  speedOnHover,
  speed,
  children,
  className,
}: ResponsiveSliderProps) {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return (
      <InfiniteSlider
        gap={gap}
        speedOnHover={speedOnHover}
        speed={speed}
        className={className}
      >
        {children}
      </InfiniteSlider>
    )
  }
  return <div className={className}>{children}</div>
}
