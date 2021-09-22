import User from "../db/models/user";
import { Request, Response } from "express";

const {
  createService,
  showService,
  updateAddressService,
  updatePermissionService,
} = require("../services/user_addresses_services");

export const userAddressController = {
  create: async (req: Request, res: Response) => {
    let username;
    if (req.params.username) {
      username = req.params.username;
    }

    let creationResponse = await createService(req, username, res);

    return res.json(creationResponse);
  },

  updateAddress: async (req: Request, res: Response) => {
    let username;

    if (req.params.username) {
      username = req.params.username;
    }

    let updateAddressResponse = await updateAddressService(req, username, res);
    return res.json(updateAddressResponse);
  },

  updatePermission: async (req: Request, res: Response) => {
    let username;

    if (req.params.username) {
      username = req.params.username;
    }

    let updatedPermissionResponse = await updatePermissionService(
      req,
      username,
      res
    );
    return updatedPermissionResponse;
  },

  show: async (req: Request, res: Response) => {
    let username;

    if (req.params.username) {
      username = req.params.username;
    }

    let showResponse = await showService(req, username, res);
    let userAddress;

    if (!showResponse.UserAddress) {
      return res.json(`No address found!`);
    }

    userAddress = showResponse.UserAddress.dataValues;

    return res.json({
      streetAddress: userAddress.streetAddresses,
      postalCode: userAddress.postalCode,
      permission: userAddress.permission,
    });
  },
};
