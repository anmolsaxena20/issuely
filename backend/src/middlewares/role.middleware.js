export const requireLead = (req, res, next) => {
  if (req.user.role !== "lead") {
    return res.status(403).json({ message: "Lead access required" });
  }

  next();
};
export const requireStaff = (req, res, next) => {
  if (req.user.role !== "staff") {
    return res.status(403).json({ message: "Staff access required" });
  }

  next();
};
export const requireStudent = (req, res, next) => {
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Lead access required" });
  }

  next();
};
export const requireAdmin = (req, res, next) => {
  if (req.user.role !== "staff" && req.user.role !== "lead") {
    return res.status(403).json({ message: "Admin access required" });
  }

  next();
};
