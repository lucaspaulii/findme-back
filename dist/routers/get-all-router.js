"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRouter = void 0;
const requests_controller_1 = __importDefault(require("../controllers/requests-controller"));
const express_1 = require("express");
const getAllRouter = (0, express_1.Router)();
exports.getAllRouter = getAllRouter;
getAllRouter
    .get("/requests", requests_controller_1.default.getAll);
