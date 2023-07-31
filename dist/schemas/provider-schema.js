"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.providerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    providerId: joi_1.default.string().required(),
    logo: joi_1.default.string().uri().required(),
    color: joi_1.default.string().regex(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/).required(),
    darkMode: joi_1.default.boolean().required(),
    language: joi_1.default.string().valid("pt", "en", "es")
});
