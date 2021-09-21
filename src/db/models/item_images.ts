import { DataTypes, Optional, Model } from "sequelize";
import { sequelize } from ".";

interface ItemImagesAttributes {
  id: string;
  itemId: string;
  imageUrl: string;
}

interface ItemImagesCreationAttributes
  extends Optional<ItemImagesAttributes, "id"> {}

export interface ItemImagesInstance
  extends Model<ItemImagesAttributes, ItemImagesCreationAttributes>,
    ItemImagesAttributes {
  createdAt: Date;
  updatedAt: Date;
}

export const ItemImages = sequelize.define<ItemImagesInstance>("ItemImage", {
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
    validate: {
      allowNull: false,
      notEmpty: true,
    },
  },
});
