import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { endpoint } = (await request.json()) as { endpoint: string };

  await supabase
    .from("web_push_subscriptions")
    .delete()
    .eq("endpoint", endpoint);

  return NextResponse.json({ success: true });
}
