import Joi from "joi";

module.exports = {
  addressValidator: Joi.object({
    streetAddresses: Joi.string().required(),
    postalCode: Joi.string().required(),
    permission: Joi.boolean().required(),
  }),

  permissionsValidator: Joi.object({
    permission: Joi.boolean().required(),
  }),
};
