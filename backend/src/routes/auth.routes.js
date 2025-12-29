import express from "express";
import passport from "passport";
import {
  signup,
  login,
  refreshAccessToken,
  logout,
  update,
  oauthSuccess,
} from "../controllers/auth.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", verifyAccessToken, logout);
router.post("/update", verifyAccessToken, update);
/* GOOGLE */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/auth/google/failure",
  }),
  oauthSuccess
);

/* GITHUB */
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/auth/github/failure",
  }),
  oauthSuccess
);
export default router;
