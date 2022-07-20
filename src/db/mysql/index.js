import Sequelize from "sequelize";
import { DATABASE } from "../../config";

const {
  CleverCloud: { DB_HOST, DB_USER, DB_NAME, DB_PASSWORD },
} = DATABASE;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    /* Preventing Sequelize from pluralizing the table names. */
    freezeTableName: true,
  },
});