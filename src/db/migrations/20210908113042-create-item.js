"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Items", {
      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
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
      name: {
        type: Sequelize.STRING(3),
        validate: {
          allowNull: false,
          notEmpty: true,
        },
      },
      category: {
        type: Sequelize.STRING(3),
        validate: {
          allowNull: false,
          notEmpty: true,
        },
      },
      description: {
        type: Sequelize.TEXT,
        validate: {
          allowNull: false,
          notEmpty: true,
        },
      },

      itemUrl: {
        type: Sequelize.STRING,
      },

      status: {
        type: Sequelize.ENUM("For Donation", "Wishlist Item"),
        validate: {
          allowNull: false,
          notEmpty: true,
        },
      },
      availability: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      expiryDate: {
        type: Sequelize.DATEONLY,
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
    await queryInterface.dropTable("Items");
  },
};
