const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand
} = require("../controllers/productController");

// HOME PAGE FETCH
router.get("/", getBrands);

// ADMIN PANEL
router.post("/", protect, upload.single("image"), createBrand);
router.put("/:id", protect, upload.single("image"), updateBrand);
router.delete("/:id", protect, deleteBrand);

module.exports = router;
