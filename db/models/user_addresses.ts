"use strict";
import { Model } from "sequelize";

interface UserAddressAttributes {
  id: string;
  userId: string;
  streetAddresses: string;
  postalCode: Text;
  permission: boolean;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize, DataTypes) => {
  class User_Addresses
    extends Model<UserAddressAttributes>
    implements UserAddressAttributes
  {
    id!: string;
    userId!: string;
    streetAddresses!: string;
    postalCode!: Text;
    permission!: boolean;
    createdAt!: Date;
    updatedAt!: Date;

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
      userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
      },
      streetAddresses: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      permission: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      modelName: "User_Addresses",
      timestamps: false,
      underscored: true,
    }
  );
  return User_Addresses;
};
