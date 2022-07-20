import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const tokenSign = (user) => {
  return new Promise((resolve, reject) => {
    !user && reject(new Error("User is required"));

    /**
     * Codigo cuando se requiere que el token expire en un determinado tiempo
     * El timpo de expiracion puede ser en segundos, horas o dias despues de haber creado el token
     * example: 30s, 1h, 2 days
     * jwt.sign({ id: userId }, JWT_SECRET, {expiresIn: "1h"} (err, token) => {
     */
    const { id_login: id } = user;

    jwt.sign({ id }, JWT_SECRET, { expiresIn: "2h" }, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
