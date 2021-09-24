"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const items_controller_1 = require("../controllers/items_controller");
const user_auth_1 = require("../middleware/user_auth");
const itemRouter = express_1.default.Router();
// -------------- ROUTES -------------- //
// Create Item
itemRouter.post("/create/:username", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.createItem);
// Show item
itemRouter.get("/show/:itemId", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.showItem);
// Show all items that a user put up for donation
itemRouter.get("/show/donated/:username", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.showUserDonatedItems);
// Show all items on user's wishlist
itemRouter.get("/show/wishlist/items/:username", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.showUserWishlistItems);
// show all items on website
itemRouter.get("/view/listed/all", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.showAllListedItems);
itemRouter.get("/view/listed/wishlist/all", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.showAllWishlistedItems);
// edit item
itemRouter.patch("/edit/:itemId", user_auth_1.authMiddleware.authenticated, items_controller_1.itemController.editItem);
exports.default = itemRouter;
//# sourceMappingURL=items_router.js.map