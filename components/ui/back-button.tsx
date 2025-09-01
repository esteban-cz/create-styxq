"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BackButton() {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length <= 1) {
      router.push("/")
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleBack}
      className="inline-flex items-center"
    >
      <ArrowLeft className="mr-2 inline-block h-4 w-4 align-middle" />
      <span className="inline-block align-middle">Go back</span>
    </Button>
  )
}
