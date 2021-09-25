import { Request, Response } from "express";

import { userServices } from "../services/user_services";

export const userController = {
  uploadImage: async (req: Request, res: Response) => {
    let upload;

    if (!req.file) {
      return res.json(`No file uploaded!`);
    }

    const file = req.file;

    try {
      upload = await userServices.uploadImage(req, res, file);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }

    console.log(upload);
    return res.json(upload);
  },

  getImage: async (req: Request, res: Response): Promise<any> => {
    let fileKey = req.params.key;
    let getImageResponse;

    try {
      getImageResponse = await userServices.getUserImage(req, res, fileKey);
    } catch (err) {
      console.log(err);
      return res.json(err);
    }
  },

  register: async (req: Request, res: Response) => {
    let registrationResponse;

    try {
      registrationResponse = await userServices.registrationService(req, res);
    } catch (err: any) {
      console.log(err);
      res.statusCode = 400;
      return res.json(err);
    }

    res.statusCode = 201;
    return res.json(registrationResponse);
  },

  login: async (req: Request, res: Response) => {
    let loginResponse;

    try {
      loginResponse = await userServices.loginService(req, res);
    } catch (err: any) {
      console.log(err);
      res.statusCode = 400;
      return res.json(err);
    }

    res.statusCode = 200;
    return loginResponse;
  },

  logout: async (req: Request, res: Response) => {
    let logoutResponse = await userServices.logoutService(req, res);

    return res.json(logoutResponse);
  },

  showOne: async (req: Request, res: Response) => {
    // verify username in query params

    if (!req.params.id) {
      return res.json(`Error finding user!`);
    }

    const id = req.params.id;

    const showOneResponse = await userServices.showOneService(req, res, id);

    res.statusCode = 200;
    return res.json(showOneResponse);
  },

  searchOneByUsername: async (req: Request, res: Response) => {
    if (!req.params.username) {
      return res.json(`Error finding user!`);
    }

    const username = req.params.username;

    const searchResponse = await userServices.searchOneByUsername(
      req,
      res,
      username
    );

    return res.json(searchResponse);
  },
};
