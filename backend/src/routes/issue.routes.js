import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import { requireAdmin, requireLead } from "../middlewares/role.middleware.js";

import {
  createIssue,
  getAllIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getMyIssues,
  assignIssue,
} from "../controllers/issue.controller.js";

const router = express.Router();

/* USER */
router.post("/", upload.single("picture"), createIssue);
router.get("/my", getMyIssues);
/* ADMIN */
router.get("/", requireAdmin, getAllIssues);
router.get("/:id", requireAdmin, getIssueById);
router.post("/assignto/:id", requireLead, assignIssue);
router.put("/:id", requireAdmin, upload.single("picture"), updateIssue);
router.delete("/:id", requireAdmin, deleteIssue);
export default router;
