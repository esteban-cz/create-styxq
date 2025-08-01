import { useState, useCallback } from "react";

type HeadersObj = Record<string, string>;

interface FetchDataReturn<T = any> {
  req: (
    url: string,
    data?: any,
    method?: string,
    headers?: HeadersObj,
  ) => Promise<T>;
  loading: boolean;
  error: string | null;
  message: string | null;
}

export default function useHttp(): FetchDataReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const req = useCallback(
    async (
      url: string,
      data?: any,
      method = "POST",
      headers: HeadersObj = { "Content-Type": "application/json" },
    ): Promise<any> => {
      setLoading(true);
      setError(null);
      setMessage(null);

      try {
        const config: RequestInit = { method, headers };
        if (data != null && method.toUpperCase() !== "GET") {
          config.body = JSON.stringify(data);
        }

        const res = await fetch(url, config);
        const payload = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errMsg =
            (payload && (payload.error || payload.message)) || res.statusText;
          const error = new Error(errMsg) as Error & { status?: number };
          error.status = res.status;
          throw error;
        }

        setMessage(payload.message || "Success");
        return payload;
      } catch (err: any) {
        const msg = err.message || "Something went wrong.";
        setError(msg);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { req, loading, error, message };
}
