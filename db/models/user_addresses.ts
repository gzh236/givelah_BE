"use strict";
import { Model } from "sequelize";

interface UserAddressAttributes {
  id: string;
  user_id: string;
  street_address: string;
  postal_code: Text;
  permission: boolean;
  created_at: Date;
  updated_at: Date;
}

module.exports = (sequelize, DataTypes) => {
  class User_Addresses
    extends Model<UserAddressAttributes>
    implements UserAddressAttributes
  {
    id!: string;
    user_id!: string;
    street_address!: string;
    postal_code!: Text;
    permission!: boolean;
    created_at!: Date;
    updated_at!: Date;

    static associate(models) {
      // define association here
      this.belongsTo(models.User);
    }
  }
  User_Addresses.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      street_address: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      permission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "User_Addresses",
    }
  );
  return User_Addresses;
};
