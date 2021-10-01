import { Request, Response } from "express";

import Item, { ItemInstance } from "../db/models/item";
import { ItemImages } from "../db/models/item_images";
import User, { UserInstance } from "../db/models/user";

export const itemService = {
  // create item
  createItemService: async (
    validatedParams: any
  ): Promise<string | ItemInstance> => {
    // validate form input

    // determine user
    let user;

    try {
      user = await User.findOne({
        where: {
          username: validatedParams.username,
        },
      });
    } catch (err: any) {
      console.log(err);
      return `Error creating item!`;
    }

    if (!user) {
      return `Error creating item!`;
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

    return item;
  },

  showItemService: async (itemId: string): Promise<String | ItemInstance> => {
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
    username: string
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
      return `Not able to find donated items`;
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
    username: string
  ): Promise<string | UserInstance> => {
    let user;

    try {
      user = await User.findOne({
        where: {
          username: username,
        },
        include: {
          model: Item,
          where: {
            status: "Wishlist Item",
          },
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

    return user;
  },

  showAllListedItems: async (): Promise<string | ItemInstance[]> => {
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
      return `Error finding items!`;
    }

    if (allItems.length <= 0) {
      return `No items currently available!`;
    }

    // filter the response by status
    return allItems;
  },

  showAllWishlistedItems: async (): Promise<string | UserInstance[]> => {
    let allWishlistItems;

    // instead search by User model, include item model where all items = wishlist items
    try {
      allWishlistItems = await User.findAll({
        include: {
          model: Item,
          where: {
            status: "Wishlist Item",
          },
        },
      });
    } catch (err: any) {
      console.log(err);
      return err;
    }

    if (allWishlistItems.length <= 0) {
      return `No items currently available!`;
    }

    // filter the response by status
    return allWishlistItems;
  },

  editItem: async (validatedParams: any, id: string) => {
    let editResp;

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
