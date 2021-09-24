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
exports.itemImagesServices = void 0;
const s3_1 = require("../s3");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
const item_images_1 = require("../db/models/item_images");
exports.itemImagesServices = {
    uploadItemImageService: (req, res, id, file) => __awaiter(void 0, void 0, void 0, function* () {
        let uploadImageToS3;
        let uploadImageToDb;
        if (!req.file) {
            return `No image uploaded!`;
        }
        try {
            uploadImageToS3 = yield (0, s3_1.uploadImageFile)(file);
        }
        catch (err) {
            console.log(err);
            return `Error encountered when uploading file!`;
        }
        try {
            uploadImageToDb = yield item_images_1.ItemImages.create({
                itemId: id,
                imageUrl: uploadImageToS3.Key,
            });
        }
        catch (err) {
            console.log(err);
            return `failed to upload image`;
        }
        if (!uploadImageToDb) {
            return `Uploading of image failed`;
        }
        // remove file from uploads folder
        try {
            yield unlinkFile(file.path);
            console.log(`File successfully unlinked`);
        }
        catch (err) {
            console.log(err);
            return `Error occurred!`;
        }
        return `Image uploaded successfully`;
    }),
    getImage: (req, res, fileKey) => __awaiter(void 0, void 0, void 0, function* () {
        let readStream;
        try {
            readStream = yield (0, s3_1.getFileStream)(fileKey);
        }
        catch (err) {
            console.log(err);
            return err;
        }
        return readStream.pipe(res);
    }),
};
//# sourceMappingURL=item_images_services.js.map