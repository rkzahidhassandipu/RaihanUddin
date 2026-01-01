import dbConnect, { collectionNames } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const collection = await dbConnect(collectionNames.myInfo);
    const heroData = await collection
      .find({ type: "hero" })
      .toArray();

    return NextResponse.json(heroData);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load hero data" },
      { status: 500 }
    );
  }
}
 