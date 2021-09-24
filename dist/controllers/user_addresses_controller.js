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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddressController = void 0;
const { createService, showService, updateAddressService, updatePermissionService, } = require("../services/user_addresses_services");
exports.userAddressController = {
    create: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let username;
        if (req.params.username) {
            username = req.params.username;
        }
        let creationResponse = yield createService(req, username, res);
        return res.json(creationResponse);
    }),
    updateAddress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let username;
        if (req.params.username) {
            username = req.params.username;
        }
        let updateAddressResponse = yield updateAddressService(req, username, res);
        return res.json(updateAddressResponse);
    }),
    updatePermission: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let username;
        if (req.params.username) {
            username = req.params.username;
        }
        let updatedPermissionResponse = yield updatePermissionService(req, username, res);
        return updatedPermissionResponse;
    }),
    show: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let username;
        if (req.params.username) {
            username = req.params.username;
        }
        let showResponse = yield showService(req, username, res);
        let userAddress;
        if (!showResponse.UserAddress) {
            return res.json(`No address found!`);
        }
        userAddress = showResponse.UserAddress.dataValues;
        return res.json({
            streetAddress: userAddress.streetAddresses,
            postalCode: userAddress.postalCode,
            permission: userAddress.permission,
        });
    }),
};
//# sourceMappingURL=user_addresses_controller.js.map