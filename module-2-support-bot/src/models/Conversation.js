import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    intent: {
      type: String,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Conversation = mongoose.model(
  "Conversation",
  conversationSchema
);

export default Conversation;