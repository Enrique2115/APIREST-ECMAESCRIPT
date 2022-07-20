import { verifyToken } from "../helpers/generatedToken";

export const checkAuth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];

      const tokenData = await verifyToken(bearerToken);

      tokenData?.id
        ? next()
        : res.status(401).json({ message: "Error de comprobacion del token" });
    } else {
      return res.status(401).json({ message: "No presenta token" });
    }
  } catch (error) {
    next(error);
  }
};
