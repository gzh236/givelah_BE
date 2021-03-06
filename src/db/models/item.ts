import { sequelize } from ".";
import { DataTypes, Model, Optional } from "sequelize";
import { ItemImages } from "./item_images";

interface ItemAttributes {
  id: string;
  userId: string;
  name: string;
  category: Enumerator[];
  itemUrl?: string;
  description: Text;
  status: Enumerator[];
  availability: boolean;
  givenTo: string;
  expiryDate?: Date;
}

interface ItemCreationAtrributes extends Optional<ItemAttributes, "id"> {}

export interface ItemInstance
  extends Model<ItemAttributes, ItemCreationAtrributes>,
    ItemAttributes {
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
    type: DataTypes.STRING(),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  category: {
    type: DataTypes.ENUM(
      "Educational",
      "Electronic Gadgets",
      "Entertainment",
      "Food",
      "Lifestyle",
      "Others"
    ),
    allowNull: false,
  },

  itemUrl: {
    type: DataTypes.STRING,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  status: {
    type: DataTypes.ENUM("For Donation", "Wishlist Item"),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  availability: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  givenTo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

Item.hasMany(ItemImages, {
  sourceKey: "id",
  foreignKey: "itemId",
});

ItemImages.belongsTo(Item, {
  foreignKey: "itemId",
});

export default Item;
