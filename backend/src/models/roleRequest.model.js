import mongoose from "mongoose";
const roleRequestSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    request: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("RoleRequest", roleRequestSchema);
