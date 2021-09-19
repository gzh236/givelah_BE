import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User from "../db/models/user";

import { userValidation } from "../validations/user_validations";

export const userServices = {
  registrationService: async (req: Request, res: Response) => {
    // validate user form inputs
    const validationResult = userValidation.registrationValidator.validate(
      req.body
    );

    if (validationResult.error) {
      res.statusCode = 400;
      return `Registration form bad inputs`;
    }

    const validatedParams = validationResult.value;

    // ensure that user doesn't already exist in DB
    let user;

    try {
      user = await User.findOne({
        where: {
          email: validatedParams.email,
          username: validatedParams.username,
        },
      });
    } catch (err: any) {
      res.statusCode = 500;
      console.log(err);
      return err;
    }

    if (user) {
      res.statusCode = 409;
      return `Email or username already in use!`;
    }

    // ensure passwords match
    if (validatedParams.password !== validatedParams.confirmPassword) {
      res.statusCode = 400;
      return `Entered passwords need to match!`;
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
      return `An error occurred!`;
    }
    // save inputs to db
    let createResult;

    try {
      createResult = await User.create({
        username: validatedParams.username,
        email: validatedParams.email,
        firstName: validatedParams.firstName,
        lastName: validatedParams.lastName,
        selfSummary: validatedParams.selfSummary
          ? validatedParams.selfSummary
          : "",
        photoUrl: req.file ? req.file.path : "",
        hash: hash,
      });
    } catch (err) {
      res.statusCode = 500;
      console.log(err);
      return `err.message`;
    }

    console.log(createResult);

    if (!createResult) {
      res.statusCode = 500;
      return "Server Error!";
    }

    res.statusCode = 201;
    return `${createResult.username} has successfully registered with Givelah!`;
  },

  loginService: async (req: Request, res: Response) => {
    // verify user form input
    const validationResult = userValidation.loginValidator.validate(req.body);

    if (validationResult.error) {
      res.statusCode = 400;
      console.log(validationResult.error);
      return `Username or password is incorrect`;
    }

    const validatedParams = validationResult.value;

    // find user details from db
    let user;

    try {
      user = await User.findOne({
        where: { username: validatedParams.username },
      });
    } catch (err: any) {
      res.statusCode = 500;
      return `Username or password is incorrect`;
    }

    if (!user) {
      res.statusCode = 400;
      return `Username or password is incorrect!`;
    }

    // convert user password to hash and compare
    let isPasswordValidated = false;

    try {
      isPasswordValidated = await bcrypt.compare(
        validatedParams.password,
        user.hash
      );
    } catch (err: any) {
      console.log(err);
      return `Error signing in`;
    }

    if (!isPasswordValidated) {
      res.statusCode = 400;
      return `Username or password is incorrect!`;
    }

    // if credentials are valid, sign and issue access token
    const accessToken = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    // const refreshToken = jwt.sign(
    //   { username: user.username },
    //   process.env.REFRESH_TOKEN_SECRET as string,
    //   { expiresIn: "6h" }
    // );

    res.statusCode = 201;
    return accessToken;
  },

  logoutService: async (req: Request, res: Response) => {
    // destroy token
    res.clearCookie("authToken");
    res.statusCode = 204;
    return `Successfully logged out`;
  },

  showOneService: async (username: string, res: Response) => {
    // query db for one user
    let user;

    try {
      user = await User.findOne({
        where: { username: username },
      });
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      return err;
    }

    if (!user) {
      res.statusCode = 400;
      return `User not found!`;
    }

    res.statusCode = 200;
    return user;
  },
};
