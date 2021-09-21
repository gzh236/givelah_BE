import express from "express";
import multer from "multer";
import { userController } from "../controllers/user_controller";

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

import { authMiddleware } from "../middleware/user_auth";

const userRouter = express.Router();

const upload = multer({ dest: "uploads/" });
// ----------------- ROUTES -----------------//

// upload image
userRouter.post(
  "/upload",
  upload.single("file"),
  authMiddleware.unauthenticated,
  userController.uploadImage
);

// register
userRouter.post(
  "/register",
  authMiddleware.unauthenticated,
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
