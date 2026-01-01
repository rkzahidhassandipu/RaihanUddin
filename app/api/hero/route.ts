import dbConnect, { collectionNames } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
 const data = await dbConnect(collectionNames.MY_INFO).find({}).toArray()
  return NextResponse.json({ data })
}

 