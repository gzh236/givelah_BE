"use strict";

import { Model } from "sequelize";

interface ItemImagesAttributes {
  id: string;
  itemId: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize, DataTypes) => {
  class Item_Images
    extends Model<ItemImagesAttributes>
    implements ItemImagesAttributes
  {
    id!: string;
    itemId!: string;
    imageUrl!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models) {
      // define association here
      this.belongsTo(models.Item);
    }
  }
  Item_Images.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      itemId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "Items",
          key: "id",
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
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
      modelName: "Item_Images",
    }
  );
  return Item_Images;
};
