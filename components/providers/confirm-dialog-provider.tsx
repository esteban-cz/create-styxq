"use client"

import * as React from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { _subscribeConfirm, type ConfirmOptions } from "@/lib/confirmDialog"

const styleClasses = {
  destructive:
    "bg-destructive hover:bg-destructive/90 hover:shadow-destructive/25 transform rounded-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl w-1/2",
  success:
    "bg-green-500 hover:bg-green-500/90 hover:shadow-green-500/25 transform rounded-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl w-1/2",
  default:
    "hover:bg-primary/90 hover:shadow-primary/25 transform rounded-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl w-1/2",
} as const

export default function ConfirmDialogProvider() {
  const [open, setOpen] = React.useState(false)
  const [opts, setOpts] = React.useState<ConfirmOptions | null>(null)
  const resolver = React.useRef<((ok: boolean) => void) | undefined>(undefined)

  React.useEffect(() => {
    const unsubscribe = _subscribeConfirm(({ resolve, ...options }) => {
      resolver.current = resolve
      setOpts(options)
      setOpen(true)
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const handleClose = (ok: boolean) => {
    setOpen(false)
    resolver.current?.(ok)
    resolver.current = undefined
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(v) => {
        if (!v) handleClose(false)
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{opts?.title}</AlertDialogTitle>
          {opts?.description ? (
            <AlertDialogDescription>{opts.description}</AlertDialogDescription>
          ) : null}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="w-1/2 transform rounded-lg px-8 py-4 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => handleClose(false)}
          >
            {opts?.cancelText ?? "Zrušit"}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleClose(true)}
            className={styleClasses[opts?.style ?? "default"]}
          >
            {opts?.confirmText ?? "Potvrdit"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
