"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
async function create(inputRequest) {
    return await database_1.prisma.requests.create({
        data: { ...inputRequest, timestamp: new Date() },
    });
}
async function findByRequestId(id) {
    return await database_1.prisma.requests.findUnique({
        where: { id },
    });
}
async function findAll() {
    return (await database_1.prisma.requests.findMany()).sort((a, b) => a.timestamp > b.timestamp ? 1 : -1);
}
async function findByRequestIdentifier(idenfifier) {
    return await database_1.prisma.requests.findUnique({
        where: { requestIdentifier: idenfifier },
    });
}
async function updateLocationById(id, location) {
    return await database_1.prisma.requests.update({
        data: { location },
        where: { id },
    });
}
async function updateLocationByIdentifier(idenfifier, location) {
    return await database_1.prisma.requests.update({
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
exports.default = requestRepository;
