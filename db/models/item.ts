"use strict";

import { Model } from "sequelize";

interface ItemAttributes {
  id: string;
  user_id: string;
  category: string;
  description: Text;
  status: Enumerator[];
  availability: boolean;
  expiry_date: Date;
  created_at: Date;
  updated_at: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Item extends Model<ItemAttributes> implements ItemAttributes {
    id!: string;
    user_id!: string;
    category!: string;
    description!: Text;
    status!: Enumerator[];
    availability!: boolean;
    expiry_date!: Date;
    created_at!: Date;
    updated_at!: Date;

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
      user_id: {
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
      expiry_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      modelName: "Item",
    }
  );
  return Item;
};
