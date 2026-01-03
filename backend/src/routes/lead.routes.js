import express from "express";
import {
  getAllStaff,
  acceptSignup,
  rejectSignup,
  previousRequests,
} from "../controllers/lead.controller.js";
const router = express.Router();
router.get("/getstaff", getAllStaff);
router.get("/prevreqs", previousRequests);
router.post("/accept", acceptSignup);
router.post("/reject", rejectSignup);
export default router;
