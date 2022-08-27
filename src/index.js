import app, { server } from "./app";
import { PORT } from "./config";

import { handleError } from "./libs/handleErrors";
import { sequelize } from "./db/mysql";

import "./models/user.model";
import "./models/role.model";
import "./models/refreshToken.model";

// //Descomentar cuando se use MongoDB
// import "./db/mongodb";

//imports rutas personalizadas
import generico from "./routes/v1/generic.routes";
import { Role } from "./models/role.model";

/**
 * Create three roles in the database, if they don't already exist.
 */
function initialRoles() {
  Role.create({
    id_role: 1,
    name: "admin",
  });

  Role.create({
    id_role: 2,
    name: "employee",
  });

  Role.create({
    id_role: 3,
    name: "guest",
  });
}

async function main() {
  try {
    await sequelize.sync().then(() => {
      // initialRoles();
    });

    //---- Routes Personalizadas ----//
    app.use("/api/v1/auth", generico);

    app.use(handleError); //---- Manejo de errores ----//

    server.listen(PORT, () =>
      console.log(`ApiRest ejecutandose en el puerto: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
