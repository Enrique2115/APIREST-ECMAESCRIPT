import { DataTypes } from "sequelize";
import { sequelize } from "../db/mysql";
import { User } from "./user.model";

export const Role = sequelize.define("roles", {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});
