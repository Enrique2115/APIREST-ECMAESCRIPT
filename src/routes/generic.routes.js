import { Router } from "express";
import {
  loginCtlr,
  registerCtlr,
  uploadImageCtlr,
  validationCtlr,
} from "../controllers/generic.controller";
import { checkAuth } from "../middlewares/auth.middleware";
import { checkRoleAuth } from "../middlewares/role.middleware";

import upload from "../helpers/handleMulter";

const routes = Router();

routes.get("/render", (req, res) => {
  res.render("index");
});

routes.post("/auth/login", loginCtlr);

routes.post("/auth/register", registerCtlr);

routes.get(
  "/verify-token",
  checkAuth,
  checkRoleAuth(["admin"]),
  validationCtlr
);

routes.post("/upload-images/:folder", upload.array("image"), uploadImageCtlr);

export default routes;
