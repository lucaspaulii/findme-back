import requestController from "@/controllers/requests-controller";
import { Router } from "express";

const getAllRouter = Router();
getAllRouter
  .get("/requests", requestController.getAll)

export { getAllRouter };
