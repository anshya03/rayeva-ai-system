import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

// Middleware
app.use(express.json());

/*
  ==============================
  MongoDB Atlas Connection
  ==============================
*/

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
  });

/*
  ==============================
  Routes
  ==============================
*/

app.use("/api/category", categoryRoutes);

/*
  ==============================
  Server Start
  ==============================
*/

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

import { globalErrorHandler } from "./middlewares/error.middleware.js";

// after routes
app.use(globalErrorHandler);