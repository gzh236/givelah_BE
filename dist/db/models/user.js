"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const sequelize_1 = require("sequelize");
const item_1 = __importDefault(require("./item"));
const user_address_1 = __importDefault(require("./user_address"));
const User = _1.sequelize.define("User", {
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true,
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    selfSummary: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    photoUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
User.hasOne(user_address_1.default, {
    sourceKey: "id",
    foreignKey: "userId",
});
User.hasMany(item_1.default, {
    sourceKey: "id",
    foreignKey: "userId",
});
item_1.default.belongsTo(User, {
    foreignKey: "userId",
});
user_address_1.default.belongsTo(User, {
    foreignKey: "userId",
});
exports.default = User;
//# sourceMappingURL=user.js.map