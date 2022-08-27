import jwt, { TokenExpiredError } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRATION } from "../config";

export const tokenSign = (user) => {
  return new Promise((resolve, reject) => {
    !user && reject(new Error("User is required"));

    /**
     * Codigo cuando se requiere que el token expire en un determinado tiempo
     * El timpo de expiracion puede ser en segundos, horas o dias despues de haber creado el token
     * example: 30s, 1h, 2 days
     * jwt.sign({ id: userId }, JWT_SECRET, {expiresIn: "1h"} (err, token) => {
     */
    const { id_user: id } = user;

    jwt.sign(
      { id },
      JWT_SECRET,
      { expiresIn: Number(JWT_EXPIRATION) },
      (err, token) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
};

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "¡No autorizado! El token de acceso ha caducado." });
  }
  return res.status(401).send({ message: "¡No autorizado!" });
};

export const verifyToken = (token, res) => {
  try {
    return jwt.verify(token, JWT_SECRET, (err, info) => {
      if (err) {
        return catchError(err, res);
      }

      return info;
    });
  } catch (error) {
    return null;
  }
};
