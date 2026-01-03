import User from "../models/user.model.js";
import RoleRequest from "../models/roleRequest.model.js";
import { sendEmail } from "../utils/mailer.js";
export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" }, { password: 0 });
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};
export const previousRequests = async (req, res) => {
  try {
    const { limit = 10, before } = req.query;
    const requests = await RoleRequest.find({
      createdAt: { $lt: new Date(before) },
    })
      .sort({ createdAt: -1 })
      .limit(Number(limit));
    res.json({ requests: requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch previous requests" });
  }
};
export const acceptSignup = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await RoleRequest.findOneAndDelete({ _id: id });

    if (!request) {
      return res.status(409).json({
        message: "Signup request already processed",
      });
    }

    const parsed = JSON.parse(request.data);

    await User.create({
      name: parsed.name,
      email: request.email,
      password: parsed.password,
      role: parsed.role,
      contact: parsed.contact,
      department: parsed.department,
    });
    await sendEmail({
      to: request.email,
      subject: "Signup Request Accepted",
      html: "",
      text: `Welcome to Issuely .Your signup request as a ${parsed.role} has been accepted by a lead. `,
    });
    res.json({ message: "Signup approved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve signup" });
  }
};

export const rejectSignup = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await RoleRequest.findOneAndDelete({ _id: id });

    if (!deleted) {
      return res.status(409).json({
        message: "Signup request already processed",
      });
    }

    await sendEmail({
      to: request.email,
      subject: "Signup Request Rejected",
      html: "",
      text: `Sorry to inform you that your request as a ${parsed.role} has been rejected by a lead`,
    });
    res.json({ message: "Signup request rejected" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject signup" });
  }
};
