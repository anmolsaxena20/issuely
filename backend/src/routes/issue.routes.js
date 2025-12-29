import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  requireStaff,
  requireLead,
  requireStudent,
} from "../middlewares/role.middleware.js";

import {
  createIssue,
  getAllIssues,
  getAssignedIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getMyIssues,
  assignIssue,
} from "../controllers/issue.controller.js";

const router = express.Router();

/* STUDENT */
router.post("/student/", requireStudent, upload.single("picture"), createIssue);
router.get("/student/my", requireStudent, getMyIssues);

/*STAFF*/
router.get("/staff/my", requireStaff, getAssignedIssues);

/*LEAD*/
router.get("/lead/getall", requireLead, getAllIssues);
router.get("/lead/update", requireLead, updateIssue);
router.get("/lead/delete", requireLead, deleteIssue);
router.post("/lead/assign", requireLead, assignIssue);
export default router;
