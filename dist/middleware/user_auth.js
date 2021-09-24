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
exports.authMiddleware = void 0;
require("dotenv").config();
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authMiddleware = {
    authenticated: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        //   check for jwt token in header
        const authToken = req.headers["accesstoken"];
        if (!authToken) {
            res.statusCode = 403;
            return res.json({
                message: `Not authorised`,
            });
        }
        // verify that jwt token is valid
        let decodedJWT;
        let jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            return res.json(`server error`);
        }
        try {
            decodedJWT = yield jsonwebtoken_1.default.verify(authToken, jwtSecret);
        }
        catch (err) {
            res.statusCode = 500;
            return res.json(err);
        }
        if (!decodedJWT) {
            res.statusCode = 403;
            return res.json("unable to verify authorisation");
        }
        next();
    }),
    unauthenticated: (req, res, next) => {
        const authToken = req.headers["accesstoken"];
        if (!authToken) {
            next();
        }
        return;
    },
};
//# sourceMappingURL=user_auth.js.map