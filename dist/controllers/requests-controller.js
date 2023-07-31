"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const requests_service_1 = __importDefault(require("../services/requests-service"));
const http_status_1 = __importDefault(require("http-status"));
async function post(req, res) {
    const inputRequest = req.body;
    try {
        const requestReturn = await requests_service_1.default.post(inputRequest);
        if (inputRequest.notificationSMS) {
            await requests_service_1.default.handleSMS(inputRequest.country
                ? inputRequest.country
                : requestReturn.country
                    ? requestReturn.country
                    : "US", inputRequest.phone, requestReturn.url, requestReturn.lang ? requestReturn.lang : "en");
            return res.status(http_status_1.default.ACCEPTED).send(requestReturn);
        }
        return res.status(http_status_1.default.OK).send(requestReturn);
    }
    catch (error) {
        console.log(error);
        if (error.name === "conflictError")
            return res.status(http_status_1.default.CONFLICT).send(error);
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function get(req, res) {
    res.setTimeout(300000);
    const id = req.params.id;
    if (!id) {
        return res.status(http_status_1.default.BAD_REQUEST);
    }
    try {
        const location = await requests_service_1.default.getLocationById(id);
        return res.status(http_status_1.default.OK).send(location);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function put(req, res) {
    const id = req.params.id;
    const inputLocation = req.body;
    if (!id) {
        return res.status(http_status_1.default.BAD_REQUEST);
    }
    try {
        await requests_service_1.default.updateWithLocation(id, inputLocation);
        return res.sendStatus(http_status_1.default.OK);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
async function getAll(req, res) {
    try {
        const requests = await requests_service_1.default.findAll();
        return res.status(http_status_1.default.OK).send(requests);
    }
    catch (error) {
        return res.status(http_status_1.default.BAD_REQUEST).send(error);
    }
}
const requestController = {
    post,
    get,
    put,
    getAll,
};
exports.default = requestController;
