"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidation = {
    registrationValidator: joi_1.default.object({
        firstName: joi_1.default.string().required().min(1).max(30),
        lastName: joi_1.default.string().required().min(1).max(30),
        email: joi_1.default.string().email().required(),
        username: joi_1.default.string().required().min(3),
        selfSummary: joi_1.default.string().optional().allow(""),
        photoUrl: joi_1.default.string().optional().allow(""),
        password: joi_1.default.string().required().min(6).max(30),
        confirmPassword: joi_1.default.string().required().min(6).max(30),
    }),
    loginValidator: joi_1.default.object({
        username: joi_1.default.string().required().min(3).max(30),
        password: joi_1.default.string().required().min(6).max(30),
    }),
};
//# sourceMappingURL=user_validations.js.map