import Joi from "joi";

module.exports = {
  registrationValidator: Joi.object({
    firstName: Joi.string().required().min(1).max(30).messages({
      "string.base": `"First Name" should be a type of 'text'`,
      "string.empty": `"First Name" cannot be an empty field`,
      "string.min": `"First Name" should have a minimum length of {#limit}`,
      "any.required": `"First Name" is a required field`,
    }),
    lastName: Joi.string().required().min(1).max(30).messages({
      "string.base": `"Last Name" should be a type of 'text'`,
      "string.empty": `"Last Name" cannot be an empty field`,
      "string.min": `"Last Name" should have a minimum length of {#limit}`,
      "any.required": `"Last Name" is a required field`,
    }),
    email: Joi.string().email().required().messages({
      "string.base": `"Email" should be a type of 'text'`,
      "string.empty": `"Email" cannot be an empty field`,
      "string.min": `"Email" should have a minimum length of {#limit}`,
      "any.required": `"Email" is a required field`,
    }),
    username: Joi.string().required().min(3).max(30).messages({
      "string.base": `"username" should be a type of 'text'`,
      "string.empty": `"username" cannot be an empty field`,
      "string.min": `"username" should have a minimum length of {#limit}`,
      "any.required": `"username" is a required field`,
    }),
    selfSummary: Joi.string().optional().max(1000).messages({
      "string.base": `"Self Summary" should be a type of 'text'`,
      "string.empty": `"Self Summary" cannot be an empty field`,
      "string.min": `"Self Summary" should have a minimum length of {#limit}`,
      "any.required": `"Self Summary" is a required field`,
    }),
    password: Joi.string().required().min(6).max(30).messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of {#limit}`,
      "any.required": `"password" is a required field`,
    }),
    confirmPassword: Joi.string().required().min(6).max(30).messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of {#limit}`,
      "any.required": `"password" is a required field`,
    }),
  }),
  loginValidator: Joi.object({
    email: Joi.string().email().required().min(3).max(30).messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of {#limit}`,
      "any.required": `"password" is a required field`,
    }),
    password: Joi.string().required().min(6).max(30).messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
      "string.min": `"password" should have a minimum length of {#limit}`,
      "any.required": `"password" is a required field`,
    }),
  }),
};
