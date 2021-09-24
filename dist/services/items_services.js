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
exports.itemService = void 0;
const item_1 = __importDefault(require("../db/models/item"));
const item_images_1 = require("../db/models/item_images");
const user_1 = __importDefault(require("../db/models/user"));
const items_validations_1 = require("../validations/items_validations");
exports.itemService = {
    // create item
    createItemService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        // validate form input
        const validationResult = items_validations_1.itemValidator.itemValidator.validate(req.body);
        if (validationResult.error) {
            return `Bad form inputs`;
        }
        const validatedParams = validationResult.value;
        // determine user
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
            return `Error finding user!`;
        }
        // create item
        let item;
        try {
            item = yield item_1.default.create({
                userId: user.id,
                name: validatedParams.name,
                category: validatedParams.category,
                itemUrl: validatedParams.itemUrl ? validatedParams.itemUrl : "",
                description: validatedParams.description,
                status: validatedParams.status,
                availability: validatedParams.availability,
                expiryDate: validatedParams.expiryDate
                    ? validatedParams.expiryDate
                    : new Date().setFullYear(new Date().getFullYear() + 1),
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        if (!item) {
            return `Error occurred during creation of item`;
        }
        console.log(item);
        return item;
    }),
    showItemService: (req, itemId, res, key) => __awaiter(void 0, void 0, void 0, function* () {
        let item;
        try {
            item = yield item_1.default.findOne({
                where: {
                    id: itemId,
                },
                include: item_images_1.ItemImages,
            });
        }
        catch (err) {
            return err;
        }
        if (!item) {
            return `Item not found!`;
        }
        return item;
    }),
    showUserDonatedItemsService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        let userItems;
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
            return `Search failed`;
        }
        // find the Items model where:
        // 1) items belong to userId
        // 2) items has a status of 'For Donation'
        try {
            userItems = yield item_1.default.findAll({
                where: {
                    userId: user.id,
                    status: "For Donation",
                },
                include: item_images_1.ItemImages,
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        if (userItems.length <= 0) {
            return `User has no items up for donation!`;
        }
        return userItems;
        // make another call to s3 to get the images(?)
    }),
    showUserWishlistItemsService: (req, username, res) => __awaiter(void 0, void 0, void 0, function* () {
        let user;
        let userItems;
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
            console.log(`lol`);
            return `Search failed`;
        }
        try {
            userItems = yield item_1.default.findAll({
                where: {
                    userId: user.id,
                    status: "Wishlist Item",
                },
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        console.log(userItems);
        if (userItems.length <= 0) {
            return `User has no items in their wishlist!`;
        }
        // filter the response by status
        return userItems;
    }),
    showAllListedItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let allItems;
        try {
            allItems = yield item_1.default.findAll({
                where: {
                    status: `For Donation`,
                },
                include: {
                    model: item_images_1.ItemImages,
                },
            });
        }
        catch (err) {
            return err;
        }
        if (allItems.length <= 0) {
            return `No items currently available!`;
        }
        // filter the response by status
        return allItems;
    }),
    showAllWishlistedItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let allWishlistItems;
        // instead search by User model, include item model where all items = wishlist items
        try {
            allWishlistItems = yield user_1.default.findAll({
                include: {
                    model: item_1.default,
                    where: {
                        status: "Wishlist Item",
                    },
                },
            });
        }
        catch (err) {
            console.log(err);
            return err;
        }
        console.log(allWishlistItems);
        if (allWishlistItems.length <= 0) {
            return `No items currently available!`;
        }
        // filter the response by status
        return allWishlistItems;
    }),
    editItem: (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
        let editResp;
        const validationResult = items_validations_1.itemValidator.updateValidator.validate(req.body);
        if (validationResult.error) {
            console.log(validationResult.error);
            return `bad form inputs!`;
        }
        const validatedParams = validationResult.value;
        try {
            editResp = yield item_1.default.update({
                name: validatedParams.name,
                category: validatedParams.category,
                description: validatedParams.description,
                itemUrl: validatedParams.url,
                expiryDate: validatedParams.expiryDate,
            }, {
                where: {
                    id: id,
                },
            });
        }
        catch (err) {
            console.log(`lol`);
            return err;
        }
        console.log(editResp);
        return editResp;
    }),
};
//# sourceMappingURL=items_services.js.map