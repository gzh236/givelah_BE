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
        res,
        id,
        file
      );
    } catch (err: any) {
      console.log(err);
      return res.json(`Error uploading file`);
    }

    res.statusCode = 201;
    return res.json(uploadResult);
  },
};
