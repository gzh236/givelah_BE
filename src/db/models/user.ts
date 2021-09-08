import { sequelize } from ".";
import { Model, Optional, DataTypes } from "sequelize";

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

interface UserCreationAttributes
  extends Optional<UserAttributes, "selfSummary" | "photoUrl"> {}

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

export default User;
