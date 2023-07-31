"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const providers_service_1 = __importDefault(require("../services/providers-service"));
const http_status_1 = __importDefault(require("http-status"));
async function getById(req, res) {
    const id = req.params.id;
    try {
        const provider = await providers_service_1.default.findById(id);
        return res.status(http_status_1.default.OK).send(provider);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function post(req, res) {
    const inputProvider = req.body;
    try {
        const provider = await providers_service_1.default.create(inputProvider);
        return res.status(http_status_1.default.OK).send(provider);
    }
    catch (error) {
        if (error.name === "conflictError")
            return res.status(http_status_1.default.CONFLICT).send(error);
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function update(req, res) {
    const id = req.params.id;
    const updateProvider = req.body;
    try {
        const updated = await providers_service_1.default.update(id, updateProvider);
        return res.status(http_status_1.default.ACCEPTED).send(updated);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function remove(req, res) {
    const id = req.params.id;
    try {
        await providers_service_1.default.remove(id);
        return res.status(http_status_1.default.OK);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
const providersController = {
    getById,
    post,
    update,
    remove,
};
exports.default = providersController;
