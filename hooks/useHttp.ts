/* eslint-disable @typescript-eslint/no-base-to-string */
import { useState, useCallback } from "react"
import { toast } from "sonner"

type HeadersObj = Record<string, string>

export type ApiResult<T = any> = {
  ok: boolean
  status: number
  data?: T
  error?: string
  alert?: string
  message?: string
}

type HookOptions = {
  /** Show toasts for error/alert by default (no success toast by default) */
  autoToast?: boolean
  /** Show success toast when there's a payload.message */
  successToast?: boolean
}

type PerRequestOptions = {
  autoToast?: boolean
  successToast?: boolean
}

interface FetchDataReturn {
  req: <T = any>(
    url: string,
    data?: any,
    method?: string,
    opts?: PerRequestOptions,
    headers?: HeadersObj,
  ) => Promise<ApiResult<T>>
  loading: boolean
  error: string | null
  message: string | null
}

export default function useHttp(options: HookOptions = {}): FetchDataReturn {
  const { autoToast = true, successToast = false } = options

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const req = useCallback(
    async <T = any>(
      url: string,
      data?: any,
      method = "POST",
      reqOptions: PerRequestOptions = {},
      headers: HeadersObj = { "Content-Type": "application/json" },
    ): Promise<ApiResult<T>> => {
      const useAutoToast = reqOptions.autoToast ?? autoToast
      const useSuccessToast = reqOptions.successToast ?? successToast

      setLoading(true)
      setError(null)
      setMessage(null)

      try {
        const config: RequestInit = { method, headers }

        // Attach body only for non-GET
        if (data != null && method.toUpperCase() !== "GET") {
          config.body = JSON.stringify(data)
        }

        let finalUrl = url
        const usp = new URLSearchParams()

        // If GET with data, append as querystring
        if (data != null && method.toUpperCase() === "GET") {
          Object.entries(data).forEach(([k, v]) => {
            if (v !== undefined && v !== null) usp.set(k, String(v))
          })
        }

        if (usp.toString()) {
          finalUrl += (url.includes("?") ? "&" : "?") + usp.toString()
        }

        const res = await fetch(finalUrl, config)

        // Safe JSON parse
        const payload: any = await res.json().catch(() => ({}))

        // Normalize fields
        const normalized: ApiResult<T> = {
          ok: res.ok && !payload?.error,
          status: res.status,
          data: payload as T,
          error: payload?.error ?? (!res.ok ? res.statusText : undefined),
          alert: payload?.alert,
          message: payload?.message,
        }

        // Update hook state
        if (normalized.error) setError(normalized.error)
        if (normalized.message) setMessage(normalized.message)

        // Auto toast (error > alert > success)
        if (useAutoToast) {
          if (normalized.error) {
            toast.error(normalized.error)
          } else if (normalized.alert) {
            toast.warning(normalized.alert)
          } else if (useSuccessToast && normalized.message) {
            toast.success(normalized.message)
          }
        }

        return normalized
      } catch (err: any) {
        const fallback = err?.message || "Something went wrong."
        if (autoToast) toast.error(fallback)
        setError(fallback)
        return { ok: false, status: 0, error: fallback }
      } finally {
        setLoading(false)
      }
    },
    [autoToast, successToast],
  )

  return { req, loading, error, message }
}
