"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conflict_error_1 = require("../errors/conflict-error");
const location_request_error_1 = require("../errors/location-request-error");
const providers_repository_1 = __importDefault(require("../repositories/providers-repository"));
const requests_repository_1 = __importDefault(require("../repositories/requests-repository"));
const mongodb_1 = require("mongodb");
const notification_service_1 = __importDefault(require("./notification-service"));
async function post(inputRequest) {
    await verifyIdentifier(inputRequest.requestIdentifier);
    const request = await requests_repository_1.default.create(inputRequest);
    const provider = await providers_repository_1.default.findByProviderId(request.providerId);
    const url = `${process.env.FRONT_END_URL}/?${request.requestIdentifier
        ? `r=${request.requestIdentifier}`
        : `r=${request.id}`}${provider ? `&c=${provider.id}` : ``}`;
    return {
        id: request.id,
        provider: provider ? provider.name : "undefined",
        url,
        country: provider ? provider.country : "undefined",
        lang: provider ? provider.language : "pt",
    };
}
async function findAll() {
    const requests = await requests_repository_1.default.findAll();
    return requests;
}
async function getLocationById(id) {
    let request = await locationCheck(id);
    return request;
}
async function updateWithLocation(id, inputLocation) {
    const exists = await idHandler(id);
    if (exists.location) {
        throw (0, conflict_error_1.conflictError)();
    }
    const locationObj = {
        type: "Point",
        coordinates: [inputLocation.coordinates.lng, inputLocation.coordinates.lat],
    };
    const functionToUse = mongodb_1.ObjectId.isValid(id)
        ? requests_repository_1.default.updateLocationById
        : requests_repository_1.default.updateLocationByIdentifier;
    return await functionToUse(id, locationObj);
}
async function locationCheck(id) {
    try {
        const request = await idHandler(id);
        if (request.location) {
            return request.location;
        }
        else {
            await wait(2000);
            return locationCheck(id);
        }
    }
    catch (error) {
        throw location_request_error_1.locationRequestError;
    }
}
async function idHandler(id) {
    const functionToUse = mongodb_1.ObjectId.isValid(id)
        ? requests_repository_1.default.findByRequestId
        : requests_repository_1.default.findByRequestIdentifier;
    const result = await functionToUse(id);
    return result;
}
async function handleSMS(country, phone, url, lang) {
    if (country.toLowerCase() == "br" ||
        country.toLowerCase() == "brasil" ||
        country.toLowerCase() == "brazil")
        await notification_service_1.default.sendSMSviaZenvia(phone, url); //handle BR SMS
    else
        await notification_service_1.default.sendSMSviaTwilio(phone, url, lang); //handle ABROAD SMS (handle EN/ES issue TODO)
}
function wait(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
async function verifyIdentifier(identifier) {
    if (identifier) {
        const exists = await requests_repository_1.default.findByRequestIdentifier(identifier);
        if (exists)
            throw (0, conflict_error_1.conflictError)();
    }
}
const requestService = {
    post,
    getLocationById,
    updateWithLocation,
    handleSMS,
    findAll,
};
exports.default = requestService;
