import User from "../models/user.model.js";
import { hashPassword, comparePassword } from "../utils/hash.util.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/jwt.util.js";
import jwt from "jsonwebtoken";

export const refreshAccessToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findById(decoded.id);
    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Token mismatch" });

    const payload = { id: user._id, role: user.role };

    const newAccessToken = generateAccessToken(payload);
    const newRefreshToken = generateRefreshToken(payload);

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to refresh token" });
  }
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, role, contact, department } = req.body;
    if (password && password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const allowedRoles = ["student", "staff", "lead"];
    if (role && !allowedRoles.includes(role))
      return res.status(400).json({ message: "Invalid role" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User exists" });

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "student",
      contact: contact,
      department: department,
    });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const payload = { id: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    const details = {
      id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      contact: user.contact,
      department: user.department,
    };
    res.json({ token: accessToken, ...details });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    await User.findByIdAndUpdate(req.user.id, { refreshToken: null });
    res.json({ message: "Logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Logout failed" });
  }
};

/* OAUTH SUCCESS HANDLER */
export const oauthSuccess = async (req, res) => {
  try {
    const user = req.user;

    const payload = { id: user._id, role: user.role };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // redirect back to frontend
    res.redirect("http://localhost:5173/");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "OAuth handling failed" });
  }
};
