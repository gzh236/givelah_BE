import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import User, { UserInstance } from "../db/models/user";
import admin from "./firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { userValidation } from "../validations/user_validations";

import { uploadImageFile, getFileStream } from "../s3";

import fs, { PathLike } from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

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
      res.statusCode = 400;
      return `Error encountered when uploading file!`;
    }

    if (!uploadImageToS3) {
      res.statusCode = 400;
      return `Error occurred!`;
    }

    // remove file from uploads folder
    try {
      await unlinkFile(file.path);
      console.log(`File successfully unlinked`);
    } catch (err) {
      console.log(err);
      res.statusCode = 400;
      return `Error occurred!`;
    }

    console.log(uploadImageToS3);
    return uploadImageToS3;
  },

  loginService: async (req: Request, res: Response) => {
    // verify user form input
    const validationResult = userValidation.loginValidator.validate(req.body);

    if (validationResult.error) {
      res.statusCode = 400;

      return `Username or password is incorrect`;
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
      return `Username or password is incorrect`;
    }

    if (!user) {
      res.statusCode = 400;
      return `Username or password is incorrect`;
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
      return err;
    }

    if (!isPasswordValidated) {
      res.statusCode = 400;
      return `Username or password is incorrect`;
    }

    if (!user.id) {
      return `Error encountered`;
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
        return `Error logging in`;
      });
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
      return false;
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
      return false;
    }

    if (!hash) {
      res.statusCode = 500;
      return false;
    }

    let createResult;

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
    } catch (err: any) {
      res.statusCode = 500;
      console.log(err);
      return false;
    }

    console.log(createResult);

    if (!createResult) {
      res.statusCode = 500;
      return false;
    }
    const db = getFirestore();

    // add user to firestore
    try {
      const docRef = await addDoc(collection(db, "users"), {
        id: createResult.id,
        username: validatedParams.username,
        selfSummary: validatedParams.selfSummary,
      });
      console.log("Document written with ID: ", docRef.id);
      res.statusCode = 201;
      return true;
    } catch (e) {
      console.error("Error adding document: ", e);
      return false;
    }
  },

  logoutService: async (req: Request, res: Response) => {
    // destroy token
    res.clearCookie("authToken");
    res.statusCode = 204;
    return `Successfully logged out`;
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
      return err;
    }

    if (!user) {
      res.statusCode = 400;
      return `User not found!`;
    }

    res.statusCode = 200;
    return user;
  },

  searchOneByUsername: async (
    req: Request,
    res: Response,
    username: string
  ) => {
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
      res.statusCode = 404;
      return `User not found!`;
    }

    res.statusCode = 200;
    return user;
  },

  getUserImage: async (req: Request, res: Response, fileKey: string) => {
    let readStream;

    try {
      readStream = await getFileStream(fileKey);
    } catch (err) {
      console.log(err);
      return err;
    }
    return readStream.pipe(res);
  },
};
