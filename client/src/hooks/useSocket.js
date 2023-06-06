import { useContext } from "react";
import { SocketContext } from "../context/socket.jsx";

function useSocket() {
  const socket = useContext(SocketContext);

  return socket;
}

export default useSocket;
