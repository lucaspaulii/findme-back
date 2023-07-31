"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = exports.init = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./database");
const request_router_1 = require("./routers/request-router");
const providers_router_1 = require("./routers/providers-router");
const get_all_router_1 = require("./routers/get-all-router");
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json({ limit: "10mb" }))
    .use(express_1.default.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
    .use("/", request_router_1.requestRouter)
    .use("/provider", providers_router_1.providerRouter)
    .use("/all", get_all_router_1.getAllRouter);
function init() {
    (0, database_1.connectDB)();
    return Promise.resolve(app);
}
exports.init = init;
async function close() {
    await (0, database_1.disconnectDB)();
}
exports.close = close;
exports.default = app;
