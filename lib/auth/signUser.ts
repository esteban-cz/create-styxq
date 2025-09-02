import { SignJWT } from "jose"
import { cookies } from "next/headers"

export async function signUser(user: any) {
  const rawSecret = process.env.JWT_SECRET ?? ""
  if (!rawSecret) {
    throw new Error(
      "JWT_SECRET is missing or empty. Set it in your environment.",
    )
  }
  const JWT_SECRET = new TextEncoder().encode(rawSecret)
  const { name, surname, email, role } = user

  const userId = user._id.toString()

  const token = await new SignJWT({
    userId,
    name,
    surname,
    email,
    role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(JWT_SECRET)

  const cookieStore = await cookies()

  cookieStore.set({
    name: "auth_token",
    value: token,
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  })
}
