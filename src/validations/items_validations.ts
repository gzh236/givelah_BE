import Joi from "joi";

export const itemValidator = {
  itemValidator: Joi.object({
    name: Joi.string().required().min(3),
    category: Joi.string().required().min(3),
    itemUrl: Joi.string().allow(""),
    description: Joi.string().required().min(3),
    status: Joi.string().required(),
    availability: Joi.bool().required(),
  }),

  updateValidator: Joi.object({
    name: Joi.string().required().min(3),
    category: Joi.string().required().min(3),
    itemUrl: Joi.string().optional().allow(""),
    description: Joi.string().required().min(3),
  }),
};
