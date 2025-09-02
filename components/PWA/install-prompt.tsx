"use client"

import { PlusSquare, Share } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor
    const ios =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" &&
        (navigator as any).maxTouchPoints > 1)

    const iosStandalone = (navigator as any).standalone === true

    const mm = window.matchMedia("(display-mode: standalone)")
    const androidStandalone = mm.matches

    setIsIOS(ios)
    setIsStandalone(iosStandalone || androidStandalone)

    const onChange = () =>
      setIsStandalone(
        (navigator as any).standalone === true ||
          window.matchMedia("(display-mode: standalone)").matches,
      )
    mm.addEventListener?.("change", onChange)
    window.addEventListener("appinstalled", onChange)
    document.addEventListener("visibilitychange", onChange)

    return () => {
      mm.removeEventListener?.("change", onChange)
      window.removeEventListener("appinstalled", onChange)
      document.removeEventListener("visibilitychange", onChange)
    }
  }, [])

  if (isStandalone) {
    return null
  }

  if (isIOS) {
    return (
      <>
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => setShowAlert(true)}
            size="lg"
            variant="outline"
            className="rounded-full px-8 py-4"
          >
            <PlusSquare className="h-4 w-4" />
            <span>Add to homescreen</span>
          </Button>
        </div>

        <Dialog open={showAlert} onOpenChange={setShowAlert}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="mb-4">
                How to add to homescreen
              </DialogTitle>
              <DialogDescription className="flex items-center justify-center space-x-1 text-center text-[0.8rem]">
                <span>Tap</span>
                <Share className="text-primary" size={16} />
                <span>then</span>
                <PlusSquare className="text-primary" size={16} />
                <span>to add to Homescreen</span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <Button onClick={() => setShowAlert(false)}>Got it</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}
