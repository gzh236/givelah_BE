import Item, { ItemInstance } from "../db/models/item";
import { ItemImages } from "../db/models/item_images";
import User, { UserInstance } from "../db/models/user";

export const itemService = {
  createItemService: async (
    validatedParams: any,
    username: string
  ): Promise<string | ItemInstance> => {
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

  showItemService: async (
    itemId: string
  ): Promise<String | boolean | ItemInstance> => {
    let item;

    try {
      item = await Item.findOne({
        where: {
          id: itemId,
        },
        include: ItemImages,
      });
    } catch (err: any) {
      console.log(err);
      return false;
    }

    if (!item) {
      return false;
    }

    return item;
  },

  showUserDonatedItemsService: async (
    userId: string | number
  ): Promise<string | boolean | ItemInstance[]> => {
    let userItems;

    // find the Items model where:
    // 1) items belong to userId
    // 2) items has a status of 'For Donation'

    try {
      userItems = await Item.findAll({
        where: {
          userId: userId,
          status: "For Donation",
        },
        include: ItemImages,
      });
    } catch (err: any) {
      console.log(err);
      return false;
    }

    if (userItems.length <= 0) {
      return false;
    }

    return userItems;
  },

  showUserWishlistItemsService: async (
    userId: string | number
  ): Promise<string | boolean | UserInstance> => {
    let user;

    try {
      user = await User.findOne({
        where: {
          id: userId,
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
      return false;
    }

    if (!user) {
      console.log(`lol`);
      return false;
    }

    return user;
  },

  showAllListedItems: async (): Promise<ItemInstance[] | boolean> => {
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
      console.log(allItems);
      if (!allItems) {
        return false;
      }

      // filter the response by status
      return allItems;
    } catch (err: any) {
      return false;
    }
  },

  showAllWishlistedItems: async (): Promise<
    string | UserInstance[] | boolean
  > => {
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
      return false;
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
        },
        {
          where: {
            id: id,
          },
        }
      );
    } catch (err: any) {
      console.log(`lol`);
      return false;
    }
    console.log(editResp);
    return editResp;
  },
};
