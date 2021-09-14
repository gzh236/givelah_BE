import { itemImagesController } from "../controllers/item_images_controller";
import express from "express";
import multer from "multer";

const itemImageRouter = express.Router();
const upload = multer({ dest: "uploads/" });

itemImageRouter.post(
  "/upload/:itemId",
  upload.single("imageUrl"),
  itemImagesController.uploadImage
);

export default itemImageRouter;
