"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const user_controller_1 = require("../controllers/user_controller");
const user_auth_1 = require("../middleware/user_auth");
const userRouter = express_1.default.Router();
const upload = (0, multer_1.default)({ dest: "uploads/" });
// ----------------- ROUTES -----------------//
// upload image
userRouter.post("/upload", upload.single("file"), user_auth_1.authMiddleware.unauthenticated, user_controller_1.userController.uploadImage);
// get image
userRouter.get("/picture/:key", user_controller_1.userController.getImage);
// register
userRouter.post("/register", user_auth_1.authMiddleware.unauthenticated, user_controller_1.userController.register);
// login
userRouter.post("/login", user_auth_1.authMiddleware.unauthenticated, user_controller_1.userController.login);
// logout
userRouter.get("/logout", user_auth_1.authMiddleware.authenticated, user_controller_1.userController.logout);
// show one user
userRouter.get("/show/:id", user_auth_1.authMiddleware.authenticated, user_controller_1.userController.showOne);
exports.default = userRouter;
//# sourceMappingURL=user_router.js.map