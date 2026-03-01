import { GoogleGenAI } from "@google/genai";

export const detectIntent = async (message) => {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a STRICT intent classifier for an e-commerce support system.

Classify the message into EXACTLY one of these:
- order_status
- return_policy
- refund_request
- other

Rules:

1. If the message contains words like:
refund, money back, damaged, broken, defective, wrong item
→ classify as "refund_request".

2. If the message asks about delivery, tracking, order status, shipment
→ classify as "order_status".

3. If the message asks about return rules or policy
→ classify as "return_policy".

4. If none match → classify as "other".

Return ONLY valid JSON like:
{
  "intent": "intent_name"
}

Message: "${message}"
`,
      generationConfig: {
        temperature: 0   // makes output deterministic
      }
    });

    const text = response.text;
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    let rawIntent = parsed.intent?.toLowerCase() || "other";

    // 🔥 Backend normalization (very important)
    if (rawIntent.includes("refund")) return "refund_request";
    if (rawIntent.includes("order")) return "order_status";
    if (rawIntent.includes("return")) return "return_policy";

    // 🔥 Hard keyword fallback (safety layer)
    const lowerMsg = message.toLowerCase();

    if (
      lowerMsg.includes("refund") ||
      lowerMsg.includes("damaged") ||
      lowerMsg.includes("broken") ||
      lowerMsg.includes("money back")
    ) {
      return "refund_request";
    }

    if (
      lowerMsg.includes("order") ||
      lowerMsg.includes("tracking") ||
      lowerMsg.includes("delivery")
    ) {
      return "order_status";
    }

    if (
      lowerMsg.includes("return policy") ||
      lowerMsg.includes("return")
    ) {
      return "return_policy";
    }

    return "other";

  } catch (error) {
    console.error("Gemini Error:", error);

    // 🔥 Even if AI fails, fallback logic still works
    const lowerMsg = message.toLowerCase();

    if (lowerMsg.includes("refund") || lowerMsg.includes("damaged"))
      return "refund_request";

    if (lowerMsg.includes("order"))
      return "order_status";

    return "other";
  }
};