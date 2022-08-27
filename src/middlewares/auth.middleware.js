import { verifyToken } from "../helpers/generatedToken";

export const checkAuth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];

      const tokenData = await verifyToken(bearerToken, res);

      tokenData?.id && next();
    } else {
      return res.status(403).json({ message: "No presenta token" });
    }
  } catch (error) {
    next(error);
  }
};
