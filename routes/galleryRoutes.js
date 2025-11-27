const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  getGallery,
  createGalleryItem,
  deleteGallery,
  toggleFeatured
} = require("../controllers/galleryController");

// MAIN WEBSITE
router.get("/", getGallery);

// ADMIN PANEL
router.post("/", protect, upload.single("image"), createGalleryItem);
router.delete("/:id", protect, deleteGallery);

// NEW: FEATURE toggle route
router.patch("/:id/toggle-featured", protect, toggleFeatured); 

module.exports = router;
