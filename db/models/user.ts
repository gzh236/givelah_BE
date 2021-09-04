"use strict";
import { Model } from "sequelize";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  self_summary: Text;
  photo_url: string;
  hash: string;
  created_at: Date;
  updated_at: Date;
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
    first_name!: string;
    last_name!: string;
    self_summary!: Text;
    photo_url!: string;
    hash!: string;
    created_at!: Date;
    updated_at!: Date;

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
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      self_summary: {
        type: DataTypes.TEXT,
      },
      photo_url: {
        type: DataTypes.STRING,
      },
      hash: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "User",
      timestamps: false,
    }
  );
  return User;
};
