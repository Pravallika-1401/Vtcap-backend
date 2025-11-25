// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const morgan = require("morgan");
// const connectDB = require("./config/db");

// // Load environment variables
// dotenv.config();

// // Connect DB
// connectDB();

// const app = express();

// // Middlewares
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));


// app.use("/api/header", require("./routes/headerRoutes"));
// app.use("/api/hero", require("./routes/heroRoutes"));
// app.use("/api/about-home", require("./routes/aboutHomeRoutes"));
// app.use("/api/about-page", require("./routes/aboutPageRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// app.use("/api/gallery", require("./routes/galleryRoutes"));
// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/footer", require("./routes/footerRoutes"));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });







// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");
// const galleryRoutes = require("./routes/galleryRoutes");



// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded files
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // Routes
// app.use("/api/auth", require("./routes/authRoutes"));
// app.use("/api/header", require("./routes/headerRoutes"));
// app.use("/api/hero", require("./routes/heroRoutes"));
// app.use("/api/about-home", require("./routes/aboutHomeRoutes"));
// app.use("/api/about-page", require("./routes/aboutPageRoutes"));
// app.use("/api/products", require("./routes/productRoutes"));
// // app.use("/api/gallery", require("./routes/galleryRoutes"));
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/footer", require("./routes/footerRoutes"));

// // Health check
// app.get("/", (req, res) => {
//   res.json({ message: "Backend is running!" });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });








// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// // IMPORT ALL ROUTES CORRECTLY
// const authRoutes = require("./routes/authRoutes");
// const headerRoutes = require("./routes/headerRoutes");
// const heroRoutes = require("./routes/heroRoutes");
// const aboutHomeRoutes = require("./routes/aboutHomeRoutes");
// const aboutPageRoutes = require("./routes/aboutPageRoutes");
// const productRoutes = require("./routes/productRoutes");
// const galleryRoutes = require("./routes/galleryRoutes");  
// const contactRoutes = require("./routes/contactRoutes");
// const footerRoutes = require("./routes/footerRoutes");
// const brandRoutes = require("./routes/brandRoutes");

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Serve uploaded images
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // API ROUTES (ALL CORRECTED)
// app.use("/api/auth", authRoutes);
// app.use("/api/header", headerRoutes);
// app.use("/api/hero", heroRoutes);
// app.use("/api/about-home", aboutHomeRoutes);
// app.use("/api/about-page", aboutPageRoutes);
// app.use("/api/products", productRoutes);


// app.use("/api/gallery", galleryRoutes);

// app.use("/api/contact", contactRoutes);
// app.use("/api/footer", footerRoutes);


// app.use("/api/brands", brandRoutes);

 



// // Test route
// app.get("/", (req, res) => {
//   res.json({ message: "Backend is running!" });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });







const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

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

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5174",
  credentials: true
}));
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

// MongoDB Connection with better options
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Backend is running!",
    status: "OK",
    timestamp: new Date().toISOString()
  });
});

// 404 Handler - Route not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);

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
    const field = Object.keys(err.keyPattern)[0];
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

  // Multer file upload errors
  if (err.name === "MulterError") {
    return res.status(400).json({
      success: false,
      message: `File upload error: ${err.message}`
    });
  }

  // Default error
  res.status(err.status || 500).json({
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
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`📡 Client URL: ${process.env.CLIENT_URL}`);
});