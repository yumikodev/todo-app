import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import morgan from "morgan";
import apiRoutes from "./routes/api.routes.js";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: "*",
});

// Conexión con MongoDB
import "./config/db.js";
import Socket from "./socket.js";

// Configuraciones
app.set("port", process.env.PORT || 8000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

// Rutas
app.use("/api", apiRoutes);

// Inicia el servidor
server.listen(app.get("port"), () => {
  console.log("Server on port:", app.get("port"));
});

Socket(io);
