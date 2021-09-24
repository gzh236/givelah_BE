"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const sequelize_1 = require("sequelize");
const UserAddress = _1.sequelize.define("UserAddress", {
    id: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
            model: "Users",
            key: "id",
        },
    },
    streetAddresses: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    postalCode: {
        type: sequelize_1.DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    permission: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
});
exports.default = UserAddress;
//# sourceMappingURL=user_address.js.map