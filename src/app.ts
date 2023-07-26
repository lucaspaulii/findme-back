import express, { Express } from "express";
import cors from "cors";
import { connectDB, disconnectDB } from "./database";
import { requestRouter } from "./routers/request-router";
import { providerRouter } from "./routers/providers-router";
import { getAllRouter } from "./routers/get-all-router";

const app = express();
app
  .use(cors())
  .use(express.json({ limit: "10mb" }))
  .use(
    express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 })
  )
  .use("/", requestRouter)
  .use("/provider", providerRouter)
  .use("/all", getAllRouter);

export function init(): Promise<Express> {
  connectDB();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
