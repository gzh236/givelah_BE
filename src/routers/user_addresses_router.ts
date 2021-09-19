import express from "express";
import { userAddressController } from "../controllers/user_addresses_controller";
import { authMiddleware } from "../middleware/user_auth";

const userAddressRouter = express.Router();

// ----------------- ROUTES -----------------//

// create
userAddressRouter.post(
  "/create/:username",
  authMiddleware.authenticated,
  userAddressController.create
);

// show
userAddressRouter.get(
  "/show/:username",
  authMiddleware.authenticated,
  userAddressController.show
);

// update address
userAddressRouter.patch("/update/:userId", authMiddleware.authenticated);

// update permission
userAddressRouter.patch("/update/permissions/:userId");

export default userAddressRouter;
