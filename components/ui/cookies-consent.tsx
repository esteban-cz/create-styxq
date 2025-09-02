"use client"

import { CookieIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CookieConsentProps {
  variant?: "default" | "small"
  essential?: boolean
  demo?: boolean
  onAcceptCallback?: () => void
  onDeclineCallback?: () => void
}

export default function CookieConsent({
  variant = "default",
  essential = false,
  demo = false,
  onAcceptCallback = () => {
    //
  },
  onDeclineCallback = () => {
    //
  },
}: CookieConsentProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [hide, setHide] = useState(false)

  const acceptEssential = () => {
    setIsOpen(false)
    document.cookie =
      "essentialCookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    setTimeout(() => setHide(true), 700)
    onAcceptCallback()
  }

  const acceptAll = () => {
    setIsOpen(false)
    document.cookie =
      "cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT"
    setTimeout(() => setHide(true), 700)
    onAcceptCallback()
  }

  const decline = () => {
    setIsOpen(false)
    setTimeout(() => setHide(true), 700)
    onDeclineCallback()
  }

  useEffect(() => {
    try {
      setIsOpen(true)
      if (essential) {
        if (document.cookie.includes("essentialCookieConsent=true") && !demo) {
          setIsOpen(false)
          setTimeout(() => setHide(true), 700)
        }
      } else {
        if (document.cookie.includes("cookieConsent=true") && !demo) {
          setIsOpen(false)
          setTimeout(() => setHide(true), 700)
        }
      }
    } catch {}
  }, [demo, essential])

  if (essential) {
    return (
      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-[200] w-full duration-700 sm:bottom-4 sm:left-4 sm:max-w-md",
          !isOpen
            ? "translate-y-8 opacity-0 transition-[opacity,transform,translate]"
            : "translate-y-0 opacity-100 transition-[opacity,transform,translate]",
          hide && "hidden",
        )}
      >
        <div className="bg-background/80 border-border m-3 rounded-lg border backdrop-blur-md">
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg font-medium">
              Essential Functioning Cookies Only
            </h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="-mt-2 p-3">
            <p className="text-muted-foreground text-left text-sm">
              We only use essential functioning cookies necessary for the core
              functionality of the website. No tracking or advertising cookies
              are used.
            </p>
          </div>
          <div className="border-border dark:bg-background/20 grid grid-cols-1 gap-2 border-t p-4">
            <Button onClick={acceptEssential}>Okay</Button>
          </div>
        </div>
      </div>
    )
  }

  return variant === "default" ? (
    <div
      className={cn(
        "fixed right-0 bottom-0 left-0 z-[200] w-full duration-700 sm:bottom-4 sm:left-4 sm:max-w-md",
        !isOpen
          ? "translate-y-8 opacity-0 transition-[opacity,transform,translate]"
          : "translate-y-0 opacity-100 transition-[opacity,transform,translate]",
        hide && "hidden",
      )}
    >
      <div className="dark:bg-card bg-background border-border m-3 rounded-md border shadow-lg">
        <div className="grid gap-2">
          <div className="border-border flex h-14 items-center justify-between border-b p-4">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="p-4">
            <p className="text-start text-sm font-normal">
              We use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
              <br />
              <br />
              <span className="text-xs">
                By clicking
                <span className="font-medium opacity-80"> Accept</span>, you
                agree to our use of cookies.
              </span>
              <br />
              <a href="#" className="text-xs underline">
                Learn more.
              </a>
            </p>
          </div>
          <div className="border-border dark:bg-background/20 grid grid-cols-1 gap-2 border-t p-4 py-5">
            <Button onClick={acceptAll}>Accept</Button>
            <Button onClick={decline} variant="secondary">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    variant === "small" && (
      <div
        className={cn(
          "fixed right-0 bottom-0 left-0 z-[200] w-full duration-700 sm:bottom-4 sm:left-4 sm:max-w-md",
          !isOpen
            ? "translate-y-8 opacity-0 transition-[opacity,transform,translate]"
            : "translate-y-0 opacity-100 transition-[opacity,transform,translate]",

          hide && "hidden",
        )}
      >
        <div className="bg-background/80 border-border m-3 rounded-lg border backdrop-blur-md">
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg font-medium">We use cookies</h1>
            <CookieIcon className="h-[1.2rem] w-[1.2rem]" />
          </div>
          <div className="-mt-2 p-3">
            <p className="text-muted-foreground text-left text-sm">
              We use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
            </p>
          </div>
          <div className="mt-2 grid grid-cols-2 items-center gap-2 border-t p-3">
            <Button onClick={acceptAll}>Accept</Button>
            <Button onClick={decline} variant="outline">
              Decline
            </Button>
          </div>
        </div>
      </div>
    )
  )
}
