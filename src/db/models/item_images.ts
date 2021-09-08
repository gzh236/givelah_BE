import { DataTypes, Model } from "sequelize";
import { sequelize } from ".";

interface ItemImagesAttributes {
  id: string;
  itemId: string;
  imageUrl: string;
}

interface ItemImagesInstance
  extends Model<ItemImagesAttributes>,
    ItemImagesAttributes {
  createdAt: Date;
  updatedAt: Date;
}

const ItemImages = sequelize.define<ItemImagesInstance>("ItemImage", {
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
});

export default ItemImages;
