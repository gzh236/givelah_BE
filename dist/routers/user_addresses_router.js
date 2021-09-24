"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_addresses_controller_1 = require("../controllers/user_addresses_controller");
const user_auth_1 = require("../middleware/user_auth");
const userAddressRouter = express_1.default.Router();
// ----------------- ROUTES -----------------//
// create
userAddressRouter.post("/create/:username", user_auth_1.authMiddleware.unauthenticated, user_addresses_controller_1.userAddressController.create);
// show
userAddressRouter.get("/show/:username", user_auth_1.authMiddleware.authenticated, user_addresses_controller_1.userAddressController.show);
// update address
userAddressRouter.patch("/update/:userId", user_auth_1.authMiddleware.authenticated);
// update permission
userAddressRouter.patch("/update/permissions/:userId");
exports.default = userAddressRouter;
//# sourceMappingURL=user_addresses_router.js.map