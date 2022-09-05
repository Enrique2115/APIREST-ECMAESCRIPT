import { Router } from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const routes = Router();

const removeExtension = (fileName) => fileName.split(".").shift();

/**
 * Import all the routes from the routes folder.
 */
fs.readdirSync(__dirname).forEach(async (file) => {
  const name = removeExtension(file);

  if (name !== "index") {
    try {
      const item = await import(`./${name}.routes.js`);
      routes.use(`/${name}`, item.default);
      // console.log(`Cargando ruta ${name}`);
    } catch (error) {
      console.log(error.message);
    }
  }
});

export default routes;
