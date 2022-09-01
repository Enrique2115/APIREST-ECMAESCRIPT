import app, { server } from "./app";
import { PORT } from "./config";

import { handleError } from "./libs/handleErrors";
import { sequelize } from "./db/mysql";

import "./models";

// //Descomentar cuando se use MongoDB
// import "./db/mongodb";

//imports rutas personalizadas
import ROUTES from "./routes/v1";

import { initialRoles } from "./models/User/role.model";

/**
 * Create three roles in the database, if they don't already exist.
 */

async function main() {
  try {
    // await sequelize.sync();

    // await sequelize.sync({ force: true }).then(() => initialRoles());

    //---- Routes Personalizadas ----//
    app.use("/api/v1", ROUTES);

    app.use(handleError); //---- Manejo de errores ----//

    server.listen(PORT, () =>
      console.log(`ApiRest ejecutandose en el puerto: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
