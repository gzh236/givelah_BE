import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import db from "../db/models/index";

const {
  registrationValidator,
  loginValidator,
} = require("../validations/user_validations");

module.exports = {
  registration: async (req: Request, res: Response) => {
    // validate user form inputs
    const validationResult = registrationValidator.validate(req.body);

    if (validationResult.error) {
      res.statusCode = 400;
      console.log(validationResult.error);
      return res.json(`Registration form bad inputs`);
    }

    const validatedParams = validationResult.value;

    // ensure that user doesn't already exist in DB
    let user;
    console.log(db.model);

    try {
      user = await db.model.Users.findAll({
        where: {
          email: validatedParams.email,
          username: validatedParams.username,
        },
      });
    } catch (err) {
      res.statusCode = 500;
      console.log(err);
    }

    if (user) {
      res.statusCode = 409;
      return res.json(`Email or username already in use!`);
    }

    // ensure passwords match
    if (validatedParams.password !== validatedParams.confirmPassword) {
      res.statusCode = 400;
      return res.json(`Entered passwords need to match!`);
    }

    // convert password to hash

    let hash;

    try {
      hash = await bcrypt.hash(validatedParams.password, 10);
    } catch (err) {
      res.statusCode = 500;
      return res.json(`An error occurred!`);
    }

    if (!hash) {
      res.statusCode = 500;
      return res.json(`An error occurred!`);
    }
    // save inputs to db
    let createResult;

    interface UserCreationFields {
      username: string;
      email: string;
      firstName: string;
      lastName: string;
      selfSummary?: string;
      photoUrl?: string;
      hash: string;
    }

    let userCreationFields: UserCreationFields = {
      username: validatedParams.username,
      email: validatedParams.email,
      firstName: validatedParams.firstName,
      lastName: validatedParams.lastName,
      hash: hash,
    };

    if (validatedParams.selfSummary) {
      userCreationFields["selfSummary"] = validatedParams.selfSummary;
    }

    if (req.file) {
      userCreationFields["photoUrl"] = req.file.path;
    }

    try {
      createResult = await db.model.Users.create({ userCreationFields });
    } catch (err) {
      res.statusCode = 500;
      console.log(err);
    }

    if (!createResult) {
      res.statusCode = 500;
      return res.json("Server Error!");
    }

    res.statusCode = 201;
    return res.json(
      `${user.username} has successfully registered with Givelah!`
    );
  },

  user: async (req: Request, res: Response) => {
    // verify user form input
    // if credentials are valid, sign and issue access token
  },
};
