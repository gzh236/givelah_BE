"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
module.exports = {
    addressValidator: joi_1.default.object({
        streetAddresses: joi_1.default.string().required(),
        postalCode: joi_1.default.string().required(),
        permission: joi_1.default.boolean().required(),
    }),
    permissionsValidator: joi_1.default.object({
        permission: joi_1.default.boolean().required(),
    }),
};
//# sourceMappingURL=user_addresses_validation.js.map