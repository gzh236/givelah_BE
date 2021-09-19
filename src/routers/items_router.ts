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

  itemController.createItem
);

// Show item
itemRouter.get(
  "/show/:itemId",

  itemController.showItem
);

// Show all items that a user put up for donation
itemRouter.get("/show/donated/:username", itemController.showUserDonatedItems);

// Show all items on user's wishlist
itemRouter.get(
  "/show/wishlist/:username",
  itemController.showUserWishlistItems
);

// show all items on website
itemRouter.get("/view/all", itemController.showAllItems);

export default itemRouter;
