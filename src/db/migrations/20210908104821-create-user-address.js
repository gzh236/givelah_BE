"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("UserAddresses", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      streetAddresses: {
        type: Sequelize.STRING,
        validate: {
          allowNull: false,
          notEmpty: true,
        },
      },
      postalCode: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
      },
      permission: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("UserAddresses");
  },
};
