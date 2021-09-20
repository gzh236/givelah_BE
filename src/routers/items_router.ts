import express from "express";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

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
  "/show/donated/:username",
  authMiddleware.authenticated,
  itemController.showUserDonatedItems
);

// Show all items on user's wishlist
itemRouter.get(
  "/show/wishlist/items/:username",
  authMiddleware.authenticated,
  itemController.showUserWishlistItems
);

// show all items on website
itemRouter.get(
  "/view/all",
  authMiddleware.authenticated,
  itemController.showAllItems
);

// edit item
itemRouter.patch(
  "/edit/:itemId",
  authMiddleware.authenticated,
  itemController.editItem
);

export default itemRouter;
