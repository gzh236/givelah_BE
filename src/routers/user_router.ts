import express from "express";
import multer from "multer";
import { userController } from "../controllers/user_controller";

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

// get image
userRouter.get("/picture/:key", userController.getImage);

// register
userRouter.post(
  "/register",
  authMiddleware.unauthenticated,
  userController.register
);

// login
userRouter.post("/login", authMiddleware.unauthenticated, userController.login);

// show one user
userRouter.get(
  "/show/:id",
  authMiddleware.authenticated,
  userController.showOne
);

// search by username
userRouter.get(
  "/show/username/:username",
  authMiddleware.authenticated,
  userController.searchOneByUsername
);
export default userRouter;
