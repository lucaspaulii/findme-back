"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.locationSchema = joi_1.default.object({
    coordinates: {
        lat: joi_1.default.number().max(90).min(-90),
        lng: joi_1.default.number().max(180).min(-180),
    },
    accuracy: joi_1.default.string().optional(),
});
