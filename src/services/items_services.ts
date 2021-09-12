import { Request, Response } from "express";

import { userAddressController } from "controllers/user_addresses_controller";
import ItemImages from "../db/models/item_images";
import Item, { ItemInstance } from "../db/models/item";
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

    if (!validationResult) {
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
    } catch (err) {
      console.log(err);
      return err as string;
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
        description: validatedParams.description,
        quantity: validatedParams.quantity,
        status: validatedParams.status,
        availability: validatedParams.availability,
        expiryDate: validatedParams.expiryDate,
      });
    } catch (err) {
      console.log(err);
      return err as string;
    }

    if (!item) {
      return `Error occurred during creation of item`;
    }

    return item;
  },

  showItemService: async (
    req: Request,
    itemId: string,
    res: Response
  ): Promise<string | ItemInstance> => {
    let item;

    try {
      item = await Item.findOne({
        where: {
          id: itemId,
        },
        include: ItemImages,
      });
    } catch (err) {
      return err as string;
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
    } catch (err) {
      console.log(err);
      return err as string;
    }

    if (!user) {
      return `Search failed`;
    }

    try {
      userItems = await Item.findAll({
        where: {
          userId: user.id,
          status: "For Donation",
        },
      });
    } catch (err) {
      console.log(err);
      return err as string;
    }

    if (userItems.length <= 0) {
      return `User has no items up for donation!`;
    }

    // filter the response by status
    return userItems;
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
    } catch (err) {
      console.log(err);
      return err as string;
    }

    if (!user) {
      return `Search failed`;
    }

    try {
      userItems = await Item.findAll({
        where: {
          userId: user.id,
          status: "Wishlist Item",
        },
      });
    } catch (err) {
      console.log(err);
      return err as string;
    }
    console.log(userItems);
    if (userItems.length <= 0) {
      return `User has no items in their wishlist!`;
    }

    // filter the response by status
    return userItems;
  },

  showAllItems: async (
    req: Request,
    res: Response
  ): Promise<string | ItemInstance[]> => {
    let allItems;

    try {
      allItems = await Item.findAll({});
    } catch (err) {
      return err as string;
    }

    if (allItems.length <= 0) {
      return `No items currently available!`;
    }

    // filter the response by status
    return allItems;
  },
};
