import express from "express";

import { itemController } from "../controllers/items_controller";
import { authMiddleware } from "../middleware/user_auth";

const itemRouter = express.Router();

// -------------- ROUTES -------------- //

// Create Item
itemRouter.post(
  "/create/:username",
  authMiddleware.authenticated,
  itemController.createItem
);

// Show item
itemRouter.get(
  "/show/:itemId",
  authMiddleware.authenticated,
  itemController.showItem
);

// Show all items that a user put up for donation
itemRouter.get(
  "/show/donated/:userId",
  authMiddleware.authenticated,
  itemController.showUserDonatedItems
);

// Show all items on user's wishlist
itemRouter.get(
  "/show/wishlist/items/:username",
  authMiddleware.authenticated,
  itemController.showUserWishlistItems
);

// show all listed items on website
itemRouter.get(
  "/view/listed/all",
  authMiddleware.authenticated,
  itemController.showAllListedItems
);

// show all wishlisted items on website
itemRouter.get(
  "/view/listed/wishlist/all",
  authMiddleware.authenticated,
  itemController.showAllWishlistedItems
);

// edit item
itemRouter.patch(
  "/edit/:itemId",
  authMiddleware.authenticated,
  itemController.editItem
);

itemRouter.patch(
  "/edit/availability/:itemId",
  authMiddleware.authenticated,
  itemController.changeItemAvailability
);

export default itemRouter;
