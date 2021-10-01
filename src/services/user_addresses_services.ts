import { Request, Response } from "express";

import UserAddress from "../db/models/user_address";
import User from "../db/models/user";
import { String } from "aws-sdk/clients/acm";

module.exports = {
  createService: async (res: Response, validatedParams: any) => {
    // find user details
    let user;

    try {
      user = await User.findOne({
        where: {
          username: validatedParams.username,
        },
      });
    } catch (err: any) {
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
        userId: user.id,
        streetAddresses: validatedParams.streetAddresses,
        postalCode: validatedParams.postalCode,
        permission: validatedParams.permission,
      });
    } catch (err: any) {
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

  updateAddressService: async (validatedParams: any) => {
    // find the user

    let user;

    try {
      user = await User.findOne({
        where: {
          username: validatedParams.username,
        },
      });
    } catch (err: any) {
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
    } catch (err: any) {
      console.log(err);
      return `Error updating address!`;
    }

    if (!updatedAddress) {
      return `Error updating address!`;
    }

    return updatedAddress;
  },

  updatePermissionService: async (validatedParams: any) => {
    let user;

    try {
      user = await User.findOne({
        where: {
          username: validatedParams.username,
        },
      });
    } catch (err: any) {
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
    } catch (err: any) {
      console.log(err);
      return `Error occurred!`;
    }

    if (!updatedPermission) {
      return `Error occurred!`;
    }

    return true;
  },

  showService: async (username: String) => {
    // show user address from querying of user table
    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
        include: UserAddress,
      });
    } catch (err: any) {
      console.log(err);
      return `User not found!`;
    }

    if (!user) {
      return `Error finding user`;
    }

    return user;
  },
};
