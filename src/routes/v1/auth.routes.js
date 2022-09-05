import { Router } from "express";
import {
  changePasswordCtlr,
  loginCtlr,
  registerCtlr,
  forgotPasswordCtlr,
  uploadImageCtlr,
  validationCtlr,
  refreshTokenCtlr,
  recoverPasswordCtlr,
} from "../../controllers/auth.controller.js";
import { checkAuth } from "../../middlewares/auth.middleware.js";
import { checkRoleAuth } from "../../middlewares/role.middleware.js";

import upload from "../../helpers/handleMulter.js";

const routes = Router();

routes
  .post("/login", loginCtlr)

  .post("/register", registerCtlr)

  .post("/change-password", checkAuth, changePasswordCtlr)

  .post("/forgot-password", forgotPasswordCtlr)

  .post("/recover-password", recoverPasswordCtlr)

  .post("/refresh-token", refreshTokenCtlr)

  .get("/verify-token", checkAuth, checkRoleAuth(["employee"]), validationCtlr)

  //endpoint para subir imagenes
  .get("/render", (req, res) => {
    res.render("index");
  })

  .post("/upload-images/:folder", upload.array("image"), uploadImageCtlr)

  //prueba
  .get("/prueba", checkAuth, (req, res) => {
    res.send("Hola mundo");
  });

export default routes;
