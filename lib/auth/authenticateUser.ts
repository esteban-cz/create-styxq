import "server-only";

import { cookies } from "next/headers";
import { verifyToken } from "./verifyToken";
import { User } from "@/models/User";

export async function authenticateUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    console.log("no token");
  }

  const { payload } = await verifyToken(token!);

  const userId = payload.userId;

  const user = await User.findById(userId).lean();

  if (!user) {
    console.log("wrong token");
  }

  return user;
}
