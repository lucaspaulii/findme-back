import requestService from "@/services/requests-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

async function post(req: Request, res: Response) {
  const inputRequest = req.body as InputRequest;
  try {
    const requestReturn = await requestService.post(inputRequest);

    if (inputRequest.notificationSMS) {
      await requestService.handleSMS(
        inputRequest.country
          ? inputRequest.country
          : requestReturn.country
          ? requestReturn.country
          : "US",
        inputRequest.phone,
        requestReturn.url,
        requestReturn.lang ? requestReturn.lang : "en"
      );
      return res.status(httpStatus.ACCEPTED).send(requestReturn);
    }
    return res.status(httpStatus.OK).send(requestReturn);
  } catch (error) {
    console.log(error);
    if (error.name === "conflictError")
      return res.status(httpStatus.CONFLICT).send(error);
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function get(req: Request, res: Response) {
  res.setTimeout(300000);
  const id = req.params.id;

  if (!id) {
    return res.status(httpStatus.BAD_REQUEST);
  }
  try {
    const location = await requestService.getLocationById(id);
    return res.status(httpStatus.OK).send(location);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function put(req: Request, res: Response) {
  const id = req.params.id;
  const inputLocation = req.body as InputLocation;

  if (!id) {
    return res.status(httpStatus.BAD_REQUEST);
  }

  try {
    await requestService.updateWithLocation(id, inputLocation);
    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const requests = await requestService.findAll();
    return res.status(httpStatus.OK).send(requests);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

const requestController = {
  post,
  get,
  put,
  getAll,
};

export default requestController;

export type InputRequest = {
  providerId: string;
  email: string;
  phone?: string;
  requestIdentifier?: string;
  notificationSMS?: boolean;
  country?: string;
};
export type InputLocation = {
  coordinates: {
    lat: number;
    lng: number;
  };
};
