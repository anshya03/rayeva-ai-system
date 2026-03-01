import mongoose from "mongoose";

const escalationSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    issue: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    priority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Escalation = mongoose.model(
  "Escalation",
  escalationSchema
);