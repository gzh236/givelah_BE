import { Request, Response } from "express";

import { itemImagesServices } from "../services/item_images_services";

export const itemImagesController = {
  uploadImage: async (req: Request, res: Response): Promise<string | any> => {
    if (!req.file) {
      return res.json(`No file uploaded`);
    }

    const file = req.file;
    console.log(req.file);
    const id = req.params.itemId;
    let uploadResult;

    try {
      uploadResult = await itemImagesServices.uploadItemImageService(
        req,
        id,
        file
      );
    } catch (err: any) {
      console.log(err);
      return res.json(`Error uploading file`);
    }

    res.statusCode = 200;
    return res.json(uploadResult);
  },

  getImages: async (req: Request, res: Response): Promise<any> => {
    let fileKey = req.params.key;
    let getImageResponse;
    try {
      getImageResponse = await itemImagesServices.getImage(res, fileKey);
    } catch (err: any) {
      console.log(err);
      return res.json(err);
    }
  },
};
