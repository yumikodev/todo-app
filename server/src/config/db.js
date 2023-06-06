import { MONGODB_URI } from "./cfg.js";
import { connect, set } from "mongoose";

set("strictQuery", false)
connect(MONGODB_URI, {
  dbName: "todo_app",
})
  .then((db) => console.log(`[MongoDB] Conectado a: ${db.connection.name}`))
  .catch((err) => Promise.reject(err));
