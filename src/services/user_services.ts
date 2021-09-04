import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

module.exports = {
  registration: async (req: Request, res: Response) => {
    // ensure passwords match
    if (req.body.password !== req.body.confirmPassword) {
    }

    // convert password to hash
    // save inputs to db
  },
};
