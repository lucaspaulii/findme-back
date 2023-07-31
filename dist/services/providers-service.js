"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conflict_error_1 = require("../errors/conflict-error");
const providers_repository_1 = __importDefault(require("../repositories/providers-repository"));
async function create(inputProvider) {
    const providerIdInUse = await providers_repository_1.default.findByProviderId(inputProvider.providerId);
    if (providerIdInUse)
        throw (0, conflict_error_1.conflictError)();
    return await providers_repository_1.default.post(inputProvider);
}
async function findById(id) {
    return await providers_repository_1.default.findById(id);
}
async function update(id, updateProvider) {
    return await providers_repository_1.default.updateById(id, updateProvider);
}
async function remove(id) {
    return await providers_repository_1.default.deleteById(id);
}
const providersService = {
    create,
    findById,
    update,
    remove,
};
exports.default = providersService;
