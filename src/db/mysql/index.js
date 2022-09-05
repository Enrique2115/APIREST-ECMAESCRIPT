import Sequelize from "sequelize";
import { DATABASE, TZ_SEQUELIZE } from "../../config/index.js";

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
  timezone: TZ_SEQUELIZE,
  /* If the environment is production, then logging is false. If not, then logging
  is console.log. */
  logging: process.env.NODE_ENV === "production" ? false : console.log,
});
