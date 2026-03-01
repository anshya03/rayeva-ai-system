import mongoose from "mongoose";

const logSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["SUCCESS", "FAILED"],
      required: true
    },

    response_time_ms: {
      type: Number
    },

    error_message: {
      type: String
    }
  },
  { timestamps: true }
);

export const Log = mongoose.model("Log", logSchema);