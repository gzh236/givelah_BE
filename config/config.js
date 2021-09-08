require("dotenv").config();

module.exports = {
  development: {
    username: "root",
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
