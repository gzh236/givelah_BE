"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbName = process.env.MYSQL_DB;
const dbUser = process.env.MYSQL_USER;
const dbHost = process.env.MYSQL_HOST;
const dbPassword = process.env.MYSQL_PASSWORD;
const sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: "mysql",
});
exports.default = sequelizeConnection;
//# sourceMappingURL=config.js.map