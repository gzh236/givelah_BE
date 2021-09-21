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

  register: async (req: Request, res: Response) => {
    let registrationResponse;

    try {
      registrationResponse = await userServices.registrationService(req, res);
    } catch (err: any) {
      console.log(err);
      return res.json(err);
    }

    return res.json(registrationResponse);
  },

  login: async (req: Request, res: Response) => {
    let loginResponse;

    try {
      loginResponse = await userServices.loginService(req, res);
    } catch (err: any) {
      console.log(err);
      return res.json(err);
    }

    return res.json(loginResponse);
  },

  logout: async (req: Request, res: Response) => {
    let logoutResponse = await userServices.logoutService(req, res);

    return res.json(logoutResponse);
  },

  showOne: async (req: Request, res: Response) => {
    // verify username in query params

    if (!req.params.username) {
      return res.json(`Error finding user!`);
    }

    let username = req.params.username;

    let showOneResponse = await userServices.showOneService(username, res);

    return res.json(showOneResponse);
  },
};
