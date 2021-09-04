"use strict";

import { Model } from "sequelize";

interface ItemAttributes {
  id: string;
  userId: string;
  category: string;
  description: Text;
  status: Enumerator[];
  availability: boolean;
  expiryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Item extends Model<ItemAttributes> implements ItemAttributes {
    id!: string;
    userId!: string;
    category!: string;
    description!: Text;
    status!: Enumerator[];
    availability!: boolean;
    expiryDate!: Date;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  Item.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "For Donation",
          "Pending Donation",
          "Donated",
          "Wishlist It",
          "Pending Collection",
          "Collected"
        ),
      },
      availability: {
        type: DataTypes.BOOLEAN,
      },
      expiryDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Item",
      timestamps: false,
      underscored: true,
    }
  );
  return Item;
};
