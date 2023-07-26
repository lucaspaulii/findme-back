import providersController from "@/controllers/providers-controller";
import { checkProviderId } from "@/middlewares/provider-id-middleware";
import { validateBody } from "@/middlewares/validation-middleware";
import { providerSchema } from "@/schemas/provider-schema";
import { providerUpdateSchema } from "@/schemas/provider-schema-update";
import { Router } from "express";

const providerRouter = Router();
providerRouter
  .get("/:id", checkProviderId, providersController.getById)
  .post("/", validateBody(providerSchema), providersController.post)
  .put("/:id", checkProviderId, validateBody(providerUpdateSchema), providersController.update)
  .delete("/:id", checkProviderId, providersController.update);

export { providerRouter };
