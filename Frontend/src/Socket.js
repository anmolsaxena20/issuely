import { io } from "socket.io-client";
export const socket = io("http://localhost:5000", {
  withCredentials:true,
  auth: {
    token: localStorage.getItem("token"),
  },
});


