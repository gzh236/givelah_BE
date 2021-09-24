"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const sequelize_1 = require("sequelize");
const item_images_1 = require("./item_images");
const Item = _1.sequelize.define("Item", {
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: "User",
            key: "id",
        },
        onDelete: "CASCADE",
    },
    name: {
        type: sequelize_1.DataTypes.STRING(),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    category: {
        type: sequelize_1.DataTypes.ENUM("Educational", "Electronic Gadgets", "Entertainment", "Food", "Lifestyle", "Others"),
        allowNull: false,
    },
    itemUrl: {
        type: sequelize_1.DataTypes.STRING,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("For Donation", "Wishlist Item"),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    availability: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
    expiryDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
});
Item.hasMany(item_images_1.ItemImages, {
    sourceKey: "id",
    foreignKey: "itemId",
});
item_images_1.ItemImages.belongsTo(Item, {
    foreignKey: "itemId",
});
exports.default = Item;
//# sourceMappingURL=item.js.map