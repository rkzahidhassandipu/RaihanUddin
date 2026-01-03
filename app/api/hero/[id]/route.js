import { ObjectId } from "mongodb";
import dbConnect, { collectionNames } from "../../../lib/dbConnect";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    console.log(params)
    const { id } = params;
    
    const myInfoCollection = await dbConnect(collectionNames.MY_INFO);

    const body = await req.json();
    const query = { _id: new ObjectId(id) };
    const filter = { $set: { ...body } };
    const option = { upsert: false };

    const updateResponse = await myInfoCollection.updateOne(query, filter, option);

    return NextResponse.json(updateResponse);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
