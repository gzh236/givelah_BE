import { sequelize } from ".";
import { Model, Optional, DataTypes } from "sequelize";

interface UserAddressAttributes {
  id: string;
  userId: string;
  streetAddresses: string;
  postalCode: Text;
  permission: boolean;
}

interface UserAddressCreationAttributes
  extends Optional<UserAddressAttributes, "id"> {}

interface UserAddressInstance
  extends Model<UserAddressAttributes, UserAddressCreationAttributes>,
    UserAddressAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const UserAddress = sequelize.define<UserAddressInstance>("UserAddress", {
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
    type: DataTypes.STRING,
    validate: {
      allowNull: false,
      notEmpty: true,
    },
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
});

export default UserAddress;
