"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_address_1 = __importDefault(require("../db/models/user_address"));
const user_1 = __importDefault(require("../db/models/user"));
const { addressValidator, permissionsValidator, } = require("../validations/user_addresses_validation");
module.exports = {
    createService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        // validate user form inputs
        const validationResult = addressValidator.validate(req.body);
        if (!validationResult) {
            res.statusCode = 400;
            return `Bad form inputs`;
        }
        const validatedParams = validationResult.value;
        // find user details
        let user;
        try {
            user = yield user_1.default.findOne({
                where: {
                    username: username,
                },
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        if (!user) {
            res.statusCode = 400;
            return `User not found`;
        }
        let createAddressResponse;
        try {
            createAddressResponse = yield user_address_1.default.create({
                userId: user.id ? user.id : "",
                streetAddresses: validatedParams.streetAddresses,
                postalCode: validatedParams.postalCode,
                permission: validatedParams.permission,
            });
        }
        catch (err) {
            console.log(err);
            res.statusCode = 500;
            return err;
        }
        if (!createAddressResponse) {
            res.statusCode = 500;
            return `Create Address Failed`;
        }
        return createAddressResponse;
    }),
    updateAddressService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        let validationResult = addressValidator.validate(req.body);
        if (!validationResult) {
            return `Bad input`;
        }
        let validatedParams = validationResult.value;
        // find the user
        let user;
        try {
            user = yield user_1.default.findOne({
                where: {
                    username: username,
                },
            });
        }
        catch (err) {
            console.log(err);
            return `Error finding user`;
        }
        if (!user) {
            return `Error finding user`;
        }
        // use user details to retrieve address from UserAddresses
        let updatedAddress;
        try {
            updatedAddress = yield user_address_1.default.update({
                streetAddresses: validatedParams.streetAddresses,
                postalCode: validatedParams.postalCode,
            }, { where: { userId: user.id }, returning: true });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        if (!updatedAddress) {
            return `Error updating address!`;
        }
        console.log(updatedAddress);
        return updatedAddress;
    }),
    updatePermissionService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        let validationResult = permissionsValidator.validate(req.body);
        if (!validationResult) {
            return `Bad input`;
        }
        let validatedParams = validationResult.value;
        let user;
        try {
            user = yield user_1.default.findOne({
                where: {
                    username: username,
                },
            });
        }
        catch (err) {
            console.log(err);
            return `Error finding user`;
        }
        if (!user) {
            return `Error finding user`;
        }
        let updatedPermission;
        try {
            updatedPermission = yield user_address_1.default.update({
                permission: validatedParams.permission,
            }, { where: { userId: user.id } });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        if (!updatedPermission) {
            return `Error updating address!`;
        }
        console.log(updatedPermission);
        return updatedPermission;
    }),
    showService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        // show user address from querying of user table
        let user;
        try {
            user = yield user_1.default.findOne({
                where: {
                    username: username,
                },
                include: user_address_1.default,
            });
        }
        catch (err) {
            console.log(err);
            return `User not found!`;
        }
        if (!user) {
            return `Error finding user`;
        }
        return user;
    }),
};
//# sourceMappingURL=user_addresses_services.js.map