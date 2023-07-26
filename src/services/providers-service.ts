import { conflictError } from "@/errors/conflict-error";
import providersRepository, {
  InputProvider,
  updateProvider,
} from "@/repositories/providers-repository";

async function create(inputProvider: InputProvider) {
  const providerIdInUse = await providersRepository.findByProviderId(
    inputProvider.providerId
  );
  if (providerIdInUse) throw conflictError();

  return await providersRepository.post(inputProvider);
}

async function findById(id: string) {
  return await providersRepository.findById(id);
}

async function update(id: string, updateProvider: updateProvider) {
  return await providersRepository.updateById(id, updateProvider);
}

async function remove(id: string) {
  return await providersRepository.deleteById(id);
}

const providersService = {
  create,
  findById,
  update,
  remove,
};
export default providersService;
