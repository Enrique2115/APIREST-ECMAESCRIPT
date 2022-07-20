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

export const JWT = {
  id: process.env.idJWT,
  nombre: process.env.nombre,
  email: process.env.email,
};

export const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

export const DB_MONGO_URI = process.env.MONGO_HOST;
