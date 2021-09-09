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

interface UserInstance
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
});

User.hasMany(UserAddress, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "userAddresses",
});

User.hasMany(Item, {
  sourceKey: "id",
  foreignKey: "userId",
  as: "items",
});

Item.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

UserAddress.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default User;
