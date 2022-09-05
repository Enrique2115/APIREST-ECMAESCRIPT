import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { Server } from "socket.io";
import pkg from "../package.json" assert { type: "json" };
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(import.meta.url);

import { createServer } from "http";
import { corsOptions } from "./middlewares/cors.middleware.js";

const app = express();
export const server = createServer(app);

export const io = new Server(server, {
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
