import { cookies } from "next/headers"
import { AuthProvider } from "./auth-provider"
import { verifyToken } from "@/lib/auth/verifyToken"

export default async function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth_token")?.value

  let decodedToken = null
  if (token) {
    try {
      decodedToken = await verifyToken(token)
    } catch (error) {
      console.log("Error decoding token:", error)
      decodedToken = null
    }
  }

  return (
    <AuthProvider decodedToken={decodedToken?.payload}>{children}</AuthProvider>
  )
}
