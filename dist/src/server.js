"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("../db/models/index"));
const app = express_1.default();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
index_1.default.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Givelah listening on port ${PORT}`);
    });
});
//# sourceMappingURL=server.js.map