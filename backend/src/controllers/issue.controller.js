import Issue from "../models/issue.model.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

/* CREATE ISSUE (USER) */
export const createIssue = async (req, res) => {
  try {
    const {
      name,
      issueType,
      description,
      urgency,
      status,
      locationName,
      lat,
      lng,
    } = req.body;

    let imageData = {};

    if (req.file) {
      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "issues" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();
      imageData.picture = result.secure_url;
      imageData.picturePublicId = result.public_id;
    }

    const issue = await Issue.create({
      name,
      issueType,
      description,
      location: {
        name: locationName,
        coordinates: {
          type: "Point",
          coordinates: [Number(lng), Number(lat)],
        },
      },
      urgency,
      status,
      createdBy: req.user.id,
      ...imageData,
    });

    res.status(201).json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create issue" });
  }
};

export const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ createdBy: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};
/* GET ALL ISSUES (ADMIN) */
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate("createdBy", "email role");
    res.json(issues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch issues" });
  }
};

/* GET SINGLE ISSUE (ADMIN) */
export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate(
      "createdBy",
      "email role"
    );

    if (!issue) return res.status(404).json({ message: "Issue not found" });

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch issue" });
  }
};

/* UPDATE ISSUE (ADMIN) */
export const updateIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (req.file) {
      if (issue.picturePublicId) {
        await cloudinary.uploader.destroy(issue.picturePublicId);
      }

      const uploadFromBuffer = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "issues" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await uploadFromBuffer();
      issue.picture = result.secure_url;
      issue.picturePublicId = result.public_id;
    }

    // apply only allowed fields to prevent privilege escalation
    const allowed = ["name", "issueType", "description", "urgency", "status"];
    allowed.forEach((f) => {
      if (Object.prototype.hasOwnProperty.call(req.body, f)) {
        issue[f] = req.body[f];
      }
    });

    // allow updating location via explicit fields
    if (
      req.body.locationName ||
      req.body.lat !== undefined ||
      req.body.lng !== undefined
    ) {
      issue.location = issue.location || {};
      issue.location.name = req.body.locationName || issue.location.name;
      issue.location.coordinates = {
        type: "Point",
        coordinates: [
          Number(req.body.lng ?? issue.location.coordinates?.coordinates?.[0]),
          Number(req.body.lat ?? issue.location.coordinates?.coordinates?.[1]),
        ],
      };
    }

    await issue.save();

    res.json(issue);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update issue" });
  }
};
/* DELETE ISSUE (ADMIN) */
export const deleteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    if (issue.picturePublicId) {
      await cloudinary.uploader.destroy(issue.picturePublicId);
    }

    await issue.deleteOne();
    res.json({ message: "Issue deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete issue" });
  }
};
/* ASSIGN ISSUE(LEAD) */
export const assignIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });
    const { handler } = req.body;
    issue.assignedTo = handler;
    await issue.save();
    res.json(issue);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to assign issue" });
  }
};
