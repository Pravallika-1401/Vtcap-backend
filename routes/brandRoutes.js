const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");



const {
  createBrand,
  getBrands,
  getBrandBySlug,
  updateBrand,
  deleteBrand,
} = require("../controllers/brandController");

// Create brand
router.post("/", protect, upload.single("heroImage"), createBrand);
// router.post('/create', brandController.createBrand);


// Get all brands
router.get("/", getBrands);

// Get brand by slug
router.get("/:slug", getBrandBySlug);

// Update brand
router.put("/:id",protect, upload.single("heroImage"), updateBrand);

// Delete brand
router.delete("/:id",protect, deleteBrand);

module.exports = router;
