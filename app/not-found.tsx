import NotFoundScreen from "@/components/layout/NotFoundScreen"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    absolute: "404 - Not Found",
  },

  description: "We're sorry, but the page you're looking for doesn't exist.",
}

export default function NotFound() {
  return <NotFoundScreen />
}
