import { Request, Response } from "express";
import { uploadImageFile, getFileStream } from "../s3";

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
    } catch (err: any) {
      console.log(err);
      return `Error encountered when uploading file!`;
    }

    try {
      uploadImageToDb = await ItemImages.create({
        itemId: id,
        imageUrl: uploadImageToS3.Key,
      });
    } catch (err: any) {
      console.log(err);
      return `failed to upload image`;
    }

    if (!uploadImageToDb) {
      return `Uploading of image failed`;
    }

    // remove file from uploads folder
    try {
      await unlinkFile(file.path);
      console.log(`File successfully unlinked`);
    } catch (err) {
      console.log(err);
      return `Error occurred!`;
    }

    return `Image uploaded successfully`;
  },

  getImage: async (req: Request, res: Response, fileKey: string) => {
    let readStream;

    try {
      readStream = await getFileStream(fileKey);
    } catch (err) {
      console.log(err);
      return err;
    }
    return readStream.pipe(res);
  },
};
