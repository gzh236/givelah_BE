import { itemImagesController } from "../controllers/item_images_controller";
import express from "express";
import multer from "multer";
import { authMiddleware } from "../middleware/user_auth";

const itemImageRouter = express.Router();
const upload = multer({ dest: "uploads/" });

itemImageRouter.post(
  "/upload/:itemId",
  upload.single("file"),
  itemImagesController.uploadImage
);

export default itemImageRouter;
