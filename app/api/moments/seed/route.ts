import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import { Moment } from "@/models/momentsModel";

export async function POST() {
  try {
    await dbConnect();

    await Moment.deleteMany({});

    const momentsData = [
      {
        order: 1,
        title: "První setkání a cesta letadlem",
        desc: "Letiště Václava Havla, Praha - 22.6.2022",
        images: ["letiste1"],
      },
      {
        order: 2,
        title: "První společná zima",
        desc: "Zima 2022",
        images: ["zima1", "zima2", "zima4", "zima3"],
      },
      {
        order: 3,
        title: "Naše virtualní svatba",
        desc: "4. 6. 2023",
        images: ["svatba1"],
      },
      {
        order: 4,
        title: "První rande a zamčený zámeček",
        desc: "Zamčení zámečku na Nováku",
        images: ["zamek1", "zamek2"],
      },
      {
        order: 5,
        title: "První společná dovolená a první roční výročí",
        desc: "Itálie - 1.8.2023",
        images: ["italie1", "italie2", "italie3", "italie4", "italie5"],
      },
      {
        order: 6,
        title: "Náš výlet do pražské ZOO",
        desc: "16.8.2023",
        images: ["zoo1"],
      },
      { order: 7, title: "Naše taneční", images: ["tanecni1"] },
      { order: 8, title: "První společné bruslení", images: ["brusle1"] },
      {
        order: 9,
        title: "Naše dvouleté výročí a dovolená do Itálie",
        desc: "Itálie - 1.8.2024",
        images: ["2italie1", "2italie2", "2italie3"],
      },
      {
        order: 10,
        title: "Naše první samostatná dovolená v Berlíně",
        desc: "Berlín - 12.4.2025",
        images: [
          "berlin1.jpeg",
          "berlin2",
          "berlin3",
          "berlin4",
          "berlin5",
          "berlin6",
          "berlin7",
          "berlin8",
        ],
      },
      {
        order: 11,
        title: "UV Minigolf",
        desc: "Praha - 10.5.2025",
        images: ["golf1", "golf2", "golf3", "golf4", "golf5", "golf6", "golf7"],
      },
      {
        order: 12,
        title: "Naše první společná dovolená k moři",
        desc: "Fuerteventura - 8.6. až 15.6.2025",
        images: Array.from({ length: 20 }, (_, i) => `fue${i + 1}`),
      },
      {
        order: 13,
        title: "Výlet do Vídně a Brna",
        desc: "Vídeň, Brno - 26.6.2025",
        images: ["viden1", "viden2", "viden3", "viden4", "viden5"],
      },
    ];

    const created = await Moment.insertMany(momentsData);

    return NextResponse.json(
      { success: true, inserted: created.length },
      { status: 201 },
    );
  } catch (error) {
    console.error("Seeding moments error:", error);
    return NextResponse.json(
      { error: "Failed to seed moments" },
      { status: 500 },
    );
  }
}
