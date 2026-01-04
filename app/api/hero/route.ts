import { NextResponse } from "next/server";
import dbConnect, { collectionNames } from "@/app/lib/dbConnect";

export async function GET() {
  try {
    const collection = dbConnect(collectionNames.MY_INFO);
    const data = await collection.findOne({});
    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to load hero data:", error);
    return NextResponse.json(
      { message: "Failed to load hero data" },
      { status: 500 }
    );
  }}
