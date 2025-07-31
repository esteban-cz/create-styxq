import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { WebPushSubscription } from "@/models/webPushModels";

interface PushSubscriptionJSON {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
  expirationTime?: number | null;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const sub = (await request.json()) as PushSubscriptionJSON;
    const { endpoint, keys, expirationTime } = sub;

    await WebPushSubscription.findOneAndUpdate(
      { endpoint },
      {
        keys: {
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
        expirationTime: expirationTime ? new Date(expirationTime) : null,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Unable to save subscription" },
      { status: 500 },
    );
  }
}
