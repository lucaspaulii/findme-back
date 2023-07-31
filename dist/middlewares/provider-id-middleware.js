"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProviderId = void 0;
const providers_repository_1 = __importDefault(require("../repositories/providers-repository"));
const http_status_1 = __importDefault(require("http-status"));
async function checkProviderId(req, res, next) {
    const id = req.params.id;
    if (!id) {
        return res.status(http_status_1.default.BAD_REQUEST).send("invalid id");
    }
    try {
        const provider = await providers_repository_1.default.findById(id);
        if (!provider)
            return res.status(http_status_1.default.BAD_REQUEST).send("invalid id");
        next();
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
exports.checkProviderId = checkProviderId;
