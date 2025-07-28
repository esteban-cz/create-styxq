import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { readFile } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, service, message } =
      await request.json();
    const fullName = `${firstName} ${lastName}`;

    const templatePath = join(
      process.cwd(),
      "components",
      "emails",
      "contactEmail.html",
    );

    let html = await readFile(templatePath, "utf8");

    const variables = {
      fullName,
      email,
      service,
      message: message.replace(/\n/g, "<br />"),
    };

    for (const [key, value] of Object.entries(variables)) {
      const pattern = new RegExp(`{{${key}}}`, "g");
      html = html.replace(pattern, value);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${fullName}" <${email}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "New Contact on estyxq.dev!",
      html,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err: unknown) {
    console.error("❌ Error sending email:", err);
    const message =
      err instanceof SyntaxError
        ? "Invalid JSON payload"
        : "Server error while sending email";

    return NextResponse.json(
      { success: false, error: message },
      { status: err instanceof SyntaxError ? 400 : 500 },
    );
  }
}

export function GET() {
  return NextResponse.json(
    { success: false, error: "Method GET not allowed" },
    { status: 405 },
  );
}
