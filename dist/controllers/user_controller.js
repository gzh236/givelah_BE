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
exports.userController = void 0;
const user_services_1 = require("../services/user_services");
exports.userController = {
    uploadImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let upload;
        if (!req.file) {
            return res.json(`No file uploaded!`);
        }
        const file = req.file;
        try {
            upload = yield user_services_1.userServices.uploadImage(req, res, file);
        }
        catch (err) {
            console.log(err);
            return res.json(err);
        }
        console.log(upload);
        return res.json(upload);
    }),
    getImage: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let fileKey = req.params.key;
        let getImageResponse;
        try {
            getImageResponse = yield user_services_1.userServices.getUserImage(req, res, fileKey);
        }
        catch (err) {
            console.log(err);
            return res.json(err);
        }
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let registrationResponse;
        try {
            registrationResponse = yield user_services_1.userServices.registrationService(req, res);
        }
        catch (err) {
            console.log(err);
            res.statusCode = 400;
            return res.json(err);
        }
        res.statusCode = 201;
        return res.json(registrationResponse);
    }),
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let loginResponse;
        try {
            loginResponse = yield user_services_1.userServices.loginService(req, res);
        }
        catch (err) {
            console.log(err);
            res.statusCode = 400;
            return res.json(err);
        }
        res.statusCode = 200;
        return loginResponse;
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let logoutResponse = yield user_services_1.userServices.logoutService(req, res);
        return res.json(logoutResponse);
    }),
    showOne: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // verify username in query params
        if (!req.params.id) {
            return res.json(`Error finding user!`);
        }
        let id = req.params.id;
        let showOneResponse = yield user_services_1.userServices.showOneService(req, res, id);
        res.statusCode = 200;
        return res.json(showOneResponse);
    }),
};
//# sourceMappingURL=user_controller.js.map