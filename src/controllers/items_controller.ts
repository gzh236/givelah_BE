import { Request, Response } from "express";

import { itemService } from "../services/items_services";
import { itemValidator } from "../validations/items_validations";

export const itemController = {
  createItem: async (req: Request, res: Response): Promise<string | any> => {
    const validationResult = itemValidator.itemValidator.validate(req.body);

    if (validationResult.error) {
      return `Bad form inputs`;
    }

    const validatedParams = validationResult.value;

    let itemCreationResponse;

    try {
      itemCreationResponse = await itemService.createItemService(
        validatedParams
      );
    } catch (err: any) {
      return res.json(`Error creating items`);
    }
    res.statusCode = 201;
    return res.json(itemCreationResponse);
  },

  showItem: async (req: Request, res: Response): Promise<string | any> => {
    let itemId = "";

    if (req.params.itemId) {
      itemId = req.params.itemId;
    }

    let key = "";

    if (req.params.key) {
      key = req.params.key;
    }

    let showItemResponse;

    try {
      showItemResponse = await itemService.showItemService(itemId);
    } catch (err: any) {
      return res.json(`Error displaying item`);
    }
    res.statusCode = 201;
    return res.json(showItemResponse);
  },

  showUserDonatedItems: async (
    req: Request,
    res: Response
  ): Promise<string | any> => {
    if (!req.params.username) {
      return res.json(`No found username`);
    }

    let username = req.params.username;
    let showResponse;

    try {
      showResponse = await itemService.showUserDonatedItemsService(username);
    } catch (err) {
      return res.json(err);
    }

    res.statusCode = 201;
    return res.json(showResponse);
  },

  showUserWishlistItems: async (req: Request, res: Response): Promise<any> => {
    if (!req.params.username) {
      return res.json(`Error searching username`);
    }

    const username = req.params.username;

    let wishlistResponse;

    try {
      wishlistResponse = await itemService.showUserWishlistItemsService(
        username
      );
    } catch (err: any) {
      console.log(err);
      res.statusCode = 500;
      return `Server error`;
    }

    console.log(wishlistResponse);

    res.statusCode = 201;
    return res.json(wishlistResponse);
  },

  showAllListedItems: async (
    req: Request,
    res: Response
  ): Promise<string | any> => {
    let itemsResponse;

    try {
      itemsResponse = await itemService.showAllListedItems();
    } catch (err: any) {
      res.statusCode = 500;
      return res.json(`Server error`);
    }

    res.statusCode = 201;
    return res.json(itemsResponse);
  },

  showAllWishlistedItems: async (
    req: Request,
    res: Response
  ): Promise<string | any> => {
    let itemsResponse;

    try {
      itemsResponse = await itemService.showAllWishlistedItems();
    } catch (err) {
      res.statusCode = 500;
      return res.json(`Server error`);
    }

    res.statusCode = 200;
    return res.json(itemsResponse);
  },

  editItem: async (req: Request, res: Response): Promise<string | any> => {
    let editResp;
    let id = req.params.itemId;

    const validationResult = itemValidator.updateValidator.validate(req.body);

    if (validationResult.error) {
      console.log(validationResult.error);
      return `bad form inputs!`;
    }

    const validatedParams = validationResult.value;

    try {
      editResp = await itemService.editItem(validatedParams, id);
    } catch (err: any) {
      return res.json(err.message);
    }

    console.log(editResp);

    res.statusCode = 201;
    return res.json(editResp);
  },
};
