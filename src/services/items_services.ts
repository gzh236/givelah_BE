import { Request, Response } from "express";

import Item, { ItemInstance } from "../db/models/item";
import { ItemImages } from "../db/models/item_images";
import User, { UserInstance } from "../db/models/user";
import { itemValidator } from "../validations/items_validations";

export const itemService = {
  // create item
  createItemService: async (
    req: Request,
    username: string,
    res: Response
  ): Promise<string | ItemInstance> => {
    // validate form input
    const validationResult = itemValidator.itemValidator.validate(req.body);

    if (validationResult.error) {
      return `Bad form inputs`;
    }

    const validatedParams = validationResult.value;

    // determine user
    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
      });
    } catch (err: any) {
      console.log(err);
      return err;
    }

    if (!user) {
      return `Error finding user!`;
    }

    // create item
    let item;

    try {
      item = await Item.create({
        userId: user.id,
        name: validatedParams.name,
        category: validatedParams.category,
        itemUrl: validatedParams.itemUrl ? validatedParams.itemUrl : "",
        description: validatedParams.description,
        status: validatedParams.status,
        availability: validatedParams.availability,
        expiryDate: validatedParams.expiryDate
          ? validatedParams.expiryDate
          : new Date().setFullYear(new Date().getFullYear() + 1),
      });
    } catch (err: any) {
      console.log(err);
      return err;
    }

    if (!item) {
      return `Error occurred during creation of item`;
    }

    console.log(item);
    return item;
  },

  showItemService: async (
    req: Request,
    itemId: string,
    res: Response,
    key: string
  ): Promise<String | ItemInstance> => {
    let item;

    try {
      item = await Item.findOne({
        where: {
          id: itemId,
        },
        include: ItemImages,
      });
    } catch (err: any) {
      return err;
    }

    if (!item) {
      return `Item not found!`;
    }

    return item;
  },

  showUserDonatedItemsService: async (
    req: Request,
    username: string,
    res: Response
  ): Promise<string | ItemInstance[]> => {
    let user;
    let userItems;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
      });
    } catch (err: any) {
      console.log(err);
      return err;
    }

    if (!user) {
      return `Search failed`;
    }

    // find the Items model where:
    // 1) items belong to userId
    // 2) items has a status of 'For Donation'

    try {
      userItems = await Item.findAll({
        where: {
          userId: user.id,
          status: "For Donation",
        },
        include: ItemImages,
      });
    } catch (err) {
      console.log(err);
      return err as string;
    }

    if (userItems.length <= 0) {
      return `User has no items up for donation!`;
    }

    return userItems;
    // make another call to s3 to get the images(?)
  },

  showUserWishlistItemsService: async (
    req: Request,
    username: string,
    res: Response
  ): Promise<string | ItemInstance[]> => {
    let user;
    let userItems;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
      });
    } catch (err: any) {
      console.log(err);
      return err;
    }

    if (!user) {
      console.log(`lol`);
      return `Search failed`;
    }

    try {
      userItems = await Item.findAll({
        where: {
          userId: user.id,
          status: "Wishlist Item",
        },
      });
    } catch (err: any) {
      console.log(err);
      return err;
    }
    console.log(userItems);

    if (userItems.length <= 0) {
      return `User has no items in their wishlist!`;
    }

    // filter the response by status
    return userItems;
  },

  showAllListedItems: async (
    req: Request,
    res: Response
  ): Promise<string | ItemInstance[]> => {
    let allItems;

    try {
      allItems = await Item.findAll({
        where: {
          status: `For Donation`,
        },
        include: {
          model: ItemImages,
        },
      });
    } catch (err: any) {
      return err;
    }

    if (allItems.length <= 0) {
      return `No items currently available!`;
    }

    // filter the response by status
    return allItems;
  },

  showAllWishlistedItems: async (
    req: Request,
    res: Response
  ): Promise<string | ItemInstance[]> => {
    let allItems;

    try {
      allItems = await Item.findAll({
        where: {
          status: "Wishlist Item",
        },
      });
    } catch (err: any) {
      return err;
    }

    if (allItems.length <= 0) {
      return `No items currently available!`;
    }

    // filter the response by status
    return allItems;
  },

  editItem: async (req: Request, res: Response, id: string) => {
    let editResp;

    const validationResult = itemValidator.updateValidator.validate(req.body);

    if (validationResult.error) {
      console.log(validationResult.error);
      return `bad form inputs!`;
    }

    const validatedParams = validationResult.value;

    try {
      editResp = await Item.update(
        {
          name: validatedParams.name,
          category: validatedParams.category,
          description: validatedParams.description,
          itemUrl: validatedParams.url,
          expiryDate: validatedParams.expiryDate,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (err: any) {
      console.log(`lol`);
      return err;
    }
    console.log(editResp);
    return editResp;
  },
};
