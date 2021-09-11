import express from "express";
import { userAddressController } from "../controllers/user_addresses_controller";

const userAddressRouter = express.Router();

// ----------------- ROUTES -----------------//

// create
userAddressRouter.post("/create/:username", userAddressController.create);

// show
userAddressRouter.get("/show/:username", userAddressController.show);

// update address
userAddressRouter.patch("/update/:userId");

// update permission
userAddressRouter.patch("/update/permissions/:userId");

export default userAddressRouter;
