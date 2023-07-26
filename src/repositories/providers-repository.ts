import { prisma } from "@/database";
import { Lang } from "@prisma/client";

async function findByProviderId(providerId: string) {
  return await prisma.providers.findUnique({
    where: { providerId },
  });
}

async function findById(id: string) {
  return await prisma.providers.findUnique({
    where: { id },
  });
}

async function deleteById(id: string) {
  return await prisma.providers.delete({
    where: { id },
  });
}

async function updateById(id: string, updateObj: updateProvider) {
  return await prisma.providers.update({
    data: updateObj,
    where: { id },
  });
}

async function post(provider: InputProvider) {
  return await prisma.providers.create({
    data: provider,
  });
}

const providersRepository = {
  findByProviderId,
  findById,
  deleteById,
  updateById,
  post,
};

export default providersRepository;

export type updateProvider = {
  name?: string;
  providerId?: string;
  logo?: string;
  color?: string;
  darkMode?: boolean;
  language?: Lang;
  country?: string;
} & {};

export type InputProvider = {
  name: string;
  providerId: string;
  logo: string;
  color: string;
  darkMode: boolean;
  language: Lang;
  country: string;
};
