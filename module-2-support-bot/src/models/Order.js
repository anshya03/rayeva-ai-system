import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  customerPhone: String,
  status: String,
  estimatedDelivery: String,
  refundStatus: { type: String, default: "None" }
});

export const Order = mongoose.model("Order", orderSchema);