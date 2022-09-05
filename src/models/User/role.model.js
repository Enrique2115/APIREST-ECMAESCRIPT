import { DataTypes } from "sequelize";
import { sequelize } from "../../db/mysql/index.js";

export const Role = sequelize.define("roles", {
  id_role: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
  },
});

/**
 * Create three roles in the database, if they don't already exist.
 */
export function initialRoles() {
  Role.create({
    id_role: 1,
    name: "admin",
  });

  Role.create({
    id_role: 2,
    name: "employee",
  });

  Role.create({
    id_role: 3,
    name: "guest",
  });
}
