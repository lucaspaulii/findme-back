import providersRepository from "@/repositories/providers-repository";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function checkProviderId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;

  if (!id) {
    return res.status(httpStatus.BAD_REQUEST).send("invalid id");
  }

  try {
    const provider = await providersRepository.findById(id);
    if (!provider) return res.status(httpStatus.BAD_REQUEST).send("invalid id");
    next();
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
