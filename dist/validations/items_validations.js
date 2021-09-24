"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.itemValidator = {
    itemValidator: joi_1.default.object({
        name: joi_1.default.string().required().min(3),
        category: joi_1.default.string().required().min(3),
        itemUrl: joi_1.default.string().allow(""),
        description: joi_1.default.string().required().min(3),
        status: joi_1.default.string().required(),
        availability: joi_1.default.bool().required(),
        expiryDate: joi_1.default.date(),
    }),
    updateValidator: joi_1.default.object({
        name: joi_1.default.string().required().min(3),
        category: joi_1.default.string().required().min(3),
        itemUrl: joi_1.default.string().optional().allow(""),
        description: joi_1.default.string().required().min(3),
        expiryDate: joi_1.default.date(),
    }),
};
//# sourceMappingURL=items_validations.js.map