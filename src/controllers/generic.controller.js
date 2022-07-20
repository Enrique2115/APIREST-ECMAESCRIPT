import fs from "fs";
import { uploads } from "../helpers/handleCloudinary";
import { tokenSign } from "../helpers/generatedToken";
import { comparePassword, hashPassword } from "../libs/handleBcrypt";
import { Login } from "../models/Login";

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

export const loginCtlr = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await Login.findOne({
      attributes: ["id_login", "username", "password", "role", "status"],
      where: {
        username,
      },
    });

    if (!user) return res.status(400).json({ message: "Usuario no existe" });

    const isValid = await comparePassword(password, user.password);
    const token = await tokenSign(user);

    !isValid
      ? res.status(400).json({ message: "Contraseña incorrecta" })
      : res.status(200).json({
          token,
          user: {
            id: user.id_login,
            username: user.username,
            role: user.role,
            status: user.status,
          },
        });
  } catch (error) {
    next(error);
  }
};

export const registerCtlr = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const passwordHash = await hashPassword(password);
    const registerUser = await Login.create({
      username,
      password: passwordHash,
    });

    res.json({ data: registerUser });
  } catch (error) {
    next(error);
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
