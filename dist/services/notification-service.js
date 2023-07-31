"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sms_error_1 = require("../errors/sms-error");
const zenvia = __importStar(require("@zenvia/sdk"));
const twilio_1 = __importDefault(require("twilio"));
async function sendSMSviaZenvia(phone, url) {
    const client = new zenvia.Client(process.env.ZENVIA_API_TOKEN);
    const sms = client.getChannel('sms');
    const content = new zenvia.TextContent(("Confirme sua localização através do link: " + url));
    try {
        await sms.sendMessage(process.env.ZENVIA_FROM, phone.replace("+", ""), content);
    }
    catch (error) {
        console.log(error);
        throw (0, sms_error_1.SMSError)();
    }
}
async function sendSMSviaTwilio(phone, url, lang) {
    const client = (0, twilio_1.default)(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    const body = lang == "es"
        ? `Por favor confirma tu ubicación a través de este enlace: ${url}`
        : `Please confirm your location through this link: ${url}`;
    try {
        const sms = await client.messages.create({
            body,
            from: process.env.TWILIO_FROM,
            to: phone,
        });
    }
    catch (error) {
        throw (0, sms_error_1.SMSError)();
    }
}
const notificationService = {
    sendSMSviaTwilio,
    sendSMSviaZenvia,
};
exports.default = notificationService;
