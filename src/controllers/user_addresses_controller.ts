import User from "../db/models/user";
import { Request, Response } from "express";

const {
  addressValidator,
  permissionsValidator,
} = require("../validations/user_addresses_validation");

const {
  createService,
  showService,
  updateAddressService,
  updatePermissionService,
} = require("../services/user_addresses_services");

export const userAddressController = {
  create: async (req: Request, res: Response) => {
    const validationResult = addressValidator.validate(req.body);

    if (!validationResult) {
      res.statusCode = 400;
      return `Bad form inputs`;
    }

    const validatedParams = validationResult.value;

    let creationResponse = await createService(res, validatedParams);

    return res.json(creationResponse);
  },

  updateAddress: async (req: Request, res: Response) => {
    let validationResult = addressValidator.validate(req.body);

    if (!validationResult) {
      return `Bad input`;
    }

    let validatedParams = validationResult.value;

    let updateAddressResponse = await updateAddressService(validatedParams);
    return res.json(updateAddressResponse);
  },

  updatePermission: async (req: Request, res: Response) => {
    let validationResult = permissionsValidator.validate(req.body);

    if (!validationResult) {
      return `Bad input`;
    }

    let validatedParams = validationResult.value;

    let updatedPermissionResponse = await updatePermissionService(
      validatedParams
    );
    return updatedPermissionResponse;
  },

  show: async (req: Request, res: Response) => {
    let username;

    if (req.params.username) {
      username = req.params.username;
    }

    let showResponse = await showService(username);
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
