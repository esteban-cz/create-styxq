import { NextResponse } from "next/server"
import dbConnect from "@/lib/db"
import { Moment, type IMoment } from "@/models/momentsModel"

export async function GET() {
  try {
    await dbConnect()

    const moments: IMoment[] = await Moment.find({}).sort({ order: 1 }).lean()

    return NextResponse.json({ moments }, { status: 200 })
  } catch (error) {
    console.error("Error fetching moments:", error)
    return NextResponse.json(
      { error: "Failed to fetch moments" },
      { status: 500 },
    )
  }
}
