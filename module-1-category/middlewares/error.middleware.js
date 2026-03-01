export const globalErrorHandler = (err, req, res, next) => {
  console.error("Global Error:", err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    timestamp: new Date().toISOString()
  });
};