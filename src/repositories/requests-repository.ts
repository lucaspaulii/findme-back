import { InputRequest } from "@/controllers/requests-controller";
import { prisma } from "@/database";
import { Location } from "@prisma/client";

async function create(inputRequest: InputRequest) {
  return await prisma.requests.create({
    data: { ...inputRequest, timestamp: new Date() },
  });
}

async function findByRequestId(id: string) {
  return await prisma.requests.findUnique({
    where: { id },
  });
}

async function findAll() {
  return (await prisma.requests.findMany()).sort((a, b) =>
    a.timestamp > b.timestamp ? 1 : -1
  );
}

async function findByRequestIdentifier(idenfifier: string) {
  return await prisma.requests.findUnique({
    where: { requestIdentifier: idenfifier },
  });
}

async function updateLocationById(id: string, location: Location) {
  return await prisma.requests.update({
    data: { location },
    where: { id },
  });
}

async function updateLocationByIdentifier(
  idenfifier: string,
  location: Location
) {
  return await prisma.requests.update({
    data: { location },
    where: { requestIdentifier: idenfifier },
  });
}

const requestRepository = {
  create,
  findByRequestId,
  updateLocationById,
  findByRequestIdentifier,
  updateLocationByIdentifier,
  findAll,
};

export default requestRepository;
