import User from "../models/user.model.js";
export const getAllStaff = async (req, res) => {
  try {
    const staff = await User.find({ role: "staff" }, { password: 0 });
    res.json(staff);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch staff" });
  }
};
