import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { UserInstance } from "../db/models/user";
import admin from "./firebase";

import { uploadImageFile, getFileStream } from "../s3";

import fs, { PathLike } from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

import { userValidation } from "../validations/user_validations";

export const userServices = {
  uploadImage: async (
    req: Request,
    res: Response,
    file: { path: PathLike; filename: any }
  ) => {
    let uploadImageToS3;

    try {
      uploadImageToS3 = await uploadImageFile(file);
    } catch (err: any) {
      console.log(err);
      return `Error encountered when uploading file!`;
    }

    if (!uploadImageToS3) {
      return `Error occurred!`;
    }

    // remove file from uploads folder
    try {
      await unlinkFile(file.path);
      console.log(`File successfully unlinked`);
    } catch (err) {
      console.log(err);
      return `Error occurred!`;
    }

    console.log(uploadImageToS3);
    return uploadImageToS3;
  },

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

    let createResult;
    let uploadImageToS3;

    // upload image to S3, get Key and save in DB

    try {
      createResult = await User.create({
        username: validatedParams.username,
        email: validatedParams.email,
        firstName: validatedParams.firstName,
        lastName: validatedParams.lastName,
        selfSummary: validatedParams.selfSummary,
        photoUrl: validatedParams.photoUrl,
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

      return res.json(`Username or password is incorrect`);
    }

    const validatedParams = validationResult.value;

    // find user details from db
    let user: UserInstance | null = null;

    try {
      user = await User.findOne({
        where: { username: validatedParams.username },
      });
    } catch (err: any) {
      res.statusCode = 500;
      return res.json(`Username or password is incorrect`);
    }

    if (!user) {
      res.statusCode = 400;
      return res.json(`Username or password is incorrect`);
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
      return res.json(err);
    }

    if (!isPasswordValidated) {
      res.statusCode = 400;
      res.json(`Username or password is incorrect`);
    }

    if (!user.id) {
      return res.json(`Error encountered`);
    }

    const uid = user.id.toString();

    const accessToken = jwt.sign(
      {
        username: user?.username,
        userId: user?.id,
      },
      process.env.JWT_SECRET as string
    );

    let firebaseToken = "";

    admin
      .auth()
      .createCustomToken(uid)
      .then((customToken: string) => {
        firebaseToken = customToken;
        return res.json({
          firebaseToken,
          accessToken,
        });
      })
      .catch((err: any) => {
        console.log(err);
        res.statusCode = 400;
        return res.json(err);
      });

    res.statusCode = 200;
    return true;
  },

  logoutService: async (req: Request, res: Response) => {
    // destroy token
    res.clearCookie("authToken");
    res.statusCode = 204;
    return res.json(`Successfully logged out`);
  },

  showOneService: async (req: Request, res: Response, id: string) => {
    // query db for one user
    let user;

    try {
      user = await User.findOne({
        where: { id: id },
      });
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json(err);
    }

    if (!user) {
      res.statusCode = 400;
      return res.json(`User not found!`);
    }

    res.statusCode = 200;
    return res.json(user);
  },

  getUserImage: async (req: Request, res: Response, fileKey: string) => {
    let readStream;

    try {
      readStream = await getFileStream(fileKey);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
    return readStream.pipe(res);
  },
};
