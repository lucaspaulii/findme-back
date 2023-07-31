"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
async function findByProviderId(providerId) {
    return await database_1.prisma.providers.findUnique({
        where: { providerId },
    });
}
async function findById(id) {
    return await database_1.prisma.providers.findUnique({
        where: { id },
    });
}
async function deleteById(id) {
    return await database_1.prisma.providers.delete({
        where: { id },
    });
}
async function updateById(id, updateObj) {
    return await database_1.prisma.providers.update({
        data: updateObj,
        where: { id },
    });
}
async function post(provider) {
    return await database_1.prisma.providers.create({
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
exports.default = providersRepository;
