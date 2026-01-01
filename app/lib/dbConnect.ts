import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
  myInfo: "myInfo",
};

const uri = process.env.MONGODB_URI!;
const dbName = process.env.DB_NAME!;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) throw new Error("Missing MONGODB_URI");
if (!dbName) throw new Error("Missing DB_NAME");

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    // @ts-ignore
    global._mongoClientPromise = client.connect();
  }
  // @ts-ignore
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  clientPromise = client.connect();
}

export default async function dbConnect(collectionName: string) {
  const client = await clientPromise;
  return client.db(dbName).collection(collectionName);
}
