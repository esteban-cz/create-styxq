import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";
import { signUser } from "@/lib/auth/signUser";

export async function POST(req: NextRequest) {
  const { name, surname, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      { error: "Name, email, and password are required" },
      { status: 400 },
    );
  }

  await dbConnect();
  if (await User.exists({ email })) {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 },
    );
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    surname,
    email,
    password: hash,
  });

  await signUser(user);

  return NextResponse.json(
    { success: true, message: "User created successfully" },
    { status: 200 },
  );
}
