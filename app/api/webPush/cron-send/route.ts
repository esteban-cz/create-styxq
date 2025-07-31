import { NextResponse } from "next/server";
import webpush from "web-push";
import dbConnect from "@/lib/db";
import { WebPushSubscription, NotificationLog } from "@/models/webPushModels";

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_VAPID_SUBJECT!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function GET() {
  try {
    await dbConnect();

    const payload = JSON.stringify({
      title: "Krásné výročí 💋",
      body: "Dnes máme výročí!",
      url: "/vyroci",
      icon: "/img/icon.png",
    });

    const subs = await WebPushSubscription.find({});

    const sendPromises = subs.map(async (sub) => {
      const pushSub = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.keys.p256dh,
          auth: sub.keys.auth,
        },
        ...(sub.expirationTime ? { expirationTime: sub.expirationTime } : {}),
      };

      try {
        await webpush.sendNotification(pushSub as any, payload);
        await NotificationLog.create({
          subscriptionId: sub._id,
          payload,
        });
      } catch (err) {
        console.error(`Failed sending to ${sub.endpoint}:`, err);
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Send push error:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 },
    );
  }
}
