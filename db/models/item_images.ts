"use strict";

import { Model } from "sequelize";

interface ItemImagesAttributes {
  id: string;
  item_id: string;
  image_url: string;
  created_at: Date;
  updated_at: Date;
}

module.exports = (sequelize, DataTypes) => {
  class Item_Images
    extends Model<ItemImagesAttributes>
    implements ItemImagesAttributes
  {
    id!: string;
    item_id!: string;
    image_url!: string;
    created_at!: Date;
    updated_at!: Date;

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
      item_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "Items",
          key: "id",
        },
      },
      image_url: {
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
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
