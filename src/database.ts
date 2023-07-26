import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
dotenv.config();

const mongo_uri: string = process.env.MONGO_URI ?? "undefined";

const mongoClient = new MongoClient(mongo_uri);

try {
  const connection = async () => {
    await mongoClient.connect();
  };
  connection();
} catch (error) {
  console.log(error);
}

export let prisma: PrismaClient;
export function connectDB(): void {
  prisma = new PrismaClient();
}

export async function disconnectDB(): Promise<void> {
  await prisma?.$disconnect();
}
