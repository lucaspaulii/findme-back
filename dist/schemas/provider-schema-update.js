"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerUpdateSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.providerUpdateSchema = joi_1.default.object({
    name: joi_1.default.string().optional(),
    providerId: joi_1.default.string().optional(),
    logo: joi_1.default.string().uri().optional(),
    color: joi_1.default.string()
        .regex(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/)
        .optional(),
    darkMode: joi_1.default.boolean().optional(),
    language: joi_1.default.string().valid("pt", "en", "es").optional(),
});
