import { Server } from "socket.io";

/**
 * @param {Server} io
 */
function Socket(io) {
  io.on("connection", (socket) => {
    console.log(`Socket conectado: ${socket.id}`);

    // Cuando se cree una nueva tarea
    socket.on("client:new_task", (data) => {
      // La envía de nuevo para que se actualice
      socket.emit("server:new_task", data);
    });

    socket.on("client:delete_task", (data) => {
      socket.emit("server:delete_task", data);
    });

    socket.on("client:update_task", (data) => {
      socket.emit("server:update_task", data);
    });
  });
}

export default Socket;
