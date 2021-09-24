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
exports.itemImagesController = void 0;
const item_images_services_1 = require("../services/item_images_services");
exports.itemImagesController = {
    uploadImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.file) {
            return res.json(`No file uploaded`);
        }
        const file = req.file;
        console.log(req.file);
        const id = req.params.itemId;
        let uploadResult;
        try {
            uploadResult = yield item_images_services_1.itemImagesServices.uploadItemImageService(req, res, id, file);
        }
        catch (err) {
            console.log(err);
            return res.json(`Error uploading file`);
        }
        res.statusCode = 200;
        return res.json(uploadResult);
    }),
    getImages: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let fileKey = req.params.key;
        let getImageResponse;
        try {
            getImageResponse = yield item_images_services_1.itemImagesServices.getImage(req, res, fileKey);
        }
        catch (err) {
            console.log(err);
            return res.json(err);
        }
    }),
};
//# sourceMappingURL=item_images_controller.js.map