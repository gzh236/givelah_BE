import Joi from "joi";

export const itemValidator = {
  itemValidator: Joi.object({
    category: Joi.string().required(),
    description: Joi.string().required(),
    quantity: Joi.number().required(),
    status: Joi.string().required(),
    availability: Joi.bool().required(),
    expiryDate: Joi.date().required(),
  }),
};
