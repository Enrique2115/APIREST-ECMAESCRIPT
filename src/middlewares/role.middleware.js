import { verifyToken } from "../helpers/generatedToken";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";

export const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];

      const tokenData = await verifyToken(bearerToken);

      const userData = await User.findByPk(tokenData.id, {
        include: [{ model: Role }],
      });

      [].concat(roles).includes(userData.roles[0]?.name)
        ? next()
        : res.status(401).json({ message: "No tiene permisos" });
    } else {
      return res.status(401).json({ message: "No presenta token" });
    }
  } catch (error) {
    next(error);
  }
};
