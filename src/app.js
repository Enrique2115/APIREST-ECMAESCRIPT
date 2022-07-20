import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import socketIO from "socket.io";
import pkg from "../package.json";

import { createServer } from "http";
import { corsOptions } from "./middlewares/cors.middleware";

const app = express();
export const server = createServer(app);

export const io = socketIO(server, {
  transports: ["polling"],
  cors: {
    cors: {
      origin: "http://localhost:3000",
    },
  },
});

io.on("connection", (socket) => {
  console.log("A user is connected");

  socket.on("message", (message) => {
    console.log(`message from ${socket.id} : ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`socket ${socket.id} disconnected`);
  });
});

// const whitelist = [
//   "http://localhost:3000",
//   "http://localhost:9000",
//   "https://segas-admin.000webhostapp.com",
//   "https://segas-prueba.netlify.app",
// ];
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.set("json spaces", 2);
app.set("pkg", pkg);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.json({
    name: app.get("pkg").name,
    author: app.get("pkg").author,
    description: app.get("pkg").description,
    version: app.get("pkg").version,
  })
);

export default app;
