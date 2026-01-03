import { Server } from "socket.io";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Issue from "../models/issue.model.js";
import Message from "../models/message.model.js";
import "dotenv/config";
import { setSocketInstance } from "../utils/socket.instance.js";
export const initSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN.split(","), credentials: true },
  });

  // Socket authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("No token");

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    if (socket.user.role === "lead") {
      socket.join("room:lead");
    }
    /* JOIN ISSUE CHAT */
    socket.on("join_issue", async ({ issueId }) => {
      const issue = await Issue.findById(issueId);
      if (!issue || !issue.assignedTo) {
        return socket.disconnect();
      }

      const userId = socket.user.id;
      const isReporter = issue.createdBy.toString() === userId;
      const isHandler = issue.assignedTo.toString() === userId;

      if (!isReporter && !isHandler) {
        return socket.disconnect();
      }

      socket.join(`issue:${issueId}`);
    });

    /* SEND MESSAGE */
    socket.on("send_message", async ({ issueId, text }) => {
      console.log("message received");
      if (!text?.trim()) return;

      const issue = await Issue.findById(issueId);
      if (!issue || !issue.assignedTo) return;

      const userId = socket.user.id;
      const isReporter = issue.createdBy.toString() === userId;
      const isHandler = issue.assignedTo.toString() === userId;

      if (!isReporter && !isHandler) return;

      const message = await Message.create({
        issueId,
        senderId: userId,
        text,
      });

      io.to(`issue:${issueId}`).emit("new_message", message);
    });

    socket.on("disconnect", () => {});
  });
  setSocketInstance(io);
  return io;
};
