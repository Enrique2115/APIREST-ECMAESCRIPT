import { DataTypes } from "sequelize";
import { sequelize } from "../db/mysql";

export const Login = sequelize.define("login", {
  id_login: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: "uidx_login_username",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "employee",
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
