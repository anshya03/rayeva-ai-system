import express from "express";
import { handleWebhook } from "../controllers/webhookController.js";

const router = express.Router();

// POST route for incoming WhatsApp messages
router.post("/webhook", handleWebhook);

export default router;