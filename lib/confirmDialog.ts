export type ConfirmStyle = "default" | "destructive" | "success"

export type ConfirmOptions = {
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  style?: ConfirmStyle
}

type ListenerPayload = ConfirmOptions & { resolve: (ok: boolean) => void }
type Listener = (payload: ListenerPayload) => void

const listeners = new Set<Listener>()

export function _subscribeConfirm(l: Listener) {
  listeners.add(l)
  return () => listeners.delete(l)
}

export function confirm(options: ConfirmOptions): Promise<boolean> {
  return new Promise((resolve) => {
    for (const l of listeners) l({ ...options, resolve })
  })
}

export function destructive(opts: Omit<ConfirmOptions, "style">) {
  return confirm({ ...opts, style: "destructive" })
}
export function success(opts: Omit<ConfirmOptions, "style">) {
  return confirm({ ...opts, style: "success" })
}
