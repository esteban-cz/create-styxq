import { cn } from "@/lib/utils"
import { Shield } from "lucide-react"
import { motion } from "motion/react"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted flex animate-pulse items-center justify-center rounded-lg",
        className,
      )}
      {...props}
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
        <Shield className="text-primary h-8 w-8" />
      </motion.div>
    </div>
  )
}

export { Skeleton }
