"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerRouter = void 0;
const providers_controller_1 = __importDefault(require("../controllers/providers-controller"));
const provider_id_middleware_1 = require("../middlewares/provider-id-middleware");
const validation_middleware_1 = require("../middlewares/validation-middleware");
const provider_schema_1 = require("../schemas/provider-schema");
const provider_schema_update_1 = require("../schemas/provider-schema-update");
const express_1 = require("express");
const providerRouter = (0, express_1.Router)();
exports.providerRouter = providerRouter;
providerRouter
    .get("/:id", provider_id_middleware_1.checkProviderId, providers_controller_1.default.getById)
    .post("/", (0, validation_middleware_1.validateBody)(provider_schema_1.providerSchema), providers_controller_1.default.post)
    .put("/:id", provider_id_middleware_1.checkProviderId, (0, validation_middleware_1.validateBody)(provider_schema_update_1.providerUpdateSchema), providers_controller_1.default.update)
    .delete("/:id", provider_id_middleware_1.checkProviderId, providers_controller_1.default.update);
