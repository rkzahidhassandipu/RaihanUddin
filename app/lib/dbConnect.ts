/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
  MY_INFO: "myInfo"
}

const dbConnect = (next: any) => {
  const uri  = process.env.MONGODB_URI;
  console.log(uri)
  const client = new MongoClient(uri as string, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  return client.db(process.env.DB_NAME).collection(next)
};

export default dbConnect