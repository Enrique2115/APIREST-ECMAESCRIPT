import { DataTypes } from "sequelize";
import { sequelize } from "../db/mysql";
import { Role } from "./role.model";

export const User = sequelize.define("users", {
  id_user: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "uidx_user_username",
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "uidx_user_email",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: {
    name: "id_user",
    type: DataTypes.UUID,
  },
  otherKey: "id_role",
});

Role.belongsToMany(User, {
  through: "user_roles",
  foreignKey: {
    name: "id_role",
    type: DataTypes.INTEGER,
  },
  otherKey: "id_user",
});
