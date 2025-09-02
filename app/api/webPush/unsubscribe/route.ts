import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { WebPushSubscription } from "@/models/webPushModels"

interface UnsubscribeRequest {
  endpoint: string
}

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { endpoint } = (await request.json()) as UnsubscribeRequest

    await WebPushSubscription.deleteOne({ endpoint })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json(
      { error: "Unable to remove subscription" },
      { status: 500 },
    )
  }
}
