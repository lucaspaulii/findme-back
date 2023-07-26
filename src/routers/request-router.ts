import requestController from "@/controllers/requests-controller";
import { validateBody } from "@/middlewares/validation-middleware";
import { locationSchema } from "@/schemas/location-schema";
import { requestSchema } from "@/schemas/request-schema";
import { Router } from "express";

const requestRouter = Router();
requestRouter
  .get("/:id", requestController.get)
  .post("/", validateBody(requestSchema) ,requestController.post)
  .put("/:id", validateBody(locationSchema), requestController.put)

export { requestRouter };
