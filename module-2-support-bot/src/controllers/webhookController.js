import { Order } from "../models/Order.js";
import { Escalation } from "../models/Escalation.js";
import { Conversation } from "../models/Conversation.js";
import { detectIntent } from "../services/geminiService.js";

export const handleWebhook = async (req, res) => {
  try {
    const { from, message } = req.body;

    if (!from || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields"
      });
    }

    // Detect intent
    const intent = await detectIntent(message);
    console.log("Detected Intent:", intent);

    // ================= ORDER STATUS =================
    if (intent === "order_status") {

      const orderIdMatch = message.match(/ORD\d+/);

      if (!orderIdMatch) {
        return res.json({
          success: true,
          intent: "order_status",
          escalated: false,
          response: "Please provide your order ID (e.g., ORD1001)."
        });
      }

      const extractedOrderId = orderIdMatch[0];

      const order = await Order.findOne({
        orderId: extractedOrderId,
        customerPhone: from
      });

      if (!order) {
        return res.json({
          success: true,
          intent: "order_status",
          escalated: false,
          response: "We could not find this order for your account."
        });
      }

      const responseMessage = `Your order ${order.orderId} is ${order.status} and will arrive by ${order.estimatedDelivery}.`;

      // Log conversation
      await Conversation.create({
        phone: from,
        message,
        intent,
        response: responseMessage
      });

      return res.json({
        success: true,
        intent: "order_status",
        escalated: false,
        response: responseMessage,
        orderDetails: {
          status: order.status,
          estimatedDelivery: order.estimatedDelivery
        }
      });
    }

    // ================= REFUND =================
    if (intent === "refund_request") {

      await Escalation.create({
        phone: from,
        issue: message,
        priority: "High",
        status: "Pending"
      });

      const responseMessage =
        "Your refund request has been forwarded to our support team.";

      await Conversation.create({
        phone: from,
        message,
        intent,
        response: responseMessage
      });

      return res.json({
        success: true,
        intent: "refund_request",
        escalated: true,
        response: responseMessage
      });
    }

    // ================= RETURN POLICY =================
    if (intent === "return_policy") {

      const responseMessage =
        "Our return policy allows returns within 7 days of delivery with original packaging.";

      await Conversation.create({
        phone: from,
        message,
        intent,
        response: responseMessage
      });

      return res.json({
        success: true,
        intent: "return_policy",
        escalated: false,
        response: responseMessage
      });
    }

    // ================= DEFAULT =================
    const responseMessage =
      "Sorry, I didn't understand your request.";

    await Conversation.create({
      phone: from,
      message,
      intent: "other",
      response: responseMessage
    });

    return res.json({
      success: true,
      intent: "other",
      escalated: false,
      response: responseMessage
    });

  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }
};