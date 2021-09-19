import express from "express";
import multer from "multer";
import { userController } from "../controllers/user_controller";

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

import { authMiddleware } from "../middleware/user_auth";

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
  authMiddleware.unauthenticated,
  uploadParser.single("img"),
  userController.register
);

// login
userRouter.post("/login", authMiddleware.unauthenticated, userController.login);

// logout
userRouter.get("/logout", authMiddleware.authenticated, userController.logout);

// show one user
userRouter.get(
  "/show/:username",
  authMiddleware.authenticated,
  userController.showOne
);

export default userRouter;
