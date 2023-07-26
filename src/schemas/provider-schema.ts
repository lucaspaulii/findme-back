import Joi from "joi";

export const providerSchema = Joi.object({
    name: Joi.string().required(),
    providerId: Joi.string().required(),
    logo: Joi.string().uri().required(),
    color: Joi.string().regex(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/).required(),
    darkMode: Joi.boolean().required(),
    language: Joi.string().valid("pt", "en", "es")
})