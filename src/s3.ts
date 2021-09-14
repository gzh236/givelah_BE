require("dotenv").config();

import S3 from "aws-sdk/clients/s3";
import fs from "fs";

// create a new instance of the S3 class
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

// uploads a file to s3

export function uploadImageFile(file: {
  path: fs.PathLike;
  filename: any;
}): Promise<S3.ManagedUpload.SendData> {
  const fileStream = fs.createReadStream(file.path);

  interface uploadParamsInterface {
    Bucket: string;
    Body: fs.ReadStream;
    Key: string;
  }

  const uploadParams: uploadParamsInterface = {
    Bucket: bucketName || "givelah",
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

// downloads a file from s3

export function getFileStream(fileKey: string) {
  interface downloadParamsInterface {
    Key: string;
    Bucket: string;
  }

  const downloadParams: downloadParamsInterface = {
    Key: fileKey,
    Bucket: bucketName || "givelah",
  };

  return s3.getObject(downloadParams).createReadStream();
}
