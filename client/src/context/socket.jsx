import { createContext } from "react";
import socket from "../services/socket";

export const SocketContext = createContext(socket);

function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;
