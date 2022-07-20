import app, { server } from "./app";
import { PORT } from "./config";

import { handleError } from "./libs/handleErrors";
import { sequelize } from "./db/mysql";

import "./models/Login";

// //Descomentar cuando se use MongoDB
// import "./db/mongodb";

//imports rutas personalizadas
import generico from "./routes/generic.routes";

async function main() {
  try {
    await sequelize.sync();

    //---- Routes Personalizadas ----//
    app.use("/api", generico);

    app.use(handleError); //---- Manejo de errores ----//

    server.listen(PORT, () =>
      console.log(`ApiRest ejecutandose en el puerto: ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
}

main();
