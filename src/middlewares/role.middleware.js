import { verifyToken } from "../helpers/generatedToken";
import { Role } from "../models/User/role.model";
import { User } from "../models/User/user.model";

export const checkRoleAuth = (roles) => async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];

      const tokenData = await verifyToken(bearerToken);

      const userData = await User.findByPk(tokenData.id, {
        include: [{ model: Role }],
      });

      const userRoles = userData.roles.map((role) => role.name);

      [].concat(roles).forEach((role) => {
        userRoles.includes(role)
          ? next()
          : res.status(401).json({ message: "No tiene permisos" });
      });

      // [].concat(roles).includes(userData.roles[0]?.name)
      //   ? next()
      //   : res.status(401).json({ message: "No tiene permisos" });
    } else {
      return res.status(401).json({ message: "No presenta token" });
    }
  } catch (error) {
    next(error);
  }
};
