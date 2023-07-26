import { InputLocation, InputRequest } from "@/controllers/requests-controller";
import { conflictError } from "@/errors/conflict-error";
import { locationRequestError } from "@/errors/location-request-error";
import providersRepository from "@/repositories/providers-repository";
import requestRepository from "@/repositories/requests-repository";
import { Lang, Location } from "@prisma/client";
import { ObjectId } from "mongodb";
import notificationService from "./notification-service";
import { GetResult } from "@prisma/client/runtime";

async function post(inputRequest: InputRequest): Promise<ReturnRequest> {
  await verifyIdentifier(inputRequest.requestIdentifier);
  const request = await requestRepository.create(inputRequest);
  const provider = await providersRepository.findByProviderId(
    request.providerId
  );

  const url = `${process.env.FRONT_END_URL}/?${
    request.requestIdentifier
      ? `r=${request.requestIdentifier}`
      : `r=${request.id}`
  }${provider ? `&c=${provider.id}` : ``}`;

  return {
    id: request.id,
    provider: provider ? provider.name : "undefined",
    url,
    country: provider ? provider.country : "undefined",
    lang: provider ? provider.language : "pt",
  };
}

async function findAll(): Promise<any[]> {
  const requests = await requestRepository.findAll();
  return requests;
}

async function getLocationById(id: string): Promise<Location> {
  let request = await locationCheck(id);
  return request;
}

async function updateWithLocation(id: string, inputLocation: InputLocation) {
  const exists = await idHandler(id);
  if (exists.location) {
    throw conflictError();
  }
  const locationObj = {
    type: "Point",
    coordinates: [inputLocation.coordinates.lng, inputLocation.coordinates.lat],
  } as Location;
  const functionToUse = ObjectId.isValid(id)
    ? requestRepository.updateLocationById
    : requestRepository.updateLocationByIdentifier;
  return await functionToUse(id, locationObj);
}

async function locationCheck(id: string): Promise<Location> {
  try {
    const request = await idHandler(id);
    if (request.location) {
      return request.location;
    } else {
      await wait(2000);
      return locationCheck(id);
    }
  } catch (error) {
    throw locationRequestError;
  }
}

async function idHandler(id: string) {
  const functionToUse = ObjectId.isValid(id)
    ? requestRepository.findByRequestId
    : requestRepository.findByRequestIdentifier;
  const result = await functionToUse(id);
  return result;
}

async function handleSMS(
  country: string,
  phone: string,
  url: string,
  lang: Lang
): Promise<void> {
  if (
    country.toLowerCase() == "br" ||
    country.toLowerCase() == "brasil" ||
    country.toLowerCase() == "brazil"
  )
    await notificationService.sendSMSviaZenvia(phone, url); //handle BR SMS
  else await notificationService.sendSMSviaTwilio(phone, url, lang); //handle ABROAD SMS (handle EN/ES issue TODO)
}

function wait(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function verifyIdentifier(identifier: string | null): Promise<void> {
  if (identifier) {
    const exists = await requestRepository.findByRequestIdentifier(identifier);
    if (exists) throw conflictError();
  }
}

const requestService = {
  post,
  getLocationById,
  updateWithLocation,
  handleSMS,
  findAll,
};

export default requestService;

type ReturnRequest = {
  id: string;
  url: string;
  provider: string;
  country?: string;
  lang: Lang;
};
