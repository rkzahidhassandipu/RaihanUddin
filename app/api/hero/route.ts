import { NextResponse } from "next/server";
import dbConnect, { collectionNames } from "@/app/lib/dbConnect";

export async function GET() {
  try {
    const collection = dbConnect(collectionNames.MY_INFO);
    const data = await collection.findOne({});
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching hero" },
      { status: 500 }
    );
  }
}
