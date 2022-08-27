import fs from "fs";
import { uploads } from "../helpers/handleCloudinary";
import { tokenSign } from "../helpers/generatedToken";
import { comparePassword, hashPassword } from "../libs/handleBcrypt";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { Op } from "sequelize";

import { uid } from "rand-token";
import { sendEmail } from "../libs/handleSendEmail";
import { RefreshToken } from "../models/refreshToken.model";

/**
 * It takes the username and password from the request body, checks if the user exists, if it does, it checks if the password is correct, if it is, it creates a token and a refresh token and sends them back to the client
 */
export const loginCtlr = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) return res.status(404).json({ message: "Usuario no existe" });

    const isValid = await comparePassword(password, user.password);

    if (!isValid)
      return res.status(403).json({ message: "Contraseña incorrecta" });

    const token = await tokenSign(user);

    const refreshToken = await RefreshToken.createToken(user);

    let authorities = "";

    const roles = await user.getRoles();
    roles.forEach((role) => {
      authorities += `${role.name}`;
    });

    res.status(200).json({
      id: user.id_user,
      role: authorities,
      username: user.username,
      refreshToken,
      token,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * It creates a new user in the database
 * @returns The user is being returned.
 */
export const registerCtlr = async (req, res, next) => {
  try {
    const { username, email, password, roles } = req.body;

    const user = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }],
      },
    });

    if (user)
      return res
        .status(409)
        .json({ message: "El nombre o email de usuario existe" });

    const passwordHash = await hashPassword(password);
    const registerUser = await User.create({
      username,
      email,
      password: passwordHash,
    });

    if (roles) {
      const searchRoles = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles,
          },
        },
      });

      await registerUser.setRoles(searchRoles);
      res.status(201).json({ message: "Usuario creado" });
    } else {
      const role = await Role.findOne({
        where: {
          name: "employee",
        },
      });

      await registerUser.setRoles([role]);
      res.status(201).json({ message: "Usuario creado" });
    }

    // res.json({ data: registerUser });
  } catch (error) {
    console.log(error);
    console.log(error.message, error.code, "error");
    next(error);
  }
};

/**
 * It takes the user's id, the new password and the old password, then it checks if the old password is correct, if it is, it updates the password and returns a message.
 * @returns The user is being returned.
 */
export const changePasswordCtlr = async (req, res, next) => {
  try {
    const { id_user, password, oldPassword } = req.body;

    const user = await User.findByPk(id_user);

    if (!user) return res.status(404).json({ message: "Usuario no existe" });

    const isValid = await comparePassword(oldPassword, user.password);

    if (!isValid)
      return res.status(401).json({
        message: "La actual contraseña es incorrecta",
      });

    const passwordHash = await hashPassword(password);
    await user.update({
      password: passwordHash,
      token: null,
    });

    res.status(201).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};

/**
 * It takes an email from the request body, finds the user in the database, generates a token, sends an email with the token, and updates the user's token in the database.
 * @returns The token is being returned.
 */
export const forgotPasswordCtlr = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(404).json({ message: "El correo no esta registrado " });

    const token = uid(20);

    const sent = sendEmail(email, token);

    if (sent != "0") {
      await user.update({
        token,
      });
      res.status(201).json({
        message: "Se ha enviado un correo para restablecer la contraseña",
      });
    } else {
      res.status(500).json({ message: "Error al enviar el correo" });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * It takes a token from the request body, finds a user with that token, hashes the password, updates
 * the user's password with the hashed password, and then sends a response to the client.
 * @returns The user is being returned.
 */
export const recoverPasswordCtlr = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      where: {
        token,
      },
    });

    if (!user)
      return res
        .status(401)
        .json({ message: "Token de recuperacion invalido" });

    const passwordHash = await hashPassword(password);
    await user.update({
      password: passwordHash,
      token: null,
    });

    res.status(201).json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    next(error);
  }
};

/**
 * It takes a refresh token from the request body, checks if it exists in the database, checks if it's
 * expired, and if it's not expired, it returns a new access token
 * @returns The refresh token is being returned.
 */
export const refreshTokenCtlr = async (req, res, next) => {
  const { refreshToken: requestToken } = req.body;

  if (!requestToken)
    return res
      .status(403)
      .json({ message: "¡Se requiere token de actualización!" });

  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    });
    // console.log(refreshToken);

    if (!refreshToken)
      return res.status(403).json({
        message: "¡El token de actualización no está en la base de datos!",
      });

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({
        where: { id_refresh_token: refreshToken.id_refresh_token },
      });

      return res.status(403).json({
        message:
          "El token de actualización ha caducado. Inicio de sesión Nuevamente",
      });
    }

    const user = await refreshToken.getUser();
    let newAccessToken = await tokenSign(user);

    return res.status(200).json({ token: newAccessToken });
  } catch (err) {
    next(err);
  }
};

export const validationCtlr = (req, res, next) => {
  try {
    // throw new Error("Error de validacion");
    res.json({ message: "Token validado" });
  } catch (error) {
    next(error);
  }
};

/**
 * It takes a file from the client, uploads it to the cloud, and returns the URL of the uploaded file
 * @returns Object: {
 *   "message": "Subida de imagenes satisfactoria",
 *   "data": []
 * }
 */
export const uploadImageCtlr = async (req, res, next) => {
  try {
    const { folder } = req.params;

    // console.log(folder);

    if (!req.files) return res.send("Por favor seleccione imagenes");

    const uploader = async (path) => await uploads(path, folder);

    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      // console.log(path);
      // console.log(path.split("Z-")[1]);
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }

    res.status(200).json({
      message: "Subida de imagenes satisfactoria",
      data: urls,
    });
  } catch (error) {
    next(error);
  }
};
