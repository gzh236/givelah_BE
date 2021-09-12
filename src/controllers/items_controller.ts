import { Request, Response } from "express";

import { itemService } from "../services/items_services";

export const itemController = {
  createItem: async (req: Request, res: Response): Promise<string | any> => {
    let username = "";

    if (req.params.username) {
      username = req.params.username;
    }

    let itemCreationResponse;

    try {
      itemCreationResponse = await itemService.createItemService(
        req,
        username,
        res
      );
    } catch (err) {
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

    let showItemResponse;

    try {
      showItemResponse = await itemService.showItemService(req, itemId, res);
    } catch (err) {
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
      showResponse = await itemService.showUserDonatedItemsService(
        req,
        username,
        res
      );
    } catch (err) {
      return res.json(err);
    }

    // somehow filter the items by donated status

    res.statusCode = 201;
    return res.json(showResponse);
  },

  showUserWishlistItems: async (
    req: Request,
    res: Response
  ): Promise<string | any> => {
    if (!req.params.username) {
      return res.json(`Error searching username`);
    }

    const username = req.params.username;

    let wishlistResponse;

    try {
      wishlistResponse = await itemService.showUserWishlistItemsService(
        req,
        username,
        res
      );
    } catch (err) {
      res.statusCode = 500;
      return `Server error`;
    }

    res.statusCode = 201;
    return res.json(wishlistResponse);
  },

  showAllItems: async (req: Request, res: Response): Promise<string | any> => {
    let itemsResponse;

    try {
      itemsResponse = await itemService.showAllItems(req, res);
    } catch (err) {
      res.statusCode = 500;
      return res.json(`Server error`);
    }

    res.statusCode = 201;
    return res.json(itemsResponse);
  },
};
