import { Request, Response } from "express";
import { uploadImageFile } from "../s3";

import fs, { PathLike } from "fs";
import util from "util";

const unlinkFile = util.promisify(fs.unlink);

import { ItemImages, ItemImagesInstance } from "../db/models/item_images";

export const itemImagesServices = {
  uploadItemImageService: async (
    req: Request,
    res: Response,
    id: string,
    file: { path: PathLike; filename: any }
  ): Promise<String | ItemImagesInstance> => {
    let uploadImageToS3;
    let uploadImageToDb;

    if (!req.file) {
      return `No image uploaded!`;
    }

    try {
      uploadImageToS3 = await uploadImageFile(file);
    } catch (err) {
      console.log(err);
      return `Error encountered when uploading file!`;
    }

    try {
      uploadImageToDb = await ItemImages.create({
        itemId: id,
        imageUrl: req.file.path,
      });
    } catch (err) {
      console.log(err);
    }

    if (!uploadImageToDb) {
      return `Uploading of image failed`;
    }

    // remove file from uploads folder
    try {
      await unlinkFile(file.path);
    } catch (err) {
      console.log(err);
      return `Error occurred!`;
    }

    return `Image uploaded successfully`;
  },
};
