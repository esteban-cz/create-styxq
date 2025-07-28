import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const sub = (await request.json()) as PushSubscriptionJSON;
  const { endpoint, keys, expirationTime } = sub;

  await supabase.from("web_push_subscriptions").upsert(
    {
      endpoint,
      p256dh: keys!.p256dh!,
      auth: keys!.auth!,
      expiration_time: expirationTime ? new Date(expirationTime) : null,
    },
    { onConflict: "endpoint" },
  );

  return NextResponse.json({ success: true }, { status: 201 });
}
