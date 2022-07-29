import { Router } from "express";
import {
  loginCtlr,
  registerCtlr,
  uploadImageCtlr,
  validationCtlr,
} from "../../controllers/generic.controller";
import { checkAuth } from "../../middlewares/auth.middleware";
import { checkRoleAuth } from "../../middlewares/role.middleware";

import upload from "../../helpers/handleMulter";

const routes = Router();

routes
  .get("/render", (req, res) => {
    res.render("index");
  })

  .post("/login", loginCtlr)

  .post("/register", registerCtlr)

  .get("/verify-token", checkAuth, checkRoleAuth(["employee"]), validationCtlr)

  .post("/upload-images/:folder", upload.array("image"), uploadImageCtlr);

export default routes;
