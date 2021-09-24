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
exports.userServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../db/models/user"));
const firebase_1 = __importDefault(require("./firebase"));
const firestore_1 = require("firebase/firestore");
const user_validations_1 = require("../validations/user_validations");
const s3_1 = require("../s3");
const fs_1 = __importDefault(require("fs"));
const util_1 = __importDefault(require("util"));
const unlinkFile = util_1.default.promisify(fs_1.default.unlink);
exports.userServices = {
    uploadImage: (req, res, file) => __awaiter(void 0, void 0, void 0, function* () {
        let uploadImageToS3;
        try {
            uploadImageToS3 = yield (0, s3_1.uploadImageFile)(file);
        }
        catch (err) {
            console.log(err);
            res.statusCode = 400;
            return `Error encountered when uploading file!`;
        }
        if (!uploadImageToS3) {
            res.statusCode = 400;
            return `Error occurred!`;
        }
        // remove file from uploads folder
        try {
            yield unlinkFile(file.path);
            console.log(`File successfully unlinked`);
        }
        catch (err) {
            console.log(err);
            res.statusCode = 400;
            return `Error occurred!`;
        }
        console.log(uploadImageToS3);
        return uploadImageToS3;
    }),
    loginService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // verify user form input
        const validationResult = user_validations_1.userValidation.loginValidator.validate(req.body);
        if (validationResult.error) {
            res.statusCode = 400;
            return `Username or password is incorrect`;
        }
        const validatedParams = validationResult.value;
        // find user details from db
        let user = null;
        try {
            user = yield user_1.default.findOne({
                where: { username: validatedParams.username },
            });
        }
        catch (err) {
            res.statusCode = 500;
            return `Username or password is incorrect`;
        }
        if (!user) {
            res.statusCode = 400;
            return `Username or password is incorrect`;
        }
        // convert user password to hash and compare
        let isPasswordValidated = false;
        try {
            isPasswordValidated = yield bcrypt_1.default.compare(validatedParams.password, user.hash);
        }
        catch (err) {
            console.log(err);
            return err;
        }
        if (!isPasswordValidated) {
            res.statusCode = 400;
            return `Username or password is incorrect`;
        }
        if (!user.id) {
            return `Error encountered`;
        }
        const uid = user.id.toString();
        const accessToken = jsonwebtoken_1.default.sign({
            username: user === null || user === void 0 ? void 0 : user.username,
            userId: user === null || user === void 0 ? void 0 : user.id,
        }, process.env.JWT_SECRET);
        let firebaseToken = "";
        firebase_1.default
            .auth()
            .createCustomToken(uid)
            .then((customToken) => {
            firebaseToken = customToken;
            return res.json({
                firebaseToken,
                accessToken,
            });
        })
            .catch((err) => {
            console.log(err);
            return `Error logging in`;
        });
    }),
    registrationService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // validate user form inputs
        const validationResult = user_validations_1.userValidation.registrationValidator.validate(req.body);
        if (validationResult.error) {
            res.statusCode = 400;
            return `Registration form bad inputs`;
        }
        const validatedParams = validationResult.value;
        // ensure that user doesn't already exist in DB
        let user;
        try {
            user = yield user_1.default.findOne({
                where: {
                    email: validatedParams.email,
                    username: validatedParams.username,
                },
            });
        }
        catch (err) {
            res.statusCode = 500;
            console.log(err);
            return false;
        }
        if (user) {
            res.statusCode = 409;
            return `Email or username already in use!`;
        }
        // ensure passwords match
        if (validatedParams.password !== validatedParams.confirmPassword) {
            res.statusCode = 400;
            return `Entered passwords need to match!`;
        }
        // convert password to hash
        let hash;
        try {
            hash = yield bcrypt_1.default.hash(validatedParams.password, 10);
        }
        catch (err) {
            res.statusCode = 500;
            return false;
        }
        if (!hash) {
            res.statusCode = 500;
            return false;
        }
        let createResult;
        try {
            createResult = yield user_1.default.create({
                username: validatedParams.username,
                email: validatedParams.email,
                firstName: validatedParams.firstName,
                lastName: validatedParams.lastName,
                selfSummary: validatedParams.selfSummary,
                photoUrl: validatedParams.photoUrl,
                hash: hash,
            });
        }
        catch (err) {
            res.statusCode = 500;
            console.log(err);
            return false;
        }
        console.log(createResult);
        if (!createResult) {
            res.statusCode = 500;
            return false;
        }
        const db = (0, firestore_1.getFirestore)();
        // add user to firestore
        try {
            const docRef = yield (0, firestore_1.addDoc)((0, firestore_1.collection)(db, "users"), {
                id: createResult.id,
                username: validatedParams.username,
                selfSummary: validatedParams.selfSummary,
            });
            console.log("Document written with ID: ", docRef.id);
            res.statusCode = 201;
            return true;
        }
        catch (e) {
            console.error("Error adding document: ", e);
            return false;
        }
    }),
    logoutService: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // destroy token
        res.clearCookie("authToken");
        res.statusCode = 204;
        return `Successfully logged out`;
    }),
    showOneService: (req, res, id) => __awaiter(void 0, void 0, void 0, function* () {
        // query db for one user
        let user;
        try {
            user = yield user_1.default.findOne({
                where: { id: id },
            });
        }
        catch (err) {
            console.log(err);
            res.statusCode = 500;
            return err;
        }
        if (!user) {
            res.statusCode = 400;
            return `User not found!`;
        }
        res.statusCode = 200;
        return user;
    }),
    getUserImage: (req, res, fileKey) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=user_services.js.map