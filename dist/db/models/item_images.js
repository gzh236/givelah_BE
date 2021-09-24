"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemImages = void 0;
const sequelize_1 = require("sequelize");
const _1 = require(".");
exports.ItemImages = _1.sequelize.define("ItemImage", {
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    itemId: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: "Items",
            key: "id",
        },
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
});
//# sourceMappingURL=item_images.js.map