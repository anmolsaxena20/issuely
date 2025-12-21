import mongoose from "mongoose";
const issueSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    issueType: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    location: {
      name: String,
      coordinates: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
        },
        coordinates: {
          type: [Number], // [lng, lat]
          required: true,
        },
      },
    },
    urgency: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    picture: {
      type: String, // Cloudinary URL
    },

    picturePublicId: {
      type: String, // Cloudinary public_id
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["received", "assigned", "in-progress", "resolved", "closed"],
      default: "received",
    },
  },
  { timestamps: true }
);
issueSchema.index({ "location.coordinates": "2dsphere" });

export default mongoose.model("Issue", issueSchema);
