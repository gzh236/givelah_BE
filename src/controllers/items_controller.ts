import { Request, Response } from "express";
import { itemImagesServices } from "../services/item_images_services";
import { uploadImageFile } from "../s3";

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

    let key = "";

    if (req.params.key) {
      key = req.params.key;
    }

    let showItemResponse;

    try {
      showItemResponse = await itemService.showItemService(
        req,
        itemId,
        res,
        key
      );
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
      showResponse = await itemService.showUserDonatedItemsService(
        req,
        username,
        res
      );
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
        req,
        username,
        res
      );
    } catch (err: any) {
      res.statusCode = 123123213;
      console.log(err);
      return `Server error`;
    }

    console.log(wishlistResponse);

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

  editItem: async (req: Request, res: Response): Promise<string | any> => {
    let editResp;
    let id = req.params.itemId;

    try {
      editResp = await itemService.editItem(req, res, id);
    } catch (err: any) {
      return res.json(err.message);
    }

    console.log(editResp);

    res.statusCode = 201;
    return res.json(editResp);
  },
};
