import { Request, Response } from "express";
const userServices = require("../services/user_services");

module.exports = {
  register: async (req: Request, res: Response) => {
    // run the service from user_services
    let registrationResponse;

    try {
      registrationResponse = await userServices.registration(req, res);
    } catch (err) {
      res.statusCode = 500;
      console.log(err);
    }

    if (!registrationResponse) {
      res.statusCode = 500;
      return res.json(`User Creation Failed`);
    }

    res.statusCode = 201;
    console.log(registrationResponse.body);
  },
};
