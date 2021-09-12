import { RSA_NO_PADDING } from "constants";
import { Request, Response } from "express";

const {
  registrationService,
  loginService,
  logoutService,
  showOneService,
} = require("../services/user_services");

export const userController = {
  register: async (req: Request, res: Response) => {
    let registrationResponse = await registrationService(req, res);

    return res.json(registrationResponse);
  },

  login: async (req: Request, res: Response) => {
    let loginResponse = await loginService(req, res);

    return res.json(loginResponse);
  },

  logout: async (req: Request, res: Response) => {
    let logoutResponse = await logoutService(req, res);

    return res.json(logoutResponse);
  },

  showOne: async (req: Request, res: Response) => {
    // verify username in query params

    if (!req.params.username) {
      return res.json(`Error finding user!`);
    }

    let username = req.params.username;

    let showOneResponse = await showOneService(req.params.username, res);

    return res.json(showOneResponse);
  },
};
