import Joi from "joi";

export const locationSchema = Joi.object({
  coordinates: {
    lat: Joi.number().max(90).min(-90),
    lng: Joi.number().max(180).min(-180),
  },
  accuracy: Joi.string().optional(),
});
