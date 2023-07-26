import Joi from "joi";

export const requestSchema = Joi.object({
  providerId: Joi.number().required(),
  email: Joi.string().email().required(),
  country: Joi.string().optional(),
  phone: Joi.string().when('notificationSMS', {is: Joi.exist(), then: Joi.required(), otherwise: Joi.optional()}),
  requestIdentifier: Joi.string().optional().max(10),
  notificationSMS: Joi.boolean().optional(),
});
