"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./routers/user_router"));
const user_addresses_router_1 = __importDefault(require("./routers/user_addresses_router"));
const items_router_1 = __importDefault(require("./routers/items_router"));
const items_images_router_1 = __importDefault(require("./routers/items_images_router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({ origin: "*" }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`Givelah's backend listening on port ${PORT}`);
});
// Routes
app.use("/api/v1/users", user_router_1.default);
app.use("/api/v1/address", user_addresses_router_1.default);
app.use("/api/v1/items", items_router_1.default);
app.use("/api/v1/itemImages", items_images_router_1.default);
//# sourceMappingURL=server.js.map