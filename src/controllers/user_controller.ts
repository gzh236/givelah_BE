import { Request, Response } from "express";
import { userValidation } from "../validations/user_validations";
import { userServices } from "../services/user_services";

export const userController = {
  uploadImage: async (req: Request, res: Response) => {
    let upload;

    if (!req.file) {
      return res.json(`No file uploaded!`);
    }

    const file = req.file;

    try {
      upload = await userServices.uploadImage(res, file);
    } catch (err: any) {
      console.log(err);
      return res.json(err);
    }

    return res.json(upload);
  },

  getImage: async (req: Request, res: Response): Promise<void | any> => {
    let fileKey = req.params.key;
    let getImageResponse;

    try {
      getImageResponse = await userServices.getUserImage(res, fileKey);
    } catch (err: any) {
      console.log(err);
      res.statusCode = 500;
      return res.json(err);
    }
  },

  register: async (req: Request, res: Response): Promise<any> => {
    let registrationResponse;

    const validationResult = userValidation.registrationValidator.validate(
      req.body
    );

    if (validationResult.error) {
      res.statusCode = 400;
      return `Registration form bad inputs`;
    }

    const validatedParams = validationResult.value;

    try {
      registrationResponse = await userServices.registrationService(
        res,
        validatedParams
      );
    } catch (err: any) {
      console.log(err);
      res.statusCode = 400;
      return res.json(err);
    }

    if (!registrationResponse) {
      res.statusCode = 400;
      return res.json(`Error registering user!`);
    }

    res.statusCode = 201;
    return res.json(registrationResponse);
  },

  login: async (req: Request, res: Response): Promise<any> => {
    let loginResponse;

    // verify user form input
    const validationResult = userValidation.loginValidator.validate(req.body);

    if (validationResult.error) {
      res.statusCode = 400;

      return res.json(`Username or password is incorrect`);
    }

    const validatedParams = validationResult.value;

    try {
      loginResponse = await userServices.loginService(res, validatedParams);
    } catch (err: any) {
      console.log(err);
      res.statusCode = 400;
      return res.json(err.message);
    }

    res.statusCode = 200;
    return loginResponse;
  },

  showOne: async (req: Request, res: Response) => {
    // verify username in query params

    if (!req.params.id) {
      return res.json(`Error finding user!`);
    }

    const id = req.params.id;

    const showOneResponse = await userServices.showOneService(res, id);

    res.statusCode = 200;
    return res.json(showOneResponse);
  },

  searchOneByUsername: async (req: Request, res: Response) => {
    if (!req.params.username) {
      return res.json(`Error finding user!`);
    }

    const username = req.params.username;

    const searchResponse = await userServices.searchOneByUsername(
      res,
      username
    );

    return res.json(searchResponse);
  },
};
