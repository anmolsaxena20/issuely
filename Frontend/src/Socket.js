import { io } from "socket.io-client";
import { API_BASE_URL } from "./config/api.js";

export const socket = io(API_BASE_URL, {
  withCredentials: true,
  auth: {
    token: localStorage.getItem("token"),
  },
});
