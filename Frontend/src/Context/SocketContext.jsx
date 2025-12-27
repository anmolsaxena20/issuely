import { io } from "socket.io-client";
import React ,{ createContext, useContext, useEffect, useState } from "react";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const newSocket = io("http://localhost:5000", {
      auth: { token },
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); 
    };
  }, []);

  if (!socket) return null;

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export default function useSocket() {
  return useContext(SocketContext);
}
