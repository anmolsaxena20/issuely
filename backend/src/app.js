import "dotenv/config.js";

import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.routes.js";
import issueRoutes from "./routes/issue.routes.js";
import messageRoutes from "./routes/message.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import { verifyAccessToken } from "./middlewares/auth.middleware.js";
import { requireAdmin } from "./middlewares/role.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
import passport from "./config/passport.js";

const app = express();

/* ---------- MIDDLEWARES ---------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
/* security middlewares */
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || true, credentials: true }));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use(passport.initialize());
/* ---------- ROUTES ---------- */
app.use("/auth", authRoutes);
app.use("/issues", verifyAccessToken, issueRoutes);
app.use("/issues", verifyAccessToken, messageRoutes);
/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("API is running");
});

/* ---------- ERROR HANDLER ---------- */
app.use(errorHandler);

export default app;
