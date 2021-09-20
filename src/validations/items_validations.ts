import Joi from "joi";

export const itemValidator = {
  itemValidator: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    itemUrl: Joi.string(),
    description: Joi.string().required(),
    status: Joi.string().required(),
    availability: Joi.bool().required(),
    expiryDate: Joi.date(),
  }),

  updateValidator: Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    itemUrl: Joi.string(),
    description: Joi.string().required(),
    expiryDate: Joi.date(),
  }),
};
