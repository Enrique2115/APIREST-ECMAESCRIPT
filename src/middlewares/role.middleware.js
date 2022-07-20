import { verifyToken } from "../helpers/generatedToken";
import { Login } from "../models/Login";

export const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];

      const tokenData = await verifyToken(bearerToken);

      const userData = await Login.findByPk(tokenData.id, {
        attributes: ["role"],
      });

      [].concat(roles).includes(userData.role)
        ? next()
        : res.status(401).json({ message: "No tiene permisos" });
    } else {
      return res.status(401).json({ message: "No presenta token" });
    }
  } catch (error) {
    next(error);
  }
};
