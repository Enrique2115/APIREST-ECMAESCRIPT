import app, { server } from "./app.js";
import { PORT } from "./config/index.js";

import { handleError } from "./libs/handleErrors.js";
import { sequelize } from "./db/mysql/index.js";

import "./models/index.js";

// //Descomentar cuando se use MongoDB
// import "./db/mongodb";

//imports rutas personalizadas
import ROUTES from "./routes/v1/index.js";

import { initialRoles } from "./models/User/role.model.js";

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
