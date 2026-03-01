import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const allowedCategories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Beauty",
  "Food & Beverages",
  "Sports",
  "Books",
  "Toys"
];

export const generateCategory = async (description) => {
  try {
    const prompt = `
You are an AI product classifier.

IMPORTANT:
You must choose the primary_category ONLY from this list:
${allowedCategories.join(", ")}

Return STRICT JSON format only (no explanation):

{
  "primary_category": "",
  "sub_category": "",
  "seo_tags": [],
  "sustainability_tags": [],
  "confidence_score": 0
}

Rules:
- SEO tags must be between 5 and 10.
- Confidence must be a number between 0 and 1.
- Do not add extra text.
- Do not explain anything.

Product description:
${description}
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    });

    const raw = response.choices[0].message.content;

    const parsed = JSON.parse(raw);

    if (!allowedCategories.includes(parsed.primary_category)) {
      throw new Error("Invalid category returned by AI");
    }

    parsed.confidence_score = Number(
      Math.min(Math.max(parsed.confidence_score, 0), 1).toFixed(2)
    );

    return parsed;

  } catch (error) {
    console.error("AI Classification Error:", error.message);
    throw error;
  }
};