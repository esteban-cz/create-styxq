import { jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function verifyToken(token: string) {
  return await jwtVerify(token, JWT_SECRET)
}
