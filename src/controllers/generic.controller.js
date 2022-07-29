import fs from "fs";
import { uploads } from "../helpers/handleCloudinary";
import { tokenSign } from "../helpers/generatedToken";
import { comparePassword, hashPassword } from "../libs/handleBcrypt";
import { User } from "../models/user.model";
import { Role } from "../models/role.model";
import { Op } from "sequelize";

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
    const token = await tokenSign(user);

    if (!isValid)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    let authorities = [];
    const roles = await user.getRoles();
    roles.forEach((role) => {
      authorities.push(`ROLE_${role.name.toUpperCase()}`);
    });

    res.status(200).json({
      roles: authorities,
      token,
    });
  } catch (error) {
    next(error);
  }
};

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

export const validationCtlr = (req, res, next) => {
  try {
    // throw new Error("Error de validacion");
    res.json({ message: "Token validado" });
  } catch (error) {
    next(error);
  }
};

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
