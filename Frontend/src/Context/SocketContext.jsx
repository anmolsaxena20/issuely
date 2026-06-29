import { io } from "socket.io-client";
import React ,{ createContext, useContext, useEffect, useState } from "react";
import useAuth from "../Components/AuthContext/AuthContextProvider";
import { API_BASE_URL } from "../config/api.js";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const {isLogin,token} = useAuth();
  useEffect(() => {
    console.log("socketProvider",{isLogin,token})
     if (!isLogin || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const newSocket = io(API_BASE_URL, {
      auth: { token },
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); 
    };
  }, [isLogin,token]);

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
