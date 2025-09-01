import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();

  cookieStore.set({ name: "auth_token", value: "", path: "/", maxAge: 0 });

  return NextResponse.json(
    { success: true, message: "Signed out successfully" },
    { status: 200 },
  );
}
