import { ObjectId } from "mongodb";
import dbConnect, { collectionNames } from "../../../lib/dbConnect";
import { NextResponse } from "next/server";

// Notice params is handled as a Promise now
// app/api/hero/[id]/route.js

export const PATCH = async (req, { params }) => {
  try {
    const { id } = await params; // Next.js 15 requirement
    const myInfoCollection = await dbConnect(collectionNames.MY_INFO);
    const body = await req.json();

    // 1. Remove _id from body to prevent MongoDB "immutable field" error
    const { _id, ...updateData } = body;

    const query = { _id: new ObjectId(id) };
    const filter = { $set: updateData };

    // 2. Use findOneAndUpdate to get the NEW document back
    const updatedDocument = await myInfoCollection.findOneAndUpdate(
      query,
      filter,
      { 
        returnDocument: 'after', // This is the key!
        includeResultMetadata: false // Returns the doc directly
      }
    );

    if (!updatedDocument) {
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    return NextResponse.json(updatedDocument);
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};