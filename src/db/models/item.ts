import { sequelize } from ".";
import { DataTypes, Model } from "sequelize";

import ItemImages from "./item_images";

interface ItemAttributes {
  id: string;
  userId: string;
  name: string;
  category: string;
  description: Text;
  status: Enumerator[];
  availability: boolean;
  expiryDate: Date;
}

interface ItemInstance extends Model<ItemAttributes>, ItemAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Item = sequelize.define<ItemInstance>("Item", {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
});

Item.hasMany(ItemImages, {
  sourceKey: "id",
  foreignKey: "userId",
});

ItemImages.belongsTo(Item, {
  foreignKey: "itemId",
});

export default Item;
