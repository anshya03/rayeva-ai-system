import { generateCategory } from "../services/openai.service.js";
import { Classification } from "../models/classification.model.js";
import { Log } from "../models/log.model.js";

export const classifyProduct = async (req, res, next) => {
  const startTime = Date.now();

  try {
    const { description } = req.body;

    if (!description || description.trim().length < 10) {
      const error = new Error("Description must be at least 10 characters.");
      error.statusCode = 400;
      throw error;
    }

    const aiResult = await generateCategory(description);

    const saved = await Classification.create({
      description,
      ...aiResult
    });

    const responseTime = Date.now() - startTime;

    // 🔥 Log success
    await Log.create({
      description,
      status: "SUCCESS",
      response_time_ms: responseTime
    });

    res.status(201).json({
      success: true,
      message: "Product classified successfully",
      timestamp: new Date().toISOString(),
      data: saved
    });

  } catch (error) {

    const responseTime = Date.now() - startTime;

    // 🔥 Log failure
    await Log.create({
      description: req.body.description || "N/A",
      status: "FAILED",
      response_time_ms: responseTime,
      error_message: error.message
    });

    next(error);
  }
};

