"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRequestError = void 0;
function locationRequestError(details) {
    return {
        name: "locationRequestError",
        message: "Error while trying to get location",
    };
}
exports.locationRequestError = locationRequestError;
