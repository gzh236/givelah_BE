"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_images_controller_1 = require("../controllers/item_images_controller");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const itemImageRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
itemImageRouter.post("/upload/:itemId", upload.single("file"), item_images_controller_1.itemImagesController.uploadImage);
itemImageRouter.get("/:key", item_images_controller_1.itemImagesController.getImages);
exports.default = itemImageRouter;
//# sourceMappingURL=items_images_router.js.map