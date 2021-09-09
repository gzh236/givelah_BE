import express from "express";
import multer from "multer";
import { userController } from "../controllers/user_controller";

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const userRouter = express.Router();

const upload = multer({ dest: "uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const cloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png"],
    unique_filename: true,
    folder: "givelah_BE",
  },
});

const uploadParser = multer({ storage: cloudStorage });

// ----------------- ROUTES -----------------//

// register
userRouter.post(
  "/register",
  uploadParser.single("img"),
  userController.register
);

// login
userRouter.post("/login", userController.login);

// logout
userRouter.get("/logout", userController.logout);

export default userRouter;
