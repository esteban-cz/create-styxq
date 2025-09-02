import SignUpSection from "@/components/sections/auth/sign-up-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign up",
  description: "Securely sign up",
}

export default function Page() {
  return <SignUpSection />
}
