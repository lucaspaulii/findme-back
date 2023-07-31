"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestRouter = void 0;
const requests_controller_1 = __importDefault(require("../controllers/requests-controller"));
const validation_middleware_1 = require("../middlewares/validation-middleware");
const location_schema_1 = require("../schemas/location-schema");
const request_schema_1 = require("../schemas/request-schema");
const express_1 = require("express");
const requestRouter = (0, express_1.Router)();
exports.requestRouter = requestRouter;
requestRouter
    .get("/:id", requests_controller_1.default.get)
    .post("/", (0, validation_middleware_1.validateBody)(request_schema_1.requestSchema), requests_controller_1.default.post)
    .put("/:id", (0, validation_middleware_1.validateBody)(location_schema_1.locationSchema), requests_controller_1.default.put);
