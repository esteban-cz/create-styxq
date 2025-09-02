import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  surname: z.string().min(1, "Surname is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password must be at least 6 characters"),
})

export type SignUpData = z.infer<typeof signUpSchema>
