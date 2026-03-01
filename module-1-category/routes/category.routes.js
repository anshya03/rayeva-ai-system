import express from "express";
import { classifyProduct } from "../controllers/category.controller.js";

const router = express.Router();

router.post("/classify", classifyProduct);

export default router;