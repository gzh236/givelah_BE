require("dotenv").config();

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = {
  authenticated: async (req: Request, res: Response, next: NextFunction) => {
    //   check for jwt token in header
    const authToken: any = req.headers["accesstoken"];

    if (!authToken) {
      res.statusCode = 403;
      return res.json({
        message: `Not authorised`,
      });
    }

    // verify that jwt token is valid
    let decodedJWT;
    let jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return res.json(`server error`);
    }

    try {
      decodedJWT = await jwt.verify(authToken, jwtSecret);
    } catch (err) {
      res.statusCode = 500;
      return res.json(err);
    }

    if (!decodedJWT) {
      res.statusCode = 403;
      return res.json("unable to verify authorisation");
    }

    next();
  },

  unauthenticated: (req: Request, res: Response, next: NextFunction) => {
    const authToken: any = req.headers["accesstoken"];

    if (!authToken) {
      next();
    }

    return;
  },
};
