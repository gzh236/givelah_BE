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
exports.itemController = void 0;
const items_services_1 = require("../services/items_services");
exports.itemController = {
    createItem: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let username = "";
        if (req.params.username) {
            username = req.params.username;
        }
        let itemCreationResponse;
        try {
            itemCreationResponse = yield items_services_1.itemService.createItemService(req, username, res);
        }
        catch (err) {
            return res.json(`Error creating items`);
        }
        res.statusCode = 201;
        return res.json(itemCreationResponse);
    }),
    showItem: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let itemId = "";
        if (req.params.itemId) {
            itemId = req.params.itemId;
        }
        let key = "";
        if (req.params.key) {
            key = req.params.key;
        }
        let showItemResponse;
        try {
            showItemResponse = yield items_services_1.itemService.showItemService(req, itemId, res, key);
        }
        catch (err) {
            return res.json(`Error displaying item`);
        }
        res.statusCode = 201;
        return res.json(showItemResponse);
    }),
    showUserDonatedItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.params.username) {
            return res.json(`No found username`);
        }
        let username = req.params.username;
        let showResponse;
        try {
            showResponse = yield items_services_1.itemService.showUserDonatedItemsService(req, username, res);
        }
        catch (err) {
            return res.json(err);
        }
        res.statusCode = 201;
        return res.json(showResponse);
    }),
    showUserWishlistItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.params.username) {
            return res.json(`Error searching username`);
        }
        const username = req.params.username;
        let wishlistResponse;
        try {
            wishlistResponse = yield items_services_1.itemService.showUserWishlistItemsService(req, username, res);
        }
        catch (err) {
            res.statusCode = 123123213;
            console.log(err);
            return `Server error`;
        }
        console.log(wishlistResponse);
        res.statusCode = 201;
        return res.json(wishlistResponse);
    }),
    showAllListedItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let itemsResponse;
        try {
            itemsResponse = yield items_services_1.itemService.showAllListedItems(req, res);
        }
        catch (err) {
            res.statusCode = 500;
            return res.json(`Server error`);
        }
        res.statusCode = 201;
        return res.json(itemsResponse);
    }),
    showAllWishlistedItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let itemsResponse;
        try {
            itemsResponse = yield items_services_1.itemService.showAllWishlistedItems(req, res);
        }
        catch (err) {
            res.statusCode = 500;
            return res.json(`Server error`);
        }
        res.statusCode = 200;
        return res.json(itemsResponse);
    }),
    editItem: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let editResp;
        let id = req.params.itemId;
        try {
            editResp = yield items_services_1.itemService.editItem(req, res, id);
        }
        catch (err) {
            return res.json(err.message);
        }
        console.log(editResp);
        res.statusCode = 201;
        return res.json(editResp);
    }),
};
//# sourceMappingURL=items_controller.js.map