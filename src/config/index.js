import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.port || 9000;

export const DATABASE = {
  LocalHost: {
    DB_HOST: "localhost",
    DB_PORT: 3306,
    DB_USER: "root",
    DB_PASSWORD: "",
    DB_NAME: "segas",
    multipleStatements: true,
  },
  CleverCloud: {
    DB_HOST: process.env.DB_HOST,
    DB_PORT: 3306,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    multipleStatements: true,
  },
};

export const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const JWT_REFRESH_EXPIRATION = process.env.JWT_REFRESH_EXPIRATION;

export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export const DB_MONGO_URI = process.env.MONGO_HOST;

export const MAILTRAP = {
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USERNAME,
  MAIL_PASS: process.env.MAIL_PASSWORD,
};

export const URL_FRONTEND = process.env.URL_FRONTEND;

export const TZ_SEQUELIZE = process.env.TZ_SEQUELIZE;
