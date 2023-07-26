import {
  InputProvider,
  updateProvider,
} from "@/repositories/providers-repository";
import providersService from "@/services/providers-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function getById(req: Request, res: Response) {
  const id = req.params.id;

  try {
    const provider = await providersService.findById(id);
    return res.status(httpStatus.OK).send(provider);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function post(req: Request, res: Response) {
  const inputProvider = req.body as InputProvider;
  try {
    const provider = await providersService.create(inputProvider);
    return res.status(httpStatus.OK).send(provider);
  } catch (error) {
    if (error.name === "conflictError")
      return res.status(httpStatus.CONFLICT).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function update(req: Request, res: Response) {
  const id = req.params.id;
  const updateProvider = req.body as updateProvider;

  try {
    const updated = await providersService.update(id, updateProvider);
    return res.status(httpStatus.ACCEPTED).send(updated);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function remove(req: Request, res: Response) {
  const id = req.params.id;

  try {
    await providersService.remove(id);
    return res.status(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const providersController = {
  getById,
  post,
  update,
  remove,
};

export default providersController;
