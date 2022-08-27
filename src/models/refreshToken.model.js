import { uid } from "rand-token";
import { DataTypes } from "sequelize";
import { JWT_REFRESH_EXPIRATION } from "../config";
import { sequelize } from "../db/mysql";
import { User } from "./user.model";

const RefreshToken = sequelize.define("refresh_token", {
  id_refresh_token: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

RefreshToken.createToken = async (user) => {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + Number(JWT_REFRESH_EXPIRATION));

  const refreshToken = await RefreshToken.create({
    id_user: user?.id_user,
    token: uid(20),
    expiryDate: expiredAt.getTime(),
  });

  return refreshToken.token;
};

RefreshToken.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

RefreshToken.belongsTo(User, {
  foreignKey: {
    name: "id_user",
    type: DataTypes.UUID,
  },
});

User.hasOne(RefreshToken, {
  foreignKey: {
    name: "id_user",
    type: DataTypes.UUID,
  },
});

export { RefreshToken };
