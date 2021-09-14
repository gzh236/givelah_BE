import Joi from "joi";

const itemImagesValidator = {
  uploadValidator: Joi.object({
    itemId: Joi.number().required(),
  }),
};
