"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const itemImagesValidator = {
    uploadValidator: joi_1.default.object({
        itemId: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=item_images.validations.js.map