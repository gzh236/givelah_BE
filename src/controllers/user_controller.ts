import { Request, Response } from "express";

const {
  registrationService,
  loginService,
  logoutService,
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
};
