import { Request, Response } from "express";

import UserAddress from "../db/models/user_address";
import User from "../db/models/user";

const {
  addressValidator,
  permissionsValidator,
} = require("../validations/user_addresses_validation");

module.exports = {
  createService: async (req: Request, username: string, res: Response) => {
    // validate user form inputs
    const validationResult = addressValidator.validate(req.body);

    if (!validationResult) {
      res.statusCode = 400;
      return `Bad form inputs`;
    }

    const validatedParams = validationResult.value;

    // find user details
    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
      });
    } catch (err) {
      console.log(err);
      return err;
    }

    if (!user) {
      res.statusCode = 400;
      return `User not found`;
    }

    let createAddressResponse;

    try {
      createAddressResponse = await UserAddress.create({
        userId: user.id ? user.id : "",
        streetAddresses: validatedParams.streetAddresses,
        postalCode: validatedParams.postalCode,
        permission: validatedParams.permission,
      });
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      return err;
    }

    if (!createAddressResponse) {
      res.statusCode = 500;
      return `Create Address Failed`;
    }

    return createAddressResponse;
  },

  updateAddressService: async (
    req: Request,
    username: string,
    res: Response
  ) => {
    let validationResult = addressValidator.validate(req.body);

    if (!validationResult) {
      return `Bad input`;
    }

    let validatedParams = validationResult.value;

    // find the user

    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
      });
    } catch (err) {
      console.log(err);
      return `Error finding user`;
    }

    if (!user) {
      return `Error finding user`;
    }

    // use user details to retrieve address from UserAddresses
    let updatedAddress;

    try {
      updatedAddress = await UserAddress.update(
        {
          streetAddresses: validatedParams.streetAddresses,
          postalCode: validatedParams.postalCode,
        },
        { where: { userId: user.id }, returning: true }
      );
    } catch (err) {
      console.log(err);
      return err;
    }

    if (!updatedAddress) {
      return `Error updating address!`;
    }
    console.log(updatedAddress);
    return updatedAddress;
  },

  updatePermissionService: async (
    req: Request,
    username: string,
    res: Response
  ) => {
    let validationResult = permissionsValidator.validate(req.body);

    if (!validationResult) {
      return `Bad input`;
    }

    let validatedParams = validationResult.value;

    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
      });
    } catch (err) {
      console.log(err);
      return `Error finding user`;
    }

    if (!user) {
      return `Error finding user`;
    }

    let updatedPermission;

    try {
      updatedPermission = await UserAddress.update(
        {
          permission: validatedParams.permission,
        },
        { where: { userId: user.id } }
      );
    } catch (err) {
      console.log(err);
      return err;
    }

    if (!updatedPermission) {
      return `Error updating address!`;
    }
    console.log(updatedPermission);
    return updatedPermission;
  },

  showService: async (req: Request, username: string, res: Response) => {
    // show user address from querying of user table
    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
        include: UserAddress,
      });
    } catch (err) {
      console.log(err);
      return `User not found!`;
    }

    if (!user) {
      return `Error finding user`;
    }

    return user;
  },
};
