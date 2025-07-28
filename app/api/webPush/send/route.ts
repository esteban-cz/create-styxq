import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import webpush from "web-push";

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: subs, error } = await supabase
    .from("web_push_subscriptions")
    .select("endpoint, p256dh, auth, expiration_time");

  if (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { title, body, url, icon } = await request.json();
  const payload = JSON.stringify({ title, body, url, icon });

  try {
    await Promise.all(
      (subs || []).map((row) => {
        const pushSub = {
          endpoint: row.endpoint,
          keys: {
            p256dh: row.p256dh,
            auth: row.auth,
          },
          ...(row.expiration_time && {
            expirationTime: new Date(row.expiration_time).getTime(),
          }),
        };
        return webpush.sendNotification(pushSub as any, payload);
      }),
    );
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("web-push error:", err);
    return NextResponse.json({ error: "Failed to send push" }, { status: 500 });
  }
}
