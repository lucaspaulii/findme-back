"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.requestSchema = joi_1.default.object({
    providerId: joi_1.default.number().required(),
    email: joi_1.default.string().email().required(),
    country: joi_1.default.string().optional(),
    phone: joi_1.default.string().when('notificationSMS', { is: joi_1.default.exist(), then: joi_1.default.required(), otherwise: joi_1.default.optional() }),
    requestIdentifier: joi_1.default.string().optional().max(10),
    notificationSMS: joi_1.default.boolean().optional(),
});
