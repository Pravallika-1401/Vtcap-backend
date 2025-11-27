const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

// IMPORT ALL ROUTES
const authRoutes = require("./routes/authRoutes");
const headerRoutes = require("./routes/headerRoutes");
const heroRoutes = require("./routes/heroRoutes");
const aboutHomeRoutes = require("./routes/aboutHomeRoutes");
const aboutPageRoutes = require("./routes/aboutPageRoutes");
const productRoutes = require("./routes/productRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const footerRoutes = require("./routes/footerRoutes");
const brandRoutes = require("./routes/brandRoutes");

dotenv.config();

const app = express();

// Logging middleware (development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.options("*", cors());

// CORS Configuration
app.use(cors({
  // origin: process.env.CLIENT_URL || "http://localhost:5174",
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

// Body parser middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("📁 Uploads directory created");
}

// Serve uploaded images
app.use("/uploads", express.static(uploadsDir));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/header", headerRoutes);
app.use("/api/hero", heroRoutes);
app.use("/api/about-home", aboutHomeRoutes);
app.use("/api/about-page", aboutPageRoutes);
app.use("/api/products", productRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/brands", brandRoutes);
// app.use("/uploads", express.static("uploads"));

// const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "VTC Backend API is running!",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors
    });
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`
    });
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired"
    });
  }

  // Multer errors
  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  // Default error
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing server...");
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📡 Client URL: ${process.env.CLIENT_URL}`);
});