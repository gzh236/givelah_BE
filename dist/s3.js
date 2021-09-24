"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileStream = exports.uploadImageFile = void 0;
require("dotenv").config();
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
const fs_1 = __importDefault(require("fs"));
// create a new instance of the S3 class
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const s3 = new s3_1.default({
    region,
    accessKeyId,
    secretAccessKey,
});
// uploads a file to s3
function uploadImageFile(file) {
    const fileStream = fs_1.default.createReadStream(file.path);
    const uploadParams = {
        Bucket: bucketName || "givelah",
        Body: fileStream,
        Key: file.filename,
    };
    return s3.upload(uploadParams).promise();
}
exports.uploadImageFile = uploadImageFile;
// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName || "givelah",
    };
    return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
//# sourceMappingURL=s3.js.map