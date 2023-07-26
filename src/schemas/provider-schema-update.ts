import Joi from "joi";

export const providerUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  providerId: Joi.string().optional(),
  logo: Joi.string().uri().optional(),
  color: Joi.string()
    .regex(/^#?([a-f0-9]{6}|[a-f0-9]{3})$/)
    .optional(),
  darkMode: Joi.boolean().optional(),
  language: Joi.string().valid("pt", "en", "es").optional(),
});
