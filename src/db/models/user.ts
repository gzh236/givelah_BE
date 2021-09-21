import { sequelize } from ".";
import { Model, Optional, DataTypes } from "sequelize";
import Item from "./item";
import UserAddress from "./user_address";

interface UserAttributes {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  selfSummary?: Text;
  photoUrl?: string;
  hash: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      notEmpty: true,
      unique: true,
      isEmail: true,
    },
  },
  firstName: {
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      notEmpty: true,
    },
  },
  lastName: {
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      notEmpty: true,
    },
  },
  selfSummary: {
    type: DataTypes.TEXT,
    validate: {
      allowNull: false,
      notEmpty: true,
    },
  },
  photoUrl: {
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      notEmpty: true,
    },
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasOne(UserAddress, {
  sourceKey: "id",
  foreignKey: "userId",
});

User.hasMany(Item, {
  sourceKey: "id",
  foreignKey: "userId",
});

Item.belongsTo(User, {
  foreignKey: "userId",
});

UserAddress.belongsTo(User, {
  foreignKey: "userId",
});

export default User;
