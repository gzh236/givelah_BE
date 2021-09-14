import { Request, Response } from "express";

import { itemImagesServices } from "../services/item_images_services";

export const itemImagesController = {
  uploadImage: async (req: Request, res: Response) => {
    if (!req.params.itemId) {
      return res.json(`Item not found`);
    }

    let id = req.params.itemId;

    if (!req.file) {
      return res.json(`No file was uploaded`);
    }

    let file = req.file;

    let uploadImageResponse;

    try {
      uploadImageResponse = await itemImagesServices.uploadItemImageService(
        req,
        res,
        id,
        file
      );
    } catch (err) {
      console.log(err);
      res.statusCode = 500;
      return res.json(`Error uploading image`);
    }

    res.statusCode = 201;
    return res.json(uploadImageResponse);
  },
};
