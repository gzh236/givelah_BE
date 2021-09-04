"use strict";
import { Model } from "sequelize";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  selfSummary: Text;
  photoUrl: string;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    username!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
    selfSummary!: Text;
    photoUrl!: string;
    hash!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static associate(models: any) {
      // define association here
      this.hasMany(models.Item, models.User_Addresses);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      selfSummary: {
        type: DataTypes.TEXT,
      },
      photoUrl: {
        type: DataTypes.STRING,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "User",
      timestamps: false,
      underscored: true,
    }
  );
  return User;
};
