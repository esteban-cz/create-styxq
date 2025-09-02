import SignInSection from "@/components/sections/auth/sign-in-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in",
  description: "Securely sign in",
}

export default function Page() {
  return <SignInSection />
}
