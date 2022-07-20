import mongoose from "mongoose";
import { DB_MONGO_URI } from "../../config";

const dbConnection = mongoose.connect(DB_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

dbConnection.then(() => {
  console.log("DB is connected");
});

export default dbConnection;

/**
 * 2 Metodo de conexion a mongo
 */

// const dbConnect = () => {
//   mongoose.connect(
//     DB_MONGO_URI,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     },
//     (err, res) => {
//       !err ? console.log("DB is connected") : console.log("DB is error");
//     }
//   );
// };

// export default dbConnect;

/**
 * 3 Metodo de conexion a mongo
 */

// import { connect, connection } from "mongoose";
// import { mongobd_url } from "../../data";

// (async () => {
//   const db = await connect(mongobd_url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
//   console.log("Database connected to:", db.connection.name);
// })();

// connection.on("connected", () => {
//   console.log("Mongodb is connected");
// });

// connection.on("error", (error) => {
//   console.error(error);
// });

// connection.on("disconnected", () => {
//   console.error("Mongodb is disconnect");
// });

// process.on("SIGINT", async () => {
//   await connection.close();
//   process.exit(0);
// });
