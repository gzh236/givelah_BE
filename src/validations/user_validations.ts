import Joi from "joi";

export const userValidation = {
  registrationValidator: Joi.object({
    firstName: Joi.string().required().min(1).max(30),
    lastName: Joi.string().required().min(1).max(30),
    email: Joi.string().email().required(),
    username: Joi.string().required().min(3),
    selfSummary: Joi.string().optional(),
    password: Joi.string().required().min(6).max(30),
    confirmPassword: Joi.string().required().min(6).max(30),
  }),

  loginValidator: Joi.object({
    username: Joi.string().required().min(3).max(30),
    password: Joi.string().required().min(6).max(30),
  }),
};
