const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
  getHero,
  addSlide,
  updateSlide,
  deleteSlide,
  getHeroAdmin 
} = require("../controllers/heroController");

// MAIN WEBSITE
// router.get("/", getHero);
router.get("/admin-data", protect, getHeroAdmin);


// ADMIN PANEL
router.post("/", protect, upload.single("image"), addSlide);
router.put("/:id", protect, upload.single("image"), updateSlide);
router.delete("/:id", protect, deleteSlide);


module.exports = router;
